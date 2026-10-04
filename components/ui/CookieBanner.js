"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

export default function CookieBanner() {
  const [consent, setConsent] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cookies_accepted");
      setConsent(saved === "accepted" || saved === "true" ? "accepted"
        : saved === "declined" || saved === "false" ? "declined" : null);
    } catch {
      setConsent(null);
    }
  }, []);

  const choose = value => {
    const withdrawing = consent === "accepted" && value === "declined";
    let saved = false;
    setSaveError("");
    try { localStorage.setItem("cookies_accepted", value); saved = true; } catch { /* Preference lasts for this page when storage is unavailable. */ }
    if (withdrawing && !saved) {
      setSaveError("Your browser could not save the change. Advertising is still enabled. Clear this site\'s saved preference in your browser site-data settings, then reload. Download results first.");
      return;
    }
    setConsent(value);
    setEditing(false);
    // Removing a script element cannot stop code it already executed.
    // Withdrawal is an explicit reload action, warned about in the panel.
    if (withdrawing) window.location.reload();
  };
  const open = consent === null || editing;
  if (consent === undefined) return null;

  return (
    <>
      {consent === "accepted" && (
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2531068099084515"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <div style={{ background: "#f9fafb", padding: "12px 24px" }}>
        <button type="button" aria-expanded={open} aria-controls={open ? "advertising-preferences" : undefined}
          onClick={() => setEditing(true)}
          style={{ background: "none", border: 0, padding: 4, color: "#374151", cursor: "pointer", font: "inherit", fontSize: 13 }}>
          Advertising preferences
        </button>
      </div>
      {open && (
        <div id="advertising-preferences" role="region" aria-label="Advertising preferences" style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
          background: "white", borderTop: "1px solid #e5e7eb",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)", padding: "16px 24px",
          maxHeight: "80vh", overflowY: "auto",
        }}>
          <div style={{ maxWidth: 1152, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 280px", minWidth: 0 }}>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, margin: 0 }}>
                Google AdSense advertising resources load only after you accept. Google may use cookies for advertising.
                Declining keeps the core PDF tools available. Your choice is stored locally in this browser when storage is available.
                Document contents are processed locally; website requests are separate.{" "}
                <Link href="/privacy" style={{ color: "#E8380D", fontWeight: 600 }}>Privacy Policy</Link>
              </p>
              {saveError && <p role="alert">{saveError}</p>}
              {consent === "accepted" && (
                <p style={{ fontSize: 14, color: "#374151", marginTop: 8 }}>
                  Declining now reloads this page to stop already-loaded advertising code. Download any results first:
                  reloading clears selected files and unsaved results. This does not remove cookies already stored by third parties.
                </p>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" onClick={() => choose("declined")}
                style={{ background: "transparent", border: "1.5px solid #e5e7eb", color: "#374151", padding: "9px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>
                {consent === "accepted" ? "Decline and reload" : "Decline"}
              </button>
              <button type="button" onClick={() => choose("accepted")}
                style={{ background: "#E8380D", border: "none", color: "white", padding: "9px 20px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
                Accept
              </button>
              {editing && consent !== null && <button type="button" onClick={() => setEditing(false)}>Keep current choice</button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
