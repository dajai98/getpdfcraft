import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Extract Pages From a PDF Free Online | PDFcraft",
  description: "Extract specific pages from a PDF for free online. No sign up, no software. Get just the pages you need instantly.",
  keywords: "extract pages from pdf free, how to extract pdf pages, get specific pages from pdf free, pull pages from pdf",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-extract-pages-from-pdf" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Split PDF" tagColor="#EA580C" tagBg="#FFF7ED"
      title="How to Extract Pages From a PDF Free Online"
      date="February 2026" readTime="3 min read"
      intro="Need just a few pages from a large PDF? PDFcraft extracts any pages you specify for free — no sign up, no software, instant results."
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
      ctaText="Extract PDF pages now"
      ctaHref="/tools/split-pdf"
    />
  );
}
