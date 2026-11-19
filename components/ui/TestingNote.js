export default function TestingNote({ heading, paragraphs }) {
  return (
    <section aria-label="Developer testing note" style={{ marginTop: 40, padding: 24, border: "1px solid #e5e7eb", borderRadius: 16, background: "#f9fafb" }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 800, color: "#111827" }}>{heading}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} style={{ margin: index === paragraphs.length - 1 ? 0 : "0 0 12px", fontSize: 15, lineHeight: 1.8, color: "#374151" }}>{paragraph}</p>
      ))}
    </section>
  );
}
