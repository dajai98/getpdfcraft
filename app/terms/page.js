export const metadata = {
  title: "Terms of Service — PDFcraft",
  description: "PDFcraft terms of service. Free PDF tools by Dajai Studio.",
  alternates: { canonical: "https://getpdfcraft.com/terms" },
};

export default function Terms() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Legal</span>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 15, color: "#9ca3af" }}>Last updated: January 2026</p>
      </div>

      {[
        {
          num: "01",
          title: "Acceptance of Terms",
          body: "By using PDFcraft you agree to these Terms of Service. If you do not agree, please do not use PDFcraft. These terms apply to all users of the website.",
        },
        {
          num: "02",
          title: "Free Service",
          body: "PDFcraft is provided free of charge. We reserve the right to change, suspend, or discontinue any aspect of the service at any time without notice.",
        },
        {
          num: "03",
          title: "Your Files and Privacy",
          body: "PDFcraft processes all files locally in your browser. We do not upload, store, or access your files in any way. You retain full ownership of all files you process using PDFcraft.",
        },
        {
          num: "04",
          title: "Acceptable Use",
          body: "You agree to use PDFcraft only for lawful purposes. You must not use PDFcraft to process files containing illegal content, violate intellectual property rights, or harm other users. You are solely responsible for the content of files you process.",
        },
        {
          num: "05",
          title: "Disclaimer of Warranties",
          body: "PDFcraft is provided as-is without any warranties of any kind. We do not guarantee that the service will be error-free, uninterrupted, or suitable for your specific purpose. Use PDFcraft at your own risk.",
        },
        {
          num: "06",
          title: "Limitation of Liability",
          body: "Dajai Studio shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of PDFcraft. This includes but is not limited to data loss, file corruption, or loss of business. Always keep backups of important documents.",
        },
        {
          num: "07",
          title: "Advertising",
          body: "PDFcraft displays advertisements through Google AdSense to fund the free service. By using PDFcraft you agree to the display of these advertisements.",
        },
        {
          num: "08",
          title: "Intellectual Property",
          body: "PDFcraft and all its content, design, and code are owned by Dajai Studio. You may not copy, reproduce, or distribute any part of PDFcraft without written permission.",
        },
        {
          num: "09",
          title: "Changes to Terms",
          body: "We reserve the right to update these terms at any time. Continued use of PDFcraft after changes constitutes acceptance of the new terms.",
        },
        {
          num: "10",
          title: "Contact",
          body: "Questions about these terms? Contact us through Dajai Studio.",
        },
      ].map(s => (
        <div key={s.num} style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, background: "#FEF2F2", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 12, color: "#DC2626" }}>{s.num}</div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{s.title}</h2>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
