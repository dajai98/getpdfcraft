"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState("all");
  const [range, setRange] = useState("");
  const [processing, setProcessing] = useState(false);
  const [downloads, setDownloads] = useState([]);

  const loadFile = async (files) => {
    const f = files[0]; setFile(f); setDownloads([]);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setPageCount(doc.getPageCount());
  };

  const split = async () => {
    setProcessing(true); setDownloads([]);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      let results = [];
      if (mode === "all") {
        for (let i = 0; i < pageCount; i++) {
          const doc = await PDFDocument.create();
          const [p] = await doc.copyPages(src, [i]);
          doc.addPage(p);
          results.push({ name: `page-${i+1}.pdf`, url: URL.createObjectURL(new Blob([await doc.save()], { type: "application/pdf" })) });
        }
      } else {
        for (const part of range.split(",").map(s => s.trim())) {
          const [s, e] = part.includes("-") ? part.split("-").map(n => parseInt(n)-1) : [parseInt(part)-1, parseInt(part)-1];
          const indices = Array.from({ length: Math.min(e,pageCount-1)-s+1 }, (_, i) => s+i);
          if (!indices.length) continue;
          const doc = await PDFDocument.create();
          (await doc.copyPages(src, indices)).forEach(p => doc.addPage(p));
          results.push({ name: `pages-${part.replace("-","_")}.pdf`, url: URL.createObjectURL(new Blob([await doc.save()], { type: "application/pdf" })) });
        }
      }
      setDownloads(results);
    } catch(e) { alert("Error splitting PDF."); }
    setProcessing(false);
  };

  return (
    <ToolLayout tag="Split PDF" tagBg="#FFF7ED" tagColor="#EA580C"
      title="Split PDF File" desc="Extract pages or split a PDF into individual files. Free and instant."
      current="/tools/split-pdf" faqs={[
  { q: "Can I split a PDF into individual pages?", a: "Yes. Select the Split All Pages option and every page becomes its own PDF file." },
  { q: "Can I extract specific pages?", a: "Yes. Use the Page Range option and enter pages like 1-3, 5, 7-10. Each range becomes a separate PDF." },
  { q: "Is there a page limit?", a: "No. You can split PDFs of any length. There is no page count restriction." },
  { q: "Are my files safe?", a: "Yes. Everything is processed locally in your browser. Files never leave your device." },
  { q: "Does it work on mobile?", a: "Yes. PDFcraft works on iPhone and Android in the browser. No app needed." },
]}>

      {!file ? <UploadZone onFiles={loadFile} label="Drop your PDF here" /> : (
        <div>
          <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: "#374151" }}>{file.name}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{pageCount} pages · {(file.size/1024).toFixed(0)} KB</p>
            </div>
            <button onClick={() => { setFile(null); setDownloads([]); }} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
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
                <input type="text" placeholder="e.g. 1-3, 5, 7-10" value={range} onChange={e => setRange(e.target.value)}
                  style={{ marginLeft: 26, border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", width: "calc(100% - 26px)" }} />
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
            <div key={i} style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < downloads.length-1 ? "1px solid #f9fafb" : "none" }}>
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
