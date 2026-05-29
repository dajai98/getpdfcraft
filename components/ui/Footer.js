"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #f3f4f6", background: "#f9fafb", minHeight: 400, contain: "layout" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, background: "#E8380D", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14 }}>P</div>
              <span style={{ fontWeight: 800, fontSize: 17, color: "#111827" }}>PDFcraft</span>
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, maxWidth: 260, marginBottom: 16 }}>
              13 free PDF tools. No sign up. No limits. Files never leave your device.
            </p>
            <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6, maxWidth: 260, marginBottom: 8 }}>
              PDFcraft is built by{" "}
              <span style={{ color: "#6b7280", fontWeight: 600 }}>Dajai Studio</span>
              , an indie studio from Nepal.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.dajaistudio.brainstorm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#E8380D"}
              onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
            >
              🎮 BrainStorm Quiz — Google Play →
            </a>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 16 }}>Tools</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Merge PDF", "/tools/merge-pdf"],
                ["Split PDF", "/tools/split-pdf"],
                ["Compress PDF", "/tools/compress-pdf"],
                ["PDF to Image", "/tools/pdf-to-image"],
                ["JPG to PDF", "/tools/jpg-to-pdf"],
              ].map(([n, h]) => (
                <Link key={n} href={h} style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>{n}</Link>
              ))}
            </div>
          </div>

          {/* More Tools */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 16 }}>More Tools</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Rotate PDF", "/tools/rotate-pdf"],
                ["Watermark PDF", "/tools/watermark-pdf"],
                ["Protect PDF", "/tools/protect-pdf"],
                ["Unlock PDF", "/tools/unlock-pdf"],
                ["Delete Pages", "/tools/delete-pages"],
                ["Page Numbers", "/tools/add-page-numbers"],
                ["Reorder Pages", "/tools/reorder-pages"],
                ["PDF to Grayscale", "/tools/pdf-to-grayscale"],
              ].map(([n, h]) => (
                <Link key={n} href={h} style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>{n}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 16 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Blog", "/blog"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([n, h]) => (
                <Link key={n} href={h} style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>{n}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
          {["🔒 Files never uploaded", "⚡ 100% browser-based", "♾️ Free forever", "✓ No sign up", "🛡️ No data collected"].map(badge => (
            <span key={badge} style={{ background: "white", border: "1px solid #e5e7eb", fontSize: 12, color: "#6b7280", padding: "5px 12px", borderRadius: 100, fontWeight: 500 }}>{badge}</span>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#d1d5db" }}>© 2026 PDFcraft — By Dajai Studio, Nepal. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([n, h]) => (
              <Link key={n} href={h} style={{ fontSize: 13, color: "#d1d5db", textDecoration: "none" }}>{n}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}