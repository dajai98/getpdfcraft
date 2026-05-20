import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Convert PDF to PNG Free Online | PDFcraft | PDFcraft",
  description: "Convert PDF pages to PNG images for free online. No sign up, no watermark, high quality output. Works in browser.",
  keywords: "pdf to png free, convert pdf to png online free, pdf to png no watermark, pdf page to png image",
  alternates: { canonical: "https://getpdfcraft.com/blog/convert-pdf-to-png-free" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Convert" tagColor="#16A34A" tagBg="#F0FDF4"
      title="How to Convert PDF to PNG Free Online | PDFcraft"
      date="February 2026" readTime="3 min read"
      intro="Need PDF pages as PNG images? PNG keeps full quality with transparency support — perfect for presentations, web use, and diagrams."
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
      ctaText="Convert PDF to PNG free"
      ctaHref="/tools/pdf-to-image"
    />
  );
}
