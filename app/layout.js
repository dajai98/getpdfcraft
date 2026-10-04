import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Analytics from "@/components/ui/Analytics";
import CookieBanner from "@/components/ui/CookieBanner";

export const metadata = {
  title: "Free PDF Tools Online — Merge, Split, Compress | PDFcraft",
  description: "13 free PDF tools by Dajai Studio. Merge, split, compress, convert and edit with local document processing in your browser. No account required.",
  keywords: "free pdf tools online, merge pdf free, split pdf online, compress pdf, pdf to image, browser based pdf tools, pdf tools no upload no sign up",
  icons: { icon: { url: "/icon.png", type: "image/png", sizes: "512x512" } },
  metadataBase: new URL("https://getpdfcraft.com"),
  openGraph: {
    title: "Free PDF Tools Online — No Uploads, No Sign Up | PDFcraft",
    description: "13 free tools for local PDF processing in your browser. Merge, split, compress and convert documents with no account required.",
    type: "website",
    url: "https://getpdfcraft.com",
    siteName: "PDFcraft",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "PDFcraft — Free Privacy-First PDF Tools Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Tools Online — No Uploads, No Sign Up | PDFcraft",
    description: "Free browser-based PDF tools with local document processing and no account required.",
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
  "description": "Free browser-based PDF tools by Dajai Studio. Document contents are processed locally, with no account required.",
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
      </body>
    </html>
  );
}