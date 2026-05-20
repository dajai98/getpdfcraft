"use client";
import { useEffect, useRef } from "react";

const CLIENT_ID = "ca-pub-2531068099084515";
const SLOTS = {
  leaderboard: "1201641888",
  rectangle: "1378954448",
};

function AdUnit({ slot, style = {} }) {
  const ref = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (!ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {}
  }, []);

  return (
    <div style={{ minHeight: 90, ...style }}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdLeaderboard() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{ fontSize: 10, color: "#d1d5db", marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Advertisement</p>
      <AdUnit slot={SLOTS.leaderboard} style={{ width: "100%", minHeight: 90 }} />
    </div>
  );
}

export function AdRectangle() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{ fontSize: 10, color: "#d1d5db", marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Advertisement</p>
      <AdUnit slot={SLOTS.rectangle} style={{ width: 300, minHeight: 250 }} />
    </div>
  );
}
