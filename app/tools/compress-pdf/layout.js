import { toolMetadata } from "@/lib/toolMetadata";

export const metadata = toolMetadata("compress-pdf");

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Compress PDF",
  "description": "Try PDF structural optimization locally in your browser. Output may be smaller, unchanged or larger.",
  "url": "https://getpdfcraft.com/tools/compress-pdf",
  "applicationCategory": "UtilitiesApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 60px" }}>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Compress PDF Online — Free & Private</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft processes your PDF locally in your browser using object-stream serialization. No account is required. Compare the original and output sizes before downloading; the result may be larger.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Compress PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The tool loads and saves your PDF using structural/object-stream optimization. It does not explicitly downsample or recompress embedded images, and does not guarantee deduplication or a smaller file. Review the output and keep your original; rewriting a PDF can affect signatures and document-level features.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to compress a PDF online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> or drag your PDF into the upload area</li>
          <li>Your PDF loads locally in the browser — never uploaded anywhere</li>
          <li>Processing starts automatically when you select a file</li>
          <li>See the original vs new file size comparison</li>
          <li>Click <strong>Download</strong> to save the compressed PDF</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why use PDFcraft to compress PDFs?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>Free to use</strong> — practical limits depend on your device and browser</li>
          <li><strong>No file uploads</strong> — compression happens locally in your browser</li>
          <li><strong>No explicit image recompression</strong> — the tool rewrites the PDF structure</li>
          <li><strong>No sign up</strong> — open the tool and start immediately</li>
          <li><strong>Try on mobile</strong> — browser support and usable file sizes vary on iPhone and Android</li>
          <li><strong>Local processing</strong> — processing time depends on your file and device</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for compressing PDFs</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Try reducing PDFs to meet email attachment limits</li>
          <li>Compare output size against your messaging service’s current limits</li>
          <li>Compress PDFs for website upload forms and portals</li>
          <li>Reduce storage space for archived documents</li>
          <li>Compress scanned documents for faster sharing</li>
          <li>Make PDFs load faster when embedded on websites</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is compressing PDFs online safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          Files are processed locally in your browser. This tool does not upload your document to a processing server. Keep your original and review the generated PDF before using it.
        </p>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          Wondering how much this tool will actually shrink your file? <a href="/blog/pdf-compression-real-test-results" style={{ color: "#E8380D", fontWeight: 600, textDecoration: "none" }}>Learn how to measure compression results for your own PDF →</a>
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Split PDF", href: "/tools/split-pdf" },
            { name: "Delete Pages", href: "/tools/delete-pages" },
            { name: "PDF to Image", href: "/tools/pdf-to-image" },
            { name: "Protect PDF", href: "/tools/protect-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
