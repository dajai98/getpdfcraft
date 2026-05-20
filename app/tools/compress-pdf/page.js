"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const compress = async (files) => {
    const f = files[0]; setFile(f); setResult(null);
    setProcessing(true);
    try {
      const compressed = await (await PDFDocument.load(await f.arrayBuffer())).save({ useObjectStreams: true });
      setResult({ url: URL.createObjectURL(new Blob([compressed], { type: "application/pdf" })), originalSize: f.size, newSize: compressed.length });
    } catch(e) { alert("Error compressing PDF."); }
    setProcessing(false);
  };

  const savings = result ? Math.max(0, Math.round((1 - result.newSize / result.originalSize) * 100)) : 0;

  return (
    <ToolLayout tag="Compress PDF" tagBg="#FEFCE8" tagColor="#CA8A04"
      title="Compress PDF" desc="Reduce PDF file size while keeping quality. Free and instant."
      current="/tools/compress-pdf" faqs={[
  { q: "Will compression reduce the quality of my PDF?", a: "For text-based PDFs there is no quality loss. For image-heavy PDFs there may be a slight reduction but text remains sharp." },
  { q: "How much can PDFcraft compress a PDF?", a: "It depends on the file. Unoptimized PDFs can shrink by 20-50%." },
  { q: "Is there a file size limit?", a: "No artificial limit. Your device memory is the only constraint." },
  { q: "Are my files safe?", a: "Yes. Files are processed locally. Nothing is uploaded to any server." },
  { q: "Does it work on iPhone?", a: "Yes. Open PDFcraft in Safari on iPhone and it works immediately." },
]}>

      {!file || result ? (
        <div>
          <UploadZone onFiles={compress} label="Drop your PDF here to compress" />
          {result && (
            <div style={{ marginTop: 24, background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                <span style={{ fontSize: 40 }}>✅</span>
                <div>
                  <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Compression complete!</p>
                  <p style={{ fontSize: 13, color: "#6b7280" }}>
                    {(result.originalSize/1024).toFixed(0)} KB → {(result.newSize/1024).toFixed(0)} KB
                    {savings > 0 ? <strong style={{ color: "#16A34A" }}> ({savings}% smaller)</strong> : " (already optimized)"}
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <DownloadButton url={result.url} filename="compressed.pdf" label="Download compressed.pdf" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <p style={{ fontWeight: 600, color: "#374151", fontSize: 16 }}>Compressing {file.name}...</p>
          <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 8 }}>This usually takes a few seconds.</p>
        </div>
      )}
    </ToolLayout>
  );
}
