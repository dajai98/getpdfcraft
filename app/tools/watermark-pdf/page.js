"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { watermarkPlacement } from "@/lib/pageGeometry";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function WatermarkPDF() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult } = useGeneratedResult();
  const [file, setFile] = useResultInput(null, invalidateResult);
  const [text, setText] = useResultInput("CONFIDENTIAL", invalidateResult);
  const [opacity, setOpacity] = useResultInput(0.3, invalidateResult);
  const [processing, setProcessing] = useState(false);

  const apply = async () => {
    if (!file || !text) return;
    const resultVersion = beginResult();
    setProcessing(true);
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      doc.getPages().forEach(page => {
        const { angle, ...placement } = watermarkPlacement(page, font, text);
        page.drawText(text, { ...placement, rotate: degrees(angle), font, color: rgb(0.5,0.5,0.5), opacity });
      });
      setDownloadUrl(URL.createObjectURL(new Blob([await doc.save()], { type: "application/pdf" })), resultVersion);
    } catch(e) { alert("Error adding watermark."); }
    setProcessing(false);
  };

  return (
    <ToolLayout tag="Watermark PDF" tagBg="#FAF5FF" tagColor="#9333EA"
      title="Add Watermark to PDF" desc="Stamp your PDF with a custom text watermark. Free and private."
      current="/tools/watermark-pdf" faqs={[
  { q: "Can I use any text for the watermark?", a: "Yes. Type text supported by the built-in font such as CONFIDENTIAL, DRAFT, your name, or company name." },
  { q: "Can I remove a watermark from a PDF?", a: "PDFcraft does not remove watermarks. Watermark removal requires specialized software." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
  { q: "Will the watermark print?", a: "The watermark is drawn into each page's visible content. Review the output before printing." },
]}>

      {!file ? <UploadZone onFiles={f => { setFile(f[0]); }} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p></div>
            <button aria-label={"Remove selected file"} onClick={() => { setFile(null); }} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label htmlFor="watermark-pdf-field-1" style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Watermark text</label>
              <input id="watermark-pdf-field-1" type="text" value={text} onChange={e => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" }} />
            </div>
            <div>
              <label htmlFor="watermark-pdf-field-2" style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Opacity: {Math.round(opacity*100)}%</label>
              <input id="watermark-pdf-field-2" type="range" min="0.1" max="0.8" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#E8380D" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                <span>Light</span><span>Strong</span>
              </div>
            </div>
          </div>
          <button onClick={apply} disabled={processing || !text} style={{
            width: "100%", background: (processing||!text) ? "#d1d5db" : "#E8380D",
            color: "white", border: "none", padding: 16, borderRadius: 14,
            fontWeight: 700, fontSize: 16, cursor: (processing||!text) ? "not-allowed" : "pointer", fontFamily: "inherit",
          }}>
            {processing ? "⏳ Adding watermark..." : "✎ Add Watermark"}
          </button>
        </div>
      )}

      {downloadUrl && (
        <div role="status" style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div><p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Watermark added!</p><p style={{ fontSize: 13, color: "#6b7280" }}>Text &quot;{text}&quot; applied to all pages.</p></div>
          </div>
          <DownloadButton url={downloadUrl} filename="watermarked.pdf" label="Download watermarked.pdf" />
        </div>
      )}
    </ToolLayout>
  );
}
