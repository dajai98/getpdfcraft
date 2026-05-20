export const metadata = {
  title: "About PDFcraft — Free PDF Tools by Dajai Studio",
  description: "PDFcraft is a free browser-based PDF toolkit. No uploads, no sign up, no cost. Built by Dajai Studio.",
};

export default function About() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>About</span>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 16, letterSpacing: -2, lineHeight: 1.1 }}>
          Built to be free.<br />Forever.
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7 }}>
          PDFcraft gives everyone access to professional PDF tools at zero cost.
          No hidden fees. No subscriptions. No tricks.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
        {[
          {
            icon: "🔒",
            title: "Your files never leave your device",
            desc: "Every single tool on PDFcraft runs entirely inside your browser. When you upload a PDF, it never touches any server — it is processed in your device's memory and downloaded straight back to you. We physically cannot see your files even if we wanted to.",
          },
          {
            icon: "⚡",
            title: "No account. No waiting. No limits.",
            desc: "We don't ask for your email. We don't make you sign up. We don't put daily limits on free users. Every tool works instantly, unlimited times, for free. That is the whole point.",
          },
          {
            icon: "🌍",
            title: "Free for everyone, everywhere",
            desc: "PDFcraft is kept free through non-intrusive advertising. Ads pay the bills so you don't have to. You get professional tools, we keep the lights on. Simple.",
          },
        ].map(item => (
          <div key={item.title} style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 16, padding: 32, display: "flex", gap: 20 }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 17, color: "#111827", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#111827", borderRadius: 20, padding: 40, color: "white", marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: "#E8380D", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>D</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Dajai Studio</span>
        </div>
        <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7 }}>
          PDFcraft is built by Dajai Studio, an indie studio from Nepal.
          We also build mobile apps and games like BrainStorm Quiz on Google Play.
        </p>
      </div>

      <div style={{ background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 16, padding: 24 }}>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: "#111827" }}>Legal note:</strong> PDFcraft is provided as-is for personal and professional use.
          We are not responsible for misuse of the tools or any data loss. Always keep backups of important documents.
          By using PDFcraft you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  );
}
