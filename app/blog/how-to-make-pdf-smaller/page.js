import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Make a PDF Smaller — 5 Free Methods (2026) | PDFcraft",
  description: "Make your PDF smaller for free using these 5 methods. Reduce PDF file size without losing quality. Works on any device.",
  keywords: "how to make pdf smaller, reduce pdf size free, make pdf file smaller, shrink pdf size online free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-make-pdf-smaller" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="How to Make a PDF Smaller — 5 Free Methods (2026)"
      date="February 2026" readTime="3 min read"
      intro="Large PDFs are a pain to share, upload, and store. Here are 5 proven ways to make your PDF smaller for free — starting with the easiest."
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
      ctaText="Make PDF smaller now"
      ctaHref="/tools/compress-pdf"
    />
  );
}
