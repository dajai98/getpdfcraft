import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Convert JPG to PDF Free Online | PDFcraft | PDFcraft",
  description: "Convert JPG images to PDF for free online. No sign up, no watermark. Combine multiple images into one PDF instantly.",
  keywords: "jpg to pdf free, convert jpg to pdf online free, image to pdf no sign up, jpg to pdf no watermark",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-convert-jpg-to-pdf" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Convert" tagColor="#16A34A" tagBg="#F0FDF4"
      title="How to Convert JPG to PDF Free Online | PDFcraft"
      date="February 2026" readTime="3 min read"
      intro="Need to turn a JPG image into a PDF? Whether it is a photo, screenshot, or scanned document — PDFcraft converts it instantly for free."
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
      ctaText="Convert JPG to PDF free"
      ctaHref="/tools/pdf-to-image"
    />
  );
}
