export const metadata = {
  title: "Delete PDF Pages Free Online — Remove Pages | PDFcraft",
  description: "Delete or remove specific pages from a PDF for free online. No sign up, no software needed. Works instantly in your browser.",
  keywords: "delete pdf pages, remove pages from pdf free, delete page from pdf online, remove pdf page no sign up",
  alternates: { canonical: "https://getpdfcraft.com/tools/delete-pages" },
};
export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Delete PDF Pages", "description": "Delete or remove specific pages from a PDF for free. No sign up, works in browser.", "url": "https://getpdfcraft.com/tools/delete-pages", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "keywords": "delete pdf pages, remove pages from pdf free, delete page from pdf online"}) }}
      />
      {children}
    </>
  );
}
