export const metadata = {
  title: "Split PDF Free Online — No Sign Up | PDFcraft",
  description: "Split a PDF into separate pages or custom page ranges. Free, instant, no sign up.",
  keywords: "split pdf, extract pdf pages, separate pdf free",
  openGraph: {
    title: "Split PDF Free Online — PDFcraft",
    description: "Split a PDF into separate pages or custom page ranges. Free, instant, no sign up.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/split-pdf" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Split PDF",
    "description": "Split a PDF into separate pages or custom page ranges. Free, instant, no sign up.",
    "url": "https://getpdfcraft.com/tools/split-pdf",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "split pdf, extract pdf pages, separate pdf free"
  }) }}
      />
      {children}
    </>
  );
}
