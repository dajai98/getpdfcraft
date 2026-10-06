import Link from "next/link";
import guides from "@/lib/toolGuides.json";

export default function ToolGuides({ current }) {
  const guide = guides[current?.replace("/tools/", "")];
  if (!guide) return null;
  const links = [
    guide,
    ["pdf-tool-not-working-troubleshooting", "Troubleshoot a failed operation"],
    ["how-browser-based-pdf-processing-works", "How local document processing works"],
  ];
  return (
    <nav aria-label="Guides for this tool" style={{ marginTop: 24, color: "#374151", lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700 }}>Guides and troubleshooting</h2>
      <ul style={{ paddingLeft: 20 }}>
        {links.map(([slug, label]) => <li key={slug}><Link href={`/blog/${slug}`}>{label}</Link></li>)}
      </ul>
    </nav>
  );
}
