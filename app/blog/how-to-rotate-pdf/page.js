import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Rotate a PDF Free Online — Fix Page Orientation | PDFcraft",
  description: "Rotate PDF pages 90, 180 or 270 degrees for free online. Fix upside down or sideways pages instantly. No sign up needed.",
  keywords: "how to rotate pdf, rotate pdf online free, fix pdf orientation, rotate pdf pages free, flip pdf pages",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-rotate-pdf" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Guide" tagColor="#2563EB" tagBg="#EFF6FF"
      title="How to Rotate a PDF Free Online — Fix Page Orientation"
      date="February 2026" readTime="3 min read"
      intro="Scanned a document upside down? Got a PDF with sideways pages? PDFcraft fixes page orientation for free in one click — no software needed."
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
      ctaText="Rotate your PDF now"
      ctaHref="/tools/rotate-pdf"
    />
  );
}
