export const metadata = {
  title: "Privacy Policy — PDFcraft",
  description: "PDFcraft privacy policy. Your files never leave your device. We never store, upload or share your documents.",
};

export default function Privacy() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Privacy Policy</span>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 16, letterSpacing: -2, lineHeight: 1.1 }}>
          We don't see<br />your files. Ever.
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7 }}>
          Last updated: January 2026. This policy explains exactly what data we collect, how we use it, and what we absolutely never do.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 48 }}>
        {[
          {
            num: "01",
            title: "Your files stay on your device — guaranteed",
            desc: "PDFcraft processes all PDF files entirely within your web browser using JavaScript. No file, page, or byte of your document is ever transmitted to our servers or any third-party server. This is not a policy promise — it is a technical fact. We have no server to receive your files.",
            highlight: true,
          },
          {
            num: "02",
            title: "We collect zero personal information",
            desc: "We do not ask for your name, email, phone number, or any personal details. There is no account system. You are completely anonymous when using PDFcraft. We have no idea who you are and no way to find out.",
          },
          {
            num: "03",
            title: "Advertising — how we stay free",
            desc: "PDFcraft uses Google AdSense to display advertisements. Google may use cookies to show you relevant ads based on your browsing history across the web. This is standard advertising technology used by millions of websites. You can opt out at any time via Google's Ad Settings at adssettings.google.com.",
          },
          {
            num: "04",
            title: "Cookies",
            desc: "We use only the cookies that Google AdSense requires to function. We do not set any cookies ourselves. We do not use cookies to track, identify, or build profiles of our users.",
          },
          {
            num: "05",
            title: "Third party services",
            desc: "We use Google AdSense for advertising. Google's privacy policy applies to their services. We do not share any data with any other third parties because we do not collect any data to share.",
          },
          {
            num: "06",
            title: "Children",
            desc: "PDFcraft does not knowingly collect information from children under 13. Our tools are general purpose and designed for adults and working professionals.",
          },
          {
            num: "07",
            title: "Changes to this policy",
            desc: "If we make changes to this privacy policy we will update the date at the top of this page. Continued use of PDFcraft after changes means you accept the updated policy.",
          },
          {
            num: "08",
            title: "Contact",
            desc: "Questions about this privacy policy? Contact us through Dajai Studio. We will respond to all legitimate privacy inquiries.",
          },
        ].map(section => (
          <div key={section.num} style={{
            background: section.highlight ? "#111827" : "#f9fafb",
            border: `1px solid ${section.highlight ? "#111827" : "#f3f4f6"}`,
            borderRadius: 16,
            padding: 32,
            marginBottom: 12,
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: section.highlight ? "#E8380D" : "#d1d5db", letterSpacing: 1, flexShrink: 0, marginTop: 3 }}>{section.num}</span>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: section.highlight ? "white" : "#111827", marginBottom: 8 }}>{section.title}</h2>
                <p style={{ fontSize: 15, color: section.highlight ? "#9ca3af" : "#6b7280", lineHeight: 1.7, margin: 0 }}>{section.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
