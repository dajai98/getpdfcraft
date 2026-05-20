export const metadata = {
  title: "Convert PDF to Grayscale Free Online | PDFcraft",
  description: "Convert a color PDF to grayscale for free online. Reduce file size and prepare for black and white printing. No sign up needed.",
  keywords: "pdf to grayscale, convert pdf to black and white, grayscale pdf free, pdf black white online no sign up",
  alternates: { canonical: "https://getpdfcraft.com/tools/pdf-to-grayscale" },
};
export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "PDF to Grayscale", "description": "Convert color PDF to black and white grayscale for free online. No sign up.", "url": "https://getpdfcraft.com/tools/pdf-to-grayscale", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "keywords": "pdf to grayscale, convert pdf to black and white, grayscale pdf free"}) }}
      />
      {children}
    </>
  );
}
