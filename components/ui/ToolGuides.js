import Link from "next/link";
import guides from "@/lib/toolGuides.json";
import navigation from "@/lib/siteNavigation.json";

export default function ToolGuides({ current }) {
  const guide = guides[current?.replace("/tools/", "")];
  if (!guide) return null;
  const links = [
    guide,
    ...(navigation.secondaryGuides[current?.replace("/tools/", "")] || []),
  ];
  return (
    <nav aria-label="Guides for this tool" style={{ marginTop: 24, color: "#374151", lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700 }}>Guides for this task</h2>
      <ul style={{ paddingLeft: 20 }}>
        {links.map(([slug, label]) => <li key={slug}><Link href={`/blog/${slug}`}>{label}</Link></li>)}
      </ul>
    </nav>
  );
}
