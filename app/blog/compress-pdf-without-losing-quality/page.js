import Link from "next/link";

export const metadata = {
  title: "How to Compress PDF Without Losing Quality (Free) | PDFcraft",
  description: "Learn how to reduce PDF file size without losing quality. Free online tool, no sign up, works in browser. Compress PDF files instantly.",
  keywords: "compress pdf without losing quality, reduce pdf size free, compress pdf online free, shrink pdf file size, compress pdf no sign up",
  alternates: { canonical: "https://getpdfcraft.com/blog/compress-pdf-without-losing-quality" },
};

export default function Post() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "80px 24px" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>← Back to Blog</Link>

      <div style={{ marginBottom: 40 }}>
        <span style={{ background: "#FEFCE8", color: "#CA8A04", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Compress PDF</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>
          How to Compress PDF Without Losing Quality
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af" }}>
          <span>January 18, 2026</span><span>· 4 min read</span><span>· By PDFcraft</span>
        </div>
      </div>

      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 24, fontSize: 18, color: "#111827", fontWeight: 500 }}>
          Large PDF files are a headache — too big to email, too slow to upload. Here's how to compress them for free without making them blurry or unreadable.
        </p>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>Why are PDFs so large?</h2>
        <p style={{ marginBottom: 16 }}>PDFs can be large for several reasons: high resolution images embedded in the file, duplicate fonts, uncompressed data, or unnecessary metadata. Compression removes this bloat without affecting the actual content you see.</p>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>How to compress a PDF for free</h2>

        {[
          { num: "01", title: "Open PDFcraft Compress tool", body: "Go to PDFcraft and click Compress PDF. No account needed, works immediately." },
          { num: "02", title: "Upload your PDF", body: "Click Select File and choose your PDF. The file is read locally — never uploaded to a server." },
          { num: "03", title: "Click Compress", body: "Hit the Compress PDF button. Your browser processes the file and removes unnecessary data to reduce the size." },
          { num: "04", title: "Download compressed file", body: "You'll see the original vs new file size. Click Download to save the compressed PDF to your device." },
        ].map(step => (
          <div key={step.num} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, background: "#FEFCE8", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 13, color: "#CA8A04" }}>{step.num}</div>
            <div>
              <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 17, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ color: "#6b7280", margin: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}

        <div style={{ background: "#FEFCE8", border: "1px solid #fde68a", borderRadius: 14, padding: 24, marginTop: 32, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, color: "#92400E", marginBottom: 8 }}>💡 Pro tip</p>
          <p style={{ color: "#78350F", margin: 0 }}>If your PDF is still too large after compression, it likely contains very high resolution images. The best way to reduce size further is to re-export the original document at a lower image quality setting from whatever app created it.</p>
        </div>

        <div style={{ background: "#111827", borderRadius: 20, padding: 36, textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontWeight: 800, fontSize: 24, color: "white", marginBottom: 12 }}>Compress your PDF now</h3>
          <p style={{ color: "#9ca3af", marginBottom: 24 }}>Free, instant, private. Files never leave your device.</p>
          <Link href="/tools/compress-pdf" style={{ display: "inline-block", background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
            Compress PDF Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
