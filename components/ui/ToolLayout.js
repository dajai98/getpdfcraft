"use client";
import ToolGuides from "@/components/ui/ToolGuides";
import RelatedTools from "@/components/ui/RelatedTools";
import FAQSchema from "@/components/ui/FAQSchema";
import ToolDocumentation from "@/components/ui/ToolDocumentation";
import toolDocumentation from "@/lib/toolDocumentation.json";

export default function ToolLayout({ tag, tagColor, tagBg, title, desc, children, current, faqs }) {
  const documentation = toolDocumentation[current?.replace(/^\/tools\//, "")];
  // Route documentation is the visible FAQ/schema source. Legacy page props
  // remain a fallback for callers outside the documented production tools.
  const visibleFaqs = documentation?.faqs ?? faqs;
  return (
    <div className="tool-page">
      <div style={{
        maxWidth: 1152,
        margin: "0 auto",
        padding: "clamp(24px, 4vw, 48px) 16px",
      }}>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <span style={{
                background: tagBg, color: tagColor, fontSize: 11, fontWeight: 700,
                padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1
              }}>
                {tag}
              </span>
              <h1 style={{
                fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#111827",
                marginTop: 14, marginBottom: 10, letterSpacing: -1.5, lineHeight: 1.1
              }}>
                {title}
              </h1>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6 }}>{desc}</p>

              {/* Trust badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {["Files processed locally in your browser", "Free to use", "No account required"].map(badge => (
                  <span key={badge} style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: 11,
                    color: "#6b7280", padding: "4px 10px", borderRadius: 100, fontWeight: 500
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Tool content */}
            {documentation?.notice && <p role="note" style={{ padding: 16, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, lineHeight: 1.7, color: "#7c2d12" }}>{documentation.notice}</p>}
            <div style={{
              background: "white", border: "1px solid #f3f4f6", borderRadius: 20,
              padding: "clamp(16px, 3vw, 32px)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
            }}>
              {children}
            </div>

            <ToolDocumentation documentation={documentation} />
            <ToolGuides current={current} />

            {/* FAQ Section */}
            {visibleFaqs && visibleFaqs.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <FAQSchema faqs={visibleFaqs} />
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20, letterSpacing: -0.5 }}>
                  Frequently asked questions
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {visibleFaqs.map((faq, i) => (
                    <details key={i} style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 12, overflow: "hidden" }}>
                      <summary style={{
                        padding: "16px 20px", fontWeight: 600, color: "#111827", fontSize: 15,
                        cursor: "pointer", listStyle: "none", display: "flex",
                        justifyContent: "space-between", alignItems: "center"
                      }}>
                        {faq.q}
                        <span style={{ color: "#6b7280", fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                      </summary>
                      <div style={{ padding: "0 20px 16px", color: "#6b7280", fontSize: 15, lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Related tools */}
      <RelatedTools current={current} />

    </div>
  );
}
