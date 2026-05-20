import Link from "next/link";

export const metadata = {
  title: "How to Remove Password From PDF Free Online | PDFcraft",
  description: "Remove password protection from any PDF file instantly. Free, no sign up, works in browser. Your files never leave your device.",
  keywords: "remove password from pdf, unlock pdf free, decrypt pdf online, remove pdf password no sign up, unlock pdf without password",
  alternates: { canonical: "https://getpdfcraft.com/blog/remove-password-from-pdf" },
};

export default function Post() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "80px 24px" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>← Back to Blog</Link>
      <div style={{ marginBottom: 40 }}>
        <span style={{ background: "#EEF2FF", color: "#4F46E5", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Unlock PDF</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>
          How to Remove Password From PDF Free Online
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af" }}>
          <span>January 25, 2026</span><span>· 3 min read</span><span>· By PDFcraft</span>
        </div>
      </div>
      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 24, fontSize: 18, color: "#111827", fontWeight: 500 }}>Got a password protected PDF you own and want to remove the password? PDFcraft unlocks it instantly for free — no software, no sign up needed.</p>

        <div style={{ background: "#FEF2F2", border: "1px solid #fecaca", borderRadius: 14, padding: 24, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, color: "#DC2626", marginBottom: 8 }}>⚠️ Important note</p>
          <p style={{ color: "#7f1d1d", margin: 0 }}>Only unlock PDFs that you own or have permission to unlock. Do not use this tool to bypass security on documents you don't have rights to access.</p>
        </div>

        {[
          { num: "01", title: "Go to Unlock PDF tool", body: "Open PDFcraft and click Unlock PDF. No account needed." },
          { num: "02", title: "Select your protected PDF", body: "Click Select File and choose your password protected PDF." },
          { num: "03", title: "Enter the password", body: "Type the current password for the PDF. PDFcraft uses it to decrypt the file locally in your browser." },
          { num: "04", title: "Click Unlock", body: "Your browser removes the password protection from the file. This happens entirely on your device." },
          { num: "05", title: "Download unlocked PDF", body: "Download the unlocked PDF. The file is now free of password protection and opens normally." },
        ].map(step => (
          <div key={step.num} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, background: "#EEF2FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 13, color: "#4F46E5" }}>{step.num}</div>
            <div>
              <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 17, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ color: "#6b7280", margin: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}

        <div style={{ background: "#111827", borderRadius: 20, padding: 36, textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontWeight: 800, fontSize: 24, color: "white", marginBottom: 12 }}>Unlock your PDF now</h3>
          <p style={{ color: "#9ca3af", marginBottom: 24 }}>Free, private, instant. Files never leave your device.</p>
          <Link href="/tools/unlock-pdf" style={{ display: "inline-block", background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>Unlock PDF Free →</Link>
        </div>
      </div>
    </div>
  );
}
