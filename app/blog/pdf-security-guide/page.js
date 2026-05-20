import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "PDF Security Guide — How to Protect Your Documents | PDFcraft",
  description: "Complete guide to PDF security. Learn how to password protect, encrypt, and watermark PDFs to keep your documents safe.",
  keywords: "pdf security, how to secure pdf, pdf password protection guide, protect pdf document, pdf encryption free",
  alternates: { canonical: "https://getpdfcraft.com/blog/pdf-security-guide" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Security" tagColor="#DB2777" tagBg="#FDF2F8"
      title="PDF Security Guide — How to Protect Your Documents"
      date="February 2026" readTime="3 min read"
      intro="PDF security is more important than ever. Whether you are sharing contracts, personal documents, or confidential reports — here is how to protect them properly."
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
      ctaText="Secure your PDF now"
      ctaHref="/"
    />
  );
}
