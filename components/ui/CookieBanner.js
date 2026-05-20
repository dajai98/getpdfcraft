"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies_accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies_accepted", "true");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookies_accepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      background: "white",
      borderTop: "1px solid #e5e7eb",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
      padding: "16px 24px",
    }}>
      <div style={{
        maxWidth: 1152,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, margin: 0 }}>
            🍪 PDFcraft uses cookies for advertising via Google AdSense.
            Your files are never stored — all processing happens locally on your device.{" "}
            <Link href="/privacy" style={{ color: "#E8380D", textDecoration: "none", fontWeight: 600 }}>
              Privacy Policy
            </Link>
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            onClick={decline}
            style={{
              background: "transparent",
              border: "1.5px solid #e5e7eb",
              color: "#6b7280",
              padding: "9px 20px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            style={{
              background: "#E8380D",
              border: "none",
              color: "white",
              padding: "9px 20px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
