export const metadata = {
  title: "Rotate PDF Online Free — Fix Page Orientation | PDFcraft",
  description: "Rotate PDF pages 90, 180 or 270 degrees for free online. Fix sideways or upside down pages instantly. No sign up, no file uploads required.",
  keywords: "rotate pdf free, fix pdf orientation, rotate pdf pages online, rotate pdf 90 degrees free, fix sideways pdf",
  openGraph: {
    title: "Rotate PDF Online Free — PDFcraft",
    description: "Fix sideways or upside down PDF pages for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/rotate-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Online Free — PDFcraft",
    description: "Fix sideways or upside down PDF pages for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/rotate-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rotate PDF",
  "description": "Rotate PDF pages 90, 180 or 270 degrees for free online. Fix page orientation instantly.",
  "url": "https://getpdfcraft.com/tools/rotate-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Rotate PDF Online — Free & Instant</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft's free PDF rotation tool fixes sideways and upside down PDF pages instantly in your browser. Rotate all pages or specific pages by 90°, 180°, or 270° — no sign up, no uploads, completely private.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Rotate PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free rotate PDF tool changes the orientation of PDF pages by updating the rotation metadata inside the file. This permanently fixes how pages display in any PDF viewer — not just a temporary display fix. Scanned documents that come out sideways, PDFs exported in wrong orientation, and mixed-orientation documents are all fixed in seconds. Processing runs locally in your browser — your files never get sent anywhere.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to rotate PDF pages online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your PDF</li>
          <li>Choose rotation direction — <strong>90° clockwise</strong>, <strong>90° counter-clockwise</strong>, or <strong>180°</strong></li>
          <li>Select which pages to rotate — all pages or specific ranges</li>
          <li>Click <strong>Rotate PDF</strong></li>
          <li>Download the corrected PDF</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why use PDFcraft to rotate PDFs?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>Permanent fix</strong> — rotation is saved in the file, not just a viewer setting</li>
          <li><strong>No quality loss</strong> — rotation only changes orientation metadata</li>
          <li><strong>No file uploads</strong> — processing stays on your device</li>
          <li><strong>No sign up</strong> — instant access, no account needed</li>
          <li><strong>Works on mobile</strong> — fix PDFs on iPhone and Android</li>
          <li><strong>Free forever</strong> — no limits, no premium plan</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common reasons PDFs need rotating</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Scanned documents placed incorrectly in the scanner come out sideways</li>
          <li>Phone camera scans taken at wrong angle</li>
          <li>PDFs exported from certain apps with wrong default orientation</li>
          <li>Mixed portrait and landscape pages that need consistent orientation</li>
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Reorder Pages", href: "/tools/reorder-pages" },
            { name: "Delete Pages", href: "/tools/delete-pages" },
            { name: "PDF to Image", href: "/tools/pdf-to-image" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
