export const metadata = {
  title: "Add Page Numbers to PDF Free Online | PDFcraft",
  description: "Add page numbers to your PDF for free online. Choose position, style, and starting number. No sign up needed.",
  keywords: "add page numbers to pdf, pdf page numbers free, number pdf pages online, add page numbers pdf no sign up",
  alternates: { canonical: "https://getpdfcraft.com/tools/add-page-numbers" },
};
export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Add Page Numbers to PDF", "description": "Add page numbers to PDF with custom position and style. Free, instant, no sign up.", "url": "https://getpdfcraft.com/tools/add-page-numbers", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "keywords": "add page numbers to pdf, pdf page numbers free, number pdf pages online"}) }}
      />
      {children}
    </>
  );
}
