import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Merge PDF on Mac — Free Methods (2026) | PDFcraft",
  description: "Merge PDF files on Mac for free. Use the built-in Preview app or PDFcraft online tool. Step by step guide.",
  keywords: "merge pdf mac free, combine pdf on mac, how to merge pdf files mac, join pdf mac free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-merge-pdf-on-mac" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Mac" tagColor="#374151" tagBg="#F9FAFB"
      title="How to Merge PDF on Mac — Free Methods (2026)"
      date="February 2026" readTime="3 min read"
      intro="Mac users have two great options to merge PDFs for free — the built-in Preview app or PDFcraft online. Here is how to use both."
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
      ctaText="Merge PDF online free"
      ctaHref="/tools/merge-pdf"
    />
  );
}
