import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Compress PDF for WhatsApp (Under 100MB) Free | PDFcraft",
  description: "WhatsApp limits PDF files to 100MB. Learn how to compress your PDF to send it on WhatsApp for free in seconds. No app needed.",
  keywords: "compress pdf for whatsapp, reduce pdf size for whatsapp, pdf too large for whatsapp, send pdf on whatsapp free",
  alternates: { canonical: "https://getpdfcraft.com/blog/compress-pdf-for-whatsapp" },
  openGraph: {
    title: "How to Compress PDF for WhatsApp Free | PDFcraft",
    description: "WhatsApp limits PDF files to 100MB. Compress your PDF for free in seconds — no app needed.",
    url: "https://getpdfcraft.com/blog/compress-pdf-for-whatsapp",
    type: "article",
  },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="How to Compress PDF for WhatsApp (Under 100MB) Free"
      date="February 6, 2026" readTime="5 min read"
      intro="WhatsApp only allows document files up to 100MB. If your PDF is too large to send, you need to compress it first. PDFcraft compresses PDFs for free in seconds — no app download, no sign up, and your file never leaves your device."
      sections={[
        {
          heading: "WhatsApp PDF size limit explained",
          text: "WhatsApp allows document files up to 100MB per message. Most PDFs are well under this limit — but scanned documents, presentation exports, image-heavy reports, and multi-page brochures can easily exceed 100MB. When this happens, WhatsApp will refuse to send the file and show a 'File too large' error.",
        },
        {
          heading: "How to compress PDF for WhatsApp — step by step",
          steps: [
            { title: "Open PDFcraft Compress tool", body: "Go to PDFcraft and tap Compress PDF. Works on both phone and desktop browser — no app download needed." },
            { title: "Select your large PDF", body: "Tap 'Select File' and choose the PDF you want to send on WhatsApp. The file is read locally on your device — never uploaded to any server." },
            { title: "Click Compress PDF", body: "PDFcraft reduces the file size by optimizing images, removing duplicate data, and cleaning up the file structure. This happens instantly in your browser." },
            { title: "Check the new file size", body: "After compression you will see both the original and new file size. If the compressed file is under 100MB, you are ready to send it on WhatsApp." },
            { title: "Download the compressed file", body: "Click Download to save the compressed PDF to your device." },
            { title: "Send on WhatsApp", body: "Open WhatsApp, go to your chat, tap the attachment icon (paperclip), select Document, and choose your compressed PDF. Send it!" },
          ],
        },
        {
          heading: "What if the PDF is still too large after compression?",
          text: "If the compressed PDF is still over 100MB, the file likely contains very high resolution images that cannot be compressed further. In this case try splitting the PDF into smaller parts — send it as 2 or 3 separate messages instead of one.",
        },
        {
          heading: "Other ways to send large PDFs on WhatsApp",
          steps: [
            { title: "Split the PDF into parts", body: "Use PDFcraft's Split PDF tool to divide your document into smaller sections. Send each part as a separate message. The recipient can merge them back together." },
            { title: "Send via Google Drive link", body: "Upload the PDF to Google Drive, set sharing to 'Anyone with the link', and paste the link into WhatsApp. No file size limit this way." },
            { title: "Send via email instead", body: "Gmail and Outlook allow attachments up to 25MB. For larger files they automatically create a Google Drive or OneDrive link." },
          ],
        },
        {
          tip: "If you need to split the PDF after compressing, use PDFcraft's Split PDF tool — it's completely free and works right in your browser.",
        },
      ]}
      faqs={[
        { q: "What is WhatsApp's PDF size limit?", a: "WhatsApp allows document files up to 100MB per message. If your PDF exceeds this, you will see a 'File too large' error and need to compress it first." },
        { q: "Will compressing reduce the PDF quality?", a: "For text-based PDFs, quality is not affected at all. For image-heavy PDFs, there may be a very slight reduction in image sharpness, but text and layouts always remain sharp and readable." },
        { q: "How much can PDFcraft compress a PDF?", a: "It depends on the file content. Image-heavy PDFs can often be reduced by 50-80%. Text-only PDFs may only reduce by 10-20% since they are already quite compact." },
        { q: "Is it safe to compress PDFs on my phone?", a: "Yes — PDFcraft works entirely in your browser and never uploads your files. Your PDF stays on your device throughout the entire compression process." },
        { q: "Can I compress a PDF on iPhone for WhatsApp?", a: "Yes. PDFcraft works on iPhone Safari. Open getpdfcraft.com in Safari, tap Compress PDF, select your file, compress it, and download it to your Photos or Files app. Then send via WhatsApp." },
        { q: "What if WhatsApp still won't accept the file?", a: "Try splitting the PDF into smaller parts using PDFcraft's Split PDF tool. Send each part as a separate WhatsApp message. Alternatively, share the file via Google Drive link instead." },
      ]}
      ctaText="Compress PDF for WhatsApp now — free"
      ctaHref="/tools/compress-pdf"
    />
  );
}
