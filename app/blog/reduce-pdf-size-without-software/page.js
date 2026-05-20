import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Reduce PDF Size Without Software (Free) | PDFcraft",
  description: "Reduce PDF file size without installing any software. Free browser-based methods that work on any device.",
  keywords: "reduce pdf size without software, compress pdf no software, reduce pdf file size online free, shrink pdf browser",
  alternates: { canonical: "https://getpdfcraft.com/blog/reduce-pdf-size-without-software" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="How to Reduce PDF Size Without Software (Free)"
      date="February 2026" readTime="3 min read"
      intro="You do not need to install any software to reduce PDF size. PDFcraft compresses PDFs for free directly in your browser on any device."
      sections={[
        {
          heading: "Step by step guide",
          steps: [
            { title: "Open PDFcraft", body: "Go to PDFcraft in your browser. No sign up or installation needed." },
            { title: "Select your file", body: "Click Select File and choose your PDF from your device." },
            { title: "Process your file", body: "Use the tool options and click the action button. Processing happens instantly in your browser." },
            { title: "Download the result", body: "Click Download to save the processed file to your device." },
          ],
        },
        {
          tip: "PDFcraft processes all files locally in your browser. Your files never leave your device.",
        },
      ]}
      faqs={[
        { q: "Is PDFcraft free to use?", a: "Yes, completely free. No sign up, no limits, no hidden fees." },
        { q: "Are my files safe?", a: "Absolutely. Files are processed locally in your browser and never uploaded to any server." },
        { q: "Does it work on mobile?", a: "Yes, PDFcraft works on all devices including iPhone and Android." },
      ]}
      ctaText="Reduce PDF size now"
      ctaHref="/tools/compress-pdf"
    />
  );
}
