import { PDFArray, PDFDict, PDFName, PDFString, PDFHexString, PDFNumber, PDFNull, PDFBool, PDFRef } from "pdf-lib";

const key = name => PDFName.of(name);
export function navigationFailure(reason) {
  const error = new Error("Unsupported or invalid PDF navigation: " + reason + ". No output was created.");
  error.code = "PDF_NAVIGATION";
  throw error;
}
export const isDestinationString = value => value instanceof PDFString || value instanceof PDFHexString;
export function destinationNameId(value) {
  if (!(value instanceof PDFName) && !isDestinationString(value)) navigationFailure("invalid destination name type");
  return (value instanceof PDFName ? "name:" : "string:") + Array.from(value.asBytes(), byte => byte.toString(16).padStart(2, "0")).join("");
}

export function readNamedDestinations(doc) {
  const entries = new Map();
  const add = (name, raw) => {
    const id = destinationNameId(name);
    if (entries.has(id)) navigationFailure("duplicate named destination");
    let destination = doc.context.lookup(raw);
    if (destination instanceof PDFDict) {
      if (destination.keys().some(k => k.toString() !== "/D")) navigationFailure("unsupported destination dictionary field");
      destination = doc.context.lookup(destination.get(key("D")));
    }
    if (!(destination instanceof PDFArray)) navigationFailure("named destination is not an explicit destination");
    entries.set(id, { name, destination });
  };
  const legacy = doc.context.lookup(doc.catalog.get(key("Dests")));
  if (legacy) {
    if (!(legacy instanceof PDFDict)) navigationFailure("malformed legacy Dests");
    for (const [name, raw] of legacy.entries()) add(name, raw);
  }
  const names = doc.context.lookup(doc.catalog.get(key("Names")));
  if (names && (!(names instanceof PDFDict) || names.keys().some(k => k.toString() !== "/Dests"))) navigationFailure("unsupported catalog name tree");
  const root = names?.get(key("Dests"));
  const visited = new Set();
  const walk = (raw, depth, isRoot) => {
    const node = doc.context.lookup(raw);
    if (!(node instanceof PDFDict) || visited.has(node) || depth > 64) navigationFailure("malformed or cyclic destination name tree");
    visited.add(node);
    if (visited.size > 10000 || node.keys().some(k => !["/Names", "/Kids", "/Limits"].includes(k.toString()))) navigationFailure("unsupported destination name tree");
    const leaf = doc.context.lookup(node.get(key("Names"))), kids = doc.context.lookup(node.get(key("Kids")));
    if (!!leaf === !!kids) navigationFailure("name tree requires Names or Kids");
    const ordered = [];
    if (leaf) {
      if (!(leaf instanceof PDFArray) || leaf.size() % 2) navigationFailure("malformed name-tree pairs");
      for (let i = 0; i < leaf.size(); i += 2) {
        const name = doc.context.lookup(leaf.get(i));
        if (!isDestinationString(name)) navigationFailure("name-tree key must be a PDF string");
        ordered.push(destinationNameId(name)); add(name, leaf.get(i + 1));
      }
    } else {
      if (!(kids instanceof PDFArray) || !kids.size()) navigationFailure("empty name-tree children");
      for (const child of kids.asArray()) ordered.push(...walk(child, depth + 1, false));
    }
    for (let i = 1; i < ordered.length; i++) if (ordered[i - 1] >= ordered[i]) navigationFailure("unordered or overlapping name-tree keys");
    const limits = doc.context.lookup(node.get(key("Limits")));
    if (!isRoot && !limits) navigationFailure("missing name-tree Limits");
    if (limits) {
      if (!(limits instanceof PDFArray) || limits.size() !== 2 || !ordered.length) navigationFailure("invalid name-tree Limits");
      const ends = limits.asArray().map(v => destinationNameId(doc.context.lookup(v)));
      if (ends[0] !== ordered[0] || ends[1] !== ordered[ordered.length - 1]) navigationFailure("incorrect name-tree Limits");
    }
    return ordered;
  };
  if (root) walk(root, 0, true);
  return entries;
}

export function resolveLocalDestination(doc, raw, names) {
  const object = doc.context.lookup(raw);
  if (object instanceof PDFArray) return object;
  if (object instanceof PDFName || isDestinationString(object)) {
    const entry = names.get(destinationNameId(object));
    if (!entry) navigationFailure("unresolved named destination");
    return entry.destination;
  }
  navigationFailure("malformed local destination");
}

// Pure traversal: active-stack detection permits shared acyclic actions but not cycles.
export function visitActions(doc, raw, visit, stack = new Set(), depth = 0, budget = { count: 0 }) {
  const action = doc.context.lookup(raw);
  if (!(action instanceof PDFDict) || stack.has(action) || depth > 64 || ++budget.count > 10000) navigationFailure("malformed or cyclic action chain");
  const type = doc.context.lookup(action.get(key("S")))?.toString();
  if (!["/GoTo", "/GoToR", "/URI"].includes(type)) navigationFailure("unsupported action type (JavaScript and embedded navigation are not supported)");
  const allowed = ["/Type", "/S", "/Next", ...(type === "/URI" ? ["/URI", "/IsMap"] : type === "/GoToR" ? ["/D", "/F", "/NewWindow"] : ["/D"])];
  if (action.keys().some(k => !allowed.includes(k.toString()))) navigationFailure("unsupported action field");
  if (action.has(key("Type")) && doc.context.lookup(action.get(key("Type")))?.toString() !== "/Action") navigationFailure("invalid action Type");
  for (const field of ["NewWindow", "IsMap"]) if (action.has(key(field)) && !(doc.context.lookup(action.get(key(field))) instanceof PDFBool)) navigationFailure("invalid action boolean");
  if (type === "/GoToR") {
    const dest = doc.context.lookup(action.get(key("D"))), file = doc.context.lookup(action.get(key("F")));
    if (!file || (!isDestinationString(file) && !(file instanceof PDFDict))) navigationFailure("invalid remote file specification");
    if (!(dest instanceof PDFName) && !isDestinationString(dest) && !(dest instanceof PDFArray)) navigationFailure("invalid remote destination");
    if (dest instanceof PDFArray) {
      const page = doc.context.lookup(dest.get(0));
      if (!(page instanceof PDFNumber) || !Number.isInteger(page.asNumber()) || page.asNumber() < 0) navigationFailure("invalid remote page number");
      const mode = doc.context.lookup(dest.get(1))?.toString();
      const lengths = { "/XYZ": 5, "/Fit": 2, "/FitH": 3, "/FitV": 3, "/FitR": 6, "/FitB": 2, "/FitBH": 3, "/FitBV": 3 };
      if (lengths[mode] !== dest.size()) navigationFailure("invalid remote destination view");
      for (const raw of dest.asArray().slice(2)) {
        const coordinate = doc.context.lookup(raw);
        if (!(coordinate instanceof PDFNumber && Number.isFinite(coordinate.asNumber())) && !(coordinate === PDFNull && mode !== "/FitR")) navigationFailure("invalid remote destination coordinate");
      }
    }
  }
  if (type === "/URI" && !isDestinationString(doc.context.lookup(action.get(key("URI"))))) navigationFailure("invalid URI action");
  visit(action, type);
  const next = doc.context.lookup(action.get(key("Next")));
  if (next) {
    stack.add(action);
    if (next instanceof PDFArray) {
      if (!next.size()) navigationFailure("empty Next action array");
      for (const child of next.asArray()) visitActions(doc, child, visit, stack, depth + 1, budget);
    } else visitActions(doc, next, visit, stack, depth + 1, budget);
    stack.delete(action);
  }
}

export function annotationActionRoots(doc, annotation) {
  const roots = [];
  if (annotation.has(key("A"))) roots.push(annotation.get(key("A")));
  const aa = doc.context.lookup(annotation.get(key("AA")));
  if (aa) {
    if (!(aa instanceof PDFDict)) navigationFailure("malformed annotation AA");
    for (const [event, action] of aa.entries()) {
      if (!["/E", "/X", "/D", "/U", "/Fo", "/Bl", "/PO", "/PC", "/PV", "/PI"].includes(event.toString())) navigationFailure("unsupported annotation AA event");
      roots.push(action);
    }
  }
  return roots;
}

// Compare retained remote payloads by dereferenced values, never object numbers.
export function remoteActionPayload(doc, action) {
  const stack = new Set();
  const value = (raw, depth = 0) => {
    const object = doc.context.lookup(raw);
    if (!object || stack.has(object) || depth > 64) navigationFailure("malformed remote action payload");
    if (object instanceof PDFDict || object instanceof PDFArray) {
      stack.add(object);
      const result = object instanceof PDFArray ? object.asArray().map(v => value(v, depth + 1)) : object.entries().map(([k, v]) => [k.toString(), value(v, depth + 1)]).sort((a, b) => a[0].localeCompare(b[0]));
      stack.delete(object); return result;
    }
    if (object.dict) navigationFailure("embedded stream in remote action is unsupported");
    return object.toString();
  };
  return action.entries().filter(([k]) => k.toString() !== "/Next").map(([k, v]) => [k.toString(), value(v)]).sort((a, b) => a[0].localeCompare(b[0]));
}

// ISO 32000-1 tables 152/153: Count measures visible descendants, not all
// descendants. Closed items retain the negative would-be-visible count.
// Unknown fields (including structure-element /SE) fail rather than get dropped.
export function readDocumentNavigation(doc) {
  const items = new Set(), seen = new Set();
  const lookup = (object, name) => doc.context.lookup(object.get(key(name)));
  const sameRef = (a, b) => a instanceof PDFRef && b instanceof PDFRef && a.toString() === b.toString();
  const fields = (dict, allowed) => {
    if (dict.keys().some(k => !allowed.includes(k.toString()))) navigationFailure("unsupported outline field");
  };
  const integer = raw => {
    const value = doc.context.lookup(raw);
    if (!(value instanceof PDFNumber) || !Number.isSafeInteger(value.asNumber())) navigationFailure("invalid outline integer");
    return value.asNumber();
  };
  const children = (parent, parentRef, depth) => {
    if (depth > 64) navigationFailure("outline depth limit exceeded");
    const first = parent.get(key("First")), last = parent.get(key("Last"));
    if (!first && !last) return [];
    if (!(first instanceof PDFRef) || !(last instanceof PDFRef)) navigationFailure("outline First/Last must be references");
    const result = []; let ref = first, previous;
    while (ref) {
      if (!(ref instanceof PDFRef)) navigationFailure("invalid outline sibling reference");
      const dict = doc.context.lookup(ref);
      if (!(dict instanceof PDFDict) || seen.has(dict) || seen.size >= 10000) navigationFailure("cyclic, shared or missing outline item");
      seen.add(dict); items.add(dict);
      fields(dict, ["/Title", "/Parent", "/Prev", "/Next", "/First", "/Last", "/Count", "/Dest", "/A", "/C", "/F"]);
      if (!sameRef(dict.get(key("Parent")), parentRef)) navigationFailure("incorrect outline Parent");
      const prev = dict.get(key("Prev"));
      if (previous ? !sameRef(prev, previous) : !!prev) navigationFailure("incorrect outline Prev");
      if (!isDestinationString(lookup(dict, "Title"))) navigationFailure("outline Title must be a text string");
      if (dict.has(key("Dest")) && dict.has(key("A"))) navigationFailure("ambiguous outline Dest and A");
      if (dict.has(key("F"))) { const flags = integer(dict.get(key("F"))); if (flags < 0 || flags > 3) navigationFailure("unsupported outline style flags"); }
      if (dict.has(key("C"))) {
        const color = lookup(dict, "C");
        if (!(color instanceof PDFArray) || color.size() !== 3 || color.asArray().some(raw => {
          const n = doc.context.lookup(raw); return !(n instanceof PDFNumber) || !Number.isFinite(n.asNumber()) || n.asNumber() < 0 || n.asNumber() > 1;
        })) navigationFailure("invalid outline color");
      }
      const nested = children(dict, ref, depth + 1);
      const visible = nested.reduce((sum, child) => sum + 1 + Math.max(0, child.count), 0);
      const count = dict.has(key("Count")) ? integer(dict.get(key("Count"))) : 0;
      if (nested.length ? Math.abs(count) !== visible : count !== 0) navigationFailure("incorrect outline Count");
      result.push({ dict, children: nested, count });
      previous = ref; ref = dict.get(key("Next"));
    }
    if (!sameRef(previous, last)) navigationFailure("incorrect outline Last");
    return result;
  };
  let roots = [], root;
  if (doc.catalog.has(key("Outlines"))) {
    const ref = doc.catalog.get(key("Outlines")); root = doc.context.lookup(ref);
    if (!(ref instanceof PDFRef) || !(root instanceof PDFDict)) navigationFailure("invalid outline root reference");
    seen.add(root);
    fields(root, ["/Type", "/First", "/Last", "/Count"]);
    if (root.has(key("Type")) && lookup(root, "Type")?.toString() !== "/Outlines") navigationFailure("invalid outline root Type");
    roots = children(root, ref, 0);
    const visible = roots.reduce((sum, child) => sum + 1 + Math.max(0, child.count), 0);
    if (root.has(key("Count")) ? integer(root.get(key("Count"))) !== visible : roots.some(child => child.count > 0)) navigationFailure("incorrect outline root Count");
  }
  let openAction;
  if (doc.catalog.has(key("OpenAction"))) {
    openAction = lookup(doc.catalog, "OpenAction");
    if (!(openAction instanceof PDFArray) && !(openAction instanceof PDFDict && ["/GoTo", "/GoToR"].includes(lookup(openAction, "S")?.toString()))) navigationFailure("unsupported or malformed OpenAction");
  }
  return { root, roots, items, openAction };
}
