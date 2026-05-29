export const metadata = {
  title: "Protect PDF with Password Free Online | PDFcraft",
  description: "Add password protection to any PDF for free. No sign up, no uploads, files never leave your device. Secure your PDF instantly.",
  keywords: "protect pdf password free, password protect pdf online, secure pdf free, lock pdf online no sign up",
  metadataBase: new URL("https://getpdfcraft.com"),
  openGraph: {
    title: "Protect PDF with Password Free — PDFcraft",
    description: "Add password protection to any PDF for free. Files never leave your device.",
    type: "website",
    url: "https://getpdfcraft.com/tools/protect-pdf",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/protect-pdf" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Protect PDF",
  "description": "Add password protection to any PDF for free. Files never leave your device.",
  "url": "https://getpdfcraft.com/tools/protect-pdf",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}