import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "PDF to Word Free Online — Best Options in 2026 | PDFcraft",
  description: "Convert PDF to Word document free online. Compare the best free PDF to Word converters with no sign up required.",
  keywords: "pdf to word free, convert pdf to word online free, pdf to docx free no sign up, pdf to word no watermark",
  alternates: { canonical: "https://getpdfcraft.com/blog/pdf-to-word-free" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Convert" tagColor="#16A34A" tagBg="#F0FDF4"
      title="PDF to Word Free Online — Best Options in 2026"
      date="February 2026" readTime="3 min read"
      intro="Converting PDF to Word is one of the most searched PDF tasks online. Here are the best free options available in 2026 and what to expect from each."
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
      ctaText="Try free PDF tools"
      ctaHref="/"
    />
  );
}
