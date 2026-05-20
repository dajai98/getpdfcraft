import FAQSchema from "@/components/ui/FAQSchema";

export default function ToolFAQ({ faqs }) {
  return (
    <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 80px" }}>
      <FAQSchema faqs={faqs} />
      <div style={{ maxWidth: 720 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 24, letterSpacing: -1 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {faqs.map((faq, i) => (
            <details key={i} style={{
              background: "white",
              border: "1px solid #f3f4f6",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 8,
            }}>
              <summary style={{
                padding: "18px 20px",
                fontWeight: 600,
                color: "#111827",
                fontSize: 15,
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                userSelect: "none",
              }}>
                {faq.q}
                <span style={{ color: "#9ca3af", fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
              </summary>
              <div style={{ padding: "0 20px 18px", color: "#6b7280", fontSize: 15, lineHeight: 1.7 }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
