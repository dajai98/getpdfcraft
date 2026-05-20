"use client";
import Link from "next/link";

const allTools = [
  { icon: "⊕", name: "Merge PDF", href: "/tools/merge-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "⊘", name: "Split PDF", href: "/tools/split-pdf", bg: "#FFF7ED", color: "#EA580C" },
  { icon: "◎", name: "Compress PDF", href: "/tools/compress-pdf", bg: "#FEFCE8", color: "#CA8A04" },
  { icon: "◈", name: "PDF to Image", href: "/tools/pdf-to-image", bg: "#F0FDF4", color: "#16A34A" },
  { icon: "↻", name: "Rotate PDF", href: "/tools/rotate-pdf", bg: "#EFF6FF", color: "#2563EB" },
  { icon: "✎", name: "Watermark PDF", href: "/tools/watermark-pdf", bg: "#FAF5FF", color: "#9333EA" },
  { icon: "🖼️", name: "JPG to PDF", href: "/tools/jpg-to-pdf", bg: "#FEF2F2", color: "#DC2626" },
  { icon: "🗑️", name: "Delete Pages", href: "/tools/delete-pages", bg: "#FFF7ED", color: "#EA580C" },
  { icon: "#", name: "Page Numbers", href: "/tools/add-page-numbers", bg: "#F0FDF4", color: "#16A34A" },
  { icon: "↕", name: "Reorder Pages", href: "/tools/reorder-pages", bg: "#FAF5FF", color: "#9333EA" },
  { icon: "◑", name: "PDF to Grayscale", href: "/tools/pdf-to-grayscale", bg: "#F9FAFB", color: "#374151" },
];

export default function RelatedTools({ current }) {
  const related = allTools.filter(t => t.href !== current).slice(0, 6);

  return (
    <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 20, letterSpacing: -0.5 }}>
          Other Free PDF Tools
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {related.map(tool => (
            <Link key={tool.name} href={tool.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 34, height: 34, background: tool.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: tool.color, flexShrink: 0 }}>
                  {tool.icon}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{tool.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
