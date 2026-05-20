"use client";
import { useState } from "react";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Why convert PDF to grayscale?", a: "Grayscale PDFs are smaller, cheaper to print, and required by some publishers and institutions." },
  { q: "Will text quality be affected?", a: "Text remains sharp. The conversion affects the visual rendering of color elements." },
  { q: "Are my files safe?", a: "Yes. Everything is processed locally in your browser. Files never leave your device." },
  { q: "Is there a page limit?", a: "No. You can convert PDFs of any length to grayscale." },
];

export default function PDFToGrayscale() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const loadFile = (files) => { setFile(files[0]); setDownloadUrl(null); };

  const convert = async () => {
    if (typeof window === "undefined") return;
    setProcessing(true); setProgress(0);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const { PDFDocument } = await import("pdf-lib");

      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const newDoc = await PDFDocument.create();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width; canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let j = 0; j < data.length; j += 4) {
          const gray = 0.299 * data[j] + 0.587 * data[j+1] + 0.114 * data[j+2];
          data[j] = data[j+1] = data[j+2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);

        const jpgBytes = await fetch(canvas.toDataURL("image/jpeg", 0.9)).then(r => r.arrayBuffer());
        const img = await newDoc.embedJpg(jpgBytes);
        const newPage = newDoc.addPage([viewport.width, viewport.height]);
        newPage.drawImage(img, { x: 0, y: 0, width: viewport.width, height: viewport.height });
        setProgress(Math.round((i / pdf.numPages) * 100));
      }

      const blob = new Blob([await newDoc.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch(e) { console.error(e); alert("Error converting to grayscale."); }
    setProcessing(false);
  };

  return (
    <ToolLayout tag="PDF to Grayscale" tagBg="#F9FAFB" tagColor="#374151"
      title="PDF to Grayscale" desc="Convert color PDFs to black and white. Perfect for printing and reducing file size."
      current="/tools/pdf-to-grayscale" faqs={faqs}>

      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p></div>
            <button onClick={() => { setFile(null); setDownloadUrl(null); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <button onClick={convert} disabled={processing} style={{ width: "100%", background: processing?"#d1d5db":"#E8380D", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing?"not-allowed":"pointer", fontFamily: "inherit" }}>
            {processing ? `⏳ Converting... ${progress}%` : "◑ Convert to Grayscale"}
          </button>
          {processing && (
            <div style={{ marginTop: 12, background: "#f3f4f6", borderRadius: 100, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#E8380D", borderRadius: 100, transition: "width 0.3s" }} />
            </div>
          )}
        </div>
      )}

      {downloadUrl && (
        <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
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
