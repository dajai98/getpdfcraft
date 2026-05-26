
export const metadata = {
  title: "About PDFcraft — Built by Rai Dajai, Dajai Studio",
  description: "PDFcraft is built by Rai Dajai, a developer from Nepal. Free browser-based PDF tools with no uploads, no sign up, no cost. Here's the story behind it.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dajai Studio",
  "url": "https://getpdfcraft.com",
  "logo": "https://getpdfcraft.com/og.svg",
  "founder": {
    "@type": "Person",
    "name": "Rai Dajai",
    "jobTitle": "Game & Web Developer",
    "nationality": "Nepali"
  },
  "description": "Dajai Studio is an indie studio from Nepal building free tools and games.",
  "sameAs": [
    "https://www.youtube.com/@dajaistudio",
    "https://play.google.com/store/apps/developer?id=Dajai+Studio"
  ]
};

export default function About() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
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

      {/* Personal story */}
      <div style={{ borderLeft: "3px solid #E8380D", paddingLeft: 24, marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20, letterSpacing: -0.5 }}>
          Why I built PDFcraft
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
          <p>Hi, I'm Rai Dajai — a developer from Nepal, currently working in Saudi Arabia.</p>
          <p>I built PDFcraft because I was frustrated with how most PDF tools work. Almost every site I tried asked me to upload my files to their servers, create an account, or pay after a few uses. I didn't want that.</p>
          <p>I just wanted simple PDF tools that respected privacy.</p>
          <p>So I built PDFcraft differently.</p>
          <p>PDFcraft works entirely in your browser. Your files never leave your device. Nothing is uploaded to a server, no account is required, and no one can see your documents. Open the tool, use it, and move on.</p>
          <p>I also wanted it to stay truly free. Many PDF websites start free, then slowly lock features behind subscriptions or usage limits. PDFcraft is built with a different philosophy — free forever, no tricks, no forced sign-ups, and no artificial limits.</p>
          <p>My journey into development has been unconventional. I left college in 2019 when COVID disrupted everything. Since then, I've been learning by building — experimenting with game development, Android apps, and web projects alongside friends.</p>
          <p>Most of my work is published under Dajai Studio, where I build Android games and apps. One of my projects, BrainStorm Quiz, is available on Google Play.</p>
          <p>PDFcraft is my first serious web project, and I'm proud of it.</p>
          <p>This project is still growing. I'm continuing to improve the tools, add new features, and make the experience faster and more private over time. My goal is simple:</p>
          <p style={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>Build useful tools that people can trust.</p>
          <p>Thanks for using PDFcraft.</p>
          <p style={{ fontWeight: 700, color: "#111827" }}>— Rai Dajai 🇳🇵</p>
        </div>
      </div>

      {/* Core values */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
        {[
          {
            icon: "🔒",
            title: "Your files never leave your device",
            desc: "Every tool on PDFcraft runs entirely inside your browser. When you select a PDF, it never touches any server — it is processed in your device's memory and downloaded straight back to you. We physically cannot see your files even if we wanted to.",
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

      {/* Dajai Studio */}
      <div style={{ background: "#111827", borderRadius: 20, padding: 40, color: "white", marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: "#E8380D", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>D</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Dajai Studio</span>
        </div>
        <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7, marginBottom: 20 }}>
          Dajai Studio is an indie studio from Nepal. We build free tools and games —
          PDFcraft for the web, and Android apps like BrainStorm Quiz on Google Play.
        </p>
        <a
          href="https://www.youtube.com/@dajaistudio"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E8380D", color: "white", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14 }}
        >
          📺 YouTube @dajaistudio
        </a>
      </div>

      {/* Legal note */}
      <div style={{ background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 16, padding: 24 }}>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: "#111827" }}>Legal note:</strong> PDFcraft is provided as-is for personal and professional use.
          We are not responsible for misuse of the tools or any data loss. Always keep backups of important documents.
          By using PDFcraft you agree to our{" "}
          <a href="/privacy" style={{ color: "#E8380D" }}>Privacy Policy</a> and{" "}
          <a href="/terms" style={{ color: "#E8380D" }}>Terms of Service</a>.
        </p>
      </div>
    </div>
  );
}