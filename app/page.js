import Link from "next/link";
import { AdLeaderboard } from "@/components/ui/Ads";

const tools = [
  { icon: "⊕", name: "Merge PDF", desc: "Combine multiple PDFs into one file.", href: "/tools/merge-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "⊘", name: "Split PDF", desc: "Split a PDF into separate pages or ranges.", href: "/tools/split-pdf", bg: "#FFF7ED", color: "#EA580C" },
  { icon: "◎", name: "Compress PDF", desc: "Reduce PDF size without losing quality.", href: "/tools/compress-pdf", bg: "#FEFCE8", color: "#CA8A04" },
  { icon: "◈", name: "PDF to Image", desc: "Convert PDF pages to JPG or PNG.", href: "/tools/pdf-to-image", bg: "#F0FDF4", color: "#16A34A" },
  { icon: "↻", name: "Rotate PDF", desc: "Fix page orientation in one click.", href: "/tools/rotate-pdf", bg: "#EFF6FF", color: "#2563EB" },
  { icon: "✎", name: "Watermark PDF", desc: "Add a custom text watermark.", href: "/tools/watermark-pdf", bg: "#FAF5FF", color: "#9333EA" },
  { icon: "🖼️", name: "JPG to PDF", desc: "Convert images to PDF instantly.", href: "/tools/jpg-to-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "🗑️", name: "Delete Pages", desc: "Remove unwanted pages from PDF.", href: "/tools/delete-pages", bg: "#FFF7ED", color: "#EA580C" },
  { icon: "#", name: "Page Numbers", desc: "Add page numbers to your PDF.", href: "/tools/add-page-numbers", bg: "#F0FDF4", color: "#16A34A" },
  { icon: "↕", name: "Reorder Pages", desc: "Rearrange PDF pages in any order.", href: "/tools/reorder-pages", bg: "#FAF5FF", color: "#9333EA" },
  { icon: "◑", name: "PDF to Grayscale", desc: "Convert color PDF to black and white.", href: "/tools/pdf-to-grayscale", bg: "#F9FAFB", color: "#374151" },
  { icon: "🔒", name: "Protect PDF", desc: "Add password protection to your PDF.", href: "/tools/protect-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "🔓", name: "Unlock PDF", desc: "Remove password from a PDF you own.", href: "/tools/unlock-pdf", bg: "#F0FDF4", color: "#16A34A" },
];

const comingSoon = [
  { icon: "📝", name: "PDF to Word", desc: "Convert PDF to editable Word document.", bg: "#F9FAFB", color: "#9ca3af" },
  { icon: "📄", name: "Word to PDF", desc: "Convert Word documents to PDF.", bg: "#F9FAFB", color: "#9ca3af" },
];

const features = [
  { icon: "🔒", title: "100% Private", desc: "Files never leave your device. Everything is processed locally in your browser. We have no server to receive your files." },
  { icon: "⚡", title: "Instant Results", desc: "No waiting, no queues. Processing happens on your device in seconds. Works offline once the page loads." },
  { icon: "♾️", title: "Truly Free Forever", desc: "No sign up. No daily limits. No watermarks. All 13 tools, unlimited use, always free." },
];

const blogPosts = [
  { tag: "Merge PDF", title: "How to Merge PDF Files Free — No Sign Up, Unlimited", href: "/blog/how-to-merge-pdf-free", color: "#DC2626", bg: "#FEF2F2" },
  { tag: "Compress", title: "Compress PDF Without Losing Quality — Free & Instant", href: "/blog/compress-pdf-without-losing-quality", color: "#CA8A04", bg: "#FEFCE8" },
  { tag: "Comparison", title: "Best Free iLovePDF Alternative in 2026 — No Uploads", href: "/blog/ilovepdf-alternative", color: "#7C3AED", bg: "#F5F3FF" },
  { tag: "iPhone", title: "How to Merge PDF on iPhone — No App Needed, Free", href: "/blog/merge-pdf-on-iphone", color: "#2563EB", bg: "#EFF6FF" },
  { tag: "Guide", title: "PDF vs Word — Which Format Is Better and When to Use Each?", href: "/blog/pdf-vs-word-which-is-better", color: "#4F46E5", bg: "#EEF2FF" },
  { tag: "Guide", title: "Best Free PDF Tools Online in 2026 — No Sign Up, Actually Free", href: "/blog/best-free-pdf-tools-online", color: "#4F46E5", bg: "#EEF2FF" },
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
          ⚡ 13 Free PDF Tools — No Sign Up
        </div>
        <h1 style={{ fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 800, color: "#111827", lineHeight: 1.05, letterSpacing: -3, marginBottom: 20 }}>
          Every PDF tool.<br />
          <span style={{ color: "#E8380D" }}>Completely free.</span>
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Merge, split, compress, convert and edit PDFs right in your browser.
          No uploads. No sign up. No cost. Ever.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 48 }}>
          {["✓ No sign up required", "✓ Files stay on your device", "✓ No file size limits", "✓ 100% free forever"].map(t => (
            <span key={t} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", padding: "8px 16px", borderRadius: 100, fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{t}</span>
          ))}
        </div>
        <Link href="/#tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 14, fontWeight: 700, fontSize: 16, boxShadow: "0 4px 16px rgba(232,56,13,0.3)" }}>
          Browse all 13 tools ↓
        </Link>
      </section>

      {/* Ad */}
      <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}><AdLeaderboard /></div>
      </div>

      {/* Tools */}
      <section id="tools" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: -1.5, marginBottom: 12 }}>All 13 PDF Tools</h2>
            <p style={{ fontSize: 16, color: "#9ca3af" }}>Click any tool to get started. No sign up needed.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {tools.map(tool => (
              <Link key={tool.name} href={tool.href} style={{ textDecoration: "none" }}>
                <div className="tool-card">
                  <div style={{ width: 52, height: 52, background: tool.bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18, color: tool.color }}>{tool.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>{tool.name}</h3>
                  <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
                </div>
              </Link>
            ))}

            {/* Coming Soon cards */}
            {comingSoon.map(tool => (
              <div key={tool.name} style={{ background: "#f9fafb", border: "1px dashed #e5e7eb", borderRadius: 18, padding: 24, height: "100%", opacity: 0.7, position: "relative" }}>
                <div style={{ position: "absolute", top: 12, right: 12, background: "#111827", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.5 }}>Coming Soon</div>
                <div style={{ width: 52, height: 52, background: tool.bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18, color: tool.color }}>{tool.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#9ca3af", marginBottom: 8 }}>{tool.name}</h3>
                <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}><AdLeaderboard /></div>
      </div>

      {/* Features */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: -1.5, marginBottom: 12 }}>Why PDFcraft?</h2>
          <p style={{ fontSize: 16, color: "#9ca3af" }}>Built different. Genuinely free.</p>
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
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111827", letterSpacing: -1, marginBottom: 8 }}>Latest PDF Guides</h2>
              <p style={{ fontSize: 15, color: "#9ca3af" }}>Tips, tutorials and guides for working with PDFs.</p>
            </div>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #e5e7eb", color: "#374151", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
              View all guides →
            </Link>
          </div>
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
            Start using PDFcraft right now.
          </h2>
          <p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 32 }}>13 free tools. No sign up. No limits. Forever.</p>
          <Link href="/#tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E8380D", color: "white", textDecoration: "none", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 17, boxShadow: "0 4px 20px rgba(232,56,13,0.4)" }}>
            Browse all tools →
          </Link>
        </div>
      </section>

      {/* Bottom ad */}
      <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}><AdLeaderboard /></div>
      </div>
    </div>
  );
}