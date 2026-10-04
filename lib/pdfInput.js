export function pdfInputError(error) {
  return /encrypt|password/i.test(`${error?.name} ${error?.message}`)
    ? "This PDF is password protected. Unlock it with the correct password first, then select the unlocked PDF."
    : "This PDF could not be read. Select a valid, undamaged PDF and try again.";
}

export async function loadPdf(file) {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!new TextDecoder("latin1").decode(bytes.subarray(0, 1024)).includes("%PDF-")) throw new Error("Invalid PDF header");
  let doc;
  try {
    doc = await PDFDocument.load(bytes, { throwOnInvalidObject: true });
  } catch (error) {
    // Encrypted object streams can fail strict parsing before the encryption check.
    // Probe only to classify that error; never accept a document that failed strict parsing.
    try { await PDFDocument.load(bytes); }
    catch (probe) {
      if (/encrypt|password/i.test(`${probe?.name} ${probe?.message}`)) throw probe;
    }
    throw error;
  }
  if (!doc.getPageCount()) throw new Error("PDF contains no pages");
  return doc;
}
