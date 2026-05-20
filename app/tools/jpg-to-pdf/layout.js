export const metadata = {
  title: "JPG to PDF Free Online — Convert Images to PDF | PDFcraft",
  description: "Convert JPG, PNG, and images to PDF for free online. No sign up, no watermark, no limits. Combine multiple images into one PDF instantly.",
  keywords: "jpg to pdf, image to pdf, png to pdf free, convert jpg to pdf online free, jpg to pdf no sign up no watermark",
  openGraph: {
    title: "JPG to PDF Free Online — PDFcraft",
    description: "Convert images to PDF instantly. Free, no watermark, no sign up.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/jpg-to-pdf" },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "JPG to PDF",
        "description": "Convert JPG, PNG and images to PDF for free. No sign up, no watermark.",
        "url": "https://getpdfcraft.com/tools/jpg-to-pdf",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      {children}
    </>
  );
}
