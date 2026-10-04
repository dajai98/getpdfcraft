"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { pageNumberPlacement } from "@/lib/pageGeometry";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

const faqs = [
  { q: "Can I choose where the page number appears?", a: "Yes. Choose from bottom center, bottom right, bottom left, top center, top right, or top left." },
  { q: "Can I set a custom starting number?", a: "Yes. Set any starting number you want — useful if your PDF is a chapter that starts at page 50 for example." },
  { q: "Can I change the font size?", a: "Yes. Choose from small, medium, or large page numbers." },
  { q: "How are my files processed?", a: "Document processing happens locally in your browser; this tool does not upload documents to a processing server." },
  { q: "Will adding page numbers change anything else?", a: "The tool adds page numbers. Review the result and keep your original; PDF rewriting can affect signatures and other document features." },
];

export default function AddPageNumbers() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult } = useGeneratedResult();
  const [file, setFile] = useResultInput(null, invalidateResult);
  const [position, setPosition] = useResultInput("bottom-center", invalidateResult);
  const [startNum, setStartNum] = useResultInput(1, invalidateResult);
  const [fontSize, setFontSize] = useResultInput(12, invalidateResult);
  const [processing, setProcessing] = useState(false);

  const loadFile = (files) => { setFile(files[0]); };

  const addNumbers = async () => {
    const resultVersion = beginResult();
    setProcessing(true);
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();

      pages.forEach((page, i) => {
        const text = String(startNum + i);
        const { angle, ...placement } = pageNumberPlacement(page, font, text, fontSize, position);
        page.drawText(text, { ...placement, rotate: degrees(angle), font, color: rgb(0.3, 0.3, 0.3) });
      });

      const blob = new Blob([await doc.save()], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob), resultVersion);
    } catch (e) {
      alert(e.message || "Error adding page numbers.");
    }
    setProcessing(false);
  };

  const positions = [
    { val: "bottom-center", label: "↓ Bottom Center" },
    { val: "bottom-right", label: "↓ Bottom Right" },
    { val: "bottom-left", label: "↓ Bottom Left" },
    { val: "top-center", label: "↑ Top Center" },
    { val: "top-right", label: "↑ Top Right" },
    { val: "top-left", label: "↑ Top Left" },
  ];

  return (
    <ToolLayout
      tag="Page Numbers" tagBg="#F0FDF4" tagColor="#16A34A"
      title="Add Page Numbers to PDF" desc="Number your PDF pages with custom position, size, and starting number. Free to use."
      current="/tools/add-page-numbers" faqs={faqs}
    >
      {/* 
        CLS FIX: Instead of conditionally mounting/unmounting components 
        (which causes the element to collapse from 364x747 to 0x0 on hydration),
        we keep both sections always in the DOM and toggle visibility via display.
        This prevents layout shifts during React hydration.
      */}

      {/* Upload zone — always in DOM, hidden when file is selected */}
      <div style={{ display: file ? "none" : "block" }}>
        <UploadZone onFiles={loadFile} label="Drop your PDF here" />
      </div>

      {/* Controls — always in DOM, hidden when no file */}
      <div style={{ display: file ? "block" : "none" }}>
        {/* File info bar */}
        <div style={{
          background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14,
          padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12
        }}>
          <span style={{ fontSize: 28 }}>📄</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: "#374151", margin: 0 }}>
              {file?.name}
            </p>
          </div>
          <button
            aria-label="Remove selected file" onClick={() => { setFile(null); }}
            style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
          >
            ✕
          </button>
        </div>

        {/* Options panel */}
        <div style={{
          background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 14,
          padding: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 20
        }}>
          {/* Position selector */}
          <div>
            <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 12, marginTop: 0 }}>
              Position
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {positions.map(p => (
                <button
                  key={p.val}
                  aria-pressed={position === p.val} onClick={() => setPosition(p.val)}
                  style={{
                    padding: "10px 6px", borderRadius: 10, fontWeight: 600, fontSize: 12,
                    border: `1.5px solid ${position === p.val ? "#E8380D" : "#e5e7eb"}`,
                    background: position === p.val ? "#FEF2F2" : "white",
                    color: position === p.val ? "#E8380D" : "#6b7280",
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start number + font size */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label htmlFor="add-page-numbers-field-1" style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
                Start from page
              </label>
              <input id="add-page-numbers-field-1"
                type="number" min="1" value={startNum}
                onChange={e => setStartNum(parseInt(e.target.value) || 1)}
                style={{
                  width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10,
                  padding: "10px 14px", fontSize: 14, fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div>
              <label htmlFor="add-page-numbers-field-2" style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
                Font size
              </label>
              <select id="add-page-numbers-field-2"
                value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))}
                style={{
                  width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10,
                  padding: "10px 14px", fontSize: 14, fontFamily: "inherit",
                  background: "white", boxSizing: "border-box"
                }}
              >
                <option value={10}>Small (10pt)</option>
                <option value={12}>Medium (12pt)</option>
                <option value={16}>Large (16pt)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Process button */}
        <button
          onClick={addNumbers}
          disabled={processing}
          style={{
            width: "100%", background: processing ? "#d1d5db" : "#E8380D",
            color: "white", border: "none", padding: 16, borderRadius: 14,
            fontWeight: 700, fontSize: 16,
            cursor: processing ? "not-allowed" : "pointer", fontFamily: "inherit"
          }}
        >
          {processing ? "⏳ Adding page numbers..." : "# Add Page Numbers"}
        </button>
      </div>

      {/* 
        CLS FIX: Download block is always in DOM with a reserved minHeight.
        We use visibility:hidden instead of conditional rendering so the 
        space is always reserved — no layout shift when it appears.
      */}
      <div style={{
        marginTop: 24,
        background: "#F0FDF4",
        border: "1px solid #bbf7d0",
        borderRadius: 16,
        padding: 28,
        minHeight: 130,
        visibility: downloadUrl ? "visible" : "hidden",
      }}>
        {downloadUrl && <div role="status" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 40 }}>✅</span>
          <div>
            <p style={{ fontWeight: 700, color: "#111827", fontSize: 17, margin: 0 }}>
              Page numbers added!
            </p>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>
              Starting from {startNum}, positioned {position.replace("-", " ")}.
            </p>
          </div>
        </div>}
        {downloadUrl && (
          <DownloadButton url={downloadUrl} filename="numbered.pdf" label="Download PDF" />
        )}
      </div>
    </ToolLayout>
  );
}
