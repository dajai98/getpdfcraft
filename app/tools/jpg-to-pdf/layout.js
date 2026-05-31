export const metadata = {
  title: "JPG to PDF Free Online — Convert Images to PDF | PDFcraft",
  description: "Convert JPG, PNG and other images to PDF for free online. No sign up, no watermark. Combine multiple images into one PDF instantly in your browser.",
  keywords: "jpg to pdf free, image to pdf online free, png to pdf no watermark, convert jpg to pdf no sign up, photos to pdf free",
  openGraph: {
    title: "JPG to PDF Free Online — PDFcraft",
    description: "Convert images to PDF for free. No watermark, no sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/jpg-to-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Free Online — PDFcraft",
    description: "Convert images to PDF for free. No watermark, no sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/jpg-to-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JPG to PDF",
  "description": "Convert JPG, PNG and images to PDF for free online. No watermarks, no sign up.",
  "url": "https://getpdfcraft.com/tools/jpg-to-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>JPG to PDF Online — Free, No Watermark</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft converts JPG, PNG, and other image files to PDF for free — no watermarks, no sign up, and no file uploads. Convert a single image or combine multiple photos into one PDF document instantly in your browser.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the JPG to PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free JPG to PDF converter embeds your images into a PDF document at full quality — no additional compression, no watermarks, no quality loss. You can convert a single image or select multiple images to create a multi-page PDF where each image becomes one page. The conversion happens entirely in your browser using JavaScript — your images never leave your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to convert JPG to PDF online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select Images</strong> and choose your JPG or PNG files</li>
          <li>Select multiple images to create a multi-page PDF</li>
          <li>Arrange images in the correct order</li>
          <li>Click <strong>Convert to PDF</strong></li>
          <li>Download the PDF with all images embedded at full quality</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why use PDFcraft to convert images to PDF?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>No watermarks</strong> — ever. Your PDF output is clean.</li>
          <li><strong>Full image quality</strong> — images embedded without additional compression</li>
          <li><strong>Multiple image formats</strong> — JPG, PNG, GIF, BMP, WebP all supported</li>
          <li><strong>Combine multiple images</strong> — create multi-page PDFs from many photos</li>
          <li><strong>No file uploads</strong> — all processing stays on your device</li>
          <li><strong>Works on mobile</strong> — convert phone photos to PDF on iPhone and Android</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for JPG to PDF conversion</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Convert phone photos of documents to PDF for official submissions</li>
          <li>Combine scanned receipt photos into one PDF expense report</li>
          <li>Create a PDF portfolio from multiple image files</li>
          <li>Convert screenshots into a PDF document</li>
          <li>Submit image-based forms as PDF for job applications</li>
          <li>Combine product photos into one PDF catalog</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is converting images to PDF online safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          With PDFcraft, completely safe. Your images are processed locally in your browser — they never get uploaded to any server. This is important when converting photos of sensitive documents like ID cards, bank statements, or medical records.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "PDF to Image", href: "/tools/pdf-to-image" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Protect PDF", href: "/tools/protect-pdf" },
            { name: "Watermark PDF", href: "/tools/watermark-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
