import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "PDF vs Word — Which Format Should You Use? | PDFcraft",
  description: "PDF vs Word document — which is better? Learn when to use PDF and when to use Word for different situations.",
  keywords: "pdf vs word, pdf vs docx, when to use pdf, difference between pdf and word",
  alternates: { canonical: "https://getpdfcraft.com/blog/pdf-vs-word-which-is-better" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Guide" tagColor="#4F46E5" tagBg="#EEF2FF"
      title="PDF vs Word — Which Format Should You Use?"
      date="February 2026" readTime="3 min read"
      intro="Both PDF and Word are great formats — but for very different purposes. Choosing the wrong one causes headaches. Here is when to use each."
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
      ctaText="Convert between PDF and other formats"
      ctaHref="/"
    />
  );
}
