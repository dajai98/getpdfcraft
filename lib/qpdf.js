// Each operation gets its own virtual filesystem; no document bytes are uploaded.
export async function runQpdf(file, args, operation) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const header = new TextDecoder("latin1").decode(bytes.subarray(0, 1024));
  if (!header.includes("%PDF-")) throw new Error("This file does not have a PDF header. Select a valid PDF.");
  let qpdf;
  try {
    try {
      const createModule = (await import("@neslinesli93/qpdf-wasm")).default;
      qpdf = await createModule({
        locateFile: () => "https://cdn.jsdelivr.net/npm/@neslinesli93/qpdf-wasm@0.3.0/dist/qpdf.wasm",
        noInitialRun: true,
      });
    } catch {
      throw new Error("Could not load the PDF security engine. Check your connection or browser and try again.");
    }
    qpdf.FS.writeFile("/input.pdf", bytes);
    const status = qpdf.callMain(args);
    if (status !== 0) {
      // This build exposes an exit code, but not structured error diagnostics.
      const reason = operation === "unlock"
        ? "The password may be incorrect, or the PDF may be damaged or unsupported."
        : "The PDF may be damaged, unsupported, or already password protected.";
      throw new Error(`Could not ${operation} this PDF (QPDF status ${status}). ${reason}`);
    }
    const output = qpdf.FS.readFile("/output.pdf");
    if (!output.length) throw new Error("The PDF security engine returned an empty file.");
    return output;
  } finally {
    if (qpdf) {
      for (const path of ["/input.pdf", "/output.pdf"]) {
        try { qpdf.FS.unlink(path); } catch { /* File may not exist on failure. */ }
      }
    }
    bytes.fill(0);
  }
}
