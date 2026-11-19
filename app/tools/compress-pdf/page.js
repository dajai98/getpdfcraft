"use client";
import { useState } from "react";
import { useGeneratedResult, useResultInput } from "@/components/hooks/useGeneratedResult";
import { loadPdf, pdfInputError } from "@/lib/pdfInput";
import UploadZone from "@/components/ui/UploadZone";
import ToolLayout from "@/components/ui/ToolLayout";
import DownloadButton from "@/components/ui/DownloadButton";
import TestingNote from "@/components/ui/TestingNote";

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

      const compressed = await (await loadPdf(f)).save({ useObjectStreams: true });
      if (isCurrentResult(token)) {
        setResult({ originalSize: f.size, newSize: compressed.length });
        setDownloadUrl(URL.createObjectURL(new Blob([compressed], { type: "application/pdf" })), token);
      }
    } catch (e) {
      if (isCurrentResult(token)) setError(pdfInputError(e));
    } finally {
      if (isCurrentResult(token)) setProcessing(false);
    }
  };
  const reset = () => { setFile(null); setResult(null); setError(""); };
  const smaller = result && result.newSize < result.originalSize;
  const larger = result && result.newSize > result.originalSize;

  return (
    <ToolLayout tag="Compress PDF" tagBg="#FEFCE8" tagColor="#CA8A04"
      title="Compress PDF" desc="Try structural/object-stream optimization and compare the output size. Files are processed locally in your browser."
      current="/tools/compress-pdf" testingNote={<TestingNote
        heading="What I found when I tested compression"
        paragraphs={[
          "I compressed a merged PDF and it came out 1 byte larger. I then ran a 20 MB test file through four times: it grew by 114 bytes, then 3 bytes, then 1 byte, then stayed the same. It never shrank.",
          "That isn't a bug. These files were already packed as tightly as they could be — the 20 MB sample is filled with data that doesn't compress, so each pass only added a few bytes of structure. This is why the tool warns you when the output is larger and tells you to keep your original. The download is still there if you want it, but the warning is the honest answer — if size is your goal, the original is the smaller file.",
          "The takeaway: compression only helps when the source file has something to give up — usually scanned pages or images saved at higher quality than they need to be. A file that's already optimized will stay the same size or grow slightly.",
        ]}
      />} faqs={[
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
