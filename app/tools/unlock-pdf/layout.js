export const metadata = {
  title: "Unlock PDF — Remove Password Free Online | PDFcraft",
  description: "Remove password protection from a PDF you own for free online. No sign up, no file uploads. Enter current password to unlock instantly.",
  keywords: "unlock pdf free, remove pdf password online, pdf password remover free, unlock pdf no sign up, remove pdf protection",
  openGraph: {
    title: "Unlock PDF — Remove Password Free | PDFcraft",
    description: "Remove PDF password protection for free. No sign up, files never uploaded.",
    type: "website",
    url: "https://getpdfcraft.com/tools/unlock-pdf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock PDF — Remove Password Free | PDFcraft",
    description: "Remove PDF password protection for free. No sign up, files never uploaded.",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/unlock-pdf" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Unlock PDF",
  "description": "Remove password protection from a PDF you own for free online. Files never leave your device.",
  "url": "https://getpdfcraft.com/tools/unlock-pdf",
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40 }}>Unlock PDF — Remove Password Online Free</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft removes password protection from PDFs you own for free — entirely in your browser. Enter the current password to unlock your document. No sign up, no uploads, and your file never leaves your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>What does the Unlock PDF tool do?</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          The free PDF unlock tool removes password protection from documents you own. You must provide the correct current password — PDFcraft cannot crack or bypass passwords. This is by design: only authorized users who know the password can remove protection. Once unlocked, the PDF opens freely without any password prompt. Processing uses WebAssembly technology in your browser — your file and password never leave your device.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>How to unlock a PDF — step by step</h2>
        <ol style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
          <li>Click <strong>Select File</strong> and upload your password-protected PDF</li>
          <li>Enter the <strong>current password</strong> that protects the file</li>
          <li>Click <strong>Unlock PDF</strong></li>
          <li>Download the unlocked PDF — opens freely without any password</li>
        </ol>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Important — you must know the current password</h2>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
          PDFcraft requires the correct current password to remove protection. It cannot crack, guess, or bypass unknown passwords. This tool is for removing protection from PDFs you own and already have the password for — not for accessing documents without authorization.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 36 }}>Why remove PDF password protection?</h2>
        <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 2, paddingLeft: 20, marginBottom: 32 }}>
          <li>Stop entering the password every time you open a frequently used document</li>
          <li>Enable merging, compressing, or splitting a protected PDF</li>
          <li>Remove protection before sharing within a trusted organization</li>
          <li>Simplify access to personal documents stored on your own device</li>
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            { name: "Protect PDF", href: "/tools/protect-pdf" },
            { name: "Merge PDF", href: "/tools/merge-pdf" },
            { name: "Compress PDF", href: "/tools/compress-pdf" },
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
