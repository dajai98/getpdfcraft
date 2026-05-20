import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Combine PDF and Images Into One File Free | PDFcraft",
  description: "Combine PDF files and images into one document for free online. Merge PDFs and JPGs together instantly.",
  keywords: "combine pdf and images, merge pdf with images free, add image to pdf free, combine jpg and pdf online",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-combine-pdf-and-images" },
};

export default function Post() {
  return (
    <BlogPost
      tag="Guide" tagColor="#DC2626" tagBg="#FEF2F2"
      title="How to Combine PDF and Images Into One File Free"
      date="February 2026" readTime="3 min read"
      intro="Need to combine a PDF with images into one document? Here is how to do it for free without any software or sign up required."
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
      ctaText="Merge PDFs now"
      ctaHref="/tools/merge-pdf"
    />
  );
}
