import { PDFDocument, PDFArray, PDFDict, PDFName, PDFHexString, PDFObjectCopier } from "pdf-lib";
import { navigationFailure, pageGeometry, validateNavigation, walkPdfObjects } from "@/lib/pdfNavigationValidation";
import { readNamedDestinations, destinationNameId, resolveLocalDestination, visitActions, annotationActionRoots, remoteActionPayload, readDocumentNavigation } from "@/lib/pdfNavigationModel";

const key = name => PDFName.of(name);

function inspectSource(doc) {
  // Includes reachable annotation ownership/relationship checks. Unsupported
  // linked annotations must fail before copyPages or annotation cloning occurs.
  validateNavigation(doc);
  for (const name of ["AcroForm", "StructTreeRoot", "Threads"]) {
    if (doc.catalog.has(key(name))) navigationFailure(name + " is outside the safe page-copy slice");
  }
  const permittedDestinations = new Set(), permittedActions = new Set();
  const documentNavigation = readDocumentNavigation(doc);
  for (const item of documentNavigation.items) {
    if (item.has(key("Dest"))) permittedDestinations.add(item);
    if (item.has(key("A"))) visitActions(doc, item.get(key("A")), action => permittedActions.add(action));
  }
  if (documentNavigation.openAction instanceof PDFDict) visitActions(doc, documentNavigation.openAction, action => permittedActions.add(action));
  const annotations = doc.getPages().map(page => {
    const array = doc.context.lookup(page.node.get(key("Annots")));
    return array ? array.asArray().map(raw => {
      const annotation = doc.context.lookup(raw);
      const destination = annotation.get(key("Dest"));
      const action = doc.context.lookup(annotation.get(key("A")));
      if (destination && action) navigationFailure("annotation contains both Dest and A");
      if (destination || action) {
        if (annotation.get(key("Subtype"))?.toString() !== "/Link") navigationFailure("non-link annotation action");
      }
      if (destination) permittedDestinations.add(annotation);
      for (const root of annotationActionRoots(doc, annotation)) visitActions(doc, root, node => permittedActions.add(node));
      return { annotation, destination, action, additional: doc.context.lookup(annotation.get(key("AA"))) };
    }) : [];
  });
  walkPdfObjects(doc, dict => {
    if (dict === doc.context.lookup(doc.catalog.get(key("Dests")))) return;
    if (dict.has(key("Dest")) && !permittedDestinations.has(dict)) navigationFailure("destination outside a supported link");
    const action = doc.context.lookup(dict.get(key("A")));
    if (action instanceof PDFDict && action.has(key("S")) && !permittedActions.has(action)) navigationFailure("action outside a supported link");
    if (dict.has(key("S")) && ["/GoTo", "/GoToR", "/URI", "/JavaScript", "/GoToE"].includes(dict.get(key("S"))?.toString()) && !permittedActions.has(dict)) navigationFailure("action outside a supported link");
  });
  return { annotations, names: readNamedDestinations(doc), documentNavigation };
}

// Each entry is a distinct source occurrence, including repeated use of one PDF.
// Merge/Reorder remain complete permutations. Selection is an explicit separate
// entry point so an accidentally incomplete Merge/Reorder order still fails.
export async function copyPagesWithNavigation(sources) {
  return copyNavigation(sources, false);
}

export async function copySelectedPagesWithNavigation(doc, order) {
  return copyNavigation([{ doc, order }], true);
}

async function copyNavigation(sources, selection) {
  const plans = sources.map(({ doc, order }, occurrence) => {
    if ((!selection && order.length !== doc.getPageCount()) || !order.length || new Set(order).size !== order.length || order.some(i => !Number.isInteger(i) || i < 0 || i >= doc.getPageCount())) navigationFailure(selection ? "selection must retain at least one page with unique valid indices" : "only complete page permutations are supported");
    return { doc, order, occurrence, ...inspectSource(doc) };
  });
  const output = await PDFDocument.create(), expectedGeometry = [], expectedPageRefs = [];
  const legacy = output.context.obj({}), stringNames = [], outlineRoots = [];
  // Existing callers use multiple occurrences for Merge and one for Reorder.
  // Merge renames local destination identifiers: external links into the old
  // names are not preserved. Merge deliberately omits every source OpenAction;
  // source validation still rejects malformed/unsupported ones before copying.
  // Source outline hierarchies are concatenated as distinct top-level subtrees.
  const merging = sources.length > 1;
  for (const { doc, order, occurrence, annotations, names, documentNavigation } of plans) {
    const copied = await output.copyPages(doc, order);
    const mapping = new Map();
    copied.forEach((page, i) => {
      output.addPage(page);
      expectedPageRefs.push(page.ref.toString());
      mapping.set(doc.getPage(order[i]).ref.toString(), page.ref);
      expectedGeometry.push(pageGeometry(doc.getPage(order[i])));
    });
    const copier = PDFObjectCopier.for(doc.context, output.context);
    // Single-document selections retain document information/XMP rather than
    // introducing unrelated metadata loss when Delete moves to page copying.
    if (selection) {
      if (doc.context.trailerInfo.Info) output.context.trailerInfo.Info = copier.copy(doc.context.trailerInfo.Info);
      if (doc.catalog.has(key("Metadata"))) output.catalog.set(key("Metadata"), copier.copy(doc.catalog.get(key("Metadata"))));
    }
    const retained = raw => mapping.has(resolveLocalDestination(doc, raw, names).get(0).toString());
    const nameMapping = new Map();
    for (const [id, { name, destination: original }] of names) {
      if (selection && !retained(original)) continue;
      const prefix = "pdfcraft-source-" + (occurrence + 1) + "-";
      const hex = id.slice(id.indexOf(":") + 1);
      const renamed = !merging ? copier.copy(name) : name instanceof PDFName
        ? PDFName.of(prefix + hex)
        : PDFHexString.of(Array.from(prefix, c => c.charCodeAt(0).toString(16)).join("") + hex);
      nameMapping.set(id, renamed);
    }
    const explicitDestination = raw => {
      const original = doc.context.lookup(raw);
      if (!(original instanceof PDFArray)) navigationFailure("unsupported destination");
      const target = mapping.get(original.get(0).toString());
      if (!target) { if (selection) return null; navigationFailure("unresolved local target"); }
      const values = original.asArray().slice(1).map(value => copier.copy(doc.context.lookup(value)));
      return output.context.obj([target, ...values]);
    };
    const destination = raw => {
      if (selection && !retained(raw)) return null;
      const original = doc.context.lookup(raw);
      if (original instanceof PDFArray) return explicitDestination(original);
      const mapped = nameMapping.get(destinationNameId(original));
      if (!mapped) navigationFailure("unresolved named destination during copying");
      return mapped;
    };
    for (const [id, { destination: original }] of names) {
      if (!nameMapping.has(id)) continue;
      const name = nameMapping.get(id), rewritten = explicitDestination(original);
      if (name instanceof PDFName) legacy.set(name, rewritten);
      else stringNames.push([name, rewritten]);
    }
    // Source chains were validated before copyPages. Clone each action and
    // rebuild Next explicitly; never carry copied local page references forward.
    const actionCache = new Map();
    const rewriteAction = raw => {
      const original = doc.context.lookup(raw);
      if (actionCache.has(original)) return actionCache.get(original);
      if (selection) {
        let omitted = false, chained = false;
        visitActions(doc, original, (action, type) => {
          if (action.has(key("Next"))) chained = true;
          if (type === "/GoTo" && !retained(action.get(key("D")))) omitted = true;
        });
        if (omitted) {
          if (chained) navigationFailure("action chain targets an omitted page; partial action removal is unsupported");
          return null;
        }
      }
      const rewritten = copier.copy(original).clone(output.context);
      actionCache.set(original, rewritten);
      const type = doc.context.lookup(original.get(key("S")))?.toString();
      if (type === "/GoTo") rewritten.set(key("D"), destination(original.get(key("D"))));
      const next = doc.context.lookup(original.get(key("Next")));
      if (next) rewritten.set(key("Next"), next instanceof PDFArray
        ? output.context.obj(next.asArray().map(rewriteAction)) : rewriteAction(next));
      if (type === "/GoToR" && JSON.stringify(remoteActionPayload(doc, original)) !== JSON.stringify(remoteActionPayload(output, rewritten))) navigationFailure("remote action payload changed");
      return rewritten;
    };
    const cloneOutline = node => {
      const dict = output.context.obj({});
      const children = node.children.map(cloneOutline).filter(Boolean);
      for (const name of ["Title", "C", "F"]) if (node.dict.has(key(name))) dict.set(key(name), copier.copy(doc.context.lookup(node.dict.get(key(name)))));
      let removed = false;
      for (const name of ["Dest", "A"]) if (node.dict.has(key(name))) {
        const value = name === "Dest" ? destination(node.dict.get(key(name))) : rewriteAction(node.dict.get(key(name)));
        if (value) dict.set(key(name), value); else removed = true;
      }
      // A dead target keeps its title only as a container for surviving children.
      // An emptied pre-existing container is pruned as well.
      if (selection && !children.length && (removed || (node.children.length && !dict.has(key("Dest")) && !dict.has(key("A"))))) return null;
      const visible = children.reduce((sum, child) => sum + 1 + Math.max(0, child.count), 0);
      const count = node.count < 0 ? -visible : visible;
      if (children.length || node.dict.has(key("Count"))) dict.set(key("Count"), output.context.obj(count));
      return { dict, ref: output.context.register(dict), count, children };
    };
    outlineRoots.push(...documentNavigation.roots.map(cloneOutline).filter(Boolean));
    if (!merging && documentNavigation.openAction) {
      const action = documentNavigation.openAction instanceof PDFArray ? explicitDestination(documentNavigation.openAction) : rewriteAction(documentNavigation.openAction);
      if (action) output.catalog.set(key("OpenAction"), action);
    }
    copied.forEach((page, i) => {
      const originals = annotations[order[i]];
      const array = output.context.lookup(page.node.get(key("Annots")));
      if ((array?.size() || 0) !== originals.length) navigationFailure("annotation copy mismatch");
      // Rebuild each annotation separately to avoid shared dictionary mutation.
      if (array) page.node.set(key("Annots"), output.context.obj(originals.map(({ destination: dest, action, additional }, j) => {
        const annotation = output.context.lookup(array.get(j)).clone(output.context);
        annotation.set(key("P"), page.ref);
        if (dest) { const value = destination(dest); if (value) annotation.set(key("Dest"), value); else annotation.delete(key("Dest")); }
        if (action) { const value = rewriteAction(action); if (value) annotation.set(key("A"), value); else annotation.delete(key("A")); }
        if (additional) {
          const aa = output.context.obj({});
          for (const [event, root] of additional.entries()) { const value = rewriteAction(root); if (value) aa.set(event, value); }
          if (aa.keys().length) annotation.set(key("AA"), aa); else annotation.delete(key("AA"));
        }
        return output.context.register(annotation);
      })));
    });
  }
  if (outlineRoots.length) {
    const root = output.context.obj({ Type: "Outlines", Count: outlineRoots.reduce((sum, node) => sum + 1 + Math.max(0, node.count), 0) });
    const rootRef = output.context.register(root);
    const link = (parent, parentRef, nodes) => {
      if (!nodes.length) return;
      parent.set(key("First"), nodes[0].ref); parent.set(key("Last"), nodes[nodes.length - 1].ref);
      nodes.forEach((node, i) => {
        node.dict.set(key("Parent"), parentRef);
        if (i) node.dict.set(key("Prev"), nodes[i - 1].ref);
        if (i + 1 < nodes.length) node.dict.set(key("Next"), nodes[i + 1].ref);
        link(node.dict, node.ref, node.children);
      });
    };
    link(root, rootRef, outlineRoots); output.catalog.set(key("Outlines"), rootRef);
  }
  if (legacy.keys().length > 0) output.catalog.set(key("Dests"), legacy);
  if (stringNames.length) {
    stringNames.sort((a, b) => destinationNameId(a[0]) < destinationNameId(b[0]) ? -1 : 1);
    output.catalog.set(key("Names"), output.context.obj({ Dests: {
      Names: stringNames.flat(), Limits: [stringNames[0][0], stringNames[stringNames.length - 1][0]],
    } }));
  }
  const before = validateNavigation(output, expectedGeometry, expectedPageRefs);
  if (merging && before.hasOpenAction) navigationFailure("Merge must omit source OpenActions");
  const bytes = await output.save();
  const reopened = await PDFDocument.load(bytes, { updateMetadata: false, throwOnInvalidObject: true });
  const after = validateNavigation(reopened, expectedGeometry, expectedPageRefs);
  if (JSON.stringify(before.destinations) !== JSON.stringify(after.destinations)) navigationFailure("serialized navigation changed");
  if (JSON.stringify(before.remoteActions) !== JSON.stringify(after.remoteActions)) navigationFailure("serialized remote action changed");
  if (JSON.stringify(before.outlines) !== JSON.stringify(after.outlines) || before.hasOpenAction !== after.hasOpenAction) navigationFailure("serialized document navigation changed");
  return bytes;
}
