"use client";
import { AdLeaderboard, AdRectangle } from "@/components/ui/Ads";
import RelatedTools from "@/components/ui/RelatedTools";
import { useEffect, useState } from "react";

export default function ToolLayout({ tag, tagColor, tagBg, title, desc, children, current, faqs }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div>
      {/* Top leaderboard */}
      <div style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <AdLeaderboard />
        </div>
      </div>

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: isMobile ? "24px 16px" : "48px 24px" }}>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <span style={{ background: tagBg, color: tagColor, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>{tag}</span>
              <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#111827", marginTop: 14, marginBottom: 10, letterSpacing: -1.5, lineHeight: 1.1 }}>{title}</h1>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.6 }}>{desc}</p>

              {/* Trust badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {["🔒 Files never uploaded", "⚡ Instant processing", "♾️ Free forever", "✓ No sign up"].map(badge => (
                  <span key={badge} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 11, color: "#6b7280", padding: "4px 10px", borderRadius: 100, fontWeight: 500 }}>{badge}</span>
                ))}
              </div>
            </div>

            {/* Tool content */}
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 20, padding: isMobile ? 16 : 32, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {children}
            </div>

            {/* Ad after tool */}
            <div style={{ marginTop: 32 }}>
              <AdLeaderboard />
            </div>

            {/* Mobile only — show rectangle ads below tool */}
            {isMobile && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                <AdRectangle />
              </div>
            )}

            {/* FAQ Section */}
            {faqs && faqs.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20, letterSpacing: -0.5 }}>
                  Frequently asked questions
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {faqs.map((faq, i) => (
                    <details key={i} style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 12, overflow: "hidden" }}>
                      <summary style={{ padding: "16px 20px", fontWeight: 600, color: "#111827", fontSize: 15, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {faq.q}
                        <span style={{ color: "#9ca3af", fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                      </summary>
                      <div style={{ padding: "0 20px 16px", color: "#6b7280", fontSize: 15, lineHeight: 1.7 }}>{faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop sidebar only */}
          {!isMobile && (
            <div style={{ width: 300, flexShrink: 0, paddingTop: 100, display: "flex", flexDirection: "column", gap: 16 }}>
              <AdRectangle />
              <AdRectangle />
            </div>
          )}
        </div>
      </div>

      {/* Related tools */}
      <RelatedTools current={current} />

      {/* Bottom leaderboard */}
      <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <AdLeaderboard />
        </div>
      </div>
    </div>
  );
}
