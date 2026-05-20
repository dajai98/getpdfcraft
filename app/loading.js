export default function Loading() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{
        width: 48, height: 48,
        border: "3px solid #f3f4f6",
        borderTop: "3px solid #E8380D",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>Loading...</p>
    </div>
  );
}
