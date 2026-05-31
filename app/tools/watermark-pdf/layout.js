export const metadata = {
  title: "Add Watermark to PDF Free Online | PDFcraft",
  description: "Add a custom text watermark to any PDF for free online. Stamp CONFIDENTIAL, DRAFT, or any text. No sign up, no file uploads required.",
  keywords: "watermark pdf free, add watermark to pdf online, stamp pdf confidential free, pdf watermark no sign up, text watermark pdf",
  openGraph: {
    title: "Watermark PDF Free Online — PDFcraft",
    description: "Add custom text watermarks to PDF for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/watermark-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark PDF Free Online — PDFcraft",
    description: "Add custom text watermarks to PDF for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/watermark-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Watermark PDF",
  "description": "Add custom text watermarks to any PDF for free online. No sign up required.",
  "url": "https://getpdfcraft.com/tools/watermark-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Add Watermark to PDF Online — Free</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft adds custom text watermarks to any PDF for free — no sign up and no file uploads. Stamp CONFIDENTIAL, DRAFT, your company name, or any custom text across every page of your document instantly in your browser.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Watermark PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF watermark tool embeds a diagonal text stamp on every page of your PDF. You can customize the watermark text, opacity, size, and position. The watermark is embedded directly into the PDF file — it appears consistently on every page in every PDF viewer and when printed. Processing runs locally in your browser — your document never leaves your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to add a watermark to a PDF — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your PDF</li>
          <li>Enter your watermark text — CONFIDENTIAL, DRAFT, your name, or any text</li>
          <li>Adjust opacity (20-30% is recommended for professional results)</li>
          <li>Click <strong>Add Watermark</strong></li>
          <li>Download the watermarked PDF</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common watermark use cases</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Mark sensitive business documents as CONFIDENTIAL</li>
          <li>Stamp work-in-progress documents as DRAFT</li>
          <li>Add your company name or copyright to distributed reports</li>
          <li>Mark sample documents before delivering final versions to clients</li>
          <li>Add DO NOT DISTRIBUTE to restricted internal documents</li>
          <li>Brand PDFs with your website URL before sharing online</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is watermarking PDFs online safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          With PDFcraft, completely safe. Watermark embedding happens locally in your browser — your PDF never gets sent to any server. This is especially important for confidential documents that you are watermarking before sharing with clients or external parties.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Protect PDF", href: "/tools/protect-pdf" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Add Page Numbers", href: "/tools/add-page-numbers" },
            { name: "Split PDF", href: "/tools/split-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
