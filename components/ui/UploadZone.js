"use client";
import { useRef, useState } from "react";

export default function UploadZone({ onFiles, multiple = false, label = "Drop your PDF here" }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFiles(files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) onFiles(files);
  };

  const triggerInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragOver ? "#E8380D" : "#d1d5db"}`,
        borderRadius: 16,
        padding: "60px 40px",
        textAlign: "center",
        background: dragOver ? "#FEF0ED" : "#f9fafb",
        transition: "all 0.2s",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
        onChange={handleChange}
      />

      <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>

      <p style={{ fontWeight: 600, fontSize: 18, color: "#111827", marginBottom: 8 }}>
        {label}
      </p>
      <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
        or click the button below to browse your files
      </p>

      <button
        type="button"
        onClick={triggerInput}
        style={{
          background: "#E8380D",
          color: "white",
          border: "none",
          padding: "14px 36px",
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "inline-block",
        }}
      >
        Select {multiple ? "Files" : "File"}
      </button>
    </div>
  );
}
