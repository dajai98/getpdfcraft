import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Analytics from "@/components/ui/Analytics";
import CookieBanner from "@/components/ui/CookieBanner";

export const metadata = {
  title: "PDFCraft — Every PDF Tool. Completely Free.",
  description: "Merge, split, compress, convert and edit PDFs for free. No sign up. No limits. Files never leave your device. 11 free PDF tools by Dajai Studio.",
  keywords: "free pdf tools, merge pdf free, split pdf online, compress pdf, pdf to image, pdf tools no sign up",
  metadataBase: new URL("https://getpdfcraft.com"),
  openGraph: {
    title: "PDFCraft — Every PDF Tool. Completely Free.",
    description: "11 free PDF tools. No sign up, no limits, files never uploaded. By Dajai Studio.",
    type: "website",
    url: "https://getpdfcraft.com",
    siteName: "PDFCraft",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "PDFCraft — Every PDF Tool. Completely Free." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFCraft — Every PDF Tool. Completely Free.",
    description: "11 free PDF tools. No sign up, no limits, files never uploaded.",
    images: ["/og.svg"],
  },
  alternates: { canonical: "https://getpdfcraft.com" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PDFCraft",
  "url": "https://getpdfcraft.com",
  "description": "Free PDF tools online. Merge, split, compress, convert PDFs. No sign up required.",
  "publisher": { "@type": "Organization", "name": "Dajai Studio" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2531068099084515"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
