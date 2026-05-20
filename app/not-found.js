import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "40px 24px",
    }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>📄</div>
      <h1 style={{ fontSize: 48, fontWeight: 800, color: "#111827", marginBottom: 12, letterSpacing: -2 }}>404</h1>
      <p style={{ fontSize: 18, color: "#9ca3af", marginBottom: 32 }}>
        Oops! This page doesn't exist.
      </p>
      <Link href="/" style={{
        background: "#E8380D",
        color: "white",
        padding: "14px 28px",
        borderRadius: 12,
        fontWeight: 700,
        fontSize: 15,
        textDecoration: "none",
      }}>
        ← Back to Home
      </Link>
    </div>
  );
}
