import Link from "next/link";

import posts from "@/lib/blogCatalog.json";
import navigation from "@/lib/siteNavigation.json";
import CategoryIcon from "@/components/ui/CategoryIcon";

const featuredGuides = [
  ["how-browser-based-pdf-processing-works", "How local processing works", "Understand browser processing, downloads and practical limits.", "how-it-works"],
  ["pdf-compression-real-test-results", "Measure your compression result", "Compare original and output sizes and inspect recorded observations.", "optimization"],
  ["pdf-tool-not-working-troubleshooting", "Troubleshoot a failed operation", "Use error messages and file checks to choose the next step.", "decisions"],
];

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px 80px" }}>
      <div style={{ marginBottom: 60 }}>
        <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Blog</span>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 14, letterSpacing: -2, lineHeight: 1.1 }}>
          PDF Tips &amp; Guides
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.6 }}>
          {posts.length} free guides to help you work with PDFs faster.
        </p>
      </div>

      <nav aria-label="Guide categories" className="category-nav"><ul className="blog-category-grid">
        {navigation.articleGroups.map(group => <li key={group.id}><Link className="blog-category-card" href={`/blog#${group.id}`}>
          <CategoryIcon kind={group.id} /><span>{group.label}</span><span aria-hidden="true">→</span>
        </Link></li>)}
      </ul></nav>
      <section aria-labelledby="technical-guides-title" className="featured-guides">
        <h2 id="technical-guides-title">Technical guides</h2>
        <div className="featured-guides-grid">{featuredGuides.map(([slug, title, description, icon]) => (
          <Link key={slug} href={`/blog/${slug}`} className="featured-guide-card">
            <span className="category-card-icon"><CategoryIcon kind={icon} /></span>
            <span className="category-card-copy"><strong>{title}</strong><span>{description}</span></span>
            <span className="category-card-arrow" aria-hidden="true">→</span>
          </Link>
        ))}</div>
      </section>

      {navigation.articleGroups.map(group => (
      <section key={group.id} id={group.id} className="blog-category-section" style={{ marginTop: 36 }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>{group.label}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {group.articles.map(slug => posts.find(post => post.slug === slug)).map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-article-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ background: post.tagBg, color: post.tagColor, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.8 }}>{post.tag}</span>
                  </div>
                  <h3 className="blog-article-title" style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{post.description}</p>
                </div>
                <span style={{ color: "#6b7280", fontSize: 18, flexShrink: 0 }}>→</span>
              </div>
          </Link>
        ))}
      </div>
      </section>
      ))}
    </div>
  );
}
