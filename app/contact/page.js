export const metadata = {
  title: "Contact PDFcraft — Get in Touch",
  description: "Have a question, suggestion, or found a bug? Contact Rai Dajai at PDFcraft at support@getpdfcraft.com",
  openGraph: { title: "Contact PDFcraft — Get in Touch", description: "Have a question, suggestion, or found a bug? Contact Rai Dajai at PDFcraft at support@getpdfcraft.com", url: "https://getpdfcraft.com/contact", type: "website", images: [{ url: "/og.svg", width: 1200, height: 630, alt: "PDFcraft by Dajai Studio" }] },
  twitter: { card: "summary_large_image", title: "Contact PDFcraft — Get in Touch", description: "Have a question, suggestion, or found a bug? Contact Rai Dajai at PDFcraft at support@getpdfcraft.com", images: ["/og.svg"] },
  alternates: { canonical: "https://getpdfcraft.com/contact" },
};

export default function Contact() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Contact</span>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 16, letterSpacing: -2, lineHeight: 1.1 }}>
          Get in touch
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7 }}>
          Have a question, suggestion, or found a bug? I&apos;d love to hear from you.
          PDFcraft is built and maintained by one person, and I read every message.
        </p>
      </div>

      {/* Contact card */}
      <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 20, padding: 40, marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 24, letterSpacing: -0.5 }}>
          Send an email
        </h2>
        <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 14, padding: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>📧</div>
          <div>
            <p style={{ fontWeight: 700, color: "#111827", fontSize: 15, marginBottom: 4 }}>Support</p>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Questions, factual corrections, feedback, bug reports</p>
            <a
              href="mailto:support@getpdfcraft.com"
              style={{ color: "#E8380D", fontWeight: 600, fontSize: 15, textDecoration: "none" }}
            >
              support@getpdfcraft.com
            </a>
          </div>
        </div>
      </div>

      <p style={{ lineHeight: 1.7, marginBottom: 32 }}>For a factual correction, include the page URL, the wording in question, and any supporting source. For a tool problem, include the tool name and error message. Do not email private documents or passwords.</p>

      {/* Response time */}
      <div style={{ background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 24, marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <div>
            <p style={{ fontWeight: 700, color: "#15803D", fontSize: 15, marginBottom: 4 }}>I&apos;ll reply as soon as I can</p>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>PDFcraft is built and run by one person. I do my best to respond, but response times vary.</p>
          </div>
        </div>
      </div>

      {/* FAQ tip */}
      <div style={{ background: "#EFF6FF", border: "1px solid #bfdbfe", borderRadius: 16, padding: 24, marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>💡</span>
          <div>
            <p style={{ fontWeight: 700, color: "#1d4ed8", fontSize: 15, marginBottom: 4 }}>Looking for quick answers?</p>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Each tool page has a detailed FAQ section. Check <a href="/#tools" style={{ color: "#E8380D" }}>the tool you are using</a> — your question may already be answered there.</p>
          </div>
        </div>
      </div>

      {/* Studio info */}
      <div style={{ background: "#111827", borderRadius: 20, padding: 32, color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, background: "#E8380D", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>D</div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Dajai Studio</span>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>
          PDFcraft is built by Rai Dajai under Dajai Studio — an indie studio from Nepal.
        </p>
        <a
          href="https://www.youtube.com/@dajaistudio"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}
        >
          📺 YouTube @dajaistudio →
        </a>
      </div>
    </div>
  );
}