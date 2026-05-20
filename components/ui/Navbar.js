"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #f3f4f6",
      boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
    }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, background: "#E8380D", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 16, boxShadow: "0 2px 8px rgba(232,56,13,0.3)" }}>P</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#111827", lineHeight: 1.2, letterSpacing: -0.5 }}>PDFcraft</div>
            <div style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1, fontWeight: 500 }}>by Dajai Studio</div>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[["Tools", "/#tools"], ["Blog", "/blog"], ["About", "/about"], ["Privacy", "/privacy"]].map(([name, href]) => (
            <Link key={name} href={href} style={{
              fontSize: 14, color: "#6b7280", textDecoration: "none",
              fontWeight: 500, padding: "8px 14px", borderRadius: 8,
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.color = "#111827"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b7280"; }}
            >{name}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
