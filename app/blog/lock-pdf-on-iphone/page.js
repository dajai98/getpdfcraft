import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Lock PDF on iPhone Free (No App Needed) | PDFcraft",
  description: "Lock any PDF on iPhone for free without downloading an app. Works in Safari browser instantly. Add password protection in seconds.",
  keywords: "lock pdf on iphone, password protect pdf iphone, secure pdf iphone no app, lock pdf ios free",
  alternates: { canonical: "https://getpdfcraft.com/blog/lock-pdf-on-iphone" },
  openGraph: { title: "How to Lock PDF on iPhone Free | PDFcraft", description: "Lock PDF on iPhone without any app. Works in Safari, free, no sign up.", url: "https://getpdfcraft.com/blog/lock-pdf-on-iphone", type: "article" },
};
export default function Post() {
  return (
    <BlogPost tag="iPhone" tagColor="#2563EB" tagBg="#EFF6FF"
      title="How to Lock PDF on iPhone Free (No App Needed)"
      date="May 2026" readTime="5 min read"
      intro="You don't need to download any app to lock a PDF on iPhone. PDFcraft works directly in Safari — add password protection to any PDF for free in seconds, right on your iPhone. Your file never leaves your device."
      sections={[
        { heading: "How to lock a PDF on iPhone — step by step", steps: [
          { title: "Open Safari on your iPhone", body: "Go to getpdfcraft.com in Safari. PDFcraft works fully in mobile Safari — no app download needed." },
          { title: "Tap Protect PDF", body: "Tap the Protect PDF tool from the home screen." },
          { title: "Select your PDF", body: "Tap Select File. The Files app picker opens. Navigate to your PDF in iCloud Drive, On My iPhone, or Downloads." },
          { title: "Enter your password", body: "Type a strong password in the password field. Use at least 8 characters for good protection." },
          { title: "Tap Protect PDF", body: "PDFcraft encrypts the PDF with your password locally on your iPhone — nothing is uploaded anywhere." },
          { title: "Download and share", body: "Tap Download. The locked PDF saves to your iPhone Downloads folder in the Files app. Share it via AirDrop, WhatsApp, or email." },
        ]},
        { heading: "Where to find the locked PDF on iPhone", steps: [
          { title: "Open the Files app", body: "Tap the Files app on your iPhone home screen." },
          { title: "Go to Downloads", body: "Tap Browse → On My iPhone → Downloads. Your locked PDF will be there." },
          { title: "Share from Files", body: "Long press the PDF → Share to send via AirDrop, Mail, WhatsApp, or any other app." },
        ]},
        { heading: "Lock PDF from iCloud Drive on iPhone", steps: [
          { title: "Select from iCloud", body: "When PDFcraft opens the Files picker, navigate to iCloud Drive to select PDFs stored in your iCloud." },
          { title: "Save locked PDF back to iCloud", body: "After downloading, move the locked PDF from Downloads to iCloud Drive using the Files app for backup." },
        ]},
        { heading: "Other iPhone PDF security tips", list: [
          { text: "Add watermark to PDF on iPhone", href: "/tools/watermark-pdf" },
          { text: "Compress PDF on iPhone before sharing", href: "/tools/compress-pdf" },
          { text: "Merge PDFs on iPhone", href: "/tools/merge-pdf" },
        ]},
        { tip: "Add PDFcraft to your iPhone home screen for quick access. In Safari, tap the Share button → Add to Home Screen. Use it like an app without downloading anything." },
      ]}
      faqs={[
        { q: "Can I lock a PDF on iPhone without an app?", a: "Yes. PDFcraft works in iPhone Safari. Go to getpdfcraft.com, tap Protect PDF, select your file, set a password, and download the locked PDF." },
        { q: "Where does the locked PDF save on iPhone?", a: "After downloading, the locked PDF saves to Files → On My iPhone → Downloads." },
        { q: "Can I lock a PDF from iCloud Drive on iPhone?", a: "Yes. When selecting files in PDFcraft, navigate to iCloud Drive in the Files picker." },
        { q: "Does locking a PDF on iPhone use iCloud storage?", a: "No. PDFcraft processes files locally on your iPhone. No internet data is used for encryption." },
        { q: "Can I send a locked PDF from iPhone via WhatsApp?", a: "Yes. After downloading the locked PDF, go to WhatsApp → attach document → select the locked PDF from Downloads." },
        { q: "Does PDFcraft work on iPad too?", a: "Yes. Same steps work on all iPad models in Safari." },
      ]}
      ctaText="Lock PDF on iPhone now — free, no app"
      ctaHref="/tools/protect-pdf"
    />
  );
}
