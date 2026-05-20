"use client";
import { useState } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function WatermarkPDF() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const apply = async () => {
    if (!file || !text) return;
    setProcessing(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      doc.getPages().forEach(page => {
        const { width, height } = page.getSize();
        const size = Math.min(width, height) * 0.08;
        page.drawText(text, { x: width/2 - font.widthOfTextAtSize(text,size)/2, y: height/2, size, font, color: rgb(0.5,0.5,0.5), opacity, rotate: degrees(45) });
      });
      setDownloadUrl(URL.createObjectURL(new Blob([await doc.save()], { type: "application/pdf" })));
    } catch(e) { alert("Error adding watermark."); }
    setProcessing(false);
  };

  return (
    <ToolLayout tag="Watermark PDF" tagBg="#FAF5FF" tagColor="#9333EA"
      title="Add Watermark to PDF" desc="Stamp your PDF with a custom text watermark. Free and private."
      current="/tools/watermark-pdf" faqs={[
  { q: "Can I use any text for the watermark?", a: "Yes. Type any text you want such as CONFIDENTIAL, DRAFT, your name, or company name." },
  { q: "Can I remove a watermark from a PDF?", a: "PDFcraft does not remove watermarks. Watermark removal requires specialized software." },
  { q: "Are my files safe?", a: "Yes. Watermarks are added locally in your browser. Files never leave your device." },
  { q: "Will the watermark print?", a: "Yes. The watermark is embedded in the PDF and will appear when printed." },
]}>

      {!file ? <UploadZone onFiles={f => { setFile(f[0]); setDownloadUrl(null); }} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p></div>
            <button onClick={() => { setFile(null); setDownloadUrl(null); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Watermark text</label>
              <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
                style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Opacity: {Math.round(opacity*100)}%</label>
              <input type="range" min="0.1" max="0.8" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#E8380D" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
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
        <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div><p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Watermark added!</p><p style={{ fontSize: 13, color: "#6b7280" }}>Text "{text}" applied to all pages.</p></div>
          </div>
          <DownloadButton url={downloadUrl} filename="watermarked.pdf" label="Download watermarked.pdf" />
        </div>
      )}
    </ToolLayout>
  );
}
