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
  return null;
}

export function AdRectangle() {
  return null;
}