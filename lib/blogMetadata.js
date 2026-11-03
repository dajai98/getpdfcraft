import posts from "./blogCatalog.json";
import site from "./siteConfig.json";

// Listing dates are preserved historical labels, not verified publication timestamps.
// Do not derive datePublished/dateModified or sitemap lastmod from them.
export function blogMetadata(slug) {
  const post = posts.find(post => post.slug === slug);
  if (!post) throw new Error("Missing blog catalog entry: " + slug);
  const title = post.title + " | GetPDFCraft";
  const description = post.description;
  const url = site.origin + "/blog/" + slug;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", siteName: "GetPDFCraft", images: [{ url: "/og.svg", width: 1200, height: 630, alt: "GetPDFCraft by Dajai Studio" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.svg"] },
  };
}
