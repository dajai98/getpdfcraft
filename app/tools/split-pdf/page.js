"use client";
import { useCallback, useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { useObjectUrls } from "@/components/hooks/useObjectUrls";
import { usePdfInput } from "@/components/hooks/usePdfInput";
import { parsePageRanges } from "@/lib/splitRanges";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function SplitPDF() {
  const { beginResult, isCurrentResult, invalidateResult: invalidateSingle } = useGeneratedResult();
  const urls = useObjectUrls();
  const [downloads, setDownloads] = useState([]);
  const invalidateResult = useCallback(() => {
    invalidateSingle(); urls.clear(); setDownloads([]);
  }, [invalidateSingle, urls.clear]);
  const { file, pageCount, loading, error, setError, loadFile, resetFile } = usePdfInput(invalidateResult);
  const [mode, setMode] = useResultInput("all", invalidateResult);
  const [range, setRange] = useResultInput("", invalidateResult);
  const [processing, setProcessing] = useState(false);

  const split = async () => {
    if (!file) return;
    invalidateResult();
    const token = beginResult();
    setProcessing(true); setError("");
    const results = [];
    let published = false;
    try {
      const groups = mode === "all"
        ? Array.from({ length: pageCount }, (_, i) => ({ name: `page-${i+1}.pdf`, indices: [i] }))
        : parsePageRanges(range, pageCount);
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer());
      for (const group of groups) {
        if (!isCurrentResult(token)) return;
        const doc = await PDFDocument.create();
        (await doc.copyPages(src, group.indices)).forEach(page => doc.addPage(page));
        const bytes = await doc.save();
        if (!isCurrentResult(token)) return;
        results.push({ name: group.name, url: urls.create(new Blob([bytes], { type: "application/pdf" })) });
      }
      if (isCurrentResult(token)) { setDownloads(results); published = true; }
    } catch (e) {
      if (isCurrentResult(token)) setError(e.message || "Could not split this PDF. Select a valid PDF and try again.");
    } finally {
      if (!published) results.forEach(result => urls.retire(result.url));
      setProcessing(false);
    }
  };

  return (
    <ToolLayout tag="Split PDF" tagBg="#FFF7ED" tagColor="#EA580C"
      title="Split PDF File" desc="Extract pages or split a PDF into individual files. Free to use."
      current="/tools/split-pdf" faqs={[
  { q: "Can I split a PDF into individual pages?", a: "Yes. Select the Split All Pages option and every page becomes its own PDF file." },
  { q: "Can I extract specific pages?", a: "Yes. Use the Page Range option and enter pages like 1-3, 5, 7-10. Each range becomes a separate PDF." },
  { q: "What are the practical limits?", a: "No app-level file-size quota; practical limits depend on your device and browser. Large files or many pages may exceed available memory." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
  { q: "Does it work on mobile?", a: "Try a current browser on iPhone or Android. Compatibility and practical file limits depend on the browser, device, and document." },
]}>

      {loading && <p role="status">Reading PDF...</p>}
      {error && <p role="alert">{error}</p>}
      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>{pageCount} pages · {(file.size/1024).toFixed(0)} KB</p>
            </div>
            <button aria-label={"Remove selected file"} onClick={() => { resetFile(); setRange(""); }} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>

          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <p style={{ fontWeight: 600, color: "#374151", marginBottom: 14, fontSize: 14 }}>Split options</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { val: "all", label: "Extract all pages as individual PDFs" },
                { val: "range", label: "Extract specific page range" },
              ].map(opt => (
                <label key={opt.val} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input type="radio" name="mode" checked={mode===opt.val} onChange={() => setMode(opt.val)} style={{ accentColor: "#E8380D", width: 16, height: 16 }} />
                  <span style={{ fontSize: 14, color: "#374151" }}>{opt.label}</span>
                </label>
              ))}
              {mode === "range" && (
                <input aria-label="Pages and ranges" type="text" placeholder="e.g. 1-3, 5, 7-10" value={range} onChange={e => setRange(e.target.value)}
                  style={{ marginLeft: 26, border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", width: "calc(100% - 26px)" }} />
              )}
            </div>
          </div>

          <button onClick={split} disabled={processing} style={{
            width: "100%", background: processing ? "#d1d5db" : "#E8380D",
            color: "white", border: "none", padding: 16, borderRadius: 14,
            fontWeight: 700, fontSize: 16, cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit",
          }}>
            {processing ? "⏳ Splitting..." : "⊘ Split PDF"}
          </button>
        </div>
      )}

      {downloads.length > 0 && (
        <div style={{ marginTop: 24, border: "1px solid #f3f4f6", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
            <p style={{ fontWeight: 600, color: "#374151", fontSize: 14 }}>✅ {downloads.length} files ready</p>
          </div>
          {downloads.map((d, i) => (
            <div key={i} className="tool-row" style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < downloads.length-1 ? "1px solid #f9fafb" : "none" }}>
              <span style={{ fontSize: 22 }}>📄</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#374151" }}>{d.name}</span>
              <DownloadButton url={d.url} filename={d.name} label="Download" />
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
