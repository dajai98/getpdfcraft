"use client";
import { useState } from "react";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";

const faqs = [
  { q: "Which is better JPG or PNG?", a: "JPG is smaller and great for photos. PNG is lossless and better for text documents and diagrams." },
  { q: "What resolution are the output images?", a: "PDFcraft renders at 2x scale for high quality output. Images are sharp and suitable for printing." },
  { q: "Is there a watermark on the output images?", a: "No. PDFcraft never adds watermarks to your output files." },
  { q: "Are my files safe?", a: "Yes. PDF rendering happens entirely in your browser. Nothing is uploaded." },
  { q: "Can I convert just one page?", a: "All pages are converted. You can then download only the specific page images you need." },
];

export default function PDFToImage() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [images, setImages] = useState([]);
  const [format, setFormat] = useState("jpeg");
  const [progress, setProgress] = useState(0);

  const loadFile = (files) => { setFile(files[0]); setImages([]); };

  const convert = async () => {
    if (!file) return;
    if (typeof window === "undefined") return;
    setProcessing(true); setImages([]); setProgress(0);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const results = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        results.push({ dataUrl: canvas.toDataURL(`image/${format}`, 0.92), name: `page-${i}.${format === "jpeg" ? "jpg" : "png"}` });
        setProgress(Math.round((i / pdf.numPages) * 100));
      }
      setImages(results);
    } catch(e) {
      console.error(e);
      alert("Error converting PDF. Please try a different file.");
    }
    setProcessing(false);
  };

  return (
    <ToolLayout tag="PDF to Image" tagBg="#F0FDF4" tagColor="#16A34A"
      title="PDF to Image" desc="Convert every PDF page to JPG or PNG. High quality, free, no watermark."
      current="/tools/pdf-to-image" faqs={faqs}>

      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p><p style={{ fontSize: 12, color: "#9ca3af" }}>{(file.size/1024).toFixed(0)} KB</p></div>
            <button onClick={() => { setFile(null); setImages([]); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 12 }}>Output format</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["jpeg","png"].map(f => (
                <button key={f} onClick={() => setFormat(f)} style={{ padding: "10px 28px", borderRadius: 10, fontWeight: 600, fontSize: 14, border: `1.5px solid ${format===f?"#E8380D":"#e5e7eb"}`, background: format===f?"#E8380D":"white", color: format===f?"white":"#6b7280", cursor: "pointer", fontFamily: "inherit" }}>{f.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <button onClick={convert} disabled={processing} style={{ width: "100%", background: processing?"#d1d5db":"#E8380D", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing?"not-allowed":"pointer", fontFamily: "inherit" }}>
            {processing ? `⏳ Converting... ${progress}%` : "◈ Convert to Images"}
          </button>
          {processing && (
            <div style={{ marginTop: 12, background: "#f3f4f6", borderRadius: 100, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#E8380D", borderRadius: 100, transition: "width 0.3s" }} />
            </div>
          )}
        </div>
      )}

      {images.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontWeight: 700, color: "#111827" }}>✅ {images.length} images ready</p>
            <button onClick={() => images.forEach(img => { const a = document.createElement("a"); a.href=img.dataUrl; a.download=img.name; a.click(); })}
              style={{ background: "#E8380D", color: "white", border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              ↓ Download All
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
            {images.map((img, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 12, overflow: "hidden" }}>
                <img src={img.dataUrl} alt={`Page ${i+1}`} style={{ width: "100%", display: "block" }} />
                <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>Page {i+1}</span>
                  <a href={img.dataUrl} download={img.name} style={{ fontSize: 12, fontWeight: 700, color: "#E8380D", textDecoration: "none" }}>↓</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
