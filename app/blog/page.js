"use client";
import Link from "next/link";

const posts = [
  { slug: "how-to-merge-pdf-free", title: "How to Merge PDF Files Free Online — No Sign Up", desc: "Combine PDFs in insertion order with PDFcraft. Check page order, encrypted inputs, and practical browser limits.", date: "Jan 15, 2026", tag: "Merge PDF", tagColor: "#DC2626", tagBg: "#FEF2F2" },
  { slug: "compress-pdf-without-losing-quality", title: "How to Compress PDF Without Losing Quality", desc: "Try structural PDF compression without explicit image downsampling. Compare sizes and inspect the output; savings are not guaranteed.", date: "Jan 18, 2026", tag: "Compress", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "convert-pdf-to-jpg-free", title: "How to Convert PDF to JPG Free — No Watermark", desc: "Render PDF pages to JPG or PNG at a fixed 2x scale. Learn the raster-quality limits, password requirements, and download behavior.", date: "Jan 20, 2026", tag: "PDF to Image", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-split-pdf-online", title: "How to Split PDF Online Free — No Sign Up", desc: "Split into individual pages or explicit ranges. Each comma-separated item creates a separate PDF; equal splitting is not automatic.", date: "Jan 22, 2026", tag: "Split PDF", tagColor: "#EA580C", tagBg: "#FFF7ED" },
  { slug: "how-to-remove-password-from-pdf", title: "How to Remove a PDF Password You Already Know", desc: "Unlock an authorized PDF with its correct password. Understand error messages, output checks, and what the tool cannot recover.", date: "Jan 25, 2026", tag: "Unlock PDF", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "ilovepdf-alternative", title: "An iLovePDF Alternative for Local PDF Workflows", desc: "Evaluate PDFcraft for local page operations and limited conversions, with clear limitations and no assumed iLovePDF prices or policies.", date: "Feb 1, 2026", tag: "Comparison", tagColor: "#7C3AED", tagBg: "#F5F3FF" },
  { slug: "smallpdf-alternative", title: "A Smallpdf Alternative: Check PDFcraft Against Your Task", desc: "Consider PDFcraft’s free local tools for a specific PDF task, without assuming Smallpdf pricing, limits, or feature availability.", date: "Feb 2, 2026", tag: "Comparison", tagColor: "#7C3AED", tagBg: "#F5F3FF" },
  { slug: "adobe-acrobat-alternative-free", title: "A Free Adobe Acrobat Alternative for Core PDF Tasks", desc: "See which PDF tasks PDFcraft can handle locally, and where you need a different tool. No assumed Adobe prices or feature equivalence.", date: "Feb 3, 2026", tag: "Comparison", tagColor: "#7C3AED", tagBg: "#F5F3FF" },
  { slug: "merge-pdf-on-iphone", title: "How to Merge PDF on iPhone Free (No App Needed)", desc: "Merge PDFs in insertion order using an iPhone browser. Check browser support and locate downloads through your chosen settings.", date: "Feb 4, 2026", tag: "iPhone", tagColor: "#1D4ED8", tagBg: "#EFF6FF" },
  { slug: "merge-pdf-on-android", title: "How to Merge PDF on Android Free (No App Needed)", desc: "Merge PDFs in insertion order using an Android browser. File selection and download locations depend on your system.", date: "Feb 5, 2026", tag: "Android", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "compress-pdf-for-whatsapp", title: "How to Compress a PDF for WhatsApp", desc: "Try structural PDF compression, compare the result, and split large documents when needed before sharing through WhatsApp.", date: "Feb 6, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "what-is-pdf", title: "What is a PDF File? Complete Guide 2026", desc: "Understand fixed-layout PDF pages, common features, viewer limitations, and PDFcraft’s available page tools.", date: "Feb 7, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "how-to-compress-pdf-for-email", title: "How to Compress a PDF for Email", desc: "Try structural compression for an email attachment, compare output sizes, and check the receiving service’s current limit.", date: "Feb 8, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "pdf-vs-word-which-is-better", title: "PDF vs Word — Which Format Should You Use?", desc: "Choose fixed-layout PDF or an editable document format according to recipient needs, with realistic compatibility and security limits.", date: "Feb 9, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "how-to-add-password-to-pdf-online", title: "How to Add Password to PDF Online Free", desc: "Add tested AES-256 password encryption to an unencrypted PDF. Verify the output and understand access-control limitations.", date: "Feb 10, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-add-watermark-to-pdf", title: "How to Add Watermark to PDF Free Online", desc: "Add a text watermark with opacity control. Placement, angle, and size follow fixed behavior; watermarking does not prevent editing.", date: "Feb 11, 2026", tag: "Guide", tagColor: "#9333EA", tagBg: "#FAF5FF" },
  { slug: "best-free-pdf-tools-online", title: "13 Free PDFcraft Tools: What Each One Actually Does", desc: "A practical guide to all 13 PDFcraft tools, supported formats, controls, and limitations.", date: "Feb 12, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "how-to-convert-jpg-to-pdf", title: "How to Convert JPG to PDF Free Online", desc: "Convert validated JPEG/JPG and PNG images into PDF pages. Check insertion order and physical page dimensions before sharing.", date: "Feb 13, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-edit-pdf-free", title: "How to Edit PDF Free Online (No Adobe Needed)", desc: "Use PDFcraft for page operations and limited overlays. Existing-text editing, OCR, and form filling require a different tool.", date: "Feb 14, 2026", tag: "Guide", tagColor: "#4F46E5", tagBg: "#EEF2FF" },
  { slug: "pdf-file-size-too-large", title: "PDF File Size Too Large? How to Fix It Free", desc: "Diagnose a large PDF, compare structural compression, and consider page ranges or source export settings without promised savings.", date: "Feb 15, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "how-to-rotate-pdf", title: "How to Rotate PDF Pages Free Online", desc: "Apply 90, 180, or 270 degrees of additional rotation to all pages. PDFcraft does not provide selected-page rotation.", date: "Feb 16, 2026", tag: "Guide", tagColor: "#2563EB", tagBg: "#EFF6FF" },
  { slug: "pdf-to-word-free", title: "How to Convert PDF to Word: Options and Checks", desc: "Evaluate a separate PDF-to-Word conversion workflow and review its output. PDFcraft does not currently provide this conversion.", date: "Feb 18, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-sign-pdf-free", title: "How to Sign a PDF: Options Outside PDFcraft", desc: "PDFcraft has no e-signature tool. Learn what to check when choosing a signing method and how to prepare a PDF without implying a signature.", date: "Feb 19, 2026", tag: "Guide", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "split-pdf-into-two", title: "How to Split a PDF into Two Files by Page Range", desc: "Choose a boundary and create two PDFs using explicit ranges. Learn why equal page counts do not guarantee equal file sizes.", date: "Feb 20, 2026", tag: "Split PDF", tagColor: "#EA580C", tagBg: "#FFF7ED" },
  { slug: "convert-pdf-to-png-free", title: "How to Convert PDF to PNG Free Online", desc: "Convert PDF pages to PNG raster images. Understand pixel resolution, lossless encoding, and why transparency is not promised.", date: "Feb 22, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "how-to-merge-pdf-on-mac", title: "How to Merge PDF on Mac Free (3 Easy Ways)", desc: "Merge PDFs using PDFcraft or native options available on your Mac. Preserve originals and verify page order and output.", date: "Feb 23, 2026", tag: "Mac", tagColor: "#374151", tagBg: "#F9FAFB" },
  { slug: "how-to-merge-pdf-on-windows", title: "How to Merge PDF on Windows Without Installing an App", desc: "Merge PDFs in a supported Windows browser using insertion order. Separate browser-tab print jobs are not a merge workflow.", date: "Feb 24, 2026", tag: "Windows", tagColor: "#2563EB", tagBg: "#EFF6FF" },
  { slug: "how-to-compress-pdf-on-iphone", title: "How to Compress PDF on iPhone Free (No App Needed)", desc: "Try browser-based PDF compression on iPhone. Compare actual byte counts and locate downloads using your browser’s settings.", date: "Feb 25, 2026", tag: "iPhone", tagColor: "#1D4ED8", tagBg: "#EFF6FF" },
  { slug: "how-to-extract-pages-from-pdf", title: "How to Extract Selected PDF Pages and Ranges", desc: "Extract selected pages with Split PDF. Each comma-separated item creates a separate file; merge outputs when you need one combined selection.", date: "Feb 26, 2026", tag: "Split PDF", tagColor: "#EA580C", tagBg: "#FFF7ED" },
  { slug: "pdf-security-guide", title: "PDF Security Guide — How to Protect Your Documents", desc: "Distinguish opening-password encryption, visible labels, and signatures. Understand PDFcraft’s security and redaction limitations.", date: "Feb 27, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-convert-pdf-to-excel", title: "How to Convert PDF to Excel: Options and Checks", desc: "Evaluate a separate PDF table-extraction workflow and verify spreadsheet data. PDFcraft does not provide PDF-to-Excel conversion or OCR.", date: "Feb 28, 2026", tag: "Convert", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "reduce-pdf-size-without-software", title: "Reduce PDF Size Without Installing Software: A Decision Guide", desc: "Try structural compression, compare the output, and choose page extraction or source re-export when compression is not enough.", date: "Mar 1, 2026", tag: "Tips", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "how-to-combine-pdf-and-images", title: "How to Combine PDF and Images Into One File Free", desc: "Convert JPEG/JPG and PNG images to PDF, merge in insertion order, then adjust pages with Up/Down controls.", date: "Mar 2, 2026", tag: "Guide", tagColor: "#DC2626", tagBg: "#FEF2F2" },
  { slug: "why-is-my-pdf-locked", title: "Why Is My PDF Locked? Diagnose the Actual Problem", desc: "Distinguish password prompts, editing restrictions, viewer limitations, and damaged files before trying to unlock a PDF.", date: "Mar 3, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-encrypt-pdf-files-free", title: "How to Encrypt a PDF with Password-Based AES-256", desc: "Use PDFcraft Protect PDF to create password-based AES-256 encryption, verify the output, and understand its limits.", date: "Mar 4, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-lock-pdf-for-job-applications", title: "How to Lock PDF for Job Applications", desc: "Check submission requirements before password-protecting application PDFs. Verify format, size, and recipient access.", date: "Mar 5, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-lock-pdf-without-adobe", title: "How to Password-Protect a PDF Without Adobe", desc: "Add an opening password with PDFcraft, check the encrypted output, and troubleshoot runtime or input failures.", date: "Mar 6, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-secure-pdf-before-sending-email", title: "How to Secure a PDF Before Sending by Email", desc: "Prepare an unencrypted copy, try compression if needed, then password-protect it. Check the recipient and final attachment requirements.", date: "Mar 7, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "how-to-protect-pdf-from-editing", title: "Protect a PDF from Editing: What PDFcraft Can and Cannot Do", desc: "Understand the limits of PDF passwords, watermarks, and rasterization. PDFcraft does not make documents read-only or tamper-proof.", date: "Mar 8, 2026", tag: "Security", tagColor: "#DB2777", tagBg: "#FDF2F8" },
  { slug: "password-protect-pdf-on-android", title: "How to Password Protect PDF on Android Free", desc: "Try AES-256 PDF password protection in an Android browser. Confirm the password, runtime loading, and downloaded result.", date: "Mar 9, 2026", tag: "Android", tagColor: "#16A34A", tagBg: "#F0FDF4" },
  { slug: "lock-pdf-on-iphone", title: "How to Lock PDF on iPhone Free (No App Needed)", desc: "Try AES-256 password protection in your iPhone browser. Check runtime loading, the saved output, and device limitations.", date: "Mar 10, 2026", tag: "iPhone", tagColor: "#1D4ED8", tagBg: "#EFF6FF" },
  { slug: "secure-pdf-on-mac", title: "How to Password-Protect a PDF on Mac", desc: "Try PDFcraft password protection on Mac or check native app options. Verify the encrypted output instead of assuming algorithm or compatibility.", date: "Mar 11, 2026", tag: "Mac", tagColor: "#374151", tagBg: "#F9FAFB" },
  { slug: "how-browser-based-pdf-processing-works", title: "How PDFcraft Processes Files Locally in Your Browser", desc: "Follow PDFcraft’s local document processing, network dependencies, downloads, and privacy limits without assuming zero web requests.", date: "Aug 5, 2026", tag: "How It Works", tagColor: "#0891B2", tagBg: "#ECFEFF" },
  { slug: "pdf-compression-real-test-results", title: "How Much Can You Compress a PDF? Measure Your Own Result", desc: "Measure your own PDF compression result using input and output byte counts. No unsupported timing or percentage benchmarks.", date: "Aug 6, 2026", tag: "Tested", tagColor: "#CA8A04", tagBg: "#FEFCE8" },
  { slug: "pdf-tool-not-working-troubleshooting", title: "Why Isn't My PDF Tool Working? A Troubleshooting Guide", desc: "Check actual errors, input validity, encrypted documents, browser resources, runtime downloads, and output-download settings.", date: "Aug 7, 2026", tag: "Troubleshooting", tagColor: "#DC2626", tagBg: "#FEF2F2" },
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
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{post.date}</span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{post.desc}</p>
                </div>
                <span style={{ color: "#6b7280", fontSize: 18, flexShrink: 0 }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
