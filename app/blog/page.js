"use client";
import Link from "next/link";

import posts from "@/lib/blogCatalog.json";
import navigation from "@/lib/siteNavigation.json";

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ marginBottom: 60 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Blog</span>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -2, lineHeight: 1.1 }}>
          PDF Tips &amp; Guides
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.6 }}>
          {posts.length} free guides to help you work with PDFs faster.
        </p>
      </div>

      <nav aria-label="Guide categories"><ul>
        {navigation.articleGroups.map(group => <li key={group.id}><Link href={`/blog#${group.id}`}>{group.label}</Link></li>)}
      </ul></nav>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 24 }}>
        Technical guides: <Link href="/blog/how-browser-based-pdf-processing-works">how local processing works</Link>, {" "}
        <Link href="/blog/pdf-compression-real-test-results">measure your compression result</Link>, and {" "}
        <Link href="/blog/pdf-tool-not-working-troubleshooting">troubleshoot a failed operation</Link>.
      </p>

      {navigation.articleGroups.map(group => (
      <section key={group.id} id={group.id} style={{ marginTop: 36 }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>{group.label}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {group.articles.map(slug => posts.find(post => post.slug === slug)).map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ background: "white", border: "1px solid #f3f4f6", borderRadius: 16, padding: "20px 24px", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ background: post.tagBg, color: post.tagColor, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.8 }}>{post.tag}</span>
                    {post.date && <span style={{ fontSize: 12, color: "#6b7280" }}>{post.date}</span>}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{post.description}</p>
                </div>
                <span style={{ color: "#6b7280", fontSize: 18, flexShrink: 0 }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </section>
      ))}
    </div>
  );
}
