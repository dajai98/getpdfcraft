export default function ToolDocumentation({ documentation }) {
  if (!documentation) return null;
  return (
    <section aria-label={documentation.heading} style={{ marginTop: 36, lineHeight: 1.75, color: "#374151" }}>
      <h2 style={{ fontSize: 24, color: "#111827" }}>{documentation.heading}</h2>
      {documentation.sections.map(section => (
        <section key={section.title} style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 18, color: "#111827" }}>{section.title}</h3>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
    </section>
  );
}
