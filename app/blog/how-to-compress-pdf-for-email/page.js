import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How to Compress PDF for Email (Free, Under 25MB) | PDFcraft",
  description: "Most email providers limit attachments to 25MB. Learn how to compress your PDF to send it by email for free in seconds.",
  keywords: "compress pdf for email, reduce pdf size email, pdf too large to email, compress pdf attachment free",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-compress-pdf-for-email" },
  openGraph: {
    title: "How to Compress PDF for Email Free | PDFcraft",
    description: "Email attachment too large? Compress your PDF under 25MB for free in seconds.",
    url: "https://getpdfcraft.com/blog/how-to-compress-pdf-for-email",
    type: "article",
  },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tips" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="How to Compress PDF for Email (Free, Under 25MB)"
      date="February 2026" readTime="5 min read"
      intro="Gmail, Outlook, and Yahoo all limit email attachments to 25MB. If your PDF is too large to send as an attachment, you need to compress it first. PDFcraft compresses PDFs for free in seconds — no sign up, no software, and your file never leaves your device."
      sections={[
        {
          heading: "Email attachment size limits by provider",
          steps: [
            { title: "Gmail — 25MB limit", body: "Gmail has a strict 25MB attachment limit per email. Files larger than 25MB are automatically converted to Google Drive links instead of direct attachments." },
            { title: "Outlook — 20MB limit", body: "Microsoft Outlook has a 20MB limit for email attachments. This is lower than Gmail so Outlook users need to compress more aggressively." },
            { title: "Yahoo Mail — 25MB limit", body: "Yahoo Mail matches Gmail with a 25MB attachment limit." },
            { title: "Apple Mail — 20MB limit", body: "Apple Mail has a 20MB attachment limit by default, though iCloud Mail Drop can send larger files via a temporary link." },
          ],
        },
        {
          heading: "How to compress PDF for email — step by step",
          steps: [
            { title: "Open PDFcraft Compress tool", body: "Go to PDFcraft and click Compress PDF. No sign up needed. Works in any browser on any device." },
            { title: "Select your PDF", body: "Click Select File and choose the PDF you want to email. The file is processed locally on your device — never uploaded to any server." },
            { title: "Click Compress PDF", body: "PDFcraft reduces the file size by optimizing internal data. Most PDFs compress significantly in under 5 seconds." },
            { title: "Check the new file size", body: "You will see both the original and new file size. Make sure the compressed file is under your email provider's limit — under 20MB is safest." },
            { title: "Download and send", body: "Click Download to save the compressed PDF. Attach it to your email and send. No watermarks on the output." },
          ],
        },
        {
          heading: "What if the PDF is still too large after compression?",
          steps: [
            { title: "Split and send in parts", body: "Use PDFcraft's Split PDF tool to divide your document into smaller sections. Send each part as a separate email and let the recipient know to expect multiple messages." },
            { title: "Use Google Drive or Dropbox", body: "Upload the PDF to Google Drive or Dropbox, create a shareable link, and paste the link into your email. No file size limit this way." },
            { title: "Use WeTransfer", body: "WeTransfer lets you send files up to 2GB for free. Go to wetransfer.com, upload your PDF, and send the download link via email." },
          ],
        },
        {
          heading: "Tips to keep PDF file sizes small",
          list: [
            "Export PDFs at 150 DPI instead of 300 DPI when quality allows",
            "Use JPEG compression for images inside PDFs",
            "Remove unnecessary pages before sending",
            "Avoid embedding full fonts when subsetting is available",
            "Compress before sending every time — even if it was small before",
          ],
        },
        {
          tip: "The safest target is under 20MB — this works with Gmail, Outlook, Yahoo, and Apple Mail. If you need to stay under 10MB for older email systems, split the PDF into parts.",
        },
      ]}
      faqs={[
        { q: "What is the maximum PDF size I can email?", a: "It depends on your email provider. Gmail and Yahoo allow 25MB. Outlook and Apple Mail allow 20MB. To be safe for all providers, keep your PDF under 20MB." },
        { q: "How do I compress a PDF to under 1MB for email?", a: "Getting a PDF under 1MB requires aggressive compression and usually means the file has significant images. Try compressing first, and if needed, split it into multiple parts and send separately." },
        { q: "Does PDF compression reduce quality?", a: "For text-based PDFs, there is no visible quality change. For image-heavy PDFs, there may be very slight image optimization, but text always remains perfectly sharp." },
        { q: "Can I compress a PDF for email on my phone?", a: "Yes. PDFcraft works on iPhone and Android. Open getpdfcraft.com in your mobile browser, tap Compress PDF, and follow the same steps." },
        { q: "Is there a free way to send large PDFs by email?", a: "Yes. Upload to Google Drive, create a shareable link, and paste it into your email. Google Drive allows files up to 15GB on the free plan." },
        { q: "Why does Gmail automatically create a Drive link for my PDF?", a: "Gmail automatically uses Google Drive for attachments over 25MB. The recipient gets a link instead of a direct attachment. If you want a direct attachment, you must compress the PDF under 25MB first." },
      ]}
      ctaText="Compress PDF for email now — free, instant"
      ctaHref="/tools/compress-pdf"
    />
  );
}
