"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Is merging PDFs on PDFcraft really free?", a: "Yes, completely free. No hidden fees, no premium plan needed. All tools on PDFcraft are free forever with no limits." },
  { q: "Are my files safe when I merge PDFs?", a: "Absolutely. PDFcraft processes files entirely in your browser. Your PDF files never leave your device and are never uploaded to any server. We physically cannot see your documents." },
  { q: "Is there a file size limit for merging?", a: "There is no strict file size limit. Very large files may be slow depending on your device memory, but there is no artificial cap set by us." },
  { q: "How many PDFs can I merge at once?", a: "As many as you want. Add unlimited files — there is no restriction on the number of PDFs you can merge." },
  { q: "Does it work on iPhone and Android?", a: "Yes. PDFcraft works on any device with a modern browser including iPhone Safari and Android Chrome." },
  { q: "Will the quality of my PDF change after merging?", a: "No. PDFcraft merges PDFs without re-encoding or compressing them. The output quality is identical to the originals." },
];

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const addFiles = (f) => { setFiles(p => [...p, ...f]); setDownloadUrl(null); };
  const removeFile = (i) => setFiles(files.filter((_, j) => j !== i));

  const merge = async () => {
    if (files.length < 2) return alert("Please add at least 2 PDF files.");
    setProcessing(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const doc = await PDFDocument.load(await file.arrayBuffer());
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      const blob = new Blob([await merged.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch(e) { alert("Error merging. Make sure files are not password protected."); }
    setProcessing(false);
  };

  return (
    <ToolLayout tag="Merge PDF" tagBg="#FEF2F2" tagColor="#DC2626"
      title="Merge PDF Files" desc="Combine multiple PDFs into one file. Free, instant, and 100% private."
      current="/tools/merge-pdf" faqs={faqs}>

      <UploadZone onFiles={addFiles} multiple label="Drop PDFs here or click to browse" />

      {files.length > 0 && (
        <div style={{ marginTop: 20, border: "1px solid #f3f4f6", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", background: "#f9fafb" }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{files.length} file{files.length > 1 ? "s" : ""} selected</span>
            <button onClick={() => { setFiles([]); setDownloadUrl(null); }} style={{ fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>Clear all</button>
          </div>
          {files.map((f, i) => (
            <div key={i} style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < files.length-1 ? "1px solid #f9fafb" : "none" }}>
              <span style={{ fontSize: 22 }}>📄</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>{(f.size/1024).toFixed(0)} KB</p>
              </div>
              <button onClick={() => removeFile(i)} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: "4px 8px" }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {files.length >= 2 && !downloadUrl && (
        <button onClick={merge} disabled={processing} style={{ marginTop: 20, width: "100%", background: processing ? "#d1d5db" : "#E8380D", color: "white", border: "none", padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
          {processing ? "⏳ Merging your PDFs..." : `⊕ Merge ${files.length} PDFs`}
        </button>
      )}

      {downloadUrl && (
        <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div>
              <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>merged.pdf is ready!</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>Your PDFs have been merged successfully.</p>
            </div>
          </div>
          <DownloadButton url={downloadUrl} filename="merged.pdf" label="Download merged.pdf" />
        </div>
      )}
    </ToolLayout>
  );
}
