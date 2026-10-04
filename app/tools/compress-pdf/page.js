"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { pdfInputError } from "@/lib/pdfInput";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";

export default function CompressPDF() {
  const { downloadUrl, setDownloadUrl, beginResult, invalidateResult, isCurrentResult } = useGeneratedResult();
  const [file, setFile] = useResultInput(null, invalidateResult);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const compress = async files => {
    const f = files[0];
    if (!f) return;
    setFile(f); setResult(null); setError("");
    const token = beginResult();
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const compressed = await (await PDFDocument.load(await f.arrayBuffer())).save({ useObjectStreams: true });
      if (isCurrentResult(token)) {
        setResult({ originalSize: f.size, newSize: compressed.length });
        setDownloadUrl(URL.createObjectURL(new Blob([compressed], { type: "application/pdf" })), token);
      }
    } catch (e) {
      if (isCurrentResult(token)) setError(pdfInputError(e));
    } finally {
      setProcessing(false);
    }
  };
  const reset = () => { setFile(null); setResult(null); setError(""); };
  const smaller = result && result.newSize < result.originalSize;
  const larger = result && result.newSize > result.originalSize;

  return (
    <ToolLayout tag="Compress PDF" tagBg="#FEFCE8" tagColor="#CA8A04"
      title="Compress PDF" desc="Try structural/object-stream optimization and compare the output size. Files are processed locally in your browser."
      current="/tools/compress-pdf" faqs={[
        { q: "Does this recompress images?", a: "No. It loads and saves the PDF with object streams; it does not explicitly downsample or recompress embedded images." },
        { q: "Will the file get smaller?", a: "Not necessarily. The output may be smaller, unchanged or larger. Compare the sizes and keep your original." },
        { q: "Is there a size limit?", a: "No app-level file-size quota; practical limits depend on your device and browser." },
      ]}>
      {processing ? <p role="status">Compressing {file?.name}...</p> : <UploadZone onFiles={compress} label="Drop your PDF here to process" />}
      {error && <div role="alert"><p>{error}</p><button type="button" onClick={() => compress([file])}>Retry</button></div>}
      {file && !processing && <button type="button" onClick={reset}>Reset / choose another PDF</button>}
      {downloadUrl && result && <div role="status" style={{ marginTop: 24, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 16, padding: 28 }}>
        <p style={{ fontWeight: 700 }}>{smaller ? "File size reduced" : larger ? "Output is larger — keep your original if size is your goal" : "No file-size reduction"}</p>
        <p>{result.originalSize.toLocaleString()} bytes → {result.newSize.toLocaleString()} bytes</p>
        <p>{smaller ? `${result.originalSize - result.newSize} bytes smaller` : larger ? `${result.newSize - result.originalSize} bytes larger` : "The size is unchanged."}</p>
        <DownloadButton url={downloadUrl} filename="processed.pdf" label="Download processed PDF" />
      </div>}
    </ToolLayout>
  );
}
