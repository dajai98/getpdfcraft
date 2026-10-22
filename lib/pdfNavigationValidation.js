import { PDFArray, PDFDict, PDFName, PDFRef, PDFNumber, PDFNull } from "pdf-lib";
import { navigationFailure, readNamedDestinations, resolveLocalDestination, visitActions, annotationActionRoots, remoteActionPayload, readDocumentNavigation } from "@/lib/pdfNavigationModel";
export { navigationFailure } from "@/lib/pdfNavigationModel";

const key = name => PDFName.of(name);

// This walk follows the serialized object graph, not PDF.js destination resolution.
export function walkPdfObjects(doc, visit) {
  const seen = new Set();
  const pending = [doc.catalog];
  while (pending.length) {
    const raw = pending.pop();
    const object = raw instanceof PDFRef ? doc.context.lookup(raw) : raw;
    if (!object) navigationFailure("missing referenced object");
    if (seen.has(object)) continue;
    seen.add(object);
    if (seen.size > 200000) navigationFailure("object inspection limit exceeded");
    const dictionary = object instanceof PDFDict ? object : object.dict;
    if (dictionary instanceof PDFDict) {
      visit(dictionary);
      for (const [, value] of dictionary.entries()) pending.push(value);
    } else if (object instanceof PDFArray) {
      pending.push(...object.asArray());
    }
  }
}

export function pageGeometry(page) {
  return { size: page.getSize(), media: page.getMediaBox(), crop: page.getCropBox(), rotation: page.getRotation().angle };
}

// Independent page-tree enumeration: never infer page membership from /Type /Page.
export function validateNavigation(doc, expectedGeometry, expectedPageRefs) {
  const documentNavigation = readDocumentNavigation(doc);
  const names = readNamedDestinations(doc);
  const pages = [], refs = new Set(), nodes = new Set();
  const descend = (ref, parent, depth) => {
    if (!(ref instanceof PDFRef) || nodes.has(ref.toString()) || depth > 100) navigationFailure("invalid or cyclic page tree");
    nodes.add(ref.toString());
    const node = doc.context.lookup(ref);
    if (!(node instanceof PDFDict)) navigationFailure("invalid page-tree node");
    if (parent && node.get(key("Parent"))?.toString() !== parent.toString()) navigationFailure("incorrect page parent");
    const type = node.get(key("Type"))?.toString();
    if (type === "/Page") { pages.push(ref); refs.add(ref.toString()); return 1; }
    if (type !== "/Pages") navigationFailure("unknown page-tree node");
    const kids = doc.context.lookup(node.get(key("Kids")));
    if (!(kids instanceof PDFArray)) navigationFailure("missing page-tree children");
    const count = kids.asArray().reduce((n, child) => n + descend(child, ref, depth + 1), 0);
    const recorded = doc.context.lookup(node.get(key("Count")));
    if (!(recorded instanceof PDFNumber) || recorded.asNumber() !== count) navigationFailure("incorrect page-tree count");
    return count;
  };
  descend(doc.catalog.get(key("Pages")), null, 0);
  if (!pages.length) navigationFailure("empty page tree");
  if (expectedPageRefs && JSON.stringify(pages.map(p => p.toString())) !== JSON.stringify(expectedPageRefs)) navigationFailure("page identity/order changed");
  if (JSON.stringify(doc.getPages().map(p => p.ref.toString())) !== JSON.stringify(pages.map(p => p.toString()))) navigationFailure("page API and final page tree disagree");
  const index = new Map(pages.map((ref, i) => [ref.toString(), i]));
  const destinations = [];
  const checkDestination = (raw, record = true) => {
    const dest = resolveLocalDestination(doc, raw, names);
    const target = dest.get(0);
    if (!(target instanceof PDFRef) || !refs.has(target.toString())) navigationFailure("local destination targets a detached or removed page");
    const mode = doc.context.lookup(dest.get(1));
    const lengths = { "/XYZ": 5, "/Fit": 2, "/FitH": 3, "/FitV": 3, "/FitR": 6, "/FitB": 2, "/FitBH": 3, "/FitBV": 3 };
    if (!(mode instanceof PDFName) || lengths[mode.toString()] !== dest.size()) navigationFailure("unsupported destination view");
    for (let i = 2; i < dest.size(); i++) {
      const value = doc.context.lookup(dest.get(i));
      if (!(value instanceof PDFNumber) && value !== PDFNull) navigationFailure("invalid destination coordinate");
      if (value instanceof PDFNumber && !Number.isFinite(value.asNumber())) navigationFailure("invalid destination number");
      if (mode.toString() === "/FitR" && value === PDFNull) navigationFailure("invalid FitR coordinate");
    }
    if (record) destinations.push({ page: index.get(target.toString()), view: dest.asArray().slice(1).map(v => doc.context.lookup(v).toString()) });
  };
  for (const { destination } of names.values()) checkDestination(destination);
  const reachableDictionaries = new Set();
  walkPdfObjects(doc, dict => {
    reachableDictionaries.add(dict);
    if (dict === doc.context.lookup(doc.catalog.get(key("Dests")))) return;
    if (dict.has(key("Dest"))) checkDestination(dict.get(key("Dest")), false);
    if (dict.get(key("S"))?.toString() === "/GoTo") checkDestination(dict.get(key("D")), false);
  });
  const owners = new Map();
  pages.forEach(ref => {
    const page = doc.context.lookup(ref), raw = page.get(key("Annots"));
    if (!raw) return;
    const annotations = doc.context.lookup(raw);
    if (!(annotations instanceof PDFArray)) navigationFailure("invalid annotations array");
    annotations.asArray().forEach(rawAnnotation => {
      const annotation = doc.context.lookup(rawAnnotation);
      if (!(annotation instanceof PDFDict) || owners.has(annotation)) navigationFailure("ambiguous annotation ownership");
      owners.set(annotation, ref);
      const owner = annotation.get(key("P"));
      if (owner && (!(owner instanceof PDFRef) || owner.toString() !== ref.toString())) navigationFailure("annotation P is not its owning page");
    });
  });
  const supportedActions = new Set(), remoteActions = [];
  const checkAction = root => visitActions(doc, root, (action, type) => {
    supportedActions.add(action);
    if (type === "/GoTo") checkDestination(action.get(key("D")));
    if (type === "/GoToR") remoteActions.push(remoteActionPayload(doc, action));
  });
  for (const annotation of owners.keys()) {
    if (annotation.has(key("Dest"))) checkDestination(annotation.get(key("Dest")));
    if (annotation.has(key("Dest")) && annotation.has(key("A"))) navigationFailure("annotation contains both Dest and A");
    for (const root of annotationActionRoots(doc, annotation)) checkAction(root);
  }
  for (const item of documentNavigation.items) {
    if (item.has(key("Dest"))) checkDestination(item.get(key("Dest")));
    if (item.has(key("A"))) checkAction(item.get(key("A")));
  }
  if (documentNavigation.openAction instanceof PDFArray) checkDestination(documentNavigation.openAction);
  else if (documentNavigation.openAction) checkAction(documentNavigation.openAction);
  const legacyDeclarations = doc.context.lookup(doc.catalog.get(key("Dests")));
  for (const dict of reachableDictionaries) {
    if (dict === legacyDeclarations) continue; // These keys are names, not PDF entries.
    if (dict.has(key("AA")) && !owners.has(dict)) navigationFailure("additional actions outside annotations are unsupported");
    if (dict.has(key("Next")) && !supportedActions.has(dict) && !documentNavigation.items.has(dict)) navigationFailure("Next outside a supported action chain or outline");
    const type = doc.context.lookup(dict.get(key("S")))?.toString();
    if (["/GoTo", "/GoToR", "/URI", "/JavaScript", "/GoToE"].includes(type) && !supportedActions.has(dict)) navigationFailure("action outside supported navigation roots");
  }
  // /Type is optional for annotations. Include linked objects outside /Annots,
  // including annotations reached through nested/custom relationship entries.
  const annotationSubtypes = new Set(["Text", "Link", "FreeText", "Line", "Square", "Circle", "Polygon", "PolyLine", "Highlight", "Underline", "Squiggly", "StrikeOut", "Stamp", "Caret", "Ink", "Popup", "FileAttachment", "Sound", "Movie", "Widget", "Screen", "PrinterMark", "TrapNet", "Watermark", "3D", "Redact", "RichMedia"]);
  const annotations = new Set(owners.keys());
  for (const dict of reachableDictionaries) {
    const type = doc.context.lookup(dict.get(key("Type")))?.toString();
    const subtype = doc.context.lookup(dict.get(key("Subtype")))?.toString();
    if (type === "/Annot" || annotationSubtypes.has(subtype?.slice(1)) || (subtype && dict.has(key("Rect")))) annotations.add(dict);
  }
  // Check all reachable annotation page references before deciding whether the
  // relationships themselves are supported. Never stop at the top-level owner.
  for (const annotation of annotations) {
    const owner = annotation.get(key("P"));
    if (owner && (!(owner instanceof PDFRef) || !refs.has(owner.toString()))) navigationFailure("reachable annotation P targets a detached or removed page");
  }
  for (const annotation of annotations) {
    if (!owners.has(annotation)) navigationFailure("reachable annotation has no unambiguous page Annots owner");
  }
  for (const annotation of annotations) {
    for (const name of ["Popup", "Parent", "IRT"]) {
      if (annotation.has(key(name))) navigationFailure("linked annotation " + name + " is unsupported in this repair phase");
    }
    // Find other annotation-to-annotation edges without following /P or local
    // destination pages back through the document and mistaking siblings for edges.
    const pending = annotation.entries().filter(([name]) => name.toString() !== "/P").map(([, object]) => object);
    const seen = new Set();
    while (pending.length) {
      const raw = pending.pop(), object = raw instanceof PDFRef ? doc.context.lookup(raw) : raw;
      if (!object) navigationFailure("missing annotation graph object");
      if (annotations.has(object)) navigationFailure("linked annotation reference or cycle is unsupported in this repair phase");
      if (seen.has(object)) continue;
      seen.add(object);
      if (seen.size > 200000) navigationFailure("annotation graph inspection limit exceeded");
      const dict = object instanceof PDFDict ? object : object.dict;
      if (dict instanceof PDFDict) {
        if (["/Page", "/Pages", "/Catalog"].includes(dict.get(key("Type"))?.toString())) continue;
        pending.push(...dict.entries().map(([, value]) => value));
      } else if (object instanceof PDFArray) pending.push(...object.asArray());
    }
  }
  const geometry = doc.getPages().map(pageGeometry);
  if (expectedGeometry && JSON.stringify(geometry) !== JSON.stringify(expectedGeometry)) navigationFailure("page count/order/geometry changed");
  const outlineShape = nodes => nodes.map(({ dict, children, count }) => ({
    title: doc.context.lookup(dict.get(key("Title"))).toString(), count,
    color: doc.context.lookup(dict.get(key("C")))?.toString(), flags: doc.context.lookup(dict.get(key("F")))?.toString(),
    children: outlineShape(children),
  }));
  return { pageRefs: pages.map(p => p.toString()), geometry, destinations, remoteActions, outlines: outlineShape(documentNavigation.roots), hasOpenAction: !!documentNavigation.openAction };
}
