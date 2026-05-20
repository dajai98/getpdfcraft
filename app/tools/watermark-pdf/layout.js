export const metadata = {
  title: "Add Watermark to PDF Free Online | PDFcraft",
  description: "Add a custom text watermark to your PDF. Free, instant, files never uploaded.",
  keywords: "watermark pdf, add watermark to pdf, stamp pdf free",
  openGraph: {
    title: "Watermark PDF Free Online — PDFcraft",
    description: "Add a custom text watermark to your PDF. Free, instant, files never uploaded.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/watermark-pdf" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Watermark PDF",
    "description": "Add a custom text watermark to your PDF. Free, instant, files never uploaded.",
    "url": "https://getpdfcraft.com/tools/watermark-pdf",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "watermark pdf, add watermark to pdf, stamp pdf free"
  }) }}
      />
      {children}
    </>
  );
}
