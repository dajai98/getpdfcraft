import Link from "next/link";
import navigation from "@/lib/siteNavigation.json";
import { AdLeaderboard } from "@/components/ui/Ads";

const tools = [
  { icon: "⊕", name: "Merge PDF", desc: "Combine multiple PDFs into one file.", href: "/tools/merge-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "⊘", name: "Split PDF", desc: "Split a PDF into separate pages or ranges.", href: "/tools/split-pdf", bg: "#FFF7ED", color: "#EA580C" },
  { icon: "◎", name: "Compress PDF", desc: "Try structural PDF compression; size reduction varies.", href: "/tools/compress-pdf", bg: "#FEFCE8", color: "#CA8A04" },
  { icon: "◈", name: "PDF to Image", desc: "Convert PDF pages to JPG or PNG.", href: "/tools/pdf-to-image", bg: "#F0FDF4", color: "#16A34A" },
  { icon: "↻", name: "Rotate PDF", desc: "Fix page orientation in one click.", href: "/tools/rotate-pdf", bg: "#EFF6FF", color: "#2563EB" },
  { icon: "✎", name: "Watermark PDF", desc: "Add a custom text watermark.", href: "/tools/watermark-pdf", bg: "#FAF5FF", color: "#9333EA" },
  { icon: "🖼️", name: "JPG to PDF", desc: "Convert JPEG and PNG images to PDF.", href: "/tools/jpg-to-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "🗑️", name: "Delete Pages", desc: "Remove unwanted pages from PDF.", href: "/tools/delete-pages", bg: "#FFF7ED", color: "#EA580C" },
  { icon: "#", name: "Page Numbers", desc: "Add page numbers to your PDF.", href: "/tools/add-page-numbers", bg: "#F0FDF4", color: "#16A34A" },
  { icon: "↕", name: "Reorder Pages", desc: "Rearrange PDF pages in any order.", href: "/tools/reorder-pages", bg: "#FAF5FF", color: "#9333EA" },
  { icon: "◑", name: "PDF to Grayscale", desc: "Convert color PDF to black and white.", href: "/tools/pdf-to-grayscale", bg: "#F9FAFB", color: "#374151" },
  { icon: "🔒", name: "Protect PDF", desc: "Add password protection to your PDF.", href: "/tools/protect-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "🔓", name: "Unlock PDF", desc: "Unlock a PDF with its correct password.", href: "/tools/unlock-pdf", bg: "#F0FDF4", color: "#16A34A" },
];

const features = [
  { icon: "🔒", title: "Files processed locally", desc: "PDFcraft processes document contents in your browser, without a PDF-processing upload backend. Website and third-party resource requests are separate from document processing." },
  { icon: "⚡", title: "Browser-based tools", desc: "Open a tool and select your files. Processing time and usable file size depend on your browser, device memory, and document complexity. Some tools load third-party processing resources." },
  { icon: "✓", title: "Free to use", desc: "All 13 current tools are free to use with no account required. PDFcraft adds no branding watermark to your output." },
];

const blogPosts = [
  { tag: "Merge PDF", title: "How to Merge PDF Files Free — No Sign Up", href: "/blog/how-to-merge-pdf-free", color: "#DC2626", bg: "#FEF2F2" },
  { tag: "Compress", title: "PDF Compression — What It Can and Cannot Reduce", href: "/blog/compress-pdf-without-losing-quality", color: "#CA8A04", bg: "#FEFCE8" },
  { tag: "Comparison", title: "An iLovePDF Alternative for Local PDF Workflows", href: "/blog/ilovepdf-alternative", color: "#7C3AED", bg: "#F5F3FF" },
  { tag: "iPhone", title: "How to Merge PDF on iPhone — No App Needed, Free", href: "/blog/merge-pdf-on-iphone", color: "#2563EB", bg: "#EFF6FF" },
  { tag: "Guide", title: "PDF vs Word — Which Format Is Better and When to Use Each?", href: "/blog/pdf-vs-word-which-is-better", color: "#4F46E5", bg: "#EEF2FF" },
  { tag: "Guide", title: "13 Free PDFcraft Tools: What Each One Actually Does", href: "/blog/best-free-pdf-tools-online", color: "#4F46E5", bg: "#EEF2FF" },
];

const comparisonRows = [
  ["Document processing", "In your browser; no PDFcraft processing backend upload"],
  ["Account", "No account required"],
  ["Current price", "All 13 tools are free to use"],
  ["Output branding", "No PDFcraft branding watermark added"],
  ["Practical limits", "Browser memory, device speed, and file complexity"],
  ["Network access", "Website resources and some tool runtimes load over the internet"],
];

export default function HomePage() {
  return (
    <div style={{ background: "white" }}>

      <style>{`
        .tool-card {
          background: white;
          border: 1px solid #f3f4f6;
          border-radius: 18px;
          padding: 24px;
          cursor: pointer;
          height: 100%;
          transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
        }
        .tool-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          transform: translateY(-3px);
          border-color: #e5e7eb;
        }
        .blog-card {
          background: white;
          border: 1px solid #f3f4f6;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          height: 100%;
          transition: box-shadow 0.2s, transform 0.2s;
          text-decoration: none;
          display: block;
        }
        .blog-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
      `}</style>

      {/* Hero */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 24px 70px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FEF2F2", color: "#DC2626", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 100, marginBottom: 28, textTransform: "uppercase", letterSpacing: 0.8, border: "1px solid #fecaca" }}>
          🔒 Privacy-First · Browser-Based · No Uploads
        </div>
        <h1 style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 800, color: "#111827", lineHeight: 1.05, letterSpacing: -3, marginBottom: 20 }}>
          Free PDF tools.<br />
          <span style={{ color: "#E8380D" }}>Private by design.</span>
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Merge, split, arrange and render PDF pages directly in your browser.
          Local document processing. No account required. No PDFcraft branding watermarks.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 48 }}>
          {["✓ No account required", "✓ Files processed locally", "✓ 13 browser-based tools", "✓ Free to use"].map(t => (
            <span key={t} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", padding: "8px 16px", borderRadius: 100, fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{t}</span>
          ))}
        </div>
        <Link href="/#tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 14, fontWeight: 700, fontSize: 16, boxShadow: "0 4px 16px rgba(232,56,13,0.3)" }}>
          Browse all 13 free tools ↓
        </Link>
      </section>

      {/* Ad */}
      <AdLeaderboard />

      {/* What is PDFcraft */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: -1 }}>What is PDFcraft?</h2>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
          PDFcraft processes PDF contents directly in your browser without sending them to a PDFcraft processing backend. The website still requests web resources, and some tools download processing components from a third-party CDN.
        </p>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 40 }}>
          Built by Dajai Studio, PDFcraft provides 13 free tools with no account required. You can <Link href="/tools/merge-pdf">merge documents</Link>, <Link href="/tools/compress-pdf">try structural compression</Link>, or <Link href="/tools/protect-pdf">add password protection</Link> locally. Results and processing time depend on the file and your device. See the <Link href="/privacy">Privacy Policy</Link> for website and advertising data practices.
        </p>

        {/* Comparison table */}
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 20, letterSpacing: -0.5 }}>What to expect from PDFcraft</h3>
        <div style={{ overflowX: "auto", marginBottom: 48 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#111827" }}>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "white", fontWeight: 700, fontSize: 13, borderBottom: "2px solid #E8380D" }}>Feature</th>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "#9ca3af", fontWeight: 700, fontSize: 13, borderBottom: "2px solid #374151" }}>PDFcraft behavior</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([feature, behavior], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#f9fafb" : "white" }}>
                  <td style={{ padding: "11px 20px", color: "#15803D", fontWeight: 600, borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>{feature}</td>
                  <td style={{ padding: "11px 20px", color: "#6b7280", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>{behavior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" style={{ padding: "64px 24px 80px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: -1.5, marginBottom: 12 }}>All 13 PDF Tools — Free to Use</h2>
            <p style={{ fontSize: 16, color: "#6b7280" }}>Choose the operation you need. These tools do not edit existing text, perform OCR or convert PDFs to Word.</p>
          </div>
          <nav aria-label="Tool categories"><ul>{navigation.toolGroups.map(group => <li key={group.id}><Link href={`/#tools-${group.id}`}>{group.label}</Link></li>)}</ul></nav>
          {navigation.toolGroups.map(group => (
          <section key={group.id} id={`tools-${group.id}`} style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 22, marginBottom: 16 }}>{group.label}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {group.tools.map(slug => tools.find(tool => tool.href === "/tools/" + slug)).map(tool => (
              <Link key={tool.name} href={tool.href} style={{ textDecoration: "none" }}>
                <div className="tool-card">
                  <div aria-hidden="true" style={{ width: 52, height: 52, background: tool.bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18, color: tool.color }}>{tool.icon}</div>
                  <h4 style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>{tool.name}</h4>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          </section>
          ))}
        </div>
      </section>

      {/* Ad */}
      <AdLeaderboard />

      {/* Features */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: -1.5, marginBottom: 12 }}>Why PDFcraft?</h2>
          <p style={{ fontSize: 16, color: "#6b7280" }}>Local document processing. Browser-based. Free to use.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 20, padding: 36, textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Guides */}
      <section style={{ background: "#f9fafb", padding: "80px 24px", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111827", letterSpacing: -1, marginBottom: 8 }}>Find a guide for your next decision</h2>
              <p style={{ fontSize: 15, color: "#6b7280" }}>Browse guides by task, or learn how processing and result checks work.</p>
            </div>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
              Browse guides by topic →
            </Link>
          </div>
          <p><Link href="/blog/pdf-security-guide">Choose a security control</Link> · <Link href="/blog#how-it-works">How processing and result checks work</Link></p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {blogPosts.map(post => (
              <Link key={post.title} href={post.href} className="blog-card">
                <span style={{ background: post.bg, color: post.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14, display: "inline-block" }}>{post.tag}</span>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111827", lineHeight: 1.4, margin: 0 }}>{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111827", padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "white", letterSpacing: -1.5, marginBottom: 16 }}>
            Your files. Your device. Your privacy.
          </h2>
          <p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 32 }}>13 free tools. Local document processing. No account required.</p>
          <Link href="/#tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E8380D", color: "white", textDecoration: "none", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 17, boxShadow: "0 4px 20px rgba(232,56,13,0.4)" }}>
            Start using PDFcraft free →
          </Link>
        </div>
      </section>

      {/* Bottom ad */}
      <AdLeaderboard />
    </div>
  );
}
