"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "How do I reorder pages?", a: "Use the Move Up and Move Down buttons next to each page to rearrange them in the order you want." },
  { q: "Can I move a page to any position?", a: "Yes. Keep clicking Move Up or Move Down to move a page to any position in the document." },
  { q: "Is there a limit on pages?", a: "No. You can reorder PDFs of any length." },
  { q: "Are my files safe?", a: "Yes. Reordering happens locally in your browser. Files never leave your device." },
  { q: "Is the original file changed?", a: "No. PDFcraft creates a new reordered file. Your original PDF is not affected." },
];

export default function ReorderPages() {
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const loadFile = async (files) => {
    const f = files[0]; setFile(f); setDownloadUrl(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setOrder(Array.from({ length: doc.getPageCount() }, (_, i) => i));
  };

  const moveUp = (i) => {
    if (i === 0) return;
    const newOrder = [...order];
    [newOrder[i-1], newOrder[i]] = [newOrder[i], newOrder[i-1]];
    setOrder(newOrder);
  };

  const moveDown = (i) => {
    if (i === order.length - 1) return;
    const newOrder = [...order];
    [newOrder[i], newOrder[i+1]] = [newOrder[i+1], newOrder[i]];
    setOrder(newOrder);
  };

  const reorder = async () => {
    setProcessing(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const doc = await PDFDocument.create();
      const pages = await doc.copyPages(src, order);
      pages.forEach(p => doc.addPage(p));
      const blob = new Blob([await doc.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch(e) { alert("Error reordering pages."); }
    setProcessing(false);
  };

  return (
    <ToolLayout
      tag="Reorder Pages" tagBg="#FAF5FF" tagColor="#9333EA"
      title="Reorder PDF Pages" desc="Rearrange pages in any order you want. Free, instant, private. No sign up needed."
      current="/tools/reorder-pages" faqs={faqs}
    >
      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{order.length} pages</p>
            </div>
            <button onClick={() => { setFile(null); setOrder([]); setDownloadUrl(null); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>

          <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 12 }}>Drag to reorder pages:</p>

          <div style={{ border: "1px solid #f3f4f6", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            {order.map((originalIndex, currentPos) => (
              <div key={originalIndex} style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: currentPos < order.length - 1 ? "1px solid #f9fafb" : "none", background: "white", transition: "background 0.15s" }}>
                <span style={{ fontSize: 18, color: "#d1d5db" }}>⠿</span>
                <div style={{ width: 36, height: 44, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#9ca3af", flexShrink: 0 }}>
                  {originalIndex + 1}
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Page {originalIndex + 1}
                  {currentPos !== originalIndex && <span style={{ fontSize: 12, color: "#9333EA", marginLeft: 8, fontWeight: 600 }}>→ position {currentPos + 1}</span>}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => moveUp(currentPos)} disabled={currentPos === 0}
                    style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", color: currentPos === 0 ? "#e5e7eb" : "#374151", cursor: currentPos === 0 ? "not-allowed" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
                  <button onClick={() => moveDown(currentPos)} disabled={currentPos === order.length - 1}
                    style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", color: currentPos === order.length - 1 ? "#e5e7eb" : "#374151", cursor: currentPos === order.length - 1 ? "not-allowed" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>↓</button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={reorder} disabled={processing} style={{ width: "100%", background: processing ? "#d1d5db" : "#E8380D", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {processing ? "⏳ Reordering..." : "↕ Save New Order"}
          </button>
        </div>
      )}

      {downloadUrl && (
        <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Pages reordered!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>Your PDF has been saved with the new page order.</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="reordered.pdf" label="Download PDF" />
        </div>
      )}
    </ToolLayout>
  );
}
