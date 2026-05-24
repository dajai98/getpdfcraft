import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Extract Pages from PDF Free Online | PDFcraft",
  description: "Extract specific pages from a PDF for free online. No sign up, no watermarks. Save individual pages or page ranges instantly.",
  keywords: "extract pages from pdf free, pdf page extractor online, save specific pages from pdf, split pdf extract pages",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-extract-pages-from-pdf" },
  openGraph: { title: "How to Extract Pages from PDF Free | PDFcraft", description: "Extract specific pages from any PDF for free. No sign up, instant.", url: "https://getpdfcraft.com/blog/how-to-extract-pages-from-pdf", type: "article" },
};
export default function Post() {
  return (
    <BlogPost tag="Guide" tagColor="#EA580C" tagBg="#FFF7ED"
      title="How to Extract Pages from PDF Free Online"
      date="February 2026" readTime="5 min read"
      intro="Need just a few pages from a large PDF? Extracting specific pages lets you share only what's relevant, reduce file size, or separate sections of a document. PDFcraft lets you extract any pages from a PDF for free — no sign up, no watermarks."
      sections={[
        { heading: "When do you need to extract PDF pages?", steps: [
          { title: "Share only relevant pages", body: "Extract the specific pages a client or colleague needs instead of sending an entire 50-page document." },
          { title: "Separate chapters or sections", body: "Split a large document into individual chapters or sections, each as a separate PDF file." },
          { title: "Remove confidential pages before sharing", body: "Extract the non-confidential pages into a new PDF, leaving out sensitive sections." },
          { title: "Reduce file size for sending", body: "Extracting only the needed pages creates a much smaller file that is easier to email or share." },
        ]},
        { heading: "How to extract pages from PDF — step by step", steps: [
          { title: "Open PDFcraft Split PDF tool", body: "Go to PDFcraft and click Split PDF. This tool lets you extract specific pages or page ranges from any PDF." },
          { title: "Select your PDF", body: "Click Select File and choose the PDF you want to extract pages from. The file stays on your device." },
          { title: "Enter the pages you want", body: "Enter specific page numbers (like 1, 3, 5) or page ranges (like 2-8) to extract. You can combine both — for example: 1, 3-7, 10." },
          { title: "Click Extract Pages", body: "PDFcraft creates a new PDF containing only the pages you specified. This happens instantly in your browser." },
          { title: "Download the extracted PDF", body: "Click Download to save the new PDF with only your selected pages. No watermarks added." },
        ]},
        { heading: "Extract vs Split — what is the difference?", steps: [
          { title: "Extract pages", body: "Extracts specific pages into a new PDF. The original PDF is not modified. You choose exactly which pages you want." },
          { title: "Split into parts", body: "Divides the PDF into multiple separate files — for example, split a 20-page PDF into 4 files of 5 pages each." },
        ]},
        { tip: "To extract multiple separate page ranges into different files, run the Split PDF tool multiple times with different page ranges. Each run creates a separate extracted PDF." },
      ]}
      faqs={[
        { q: "Can I extract specific pages from a PDF for free?", a: "Yes. PDFcraft's Split PDF tool lets you extract any pages or page ranges from a PDF completely free." },
        { q: "Can I extract non-consecutive pages?", a: "Yes. Enter page numbers separated by commas — for example 1, 3, 7, 12 — to extract non-consecutive pages into one PDF." },
        { q: "Does extracting pages modify the original PDF?", a: "No. PDFcraft creates a new PDF with the extracted pages. Your original file is never modified." },
        { q: "Is there a limit on how many pages I can extract?", a: "No. PDFcraft has no limits on the number of pages you can extract." },
        { q: "Can I extract pages on my phone?", a: "Yes. PDFcraft works on iPhone and Android browsers." },
        { q: "Can I extract pages from a password protected PDF?", a: "Password protected PDFs cannot be processed until the password is removed. Use PDFcraft's Unlock PDF tool first if needed." },
      ]}
      ctaText="Extract PDF pages now — free"
      ctaHref="/tools/split-pdf"
    />
  );
}
