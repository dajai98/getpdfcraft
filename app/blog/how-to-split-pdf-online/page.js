import Link from "next/link";

export const metadata = {
  title: "How to Split a PDF Into Separate Pages Free Online | PDFcraft",
  description: "Split any PDF into individual pages or custom ranges. Free, no sign up, works in browser. Step by step guide to splitting PDFs online.",
  keywords: "how to split pdf, split pdf into pages, extract pages from pdf free, split pdf online no sign up, separate pdf pages free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-split-pdf-online" },
};

export default function Post() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "80px 24px" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>← Back to Blog</Link>
      <div style={{ marginBottom: 40 }}>
        <span style={{ background: "#FFF7ED", color: "#EA580C", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Split PDF</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>
          How to Split a PDF Into Separate Pages Online Free
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af" }}>
          <span>January 22, 2026</span><span>· 3 min read</span><span>· By PDFcraft</span>
        </div>
      </div>
      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 24, fontSize: 18, color: "#111827", fontWeight: 500 }}>Need to extract specific pages from a PDF or split it into individual files? PDFcraft does it for free in seconds — no sign up, no software.</p>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>Two ways to split</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { title: "Split all pages", desc: "Every page becomes its own PDF file. Perfect for separating a scanned document.", color: "#EA580C", bg: "#FFF7ED" },
            { title: "Split by range", desc: "Choose specific pages like '1-3, 5, 8-10'. Perfect for extracting sections.", color: "#2563EB", bg: "#EFF6FF" },
          ].map(m => (
            <div key={m.title} style={{ background: m.bg, borderRadius: 14, padding: 24 }}>
              <p style={{ fontWeight: 700, color: m.color, marginBottom: 8, fontSize: 16 }}>{m.title}</p>
              <p style={{ color: "#374151", fontSize: 14, margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>
        {[
          { num: "01", title: "Open PDFcraft Split tool", body: "Go to PDFcraft and click Split PDF. Works in any browser, no account needed." },
          { num: "02", title: "Select your PDF", body: "Click Select File and choose your PDF. The file stays on your device throughout." },
          { num: "03", title: "Choose split method", body: "Select 'All pages' to get each page as a separate PDF, or 'Page range' to specify exactly which pages you want." },
          { num: "04", title: "Enter page range (optional)", body: "If splitting by range, enter something like '1-5, 8, 10-12'. Each range becomes a separate PDF." },
          { num: "05", title: "Download your files", body: "Each split section downloads as a separate PDF. Download them all or pick the ones you need." },
        ].map(step => (
          <div key={step.num} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, background: "#FFF7ED", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 13, color: "#EA580C" }}>{step.num}</div>
            <div>
              <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 17, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ color: "#6b7280", margin: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}
        <div style={{ background: "#111827", borderRadius: 20, padding: 36, textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontWeight: 800, fontSize: 24, color: "white", marginBottom: 12 }}>Split your PDF now</h3>
          <p style={{ color: "#9ca3af", marginBottom: 24 }}>Free, instant, private. No sign up required.</p>
          <Link href="/tools/split-pdf" style={{ display: "inline-block", background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>Split PDF Free →</Link>
        </div>
      </div>
    </div>
  );
}
