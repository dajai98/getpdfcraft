import posts from "./blogCatalog.json";
import site from "./siteConfig.json";

// Listing dates are preserved historical labels, not verified publication timestamps.
// Do not derive datePublished/dateModified or sitemap lastmod from them.
export function blogMetadata(slug) {
  const post = posts.find(post => post.slug === slug);
  if (!post) throw new Error("Missing blog catalog entry: " + slug);
  const title = post.title + " | PDFcraft";
  const description = post.description;
  const url = site.origin + "/blog/" + slug;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}
