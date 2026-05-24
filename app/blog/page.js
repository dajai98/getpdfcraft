"use client";
import Link from "next/link";

const posts = [
  { slug: "how-to-merge-pdf-free", title: "How to Merge PDF Files Free Online (No Sign Up)", desc: "Step by step guide to combining multiple PDF files into one.", date: "Jan 15, 2026", tag: "Merge PDF", tagColor: "#DC2626", tagBg: "#FEF2F2" },
  { slug: "compress-pdf-without-losing-quality", title: "How to Compress PDF Without Losing Quality", desc: "Reduce your PDF file size while keeping it sharp and readable.", date: "Jan 18, 2026", tag: "Compress", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "convert-pdf-to-jpg-free", title: "How to Convert PDF to JPG Free — No Watermark", desc: "Turn any PDF page into a high quality image for free.", date: "Jan 20, 2026", tag: "PDF to Image", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-split-pdf-online", title: "How to Split a PDF Into Separate Pages Online Free", desc: "Extract specific pages or split a PDF into individual files.", date: "Jan 22, 2026", tag: "Split PDF", tagColor: "#EA580C", tagBg: "#FFF7ED" },
  { slug: "remove-password-from-pdf", title: "How to Remove Password From PDF Free Online", desc: "Unlock any password protected PDF file instantly.", date: "Jan 25, 2026", tag: "Unlock PDF", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "ilovepdf-alternative", title: "Best Free iLovePDF Alternative in 2026", desc: "PDFcraft vs iLovePDF — privacy, features, and price comparison.", date: "Feb 1, 2026", tag: "Comparison", tagColor: "#7C3AED", tagBg: "#F5F3FF" },
  { slug: "smallpdf-alternative", title: "Best Free Smallpdf Alternative in 2026", desc: "No usage limits, no sign up. The better free alternative.", date: "Feb 2, 2026", tag: "Comparison", tagColor: "#7C3AED", tagBg: "#F5F3FF" },
  { slug: "adobe-acrobat-alternative-free", title: "Free Adobe Acrobat Alternative Online in 2026", desc: "Adobe Acrobat costs $239/year. PDFcraft does it for free.", date: "Feb 3, 2026", tag: "Comparison", tagColor: "#7C3AED", tagBg: "#F5F3FF" },
  { slug: "merge-pdf-on-iphone", title: "How to Merge PDF on iPhone Free (No App Needed)", desc: "Works directly in Safari. No App Store download needed.", date: "Feb 4, 2026", tag: "iPhone", tagColor: "#1D4ED8", tagBg: "#EFF6FF" },
  { slug: "merge-pdf-on-android", title: "How to Merge PDF on Android Free (No App Needed)", desc: "Works in Chrome browser. No installation required.", date: "Feb 5, 2026", tag: "Android", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "compress-pdf-for-whatsapp", title: "How to Compress PDF for WhatsApp (Under 100MB) Free", desc: "WhatsApp limits PDF files to 100MB. Here is how to fix that.", date: "Feb 6, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "what-is-pdf", title: "What is a PDF File? Complete Guide (2026)", desc: "Everything you need to know about the PDF format.", date: "Feb 7, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "how-to-compress-pdf-for-email", title: "How to Compress PDF for Email (Free, Under 25MB)", desc: "Most email providers limit attachments to 25MB. Here is the fix.", date: "Feb 8, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "pdf-vs-word-which-is-better", title: "PDF vs Word — Which Format Should You Use?", desc: "When to use PDF and when to use Word for different situations.", date: "Feb 9, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "how-to-protect-pdf-with-password", title: "How to Password Protect a PDF Free Online", desc: "Add password protection to sensitive PDFs in seconds.", date: "Feb 10, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-add-watermark-to-pdf", title: "How to Add Watermark to PDF Free Online", desc: "Stamp CONFIDENTIAL, DRAFT, or any custom text on your PDF.", date: "Feb 11, 2026", tag: "Guide", tagColor: "#9333EA", tagBg: "#FAF5FF" },
  { slug: "best-free-pdf-tools-online", title: "10 Best Free PDF Tools Online in 2026", desc: "The best truly free PDF tools with no sign up and no limits.", date: "Feb 12, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "how-to-convert-jpg-to-pdf", title: "How to Convert JPG to PDF Free Online", desc: "Turn images into PDF instantly. No watermark, no sign up.", date: "Feb 13, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-edit-pdf-free", title: "How to Edit a PDF for Free Online (2026 Guide)", desc: "Edit PDFs without Adobe Acrobat. Works in your browser.", date: "Feb 14, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "pdf-file-size-too-large", title: "PDF File Size Too Large? Here Is How to Fix It Free", desc: "Why PDFs get large and how to reduce their size for free.", date: "Feb 15, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "how-to-rotate-pdf", title: "How to Rotate a PDF Free Online — Fix Page Orientation", desc: "Fix upside down or sideways PDF pages in one click.", date: "Feb 16, 2026", tag: "Guide", tagColor: "#2563EB", tagBg: "#EFF6FF" },
  { slug: "how-to-unlock-pdf-without-password", title: "How to Unlock a PDF Without Password (Free)", desc: "Locked out of your PDF? Here are your options.", date: "Feb 17, 2026", tag: "Security", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "pdf-to-word-free", title: "PDF to Word Free Online — Best Options in 2026", desc: "Convert PDF to Word document free. Compare the best tools.", date: "Feb 18, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-sign-pdf-free", title: "How to Sign a PDF Free Online (No Adobe Needed)", desc: "Add your signature to a PDF for free in your browser.", date: "Feb 19, 2026", tag: "Guide", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "split-pdf-into-two", title: "How to Split a PDF Into Two Files Free Online", desc: "Divide any PDF into two separate files by page range.", date: "Feb 20, 2026", tag: "Split PDF", tagColor: "#EA580C", tagBg: "#FFF7ED" },
  { slug: "how-to-make-pdf-smaller", title: "How to Make a PDF Smaller — 5 Free Methods (2026)", desc: "5 proven ways to reduce PDF size starting with the easiest.", date: "Feb 21, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "convert-pdf-to-png-free", title: "How to Convert PDF to PNG Free Online", desc: "High quality PNG output, no watermark, no sign up.", date: "Feb 22, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-merge-pdf-on-mac", title: "How to Merge PDF on Mac — Free Methods (2026)", desc: "Use Preview or PDFcraft to merge PDFs on Mac for free.", date: "Feb 23, 2026", tag: "Mac", tagColor: "#374151", tagBg: "#F9FAFB" },
  { slug: "how-to-merge-pdf-on-windows", title: "How to Merge PDF on Windows Free (No Software)", desc: "Merge PDFs on Windows without installing any software.", date: "Feb 24, 2026", tag: "Windows", tagColor: "#2563EB", tagBg: "#EFF6FF" },
  { slug: "how-to-compress-pdf-on-iphone", title: "How to Compress PDF on iPhone Free (No App)", desc: "Compress PDFs in Safari on iPhone. No download needed.", date: "Feb 25, 2026", tag: "iPhone", tagColor: "#1D4ED8", tagBg: "#EFF6FF" },
  { slug: "how-to-extract-pages-from-pdf", title: "How to Extract Pages From a PDF Free Online", desc: "Get just the pages you need from any PDF file.", date: "Feb 26, 2026", tag: "Split PDF", tagColor: "#EA580C", tagBg: "#FFF7ED" },
  { slug: "pdf-security-guide", title: "PDF Security Guide — How to Protect Your Documents", desc: "Complete guide to PDF passwords, encryption and watermarks.", date: "Feb 27, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-convert-pdf-to-excel", title: "How to Convert PDF to Excel Free Online (2026)", desc: "Best methods for PDF to Excel conversion in 2026.", date: "Feb 28, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "reduce-pdf-size-without-software", title: "How to Reduce PDF Size Without Software (Free)", desc: "Browser-based methods that work on any device.", date: "Mar 1, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "how-to-combine-pdf-and-images", title: "How to Combine PDF and Images Into One File Free", desc: "Merge PDFs and images together into one document.", date: "Mar 2, 2026", tag: "Guide", tagColor: "#DC2626", tagBg: "#FEF2F2" },
];

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 60 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Blog</span>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -2, lineHeight: 1.1 }}>
          PDF Tips &amp; Guides
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.6 }}>
          {posts.length} free guides to help you work with PDFs faster.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 16, padding: "20px 24px", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ background: post.tagBg, color: post.tagColor, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.8 }}>{post.tag}</span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.date}</span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>{post.desc}</p>
                </div>
                <span style={{ color: "#d1d5db", fontSize: 18, flexShrink: 0 }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
