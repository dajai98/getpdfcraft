"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function RotatePDF() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult } = useGeneratedResult();
  const [file, setFile] = useResultInput(null, invalidateResult);
  const [rotation, setRotation] = useResultInput(90, invalidateResult);
  const [processing, setProcessing] = useState(false);

  const rotate = async () => {
    const resultVersion = beginResult();
    setProcessing(true);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      doc.getPages().forEach(p => p.setRotation(degrees((p.getRotation().angle + rotation) % 360)));
      setDownloadUrl(URL.createObjectURL(new Blob([await doc.save()], { type: "application/pdf" })), resultVersion);
    } catch(e) { alert("Error rotating PDF."); }
    setProcessing(false);
  };

  const options = [{ val: 90, label: "↻ 90° Right" }, { val: 180, label: "↕ 180°" }, { val: 270, label: "↺ 90° Left" }];

  return (
    <ToolLayout tag="Rotate PDF" tagBg="#EFF6FF" tagColor="#2563EB"
      title="Rotate PDF Pages" desc="Fix page orientation in your browser. All pages rotated together."
      current="/tools/rotate-pdf" faqs={[
  { q: "Can I rotate just one page?", a: "This tool rotates all pages together; it does not offer individual page selection." },
  { q: "What rotation angles are available?", a: "You can rotate 90 degrees right, 180 degrees, or 90 degrees left which is 270 degrees." },
  { q: "Will rotating affect the PDF quality?", a: "Rotation changes page orientation without re-encoding page content. Keep your original; rewriting a PDF can affect signatures and document-level features." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
]}>

      {!file ? <UploadZone onFiles={f => { setFile(f[0]); }} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p></div>
            <button aria-label={"Remove selected file"} onClick={() => { setFile(null); }} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 12 }}>Rotation angle</p>
            <div style={{ display: "flex", gap: 10 }}>
              {options.map(o => (
                <button key={o.val} aria-pressed={rotation === o.val} onClick={() => setRotation(o.val)} style={{
                  flex: 1, padding: "12px 8px", borderRadius: 10, fontWeight: 600, fontSize: 14,
                  border: `1.5px solid ${rotation===o.val?"#E8380D":"#e5e7eb"}`,
                  background: rotation===o.val ? "#E8380D" : "white",
                  color: rotation===o.val ? "white" : "#6b7280",
                  cursor: "pointer", fontFamily: "inherit",
                }}>{o.label}</button>
              ))}
            </div>
          </div>
          <button onClick={rotate} disabled={processing} style={{
            width: "100%", background: processing ? "#d1d5db" : "#E8380D",
            color: "white", border: "none", padding: 16, borderRadius: 14,
            fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit",
          }}>
            {processing ? "⏳ Rotating..." : `↻ Rotate ${rotation}°`}
          </button>
        </div>
      )}

      {downloadUrl && (
        <div role="status" style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Rotation complete!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>All pages rotated by {rotation}°</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="rotated.pdf" label="Download rotated.pdf" />
        </div>
      )}
    </ToolLayout>
  );
}
