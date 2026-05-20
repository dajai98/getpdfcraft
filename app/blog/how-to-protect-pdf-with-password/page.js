import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Password Protect a PDF Free Online | PDFcraft",
  description: "Add a password to your PDF file for free online. No sign up, no software needed. Protect sensitive documents instantly.",
  keywords: "how to password protect pdf, protect pdf with password free, add password to pdf online, encrypt pdf free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-protect-pdf-with-password" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Security" tagColor="#DB2777" tagBg="#FDF2F8"
      title="How to Password Protect a PDF Free Online"
      date="February 2026" readTime="3 min read"
      intro="Need to protect a sensitive PDF with a password? PDFcraft lets you add password protection for free in seconds — no software, no sign up required."
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
      ctaText="Protect your PDF now"
      ctaHref="/"
    />
  );
}
