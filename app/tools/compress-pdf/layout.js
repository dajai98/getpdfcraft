export const metadata = {
  title: "Compress PDF Online Free — Reduce File Size | PDFcraft",
  description: "Compress PDF files online for free without losing quality. Reduce PDF size instantly in your browser. No sign up, no file uploads, no watermarks.",
  keywords: "compress pdf, reduce pdf size free, compress pdf without losing quality, shrink pdf online free, pdf compressor no sign up",
  openGraph: {
    title: "Compress PDF Online Free — PDFcraft",
    description: "Reduce PDF file size without losing quality. Free, no sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/compress-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online Free — PDFcraft",
    description: "Reduce PDF file size without losing quality. Free, no sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/compress-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Compress PDF",
  "description": "Compress PDF files online for free without losing quality. Files never leave your device.",
  "url": "https://getpdfcraft.com/tools/compress-pdf",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
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
          PDFcraft's free PDF compressor reduces your PDF file size instantly in your browser — no uploads, no sign up, and no watermarks. Whether you need to compress a PDF for email, WhatsApp, or website upload, PDFcraft makes files smaller without visible quality loss.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Compress PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF compressor optimizes the internal structure of your PDF file — consolidating and streamlining how objects are stored — without touching the visible content of your document. This tends to help most on PDFs with a lot of repeated internal structure, like multi-page documents or forms. It does not currently re-compress or downsample embedded images, so a PDF that's large mainly because of high-resolution photos or scans may only shrink a little. For those files, deleting pages you don't need (via PDFcraft's Delete Pages tool) or splitting the document usually makes a bigger difference. Text and images are never altered — the compression process runs entirely in your browser using JavaScript, and your files never get sent to any server.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to compress a PDF online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> or drag your PDF into the upload area</li>
          <li>Your PDF loads locally in the browser — never uploaded anywhere</li>
          <li>Click <strong>Compress PDF</strong> to start the optimization process</li>
          <li>See the original vs new file size comparison</li>
          <li>Click <strong>Download</strong> to save the compressed PDF</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why use PDFcraft to compress PDFs?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>100% free</strong> — no limits, no premium plan required</li>
          <li><strong>No file uploads</strong> — compression happens locally in your browser</li>
          <li><strong>No quality loss</strong> — text stays sharp, documents stay readable</li>
          <li><strong>No sign up</strong> — open the tool and start immediately</li>
          <li><strong>Works on mobile</strong> — compress PDFs on iPhone or Android</li>
          <li><strong>Instant results</strong> — most PDFs compress in under 5 seconds</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for compressing PDFs</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Compress PDF for email — keep files under Gmail's 25MB limit</li>
          <li>Reduce PDF size for WhatsApp — stay under the 100MB file limit</li>
          <li>Compress PDFs for website upload forms and portals</li>
          <li>Reduce storage space for archived documents</li>
          <li>Compress scanned documents for faster sharing</li>
          <li>Make PDFs load faster when embedded on websites</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is compressing PDFs online safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          With PDFcraft, completely safe. Your PDF is compressed locally in your browser — it never gets uploaded to any server. This is critical for confidential documents like financial reports, contracts, and medical records. PDFcraft cannot access your files even if it wanted to — all processing happens entirely on your device.
        </p>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          Wondering how much this tool will actually shrink your file? <a href="/blog/pdf-compression-real-test-results" style={{ color: "#E8380D", fontWeight: 600, textDecoration: "none" }}>We ran real tests on four PDF types and measured the results →</a>
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
