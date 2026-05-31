export const metadata = {
  title: "Delete PDF Pages Free Online — Remove Pages | PDFcraft",
  description: "Delete or remove specific pages from any PDF for free online. No sign up, no file uploads. Remove unwanted pages instantly in your browser.",
  keywords: "delete pdf pages free, remove pages from pdf online, delete page from pdf free, remove pdf pages no sign up",
  openGraph: {
    title: "Delete PDF Pages Free Online — PDFcraft",
    description: "Remove specific pages from PDF for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/delete-pages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages Free Online — PDFcraft",
    description: "Remove specific pages from PDF for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/delete-pages" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Delete PDF Pages",
  "description": "Delete or remove specific pages from any PDF for free online.",
  "url": "https://getpdfcraft.com/tools/delete-pages",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Delete PDF Pages Online — Free & Private</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft's free page deletion tool removes specific pages from any PDF instantly in your browser. Select one page or multiple pages to delete — no sign up, no file uploads, and your original file is never modified.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Delete Pages tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free delete PDF pages tool creates a new PDF containing all pages except the ones you choose to remove. Select any combination of pages — a single page, multiple individual pages, or a range. The result is a clean PDF with only the pages you want to keep. Your original file is never modified — PDFcraft always creates a new output file. Processing runs entirely in your browser with no server involvement.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to delete pages from a PDF — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your PDF</li>
          <li>See the list of all pages in your document</li>
          <li>Select the pages you want to remove</li>
          <li>Click <strong>Delete Pages</strong></li>
          <li>Download the PDF with the selected pages removed</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for deleting PDF pages</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Remove blank pages from scanned documents</li>
          <li>Delete confidential pages before sharing a document externally</li>
          <li>Remove cover pages or title pages from reports</li>
          <li>Clean up PDFs with unnecessary appendices or attachments</li>
          <li>Remove duplicate or incorrect pages from a merged document</li>
          <li>Reduce file size by removing unused pages</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is deleting PDF pages online safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          With PDFcraft, completely safe. All processing happens locally in your browser — your PDF never gets uploaded to any server. Your original file is never modified — you always download a new file with the selected pages removed.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Split PDF", href: "/tools/split-pdf" },
            { name: "Reorder Pages", href: "/tools/reorder-pages" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Add Page Numbers", href: "/tools/add-page-numbers" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
