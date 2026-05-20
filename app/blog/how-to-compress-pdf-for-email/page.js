import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Compress PDF for Email (Free, Under 25MB) | PDFcraft",
  description: "Most email providers limit attachments to 25MB. Learn how to compress your PDF to send it by email for free in seconds.",
  keywords: "compress pdf for email, reduce pdf size email, pdf too large to email, compress pdf attachment free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-compress-pdf-for-email" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="How to Compress PDF for Email (Free, Under 25MB)"
      date="February 2026" readTime="3 min read"
      intro="Gmail, Outlook, and Yahoo all limit email attachments to 25MB. If your PDF is too large to send by email, compress it for free with PDFcraft in seconds."
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
      ctaText="Compress PDF for email now"
      ctaHref="/tools/compress-pdf"
    />
  );
}
