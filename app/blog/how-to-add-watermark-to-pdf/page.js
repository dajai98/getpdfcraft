import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Add Watermark to PDF Free Online | PDFcraft",
  description: "Add a text watermark to your PDF for free online. No sign up needed. Stamp CONFIDENTIAL, DRAFT, or any custom text instantly.",
  keywords: "add watermark to pdf free, how to watermark a pdf, pdf watermark online free, stamp pdf confidential free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-add-watermark-to-pdf" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Guide" tagColor="#9333EA" tagBg="#FAF5FF"
      title="How to Add Watermark to PDF Free Online"
      date="February 2026" readTime="3 min read"
      intro="Adding a watermark to a PDF protects your document and marks it as draft, confidential, or proprietary. PDFcraft does it for free with any custom text you choose."
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
      ctaText="Add watermark to PDF now"
      ctaHref="/tools/watermark-pdf"
    />
  );
}
