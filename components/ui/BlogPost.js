
"use client";
import Link from "next/link";
import { AdLeaderboard } from "@/components/ui/Ads";

export default function BlogPost({ tag, tagColor, tagBg, title, date, readTime, intro, sections, faqs, ctaText, ctaHref }) {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "80px 24px" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>← Back to Blog</Link>

      <div style={{ marginBottom: 40 }}>
        <span style={{ background: tagBg, color: tagColor, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>{tag}</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -1.5, lineHeight: 1.1 }}>{title}</h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af", flexWrap: "wrap" }}>
          <span>{date}</span><span>· {readTime}</span><span>· By PDFcraft</span>
        </div>
      </div>

      {/* Ad at top of article */}
      <div style={{ marginBottom: 32 }}>
        <AdLeaderboard />
      </div>

      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 32, fontSize: 18, color: "#111827", fontWeight: 500, lineHeight: 1.6 }}>{intro}</p>

        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            {section.heading && <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 16, letterSpacing: -0.5 }}>{section.heading}</h2>}
            {section.text && <p style={{ marginBottom: 16, color: "#374151" }}>{section.text}</p>}

            {/* Comparison Table */}
            {section.table && (
              <div style={{ overflowX: "auto", marginBottom: 16 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "#111827" }}>
                      {section.table.headers.map((h, idx) => (
                        <th key={idx} style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          color: "white",
                          fontWeight: 700,
                          fontSize: 13,
                          borderBottom: "2px solid #E8380D",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? "#f9fafb" : "white" }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{
                            padding: "11px 16px",
                            color: cIdx === 0 ? "#111827" : cIdx === 1 ? "#15803D" : "#6b7280",
                            fontWeight: cIdx === 0 ? 600 : 400,
                            borderBottom: "1px solid #f3f4f6",
                            fontSize: 14,
                          }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.steps && section.steps.map((step, j) => (
              <div key={j} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, background: tagBg, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 12, color: tagColor }}>
                  {String(j + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ color: "#6b7280", margin: 0, fontSize: 15 }}>{step.body}</p>
                </div>
              </div>
            ))}

            {section.tip && (
              <div style={{ background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 20, marginTop: 16 }}>
                <p style={{ fontWeight: 700, color: "#15803D", marginBottom: 6, fontSize: 14 }}>💡 Pro tip</p>
                <p style={{ color: "#374151", margin: 0, fontSize: 14 }}>{section.tip}</p>
              </div>
            )}

            {/* List — supports plain strings AND { text, href } objects */}
            {section.list && (
              <ul style={{ paddingLeft: 20, color: "#374151" }}>
                {section.list.map((item, k) => (
                  <li key={k} style={{ marginBottom: 8 }}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <Link href={item.href} style={{ color: "#E8380D", fontWeight: 600, textDecoration: "none" }}
                        onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                        onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                      >
                        {item.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Mid article ad */}
        <div style={{ margin: "40px 0" }}>
          <AdLeaderboard />
        </div>

        {faqs && faqs.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 24, letterSpacing: -0.5 }}>Frequently asked questions</h2>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 20, marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 8 }}>{faq.q}</h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: 15 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ background: "#111827", borderRadius: 20, padding: 36, textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontWeight: 800, fontSize: 24, color: "white", marginBottom: 12 }}>{ctaText}</h3>
          <p style={{ color: "#9ca3af", marginBottom: 24 }}>Free, instant, private. No sign up required.</p>
          <Link href={ctaHref} style={{ display: "inline-block", background: "#E8380D", color: "white", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
            Try it free →
          </Link>
        </div>

        {/* Bottom ad */}
        <div style={{ marginTop: 40 }}>
          <AdLeaderboard />
        </div>
      </div>
    </div>
  );
}
