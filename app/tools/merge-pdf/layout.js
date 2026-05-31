export const metadata = {
  title: "Merge PDF Online Free — Combine PDFs Instantly | PDFcraft",
  description: "Merge multiple PDF files into one document for free online. No sign up, no file uploads, no watermarks. Combine unlimited PDFs instantly in your browser.",
  keywords: "merge pdf, combine pdf online free, merge pdf files free, join pdf no sign up, merge pdf without watermark",
  openGraph: {
    title: "Merge PDF Online Free — PDFcraft",
    description: "Merge multiple PDF files into one document for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/merge-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Online Free — PDFcraft",
    description: "Merge multiple PDF files into one document for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/merge-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Merge PDF",
  "description": "Merge multiple PDF files into one document for free online. Files never leave your device.",
  "url": "https://getpdfcraft.com/tools/merge-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Merge PDF Online — Free & Private</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft's free online PDF merger combines multiple PDF files into one document instantly, directly in your browser. No file uploads, no sign up, no watermarks — just fast, private PDF merging that works on any device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Merge PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free merge PDF tool combines two or more PDF files into a single document while preserving all content, formatting, images, and page layouts exactly as they were in the originals. Whether you are merging two documents or twenty, PDFcraft handles it without any file size limits or page restrictions. The entire merging process runs locally in your browser using JavaScript — your files never get uploaded to any server.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to merge PDF files online — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select Files</strong> or drag and drop your PDF files into the upload area</li>
          <li>Add as many PDFs as you need — there is no limit on the number of files</li>
          <li>Drag files to arrange them in the correct order before merging</li>
          <li>Click <strong>Merge PDFs</strong> to combine all files into one document</li>
          <li>Click <strong>Download</strong> to save the merged PDF to your device</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why use PDFcraft to merge PDFs?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li><strong>100% free</strong> — no hidden fees, no premium plan, no daily limits</li>
          <li><strong>No file uploads</strong> — files are processed locally in your browser, never sent to any server</li>
          <li><strong>No sign up required</strong> — open the tool and start merging immediately</li>
          <li><strong>No watermarks</strong> — the merged PDF is clean with no added stamps or branding</li>
          <li><strong>Unlimited files</strong> — merge as many PDFs as you need in one operation</li>
          <li><strong>Works on all devices</strong> — iPhone, Android, Mac, Windows, Chromebook</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Common use cases for merging PDFs</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Combine a cover letter and resume into one PDF for job applications</li>
          <li>Merge multiple invoice PDFs into one file for accounting submissions</li>
          <li>Join scanned document pages into a complete single PDF</li>
          <li>Combine monthly bank statements into one annual document</li>
          <li>Merge multiple reports or chapters into a complete document</li>
          <li>Combine image PDFs with a written report into one file</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is it safe to merge PDFs online?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          With PDFcraft, yes — completely safe. Unlike most online PDF tools that upload your files to their cloud servers, PDFcraft processes everything locally in your browser. Your PDFs never leave your device. This makes it the safest option for merging confidential documents like contracts, financial records, medical files, and legal agreements. PDFcraft physically cannot see your documents even if it wanted to.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Split PDF", href: "/tools/split-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Reorder Pages", href: "/tools/reorder-pages" },
            { name: "Delete Pages", href: "/tools/delete-pages" },
            { name: "JPG to PDF", href: "/tools/jpg-to-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
