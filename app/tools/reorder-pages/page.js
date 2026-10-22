"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { usePdfInput } from "@/components/hooks/usePdfInput";
import { pdfInputError } from "@/lib/pdfInput";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "How do I reorder pages?", a: "Use the Move Up and Move Down buttons next to each page to rearrange them in the order you want." },
  { q: "Can I move a page to any position?", a: "Yes. Keep clicking Move Up or Move Down to move a page to any position in the document." },
  { q: "What are the practical limits?", a: "No app-level file-size quota; practical limits depend on your device and browser. Large files or many pages may exceed available memory." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
  { q: "Is the original file changed?", a: "No. PDFcraft creates a new reordered file. Your original PDF is not affected." },
];

export default function ReorderPages() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult } = useGeneratedResult();
  const { file, loading, error, setError, loadFile: readFile, resetFile } = usePdfInput(invalidateResult);
  const [order, setOrder] = useResultInput([], invalidateResult);
  const [processing, setProcessing] = useState(false);

  const loadFile = async files => { setOrder([]); const count = await readFile(files); if (count !== null) setOrder(Array.from({ length: count }, (_, i) => i)); };

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
    if (!file) return;
    const resultVersion = beginResult();
    setError("");
    setProcessing(true);
    try {
      const { copyPagesWithNavigation } = await import("@/lib/copyPdfPagesSafe");
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer());
      const blob = new Blob([await copyPagesWithNavigation([{ doc: src, order }])], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob), resultVersion);
    } catch(e) { setError(e.code === "PDF_NAVIGATION" ? e.message : pdfInputError(e)); }
    setProcessing(false);
  };

  return (
    <ToolLayout
      tag="Reorder Pages" tagBg="#FAF5FF" tagColor="#9333EA"
      title="Reorder PDF Pages" desc="Rearrange pages in any order you want. Free to use. Files are processed locally. No sign up needed."
      current="/tools/reorder-pages" faqs={faqs}
    >
      {loading && <p role="status">Reading PDF...</p>}
      {error && <p role="alert">{error}</p>}
      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>{order.length} pages</p>
            </div>
            <button aria-label={"Remove selected file"} onClick={() => { resetFile(); setOrder([]);  }} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>

          <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 12 }}>Use Move Up and Move Down to reorder pages:</p>

          <div style={{ border: "1px solid #f3f4f6", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            {order.map((originalIndex, currentPos) => (
              <div key={originalIndex} className="tool-row" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: currentPos < order.length - 1 ? "1px solid #f9fafb" : "none", background: "white", transition: "background 0.15s" }}>
                <span style={{ fontSize: 18, color: "#6b7280" }}>⠿</span>
                <div style={{ width: 36, height: 44, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>
                  {originalIndex + 1}
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Page {originalIndex + 1}
                  {currentPos !== originalIndex && <span style={{ fontSize: 12, color: "#9333EA", marginLeft: 8, fontWeight: 600 }}>→ position {currentPos + 1}</span>}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button aria-label={`Move page ${originalIndex+1} up`} onClick={() => moveUp(currentPos)} disabled={currentPos === 0}
                    style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", color: currentPos === 0 ? "#e5e7eb" : "#374151", cursor: currentPos === 0 ? "not-allowed" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
                  <button aria-label={`Move page ${originalIndex+1} down`} onClick={() => moveDown(currentPos)} disabled={currentPos === order.length - 1}
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
        <div role="status" style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
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
