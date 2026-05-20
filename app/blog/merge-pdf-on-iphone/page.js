import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Merge PDF on iPhone Free (No App Needed) | PDFcraft",
  description: "Merge PDF files on iPhone for free without installing any app. Works directly in Safari. Step by step guide.",
  keywords: "merge pdf on iphone, combine pdf iphone free, merge pdf safari iphone, join pdf files iphone no app",
  alternates: { canonical: "https://getpdfcraft.com/blog/merge-pdf-on-iphone" },
};
export default function Post() {
  return <BlogPost tag="iPhone" tagColor="#1D4ED8" tagBg="#EFF6FF"
    title="How to Merge PDF on iPhone Free (No App Needed)"
    date="February 4, 2026" readTime="3 min read"
    intro="You don't need to install any app to merge PDFs on iPhone. PDFcraft works directly in Safari and processes files locally on your device."
    sections={[
      { heading: "How to merge PDFs on iPhone", steps: [
        { title: "Open Safari on your iPhone", body: "Go to getpdfcraft.com in Safari. The site works on all iPhone models with iOS 14 and above." },
        { title: "Tap Merge PDF", body: "Tap the Merge PDF tool from the homepage tools grid." },
        { title: "Select your PDF files", body: "Tap Select Files and choose your PDFs from the Files app, iCloud Drive, or anywhere on your iPhone." },
        { title: "Tap Merge PDFs", body: "The merge happens instantly on your iPhone. No uploading to any server." },
        { title: "Save to Files", body: "When the download starts, tap and hold the file, then choose Save to Files to save it to your iPhone." },
      ]},
      { tip: "PDFcraft works on iPhone without any app installation. Everything runs in Safari." },
    ]}
    faqs={[
      { q: "Do I need to install an app to merge PDFs on iPhone?", a: "No. PDFcraft works directly in Safari. No App Store download needed." },
      { q: "Does it work on older iPhones?", a: "Yes, PDFcraft works on any iPhone running iOS 14 or later with Safari." },
      { q: "Are my files safe on iPhone?", a: "Yes. PDFcraft processes files locally on your iPhone. Nothing is uploaded to any server." },
    ]}
    ctaText="Merge PDF on iPhone now" ctaHref="/tools/merge-pdf" />;
}
