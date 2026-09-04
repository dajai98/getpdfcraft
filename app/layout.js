import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Analytics from "@/components/ui/Analytics";
import CookieBanner from "@/components/ui/CookieBanner";

export const metadata = {
  title: "Free PDF Tools Online — Merge, Split, Compress | PDFcraft",
  description: "Privacy-first PDF tools that run directly in your browser. Merge, split, compress, convert and edit PDFs without uploads, sign up or watermarks. 13 free tools by Dajai Studio.",
  keywords: "free pdf tools online, merge pdf free, split pdf online, compress pdf, pdf to image, browser based pdf tools, pdf tools no upload no sign up",
  metadataBase: new URL("https://getpdfcraft.com"),
  openGraph: {
    title: "Free PDF Tools Online — No Uploads, No Sign Up | PDFcraft",
    description: "Privacy-first PDF tools that run in your browser. Merge, split, compress, convert PDFs without uploads or sign up. 13 free tools.",
    type: "website",
    url: "https://getpdfcraft.com",
    siteName: "PDFcraft",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "PDFcraft — Free Privacy-First PDF Tools Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Tools Online — No Uploads, No Sign Up | PDFcraft",
    description: "Privacy-first PDF tools in your browser. Merge, split, compress PDFs without uploads or sign up.",
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
  "name": "PDFcraft",
  "url": "https://getpdfcraft.com",
  "description": "Privacy-first PDF tools that run directly in your browser. Merge, split, compress, convert PDFs without uploads or sign up.",
  "publisher": {
    "@type": "Organization",
    "name": "Dajai Studio",
    "url": "https://getpdfcraft.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://getpdfcraft.com/icon.png"
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2531068099084515"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}