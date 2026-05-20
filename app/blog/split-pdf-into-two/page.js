import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Split a PDF Into Two Files Free Online | PDFcraft",
  description: "Split a PDF into two separate files for free online. No sign up, no software. Divide your PDF by page range instantly.",
  keywords: "split pdf into two, divide pdf into two parts free, split pdf in half free, separate pdf into two files",
  alternates: { canonical: "https://getpdfcraft.com/blog/split-pdf-into-two" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Split PDF" tagColor="#EA580C" tagBg="#FFF7ED"
      title="How to Split a PDF Into Two Files Free Online"
      date="February 2026" readTime="3 min read"
      intro="Need to divide a PDF into two separate files? PDFcraft splits any PDF by page range for free in seconds — no sign up, no software needed."
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
      ctaText="Split PDF into two now"
      ctaHref="/tools/split-pdf"
    />
  );
}
