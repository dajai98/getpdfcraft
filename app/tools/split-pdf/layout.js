export const metadata = {
  title: "Split PDF Online Free — Extract Pages | PDFcraft",
  description: "Split a PDF into separate pages or custom page ranges for free online. No sign up, no file uploads, instant results. Extract any pages from a PDF free.",
  keywords: "split pdf, extract pdf pages free, split pdf online free, separate pdf pages, split pdf no sign up",
  openGraph: {
    title: "Split PDF Online Free — PDFcraft",
    description: "Split PDF into pages or ranges for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/split-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online Free — PDFcraft",
    description: "Split PDF into pages or ranges for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/split-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Split PDF",
  "description": "Split a PDF into separate pages or custom page ranges for free online.",
  "url": "https://getpdfcraft.com/tools/split-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Split PDF Online — Free & Private</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft's free PDF splitter extracts specific pages or page ranges from any PDF instantly in your browser. Split a PDF into individual pages, extract a range, or separate specific pages — all free, with no sign up and no file uploads.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Split PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free split PDF tool separates your PDF document into smaller files based on your chosen page selection. You can split every page into individual files, extract a specific page range (like pages 5-10), or pull out specific non-consecutive pages. The splitting process runs entirely in your browser — your PDF never leaves your device. Your original file is never modified — PDFcraft always creates new output files.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to split a PDF online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and choose the PDF you want to split</li>
          <li>Choose your split mode — all pages, specific range, or custom pages</li>
          <li>Enter page numbers or ranges if extracting specific pages</li>
          <li>Click <strong>Split PDF</strong> to process</li>
          <li>Download individual pages or all split files at once</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why use PDFcraft to split PDFs?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>100% free</strong> — no limits on pages or file size</li>
          <li><strong>No file uploads</strong> — splits happen locally in your browser</li>
          <li><strong>No quality loss</strong> — pages are extracted without re-encoding</li>
          <li><strong>No sign up required</strong> — immediate access, no account needed</li>
          <li><strong>Flexible split options</strong> — all pages, ranges, or custom selection</li>
          <li><strong>Works on mobile</strong> — split PDFs on iPhone and Android</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for splitting PDFs</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Extract specific chapters from a large PDF document</li>
          <li>Share only relevant pages with a client without sending the whole document</li>
          <li>Split a large PDF into smaller parts for email attachment limits</li>
          <li>Separate different sections of a combined report</li>
          <li>Extract a single page to use as a standalone document</li>
          <li>Remove confidential pages before sharing a document</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is splitting PDFs online safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          With PDFcraft, completely safe. All splitting happens locally in your browser — your PDF never gets sent to any server. This matters when working with confidential documents that contain sensitive information you cannot share with third-party cloud services.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Delete Pages", href: "/tools/delete-pages" },
            { name: "Reorder Pages", href: "/tools/reorder-pages" },
            { name: "Add Page Numbers", href: "/tools/add-page-numbers" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
