// Small decorative icons for navigation cards; labels remain ordinary text.
export default function CategoryIcon({ kind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const shapes = {
    pages: <><rect x="4" y="3" width="12" height="16" rx="2" /><path d="M8 7h4M8 11h4M18 7h2v14H8v-2" /></>,
    optimization: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="white" /><circle cx="15" cy="12" r="2" fill="white" /><circle cx="10" cy="18" r="2" fill="white" /></>,
    security: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    rendering: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="1.5" /><path d="m4 17 5-5 3 3 3-4 5 6" /></>,
    decisions: <><path d="M4 12h7m0 0 4-5h5m-9 5 4 5h5M18 5l2 2-2 2m0 6 2 2-2 2" /></>,
    "how-it-works": <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  };
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="22" height="22" {...common}>{shapes[kind] || shapes.pages}</svg>;
}
