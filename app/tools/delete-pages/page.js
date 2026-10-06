"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { usePdfInput } from "@/components/hooks/usePdfInput";
import { pdfInputError } from "@/lib/pdfInput";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Can I delete multiple pages at once?", a: "Yes. Select as many pages as you want to delete and they will all be removed in one go." },
  { q: "Does this securely erase page content?", a: "No. This tool removes pages from the visible document structure. Removed content may remain recoverable in PDF objects. It is not a secure redaction or sanitization tool." },
  { q: "Can I preview pages before deleting?", a: "The tool shows page numbers for selection, not page thumbnails. Check the original in a PDF viewer before choosing pages." },
  { q: "Is the original file changed?", a: "No. PDFcraft creates a new file with the pages removed. Your original PDF is not affected." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
  { q: "What if I delete the wrong page?", a: "Simply upload the original file again and start over. The original is never modified." },
];

export default function DeletePages() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult } = useGeneratedResult();
  const { file, pageCount, loading, error, setError, loadFile: readFile, resetFile } = usePdfInput(invalidateResult);
  const [selected, setSelected] = useResultInput(new Set(), invalidateResult);
  const [processing, setProcessing] = useState(false);

  const loadFile = async files => { setSelected(new Set()); await readFile(files); };

  const toggle = (i) => {
    const s = new Set(selected);
    s.has(i) ? s.delete(i) : s.add(i);
    setSelected(s);
  };

  const deletePages = async () => {
    if (selected.size === 0) return alert("Please select at least one page to delete.");
    if (selected.size === pageCount) return alert("You cannot delete all pages. At least one page must remain.");
    if (!file) return;
    const resultVersion = beginResult();
    setError("");
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      // Remove pages in reverse order to preserve indices
      const toDelete = Array.from(selected).sort((a, b) => b - a);
      toDelete.forEach(i => doc.removePage(i));
      const blob = new Blob([await doc.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob), resultVersion);
    } catch(e) { setError(pdfInputError(e)); }
    setProcessing(false);
  };

  return (
    <ToolLayout
      tag="Delete Pages" tagBg="#FEF2F2" tagColor="#DC2626"
      title="Delete PDF Pages" desc="Remove unwanted pages from the visible PDF document. Local processing; not secure redaction."
      current="/tools/delete-pages" faqs={faqs}
    >
      <p role="note">This removes pages from the visible document structure. Removed content may remain recoverable. Do not use this tool for secure redaction or sanitization.</p>

      {loading && <p role="status">Reading PDF...</p>}
      {error && <p role="alert">{error}</p>}
      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>{pageCount} pages</p>
            </div>
            <button aria-label={"Remove selected file"} onClick={() => { resetFile(); setSelected(new Set());  }} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>

          <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 12 }}>
            Select pages to delete ({selected.size} selected)
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: 8, marginBottom: 24 }}>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} aria-label={`Page ${i+1}`} aria-pressed={selected.has(i)} onClick={() => toggle(i)} style={{
                padding: "12px 8px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                border: `2px solid ${selected.has(i) ? "#E8380D" : "#e5e7eb"}`,
                background: selected.has(i) ? "#FEF2F2" : "white",
                color: selected.has(i) ? "#DC2626" : "#374151",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                position: "relative",
              }}>
                {selected.has(i) && <span style={{ position: "absolute", top: 3, right: 4, fontSize: 10, color: "#DC2626" }}>✕</span>}
                {i + 1}
              </button>
            ))}
          </div>

          {selected.size > 0 && (
            <div style={{ background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#DC2626", fontWeight: 500 }}>
              ⚠️ Pages {Array.from(selected).sort((a,b) => a-b).map(i => i+1).join(", ")} will be removed from the visible document.
            </div>
          )}

          <button onClick={deletePages} disabled={processing || selected.size === 0} style={{
            width: "100%", background: (processing || selected.size === 0) ? "#d1d5db" : "#E8380D",
            color: "white", border: "none", padding: 16, borderRadius: 14,
            fontWeight: 700, fontSize: 16, cursor: (processing || selected.size === 0) ? "not-allowed" : "pointer", fontFamily: "inherit",
          }}>
            {processing ? "⏳ Deleting pages..." : `🗑️ Delete ${selected.size} Page${selected.size !== 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {downloadUrl && (
        <div role="status" style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Pages deleted!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{selected.size} page{selected.size !== 1 ? "s" : ""} removed. {pageCount - selected.size} pages remaining.</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="edited.pdf" label="Download PDF" />
        </div>
      )}
    </ToolLayout>
  );
}
