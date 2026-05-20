import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Compress PDF for WhatsApp (Under 100MB) Free | PDFcraft",
  description: "WhatsApp limits PDF files to 100MB. Learn how to compress your PDF to send it on WhatsApp for free in seconds.",
  keywords: "compress pdf for whatsapp, reduce pdf size for whatsapp, pdf too large for whatsapp, send pdf on whatsapp free",
  alternates: { canonical: "https://getpdfcraft.com/blog/compress-pdf-for-whatsapp" },
};
export default function Post() {
  return <BlogPost tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
    title="How to Compress PDF for WhatsApp (Under 100MB) Free"
    date="February 6, 2026" readTime="3 min read"
    intro="WhatsApp only allows files up to 100MB. If your PDF is too large to send, compress it for free with PDFcraft in seconds — no app needed."
    sections={[
      { heading: "WhatsApp PDF size limit", text: "WhatsApp allows document files up to 100MB. Most PDFs are well under this, but scanned documents, presentations, or image-heavy PDFs can exceed this limit easily." },
      { heading: "How to compress PDF for WhatsApp", steps: [
        { title: "Open PDFcraft Compress tool", body: "Go to PDFcraft and tap Compress PDF. Works on phone and desktop." },
        { title: "Select your large PDF", body: "Choose the PDF you want to send on WhatsApp." },
        { title: "Click Compress", body: "PDFcraft reduces the file size by removing unnecessary data and optimizing the file structure." },
        { title: "Check the new size", body: "You'll see the original and new file size. If it's under 100MB, you're ready to send on WhatsApp." },
        { title: "Send on WhatsApp", body: "Open WhatsApp, go to your chat, tap the attachment icon, select Document, and choose your compressed PDF." },
      ]},
      { tip: "If the PDF is still too large after compression, try splitting it into smaller parts using PDFcraft's Split PDF tool." },
    ]}
    faqs={[
      { q: "What is WhatsApp's PDF size limit?", a: "WhatsApp allows documents up to 100MB. If your PDF exceeds this, you need to compress it first." },
      { q: "Will compressing reduce the quality?", a: "For text-based PDFs, quality is not affected. For image-heavy PDFs, there may be a slight quality reduction but text remains sharp." },
    ]}
    ctaText="Compress PDF for WhatsApp now" ctaHref="/tools/compress-pdf" />;
}
