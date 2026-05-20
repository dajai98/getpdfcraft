export const metadata = {
  title: "Compress PDF Free Online — Reduce File Size | PDFcraft",
  description: "Reduce PDF file size without losing quality. Free, instant, works in browser.",
  keywords: "compress pdf, reduce pdf size, shrink pdf free",
  openGraph: {
    title: "Compress PDF Free Online — PDFcraft",
    description: "Reduce PDF file size without losing quality. Free, instant, works in browser.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/compress-pdf" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Compress PDF",
    "description": "Reduce PDF file size without losing quality. Free, instant, works in browser.",
    "url": "https://getpdfcraft.com/tools/compress-pdf",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "compress pdf, reduce pdf size, shrink pdf free"
  }) }}
      />
      {children}
    </>
  );
}
