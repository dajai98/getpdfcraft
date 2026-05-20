export const metadata = {
  title: "PDF to JPG/PNG Free Online — No Watermark | PDFcraft",
  description: "Convert PDF pages to high quality JPG or PNG images. Free, no watermark, no sign up.",
  keywords: "pdf to jpg, pdf to image, pdf to png free",
  openGraph: {
    title: "PDF to Image Free Online — PDFcraft",
    description: "Convert PDF pages to high quality JPG or PNG images. Free, no watermark, no sign up.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/pdf-to-image" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Image",
    "description": "Convert PDF pages to high quality JPG or PNG images. Free, no watermark, no sign up.",
    "url": "https://getpdfcraft.com/tools/pdf-to-image",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "pdf to jpg, pdf to image, pdf to png free"
  }) }}
      />
      {children}
    </>
  );
}
