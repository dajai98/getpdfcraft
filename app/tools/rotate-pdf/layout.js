export const metadata = {
  title: "Rotate PDF Free Online — Fix Page Orientation | PDFcraft",
  description: "Rotate PDF pages 90, 180 or 270 degrees. Fix page orientation for free.",
  keywords: "rotate pdf, fix pdf orientation, rotate pdf pages free",
  openGraph: {
    title: "Rotate PDF Free Online — PDFcraft",
    description: "Rotate PDF pages 90, 180 or 270 degrees. Fix page orientation for free.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/rotate-pdf" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Rotate PDF",
    "description": "Rotate PDF pages 90, 180 or 270 degrees. Fix page orientation for free.",
    "url": "https://getpdfcraft.com/tools/rotate-pdf",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "rotate pdf, fix pdf orientation, rotate pdf pages free"
  }) }}
      />
      {children}
    </>
  );
}
