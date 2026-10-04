"use client";
import { useState, useRef } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { readSupportedImage } from "@/lib/imageInput";
import { useObjectUrls } from "@/components/hooks/useObjectUrls";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Which image formats does PDFcraft support?", a: "PDFcraft supports JPEG/JPG and PNG images. Other image formats are not supported." },
  { q: "Can I combine multiple images into one PDF?", a: "Selected images become one PDF page each. The practical number of images depends on available browser memory." },
  { q: "Can I control the order of images?", a: "Yes. Images appear in the order you add them. Remove and re-add to change the order." },
  { q: "What are the practical limits?", a: "No app-level file-size quota; practical limits depend on your device and browser. Large files or many pages may exceed available memory." },
  { q: "Are my images safe?", a: "Images are processed locally in your browser; this tool does not upload images to a processing server." },
  { q: "Will the PDF quality match the original image?", a: "JPEG data is embedded without image recompression; PNG data is decoded and embedded in the PDF. Review the result for your intended use." },
];

export default function JPGtoPDF() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult } = useGeneratedResult();
  const [images, setImages] = useResultInput([], invalidateResult);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef(null);
  const previews = useObjectUrls();
  const selectionVersion = useRef(0);
  const [validating, setValidating] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    const version = ++selectionVersion.current;
    invalidateResult();
    setValidating(true);
    try {
      for (const file of files) await readSupportedImage(file);
      if (version !== selectionVersion.current) return;
      const additions = files.map(file => ({ file, url: previews.create(file), name: file.name }));
      setImages(previous => [...previous, ...additions]);
    } catch (e) {
      if (version === selectionVersion.current) alert(e.message);
    } finally {
      if (version === selectionVersion.current) setValidating(false);
    }
  };

  const removeImage = (i) => {
    selectionVersion.current += 1;
    setValidating(false);
    previews.retire(images[i].url);
    setImages(images.filter((_, j) => j !== i));
  };

  const convert = async () => {
    if (images.length === 0) return alert("Please add at least one image.");
    const resultVersion = beginResult();
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const img of images) {
        const { bytes, type } = await readSupportedImage(img.file);
        const embedded = type === "png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([embedded.width, embedded.height]);
        page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
      }
      const blob = new Blob([await doc.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob), resultVersion);
    } catch(e) {
      console.error(e);
      alert("Error converting images. Make sure files are valid images.");
    }
    setProcessing(false);
  };

  return (
    <ToolLayout
      tag="JPG to PDF" tagBg="#FEF2F2" tagColor="#DC2626"
      title="JPG to PDF" desc="Convert images to PDF in your browser. JPEG/JPG and PNG supported. Free, no watermark, no sign up."
      current="/tools/jpg-to-pdf" faqs={faqs}
    >
      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        style={{ border: "2px dashed #e5e7eb", borderRadius: 16, padding: "clamp(24px, 5vw, 40px) 16px", textAlign: "center", cursor: "pointer", background: "#f9fafb", transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#E8380D"; e.currentTarget.style.background = "#FEF2F2"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const dt = e.dataTransfer; if (dt.files) { const fakeEvent = { target: { files: dt.files, value: "" } }; handleFiles(fakeEvent); } }}
      >
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple onChange={handleFiles} style={{ display: "none" }} />
        <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
        <p style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 8 }}>Drop images here or click to browse</p>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>JPEG/JPG and PNG supported</p>
        <button type="button" style={{ background: "#E8380D", color: "white", border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          Select Images
        </button>
      </div>

      {validating && <p role="status">Checking JPEG/PNG images...</p>}

      {/* Image preview grid */}
      {images.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontWeight: 600, color: "#374151", fontSize: 14 }}>{images.length} image{images.length > 1 ? "s" : ""} selected</p>
            <button onClick={() => { selectionVersion.current += 1; setValidating(false); previews.clear(); setImages([]); }} style={{ fontSize: 12, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>Clear all</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12, marginBottom: 24 }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid #f3f4f6", background: "#f9fafb" }}>
                <img src={img.url} alt={img.name} style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "6px 8px", fontSize: 10, color: "#6b7280", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.name}</div>
                <button aria-label={`Remove ${img.name}`} onClick={() => removeImage(i)} style={{ position: "absolute", top: 6, right: 6, width: 32, height: 32, background: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>✕</button>
              </div>
            ))}
          </div>

          <button onClick={convert} disabled={processing || validating} style={{ width: "100%", background: processing ? "#d1d5db" : "#E8380D", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {processing ? "⏳ Converting..." : `🖼️ Convert ${images.length} Image${images.length > 1 ? "s" : ""} to PDF`}
          </button>
        </div>
      )}

      {downloadUrl && (
        <div role="status" style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>PDF is ready!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{images.length} image{images.length > 1 ? "s" : ""} converted successfully.</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="images.pdf" label="Download PDF" />
        </div>
      )}
    </ToolLayout>
  );
}
