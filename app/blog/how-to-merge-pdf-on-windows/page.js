import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Merge PDF on Windows Free (No Software) | PDFcraft",
  description: "Merge PDF files on Windows for free without installing software. Use PDFcraft in your browser. Step by step guide.",
  keywords: "merge pdf windows free, combine pdf windows 10, merge pdf without software windows, join pdf windows free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-merge-pdf-on-windows" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Windows" tagColor="#2563EB" tagBg="#EFF6FF"
      title="How to Merge PDF on Windows Free (No Software)"
      date="February 2026" readTime="3 min read"
      intro="Windows does not have a built-in PDF merger. But you do not need to install any software — PDFcraft merges PDFs for free directly in your browser."
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
      ctaText="Merge PDF on Windows now"
      ctaHref="/tools/merge-pdf"
    />
  );
}
