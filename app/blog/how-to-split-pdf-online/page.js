import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Split PDF Online Free — No Sign Up | PDFcraft",
  description: "Split a PDF into separate pages or custom ranges for free online. No sign up, no watermarks, instant results.",
  keywords: "split pdf online free, how to split pdf, split pdf into pages free, separate pdf pages online",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-split-pdf-online" },
  openGraph: { title: "How to Split PDF Online Free | PDFcraft", description: "Split PDF into pages or ranges for free. No sign up, instant.", url: "https://getpdfcraft.com/blog/how-to-split-pdf-online", type: "article" },
};
export default function Post() {
  return (
    <BlogPost tag="Split PDF" tagColor="#EA580C" tagBg="#FFF7ED"
      title="How to Split PDF Online Free — No Sign Up"
      date="February 2026" readTime="5 min read"
      intro="Splitting a PDF lets you extract specific pages, separate chapters, or divide a large document into smaller parts. PDFcraft splits any PDF for free with no sign up and no watermarks — right in your browser."
      sections={[
        { heading: "Why split a PDF?", steps: [
          { title: "Share only relevant pages", body: "Extract the specific pages a client needs instead of sending a 100-page document." },
          { title: "Separate chapters or sections", body: "Divide a large document into individual chapters, each as its own PDF." },
          { title: "Reduce file size for sending", body: "Split a large PDF into smaller parts that fit within email attachment limits." },
          { title: "Remove confidential pages", body: "Extract only the non-sensitive pages into a new document before sharing." },
          { title: "Reorganize documents", body: "Split and then re-merge in a different order using PDFcraft's Merge PDF tool." },
        ]},
        { heading: "How to split a PDF online — step by step", steps: [
          { title: "Open PDFcraft Split PDF tool", body: "Go to PDFcraft and click Split PDF. No account or software needed." },
          { title: "Select your PDF", body: "Click Select File and choose the PDF you want to split. Your file never leaves your device." },
          { title: "Choose how to split", body: "Enter the pages or ranges you want to extract. For example: pages 1-5, or page 3 and 7, or split every page into separate files." },
          { title: "Click Split PDF", body: "PDFcraft splits the PDF instantly in your browser." },
          { title: "Download your split files", body: "Download the resulting PDF or files. No watermarks on any output." },
        ]},
        { heading: "Split options explained", steps: [
          { title: "Extract a page range", body: "Extract pages 3-8 into a new PDF. The original is unchanged." },
          { title: "Extract specific pages", body: "Enter individual page numbers separated by commas — like 1, 4, 7 — to extract non-consecutive pages." },
          { title: "Split into equal parts", body: "Divide a 20-page PDF into four 5-page files, for example." },
          { title: "Split every page", body: "Create a separate PDF for every single page in the document." },
        ]},
        { heading: "Split then merge for full control", text: "The most powerful workflow is split then merge. Split a PDF into sections, rearrange or modify the sections, then merge them back together using PDFcraft's Merge PDF tool. This gives you complete control over document structure.", },
        { tip: "After splitting a large document, use PDFcraft's Compress PDF tool on each part to keep the file sizes small before sending." },
      ]}
      faqs={[
        { q: "Can I split a PDF for free with no sign up?", a: "Yes. PDFcraft's Split PDF tool is completely free with no account required." },
        { q: "Can I split a PDF into individual pages?", a: "Yes. Choose the option to split every page into a separate PDF file." },
        { q: "Is there a limit on how many pages I can split?", a: "No. PDFcraft has no limit on PDF page count." },
        { q: "Does splitting a PDF reduce quality?", a: "No. PDFcraft extracts pages without re-encoding content. Quality is identical to the original." },
        { q: "Can I split a PDF on mobile?", a: "Yes. PDFcraft works on iPhone and Android browsers." },
        { q: "Can I split a password protected PDF?", a: "Remove the password first using PDFcraft's Unlock PDF tool, then split." },
      ]}
      ctaText="Split your PDF now — free, instant"
      ctaHref="/tools/split-pdf"
    />
  );
}
