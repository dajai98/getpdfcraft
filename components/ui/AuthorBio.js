export default function AuthorBio() {
  return (
    <aside aria-label="About the author" style={{ marginTop: 40, padding: 24, border: "1px solid #e5e7eb", borderRadius: 16, background: "#f9fafb" }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 800, color: "#111827" }}>About the author</h2>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "#374151" }}>
        {"Rai Dajai is a self-taught developer from Nepal, currently working in Saudi Arabia. I dropped out of college during COVID and have been building things ever since—including two small Flutter games under my sole company, Dajai Studio. GetPDFCraft exists because I got tired of PDF sites that offer 'free' uploads and then ask for a subscription at the download button. I couldn't afford one, so I built my own tools that process files locally in the browser. I test every tool with real files and document the problems I run into."}
      </p>
    </aside>
  );
}
