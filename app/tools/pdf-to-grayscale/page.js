"use client";
import { useState, useRef, useEffect } from "react";
import { checkRasterSize, checkEncodedSize } from "@/lib/rasterLimits";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Why convert PDF to grayscale?", a: "Use this tool to create grayscale page images in a PDF. The output may be larger than the original." },
  { q: "What does the conversion preserve?", a: "It renders visible pages as grayscale JPEG images at the displayed physical page size. Rendering and JPEG encoding can change detail; searchable text, interactive links, forms, bookmarks, digital signatures and other PDF semantics are not preserved." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
  { q: "What are the practical limits?", a: "No app-level file-size quota; practical limits depend on your device and browser. Large files or many pages may exceed available memory." },
];

export default function PDFToGrayscale() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult, isCurrentResult } = useGeneratedResult();
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const activeTask = useRef(null);
  const cancelTask = () => {
    const task = activeTask.current;
    activeTask.current = null;
    if (task) void task.destroy().catch(() => {});
  };
  const reset = () => { invalidateResult(); cancelTask(); setProcessing(false); setProgress(0); setError(""); };
  const [file, setFile] = useResultInput(null, reset);
  useEffect(() => cancelTask, []);

  const loadFile = (files) => { setFile(files[0]); setError(""); };

  const convert = async () => {
    if (!file || typeof window === "undefined") return;
    cancelTask();
    const resultVersion = beginResult();
    setProcessing(true); setProgress(0); setError("");
    let loadingTask;
    let canvas;
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const { PDFDocument } = await import("pdf-lib");

      const bytes = await file.arrayBuffer();
      if (!isCurrentResult(resultVersion)) return;
      loadingTask = pdfjsLib.getDocument({ data: bytes, stopAtErrors: true });
      activeTask.current = loadingTask;
      const pdf = await loadingTask.promise;
      if (!isCurrentResult(resultVersion)) return;
      const newDoc = await PDFDocument.create();
      let encodedBytes = 0;

      for (let i = 1; i <= pdf.numPages; i++) {
        if (!isCurrentResult(resultVersion)) return;
        const page = await pdf.getPage(i);
        // PDF.js 4.4 viewports use PDF coordinates; UserUnit converts these to points.
        const physical = page.getViewport({ scale: page.userUnit });
        const viewport = page.getViewport({ scale: 1.5 * page.userUnit });
        checkRasterSize(viewport);
        canvas = document.createElement("canvas");
        canvas.width = viewport.width; canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx || !canvas.width || !canvas.height) throw new Error("Canvas unavailable");
        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!isCurrentResult(resultVersion)) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let j = 0; j < data.length; j += 4) {
          const gray = 0.299 * data[j] + 0.587 * data[j+1] + 0.114 * data[j+2];
          data[j] = data[j+1] = data[j+2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        if (!dataUrl.startsWith("data:image/jpeg")) throw new Error("Page image could not be encoded");
        const jpgBytes = await fetch(dataUrl).then(r => r.arrayBuffer());
        if (!isCurrentResult(resultVersion)) return;
        encodedBytes += jpgBytes.byteLength;
        checkEncodedSize(encodedBytes);
        const img = await newDoc.embedJpg(jpgBytes);
        const newPage = newDoc.addPage([physical.width, physical.height]);
        newPage.drawImage(img, { x: 0, y: 0, width: physical.width, height: physical.height });
        canvas.width = canvas.height = 0;
        page.cleanup();
        if (isCurrentResult(resultVersion)) setProgress(Math.round((i / pdf.numPages) * 100));
      }

      const blob = new Blob([await newDoc.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob), resultVersion);
    } catch(e) {
      if (isCurrentResult(resultVersion)) setError(e.name === "RasterLimitError" ? e.message : e.name === "PasswordException"
        ? "This PDF requires a password. Unlock it with the correct password before converting."
        : "Conversion could not complete. The PDF may be invalid, the rendering engine may not have loaded, or this browser may have insufficient memory. No partial PDF was generated. Try a smaller PDF or another browser.");
    } finally {
      if (canvas) canvas.width = canvas.height = 0;
      try { await loadingTask?.destroy(); } catch { /* Preserve the conversion result/error. */ }
      if (activeTask.current === loadingTask) activeTask.current = null;
      if (isCurrentResult(resultVersion)) setProcessing(false);
    }
  };

  return (
    <ToolLayout tag="PDF to Grayscale" tagBg="#F9FAFB" tagColor="#374151"
      title="PDF to Grayscale" desc="Convert PDF pages to grayscale images in a PDF, keeping their displayed physical page size."
      current="/tools/pdf-to-grayscale" faqs={faqs}>

      <p role="note">Pages are rasterized as JPEG images. Searchable text, links, forms, bookmarks, digital signatures and other PDF semantics are not preserved. Output may be larger than the original. Keep your original file.</p>
      <p>Rendering limits: 16 million pixels per page, 16,384 pixels per side and 128 MiB of encoded page images. Your browser may run out of memory sooner.</p>
      {error && <p role="alert">{error}</p>}

      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p></div>
            <button aria-label={"Remove selected file"} onClick={() => { setFile(null); }} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <button onClick={convert} disabled={processing} style={{ width: "100%", background: processing?"#d1d5db":"#C92F0A", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing?"not-allowed":"pointer", fontFamily: "inherit" }}>
            {processing ? `⏳ Converting... ${progress}%` : "◑ Convert to Grayscale"}
          </button>
          {processing && (
            <div role="progressbar" aria-label="Conversion progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} style={{ marginTop: 12, background: "#f3f4f6", borderRadius: 100, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#E8380D", borderRadius: 100, transition: "width 0.3s" }} />
            </div>
          )}
        </div>
      )}

      {downloadUrl && (
        <div role="status" style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div><p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Converted to grayscale!</p></div>
          </div>
          <DownloadButton url={downloadUrl} filename="grayscale.pdf" label="Download Grayscale PDF" />
        </div>
      )}
    </ToolLayout>
  );
}
