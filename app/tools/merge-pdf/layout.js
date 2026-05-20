export const metadata = {
  title: "Merge PDF Free Online — No Sign Up | PDFcraft",
  description: "Combine multiple PDF files into one document. Free, instant, no sign up required.",
  keywords: "merge pdf, combine pdf, join pdf files free",
  openGraph: {
    title: "Merge PDF Free Online — PDFcraft",
    description: "Combine multiple PDF files into one document. Free, instant, no sign up required.",
    type: "website",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/merge-pdf" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Merge PDF",
    "description": "Combine multiple PDF files into one document. Free, instant, no sign up required.",
    "url": "https://getpdfcraft.com/tools/merge-pdf",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "merge pdf, combine pdf, join pdf files free"
  }) }}
      />
      {children}
    </>
  );
}
