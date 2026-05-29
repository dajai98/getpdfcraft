export const metadata = {
  title: "Unlock PDF — Remove Password Free Online | PDFcraft",
  description: "Remove password protection from a PDF you own for free. No sign up, no uploads, files never leave your device.",
  keywords: "unlock pdf free, remove pdf password online, pdf password remover free, unlock pdf no sign up",
  metadataBase: new URL("https://getpdfcraft.com"),
  openGraph: {
    title: "Unlock PDF — Remove Password Free — PDFcraft",
    description: "Remove PDF password protection for free. Files never leave your device.",
    type: "website",
    url: "https://getpdfcraft.com/tools/unlock-pdf",
  },
  alternates: { canonical: "https://getpdfcraft.com/tools/unlock-pdf" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Unlock PDF",
  "description": "Remove password protection from a PDF you own for free. Files never leave your device.",
  "url": "https://getpdfcraft.com/tools/unlock-pdf",
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