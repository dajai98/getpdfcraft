export const metadata = {
  title: "Add Page Numbers to PDF Free Online | PDFcraft",
  description: "Add page numbers to any PDF for free online. Choose position, font size, and starting number. No sign up, no file uploads required.",
  keywords: "add page numbers to pdf free, pdf page numbers online, number pdf pages free, add page numbers pdf no sign up",
  openGraph: {
    title: "Add Page Numbers to PDF Free — PDFcraft",
    description: "Add page numbers to PDF for free. Choose position and style. No sign up.",
    type: "website",
    url: "https://getpdfcraft.com/tools/add-page-numbers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Page Numbers to PDF Free — PDFcraft",
    description: "Add page numbers to PDF for free. Choose position and style. No sign up.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/add-page-numbers" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Add Page Numbers to PDF",
  "description": "Add page numbers to any PDF for free online. Choose position, size, and starting number.",
  "url": "https://getpdfcraft.com/tools/add-page-numbers",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Add Page Numbers to PDF Online — Free</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft adds page numbers to any PDF for free — choose the position, font size, and starting number. Process happens instantly in your browser with no sign up and no file uploads.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Add Page Numbers tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free page numbering tool stamps sequential numbers onto every page of your PDF in your chosen position. Numbers are embedded directly into the PDF file — they appear on every page in every viewer and when printed. You can choose from 6 positions (bottom center, bottom left, bottom right, top center, top left, top right), set the starting number, and adjust the font size. Processing runs entirely in your browser — your files never leave your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to add page numbers to a PDF — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your PDF</li>
          <li>Choose the position for page numbers (bottom center is most common)</li>
          <li>Set the starting page number if needed</li>
          <li>Choose font size — small, medium, or large</li>
          <li>Click <strong>Add Page Numbers</strong> and download</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for adding page numbers</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Add page numbers to reports and proposals before sharing with clients</li>
          <li>Number pages of legal documents for court submissions</li>
          <li>Add chapter page numbers to multi-part documents</li>
          <li>Number pages of academic papers for reference</li>
          <li>Add page numbers to presentation handouts</li>
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Reorder Pages", href: "/tools/reorder-pages" },
            { name: "Delete Pages", href: "/tools/delete-pages" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Watermark PDF", href: "/tools/watermark-pdf" },
            { name: "Split PDF", href: "/tools/split-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
