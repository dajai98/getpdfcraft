import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Split PDF Into Two Parts Free | PDFcraft",
  description: "Split a PDF into two separate files for free online. No sign up, no watermarks. Divide any PDF instantly in your browser.",
  keywords: "split pdf into two, divide pdf in half free, split pdf two parts online, cut pdf in half free",
  alternates: { canonical: "https://getpdfcraft.com/blog/split-pdf-into-two" },
  openGraph: { title: "How to Split PDF Into Two Parts Free | PDFcraft", description: "Split a PDF into two files for free. No sign up, instant.", url: "https://getpdfcraft.com/blog/split-pdf-into-two", type: "article" },
};
export default function Post() {
  return (
    <BlogPost tag="Split PDF" tagColor="#EA580C" tagBg="#FFF7ED"
      title="How to Split PDF Into Two Parts Free"
      date="February 2026" readTime="4 min read"
      intro="Need to divide a PDF into two separate files? Whether you are splitting a document at a specific page, separating two chapters, or dividing a large file for easier sharing — PDFcraft splits any PDF into two parts for free with no sign up."
      sections={[
        { heading: "Why split a PDF into two parts?", steps: [
          { title: "Document too large to email", body: "Split a large PDF into two smaller parts that each fit within email attachment limits (20-25MB)." },
          { title: "Separate different sections", body: "A document may contain two distinct parts — for example, the main report and the appendix — that should be separate files." },
          { title: "Share only part of a document", body: "Split to share only the relevant section with a specific person without giving them the entire document." },
          { title: "Different recipients need different parts", body: "Split a document so each department or person only receives the section relevant to them." },
        ]},
        { heading: "How to split a PDF into two parts — step by step", steps: [
          { title: "Open PDFcraft Split PDF tool", body: "Go to PDFcraft and click Split PDF. No sign up or software needed." },
          { title: "Select your PDF", body: "Choose the PDF you want to split. The file stays on your device." },
          { title: "Enter the split point", body: "Specify where to split — for example, 'pages 1-10' for the first part and 'pages 11-20' for the second part. Enter the first range and download, then repeat for the second range." },
          { title: "Download first part", body: "Download the first PDF containing your specified pages." },
          { title: "Repeat for the second part", body: "Go back to the Split tool, upload the original PDF again, enter the second page range, and download the second part." },
        ]},
        { heading: "How to decide where to split", steps: [
          { title: "Split at a chapter or section break", body: "The most natural split point is at a chapter heading or major section break. This keeps each part logically complete." },
          { title: "Split by file size", body: "If your goal is to fit within an email limit, calculate which page number gets each part under 20MB and split there." },
          { title: "Split in half", body: "To divide equally, check the total page count and split at the midpoint. A 40-page PDF splits at page 20." },
        ]},
        { tip: "After splitting, use PDFcraft's Compress PDF tool on each part to further reduce file size before sending." },
      ]}
      faqs={[
        { q: "Can I split a PDF into two files for free?", a: "Yes. PDFcraft's Split PDF tool is completely free with no sign up required." },
        { q: "Can I split a PDF into more than two parts?", a: "Yes. Run the Split tool multiple times with different page ranges to create as many parts as you need." },
        { q: "Does splitting a PDF reduce quality?", a: "No. Splitting only separates pages — there is no re-encoding or quality loss." },
        { q: "Can I split a PDF on my phone?", a: "Yes. PDFcraft works on iPhone and Android browsers." },
        { q: "Is there a page limit for splitting?", a: "No. PDFcraft handles PDFs of any length." },
        { q: "How do I know what page number to split at?", a: "Open the PDF in your browser or PDF viewer, scroll to the section break, and note the page number. Use that number as your split point." },
      ]}
      ctaText="Split your PDF now — free, instant"
      ctaHref="/tools/split-pdf"
    />
  );
}
