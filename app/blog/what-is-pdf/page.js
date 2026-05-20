import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "What is a PDF File? Complete Guide (2026) | PDFcraft",
  description: "Learn everything about PDF files — what they are, how they work, when to use them, and the best free tools to edit them.",
  keywords: "what is pdf, what is a pdf file, pdf format explained, what does pdf stand for",
  alternates: { canonical: "https://getpdfcraft.com/blog/what-is-pdf" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Guide" tagColor="#4F46E5" tagBg="#EEF2FF"
      title="What is a PDF File? Complete Guide (2026)"
      date="February 2026" readTime="3 min read"
      intro="PDF stands for Portable Document Format. Created by Adobe in 1993, it has become the world's most trusted format for sharing documents. Here is everything you need to know."
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
      ctaText="Explore free PDF tools"
      ctaHref="/"
    />
  );
}
