import Link from "next/link";

export const metadata = {
  title: "How to Merge PDF Files Free Online (No Sign Up) | PDFcraft",
  description: "Step by step guide to combining multiple PDF files into one document. Free, instant, no sign up required. Works on Windows, Mac, iPhone and Android.",
  keywords: "how to merge pdf, combine pdf files free, merge pdf no sign up, join pdf online free, merge pdf without uploading",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-merge-pdf-free" },
  openGraph: {
    title: "How to Merge PDF Files Free Online — PDFcraft",
    description: "Step by step guide to merging PDFs for free. No sign up, no uploads, works instantly.",
    type: "article",
  },
};

export default function Post() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "80px 24px" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>← Back to Blog</Link>

      <div style={{ marginBottom: 40 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Merge PDF</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>
          How to Merge PDF Files Free Online (No Sign Up)
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af" }}>
          <span>January 15, 2026</span>
          <span>· 3 min read</span>
          <span>· By PDFcraft</span>
        </div>
      </div>

      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 24, fontSize: 18, color: "#111827", fontWeight: 500 }}>
          Need to combine multiple PDF files into one? PDFcraft makes it completely free, instant, and private — no sign up, no file uploads, no watermarks.
        </p>

        <div style={{ background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 14, padding: 24, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, color: "#15803D", marginBottom: 8, fontSize: 15 }}>✅ What you need</p>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#374151" }}>
            <li>Two or more PDF files on your device</li>
            <li>A web browser (Chrome, Firefox, Safari, Edge)</li>
            <li>That's it — no software, no account needed</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>Step by step guide</h2>

        {[
          { num: "01", title: "Go to PDFcraft Merge tool", body: `Open your browser and go to PDFcraft's Merge PDF tool. You don't need to create an account or sign in. The tool works immediately.` },
          { num: "02", title: "Select your PDF files", body: "Click the \"Select Files\" button and choose the PDF files you want to merge from your device. You can select multiple files at once by holding Ctrl (Windows) or Cmd (Mac) while clicking." },
          { num: "03", title: "Arrange the order", body: "Your files will appear in a list. They will be merged in the order shown. If you need to change the order, remove a file and re-add it in the right position." },
          { num: "04", title: "Click Merge PDFs", body: "Hit the big Merge button. Your browser will process the files locally — nothing gets uploaded to any server. This usually takes just a few seconds." },
          { num: "05", title: "Download your merged PDF", body: "Once complete, click Download. Your merged PDF will save directly to your device. The original files are not changed." },
        ].map(step => (
          <div key={step.num} style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, background: "#FEF2F2", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 13, color: "#DC2626" }}>{step.num}</div>
            <div>
              <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 17, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ color: "#6b7280", margin: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 16, marginTop: 40, letterSpacing: -0.5 }}>Frequently asked questions</h2>

        {[
          { q: "Is merging PDFs on PDFcraft really free?", a: "Yes, completely free. No hidden fees, no premium plan needed for merging. All tools on PDFcraft are free forever." },
          { q: "Are my files safe?", a: "Absolutely. PDFcraft processes files entirely in your browser. Your PDF files never leave your device and are never uploaded to any server. We physically cannot see your documents." },
          { q: "Is there a file size limit?", a: "There is no strict file size limit set by us. Very large files (500MB+) may be slow depending on your device's memory, but there is no artificial cap." },
          { q: "How many PDFs can I merge at once?", a: "As many as you want. Add as many files as you need — there is no limit." },
          { q: "Does it work on iPhone and Android?", a: "Yes. PDFcraft works on any device with a modern web browser including iPhone, Android, Windows, Mac and Linux." },
        ].map(faq => (
          <div key={faq.q} style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 20, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 8 }}>{faq.q}</h3>
            <p style={{ color: "#6b7280", margin: 0 }}>{faq.a}</p>
          </div>
        ))}

        <div style={{ background: "#111827", borderRadius: 20, padding: 36, textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontWeight: 800, fontSize: 24, color: "white", marginBottom: 12, letterSpacing: -0.5 }}>Ready to merge your PDFs?</h3>
          <p style={{ color: "#9ca3af", marginBottom: 24, fontSize: 15 }}>Free, instant, private. No sign up required.</p>
          <Link href="/tools/merge-pdf" style={{ display: "inline-block", background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
            Merge PDF Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
