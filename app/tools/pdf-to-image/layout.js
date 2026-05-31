export const metadata = {
  title: "PDF to JPG/PNG Free Online — No Watermark | PDFcraft",
  description: "Convert PDF pages to high quality JPG or PNG images for free online. No watermark, no sign up, files never uploaded. Convert any PDF to image instantly.",
  keywords: "pdf to jpg free, pdf to image online free, convert pdf to png no watermark, pdf to jpg no sign up, pdf pages to images",
  openGraph: {
    title: "PDF to Image Free Online — No Watermark | PDFcraft",
    description: "Convert PDF pages to JPG or PNG for free. No watermark, no sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/pdf-to-image",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Image Free Online — No Watermark | PDFcraft",
    description: "Convert PDF pages to JPG or PNG for free. No watermark, no sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/pdf-to-image" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PDF to Image",
  "description": "Convert PDF pages to high quality JPG or PNG images for free online. No watermarks.",
  "url": "https://getpdfcraft.com/tools/pdf-to-image",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>PDF to Image Online — Free, No Watermark</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft converts PDF pages to high quality JPG or PNG images for free — no watermarks, no sign up, and no file uploads. Convert any PDF to images instantly in your browser on any device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the PDF to Image tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF to image converter renders each page of your PDF as a high resolution image file. You can choose JPG format for smaller file sizes ideal for sharing online, or PNG format for lossless quality perfect for text documents and diagrams. Every page becomes a separate downloadable image. The conversion runs entirely in your browser using PDF.js — your files never leave your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to convert PDF to image online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and choose your PDF</li>
          <li>Select output format — <strong>JPG</strong> for photos and sharing, <strong>PNG</strong> for text and diagrams</li>
          <li>Click <strong>Convert to Image</strong></li>
          <li>Download individual page images or all pages at once</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>JPG vs PNG — which should you choose?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>JPG</strong> — smaller file size, good for photos and social media sharing, slight quality compression</li>
          <li><strong>PNG</strong> — larger file size, perfect lossless quality, best for text, diagrams, and logos</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for PDF to image conversion</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Share a PDF page on Instagram, Twitter, or WhatsApp</li>
          <li>Insert a PDF chart or diagram into a PowerPoint presentation</li>
          <li>Convert a PDF certificate to PNG for LinkedIn upload</li>
          <li>Create image previews of document pages for websites</li>
          <li>Extract logos or graphics embedded in PDF files</li>
          <li>Convert PDF slides to images for web publishing</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is PDF to image conversion safe?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          Completely safe with PDFcraft. PDF rendering happens entirely in your browser — your PDF never gets uploaded to any server. No watermarks are added to output images. Your files and their contents remain completely private throughout the conversion process.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "JPG to PDF", href: "/tools/jpg-to-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "PDF to Grayscale", href: "/tools/pdf-to-grayscale" },
            { name: "Split PDF", href: "/tools/split-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
