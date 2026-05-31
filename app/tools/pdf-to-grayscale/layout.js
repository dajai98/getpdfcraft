export const metadata = {
  title: "PDF to Grayscale Free Online — Convert to Black & White | PDFcraft",
  description: "Convert color PDF to grayscale or black and white for free online. Reduce file size and save ink. No sign up, no file uploads required.",
  keywords: "pdf to grayscale free, convert pdf to black and white, pdf grayscale online free, black white pdf no sign up",
  openGraph: {
    title: "PDF to Grayscale Free Online — PDFcraft",
    description: "Convert color PDF to grayscale for free. Reduce size and save ink. No sign up.",
    type: "website",
    url: "https://getpdfcraft.com/tools/pdf-to-grayscale",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Grayscale Free Online — PDFcraft",
    description: "Convert color PDF to grayscale for free. Reduce size and save ink. No sign up.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/pdf-to-grayscale" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PDF to Grayscale",
  "description": "Convert color PDF to grayscale or black and white for free online.",
  "url": "https://getpdfcraft.com/tools/pdf-to-grayscale",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Convert PDF to Grayscale Online — Free</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft converts color PDF documents to grayscale or black and white for free — instantly in your browser. No sign up, no file uploads. Reduce file size and prepare documents for black and white printing.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the PDF to Grayscale tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF grayscale converter removes all color information from your PDF document, converting every page to black, white, and grey tones. This reduces file size since grayscale images contain less data than color images. The conversion preserves all text, layout, and image content — only the color information is removed. Processing runs locally in your browser — your files never get sent anywhere.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to convert PDF to grayscale — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your color PDF</li>
          <li>The file loads locally — never uploaded to any server</li>
          <li>Click <strong>Convert to Grayscale</strong></li>
          <li>Download the grayscale PDF</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why convert PDF to grayscale?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li><strong>Save ink</strong> — print documents without using expensive color ink</li>
          <li><strong>Reduce file size</strong> — grayscale PDFs are smaller than color versions</li>
          <li><strong>Prepare for black and white printing</strong> — ensure consistent print output</li>
          <li><strong>Accessibility</strong> — some documents are clearer in grayscale</li>
          <li><strong>Archive documents</strong> — grayscale is standard for many archives</li>
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "PDF to Image", href: "/tools/pdf-to-image" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Watermark PDF", href: "/tools/watermark-pdf" },
            { name: "Rotate PDF", href: "/tools/rotate-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
