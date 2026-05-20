import Link from "next/link";

export const metadata = {
  title: "How to Convert PDF to JPG Free Online — No Watermark | PDFcraft",
  description: "Convert PDF pages to high quality JPG images for free. No watermark, no sign up, works in browser. Step by step guide.",
  keywords: "convert pdf to jpg free, pdf to jpg no watermark, pdf to image online free, pdf to png free no sign up, convert pdf to picture",
  alternates: { canonical: "https://getpdfcraft.com/blog/convert-pdf-to-jpg-free" },
};

export default function Post() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "80px 24px" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>← Back to Blog</Link>

      <div style={{ marginBottom: 40 }}>
        <span style={{ background: "#F0FDF4", color: "#16A34A", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>PDF to Image</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>
          How to Convert PDF to JPG Free — No Watermark
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af" }}>
          <span>January 20, 2026</span><span>· 3 min read</span><span>· By PDFcraft</span>
        </div>
      </div>

      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 24, fontSize: 18, color: "#111827", fontWeight: 500 }}>
          Need to turn a PDF page into an image? Whether for Instagram, WhatsApp, or a presentation — PDFcraft converts PDF to JPG or PNG for free with zero watermarks.
        </p>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>JPG vs PNG — which should you choose?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { format: "JPG", color: "#DC2626", bg: "#FEF2F2", pros: ["Smaller file size", "Great for photos", "Best for sharing online"], cons: ["Slight quality loss", "No transparency"] },
            { format: "PNG", color: "#16A34A", bg: "#F0FDF4", pros: ["Lossless quality", "Supports transparency", "Best for text/diagrams"], cons: ["Larger file size"] },
          ].map(f => (
            <div key={f.format} style={{ background: f.bg, borderRadius: 14, padding: 20 }}>
              <p style={{ fontWeight: 800, fontSize: 20, color: f.color, marginBottom: 12 }}>{f.format}</p>
              <div style={{ fontSize: 13, color: "#374151" }}>
                {f.pros.map(p => <div key={p} style={{ marginBottom: 4 }}>✅ {p}</div>)}
                {f.cons.map(c => <div key={c} style={{ marginBottom: 4 }}>⚠️ {c}</div>)}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>How to convert PDF to image</h2>
        {[
          { num: "01", title: "Open PDF to Image tool", body: "Go to PDFcraft and click PDF to Image. No account or software needed." },
          { num: "02", title: "Select your PDF", body: "Click Select File and choose your PDF. Works with any PDF — text documents, scanned files, presentations." },
          { num: "03", title: "Choose JPG or PNG", body: "Select your output format. JPG for photos and sharing, PNG for text documents and diagrams." },
          { num: "04", title: "Click Convert", body: "Your browser renders each page as a high quality image. You'll see a progress bar for multi-page documents." },
          { num: "05", title: "Download your images", body: "Download individual pages or click Download All to get every page at once. No watermarks added." },
        ].map(step => (
          <div key={step.num} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, background: "#F0FDF4", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 13, color: "#16A34A" }}>{step.num}</div>
            <div>
              <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 17, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ color: "#6b7280", margin: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}

        <div style={{ background: "#111827", borderRadius: 20, padding: 36, textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontWeight: 800, fontSize: 24, color: "white", marginBottom: 12 }}>Convert PDF to image now</h3>
          <p style={{ color: "#9ca3af", marginBottom: 24 }}>Free, no watermark, no sign up. High quality output.</p>
          <Link href="/tools/pdf-to-image" style={{ display: "inline-block", background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
            PDF to Image Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
