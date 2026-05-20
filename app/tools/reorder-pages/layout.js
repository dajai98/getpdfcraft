export const metadata = {
  title: "Reorder PDF Pages Free Online | PDFcraft",
  description: "Rearrange and reorder pages in your PDF for free online. Drag to reorder, no sign up needed. Works instantly in browser.",
  keywords: "reorder pdf pages, rearrange pdf pages free, move pdf pages online, reorganize pdf pages no sign up",
  alternates: { canonical: "https://getpdfcraft.com/tools/reorder-pages" },
};
export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Reorder PDF Pages", "description": "Rearrange and reorder pages in your PDF for free. No sign up needed.", "url": "https://getpdfcraft.com/tools/reorder-pages", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "keywords": "reorder pdf pages, rearrange pdf pages free, move pdf pages online"}) }}
      />
      {children}
    </>
  );
}
