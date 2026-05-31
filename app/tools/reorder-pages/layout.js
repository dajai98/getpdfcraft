export const metadata = {
  title: "Reorder PDF Pages Free Online — Rearrange Pages | PDFcraft",
  description: "Rearrange and reorder pages in any PDF for free online. Drag and drop to reorganize PDF pages. No sign up, no file uploads required.",
  keywords: "reorder pdf pages free, rearrange pdf pages online, reorganize pdf pages free, move pdf pages no sign up",
  openGraph: {
    title: "Reorder PDF Pages Free Online — PDFcraft",
    description: "Rearrange PDF pages for free. Drag and drop to reorder. No sign up.",
    type: "website",
    url: "https://getpdfcraft.com/tools/reorder-pages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reorder PDF Pages Free Online — PDFcraft",
    description: "Rearrange PDF pages for free. Drag and drop to reorder. No sign up.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/reorder-pages" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reorder PDF Pages",
  "description": "Rearrange and reorder pages in any PDF for free online using drag and drop.",
  "url": "https://getpdfcraft.com/tools/reorder-pages",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Reorder PDF Pages Online — Free & Private</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft's free PDF page reordering tool lets you drag and drop pages into any order you need — instantly in your browser. No sign up, no file uploads, and your original file is never modified.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Reorder Pages tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF page reorder tool displays all pages of your PDF and lets you rearrange them in any order using drag and drop. Once you have the pages in the right sequence, the tool creates a new PDF with pages in your chosen order. This is ideal for fixing incorrectly merged documents, reorganizing scanned pages, or restructuring reports. All processing happens locally in your browser — your files stay on your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to reorder PDF pages — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your PDF</li>
          <li>See all pages displayed as thumbnails</li>
          <li>Drag and drop pages into the correct order</li>
          <li>Click <strong>Save New Order</strong></li>
          <li>Download the PDF with pages in your new order</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for reordering PDF pages</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Fix scanned documents where pages came out in wrong order</li>
          <li>Reorganize chapters or sections after merging multiple PDFs</li>
          <li>Move a cover page or title page to the front</li>
          <li>Restructure presentation pages before sharing</li>
          <li>Reorder report sections after review feedback</li>
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Delete Pages", href: "/tools/delete-pages" },
            { name: "Split PDF", href: "/tools/split-pdf" },
            { name: "Add Page Numbers", href: "/tools/add-page-numbers" },
            { name: "Rotate PDF", href: "/tools/rotate-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
