"use client";
import Link from "next/link";
import { AdLeaderboard } from "@/components/ui/Ads";

const tools = [
  { icon: "⊕", name: "Merge PDF", desc: "Combine multiple PDFs into one file.", href: "/tools/merge-pdf", bg: "#FEF2F2", color: "#DC2626", border: "#fecaca" },
  { icon: "⊘", name: "Split PDF", desc: "Split a PDF into separate pages or ranges.", href: "/tools/split-pdf", bg: "#FFF7ED", color: "#EA580C", border: "#fed7aa" },
  { icon: "◎", name: "Compress PDF", desc: "Reduce PDF size without losing quality.", href: "/tools/compress-pdf", bg: "#FEFCE8", color: "#CA8A04", border: "#fde68a" },
  { icon: "◈", name: "PDF to Image", desc: "Convert PDF pages to JPG or PNG.", href: "/tools/pdf-to-image", bg: "#F0FDF4", color: "#16A34A", border: "#bbf7d0" },
  { icon: "↻", name: "Rotate PDF", desc: "Fix page orientation in one click.", href: "/tools/rotate-pdf", bg: "#EFF6FF", color: "#2563EB", border: "#bfdbfe" },
  { icon: "✎", name: "Watermark PDF", desc: "Add a custom text watermark.", href: "/tools/watermark-pdf", bg: "#FAF5FF", color: "#9333EA", border: "#e9d5ff" },
  { icon: "🖼️", name: "JPG to PDF", desc: "Convert images to PDF instantly.", href: "/tools/jpg-to-pdf", bg: "#FEF2F2", color: "#DC2626", border: "#fecaca" },
  { icon: "🗑️", name: "Delete Pages", desc: "Remove unwanted pages from PDF.", href: "/tools/delete-pages", bg: "#FFF7ED", color: "#EA580C", border: "#fed7aa" },
  { icon: "#", name: "Page Numbers", desc: "Add page numbers to your PDF.", href: "/tools/add-page-numbers", bg: "#F0FDF4", color: "#16A34A", border: "#bbf7d0" },
  { icon: "↕", name: "Reorder Pages", desc: "Rearrange PDF pages in any order.", href: "/tools/reorder-pages", bg: "#FAF5FF", color: "#9333EA", border: "#e9d5ff" },
  { icon: "◑", name: "PDF to Grayscale", desc: "Convert color PDF to black and white.", href: "/tools/pdf-to-grayscale", bg: "#F9FAFB", color: "#374151", border: "#e5e7eb" },
];

const features = [
  { icon: "🔒", title: "100% Private", desc: "Files never leave your device. Everything is processed locally in your browser. We have no server to receive your files." },
  { icon: "⚡", title: "Instant Results", desc: "No waiting, no queues. Processing happens on your device in seconds. Works offline once the page loads." },
  { icon: "♾️", title: "Truly Free Forever", desc: "No sign up. No daily limits. No watermarks. All 11 tools, unlimited use, always free." },
];

export default function HomePage() {
  return (
    <div style={{ background: "white" }}>
      {/* Hero */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 24px 70px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FEF2F2", color: "#DC2626", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 100, marginBottom: 28, textTransform: "uppercase", letterSpacing: 0.8, border: "1px solid #fecaca" }}>
          ⚡ 11 Free PDF Tools — No Sign Up
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
          Browse all 11 tools ↓
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
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: -1.5, marginBottom: 12 }}>All 11 PDF Tools</h2>
            <p style={{ fontSize: 16, color: "#9ca3af" }}>Click any tool to get started. No sign up needed.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {tools.map(tool => (
              <Link key={tool.name} href={tool.href} style={{ textDecoration: "none" }}>
                <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 18, padding: 24, cursor: "pointer", transition: "all 0.2s", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = tool.border; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#f3f4f6"; }}
                >
                  <div style={{ width: 52, height: 52, background: tool.bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18, color: tool.color }}>{tool.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>{tool.name}</h3>
                  <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, margin: 0 }}>{tool.desc}</p>
                </div>
              </Link>
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

      {/* CTA */}
      <section style={{ background: "#111827", padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "white", letterSpacing: -1.5, marginBottom: 16 }}>
            Start using PDFcraft right now.
          </h2>
          <p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 32 }}>11 free tools. No sign up. No limits. Forever.</p>
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
