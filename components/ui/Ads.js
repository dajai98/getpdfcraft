"use client";
import { useEffect, useRef } from "react";

const CLIENT_ID = "ca-pub-2531068099084515";
const SLOTS = {
  leaderboard: "1201641888",
  rectangle: "1378954448",
};

function AdUnit({ slot, style = {}, minHeight = 90 }) {
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
    // CLS FIX: Use explicit minHeight on wrapper so the space is always
    // reserved before AdSense loads. Removed height:"100%" from <ins>
    // because AdSense ignores it and resizes independently, causing a flash.
    <div style={{ minHeight, width: "100%", ...style }}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
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
    // CLS FIX: Wrap label + ad in a container with total minHeight (90 + ~18 label)
    // so the full block height is reserved before anything loads.
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: 108, // 90px ad + ~18px label
    }}>
      <p style={{
        fontSize: 10, color: "#d1d5db", margin: "0 0 4px 0",
        fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
        lineHeight: 1, height: 14, // fixed height so it never reflows
      }}>
        Advertisement
      </p>
      <AdUnit slot={SLOTS.leaderboard} minHeight={90} style={{ width: "100%" }} />
    </div>
  );
}

export function AdRectangle() {
  return (
    // CLS FIX: Same pattern — reserve full block height including label
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: 268, // 250px ad + ~18px label
    }}>
      <p style={{
        fontSize: 10, color: "#d1d5db", margin: "0 0 4px 0",
        fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
        lineHeight: 1, height: 14,
      }}>
        Advertisement
      </p>
      <AdUnit slot={SLOTS.rectangle} minHeight={250} style={{ width: 300 }} />
    </div>
  );
}