export const metadata = {
  title: "Protect PDF with Password Free Online | PDFcraft",
  description: "Add 256-bit AES password protection to any PDF for free online. No sign up, no file uploads. Your files never leave your device.",
  keywords: "protect pdf password free, password protect pdf online, secure pdf free, lock pdf online no sign up, encrypt pdf free",
  openGraph: {
    title: "Protect PDF with Password Free — PDFcraft",
    description: "Add AES password protection to PDF for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/protect-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protect PDF with Password Free — PDFcraft",
    description: "Add AES password protection to PDF for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/protect-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Protect PDF",
  "description": "Add 256-bit AES password protection to any PDF for free. Files never leave your device.",
  "url": "https://getpdfcraft.com/tools/protect-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Protect PDF with Password Online — Free</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft adds 256-bit AES password protection to any PDF for free — entirely in your browser. Your file and your password never leave your device. No sign up, no uploads, military-grade encryption.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Protect PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF password protection tool encrypts your PDF document using 256-bit AES encryption — the same standard used by banks, governments, and military organizations worldwide. Once protected, anyone who tries to open the PDF will be asked for the password before any content is displayed. The encryption and protection process runs entirely in your browser using WebAssembly technology — your file and password never get sent to any server.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to password protect a PDF — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your PDF</li>
          <li>Enter a strong password — use 8+ characters with letters, numbers, and symbols</li>
          <li>Confirm the password</li>
          <li>Click <strong>Protect PDF</strong></li>
          <li>Download the password-protected PDF</li>
          <li>Share the password through a separate channel from the file</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why protect PDFs with a password?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Protect confidential contracts and legal agreements</li>
          <li>Secure financial reports and bank statements</li>
          <li>Protect medical records and personal health information</li>
          <li>Secure HR documents, payslips, and employment contracts</li>
          <li>Protect personal identification documents before emailing</li>
          <li>Control access to sensitive business proposals</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Is PDFcraft safe for protecting confidential documents?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          PDFcraft is the safest free option for password protecting PDFs. Unlike other tools that upload your file to their servers for processing, PDFcraft uses WebAssembly to encrypt everything locally in your browser. Your PDF and your chosen password never leave your device — not even for a millisecond. This makes PDFcraft suitable for the most sensitive documents.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Unlock PDF", href: "/tools/unlock-pdf" },
            { name: "Watermark PDF", href: "/tools/watermark-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Split PDF", href: "/tools/split-pdf" },
          ].map(t => (
            <a key={t.name} href={t.href} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>{t.name}</a>
          ))}
        </div>
      </div>
    </>
  );
}
