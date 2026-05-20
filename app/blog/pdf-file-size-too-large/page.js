import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "PDF File Size Too Large? Here's How to Fix It Free | PDFcraft",
  description: "Is your PDF file too large? Learn why PDFs get large and how to reduce their size for free without losing quality.",
  keywords: "pdf file too large, reduce pdf file size free, pdf too big, why is my pdf so large, fix large pdf",
  alternates: { canonical: "https://getpdfcraft.com/blog/pdf-file-size-too-large" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="PDF File Size Too Large? Here's How to Fix It Free"
      date="February 2026" readTime="3 min read"
      intro="A PDF that is too large is frustrating — too slow to send, rejected by email, and hard to share. Here is exactly why PDFs get large and how to fix it for free."
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
      ctaText="Compress your PDF now"
      ctaHref="/tools/compress-pdf"
    />
  );
}
