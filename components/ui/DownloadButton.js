"use client";

export default function DownloadButton({ url, filename, label = "Download" }) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#E8380D",
        color: "white",
        border: "none",
        padding: "14px 32px",
        borderRadius: 12,
        fontWeight: 700,
        fontSize: 16,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#C42E08"}
      onMouseLeave={e => e.currentTarget.style.background = "#E8380D"}
    >
      ↓ {label}
    </button>
  );
}
