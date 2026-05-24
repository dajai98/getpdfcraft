import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  title: "How to Rotate PDF Pages Free Online | PDFcraft",
  description: "Rotate PDF pages for free online. Fix sideways or upside down pages instantly. No sign up, no watermarks.",
  keywords: "rotate pdf free, how to rotate pdf pages, fix sideways pdf, rotate pdf online no sign up",
  alternates: { canonical: "https://getpdfcraft.com/blog/how-to-rotate-pdf" },
  openGraph: { title: "How to Rotate PDF Pages Free | PDFcraft", description: "Fix sideways or upside down PDF pages for free. No sign up.", url: "https://getpdfcraft.com/blog/how-to-rotate-pdf", type: "article" },
};
export default function Post() {
  return (
    <BlogPost tag="Rotate PDF" tagColor="#2563EB" tagBg="#EFF6FF"
      title="How to Rotate PDF Pages Free Online"
      date="February 2026" readTime="4 min read"
      intro="Scanned documents often come out sideways or upside down. PDFs exported from certain apps may have pages in the wrong orientation. PDFcraft fixes page orientation for free — rotate any pages 90° or 180° in seconds. No sign up, no watermarks."
      sections={[
        { heading: "Why do PDF pages need rotating?", steps: [
          { title: "Scanned documents", body: "When scanning physical documents, pages are often placed incorrectly in the scanner — coming out sideways or upside down in the PDF." },
          { title: "Mobile phone scans", body: "Photos taken of documents on a phone can have incorrect orientation if the phone was held sideways." },
          { title: "Mixed orientation documents", body: "A PDF may have a mix of portrait and landscape pages that need to match a consistent orientation." },
          { title: "Incorrectly exported PDFs", body: "Some software exports PDFs with the wrong page rotation metadata, causing them to display incorrectly in PDF viewers." },
        ]},
        { heading: "How to rotate PDF pages — step by step", steps: [
          { title: "Open PDFcraft Rotate PDF tool", body: "Go to PDFcraft and click Rotate PDF. Works in any browser on any device." },
          { title: "Select your PDF", body: "Choose the PDF with pages that need rotating. The file stays on your device." },
          { title: "Choose rotation direction and pages", body: "Select which pages to rotate — all pages, or specific pages. Choose 90° clockwise, 90° counter-clockwise, or 180°." },
          { title: "Click Rotate PDF", body: "PDFcraft applies the rotation instantly in your browser." },
          { title: "Download the rotated PDF", body: "Download your fixed PDF. Pages are now in the correct orientation." },
        ]},
        { heading: "Rotation options explained", steps: [
          { title: "90° clockwise", body: "Rotates pages to the right. Use this if pages appear sideways leaning left — you need to turn them right to read them." },
          { title: "90° counter-clockwise", body: "Rotates pages to the left. Use this if pages appear sideways leaning right." },
          { title: "180°", body: "Flips pages upside down. Use this if pages appear completely inverted." },
        ]},
        { tip: "If only some pages are sideways, rotate all pages first and then use PDFcraft's Reorder Pages to verify the result. You can also rotate specific page ranges if your tool supports it." },
      ]}
      faqs={[
        { q: "Can I rotate PDF pages for free?", a: "Yes. PDFcraft's Rotate PDF tool is completely free with no sign up required." },
        { q: "Can I rotate only specific pages in a PDF?", a: "Yes. PDFcraft lets you choose which pages to rotate — all pages or specific page ranges." },
        { q: "Will rotating a PDF reduce its quality?", a: "No. Rotating a PDF only changes the page orientation metadata. No re-encoding or quality loss occurs." },
        { q: "Can I rotate a PDF on my phone?", a: "Yes. PDFcraft works on iPhone Safari and Android Chrome." },
        { q: "What if my PDF opens sideways in the viewer but prints correctly?", a: "Some PDF viewers display pages based on rotation metadata rather than actual content rotation. Using PDFcraft's Rotate tool permanently fixes the rotation so it displays correctly everywhere." },
        { q: "Can I undo a rotation?", a: "PDFcraft does not modify your original file. If you rotate in the wrong direction, just rotate the downloaded file again in the opposite direction." },
      ]}
      ctaText="Rotate your PDF pages now — free"
      ctaHref="/tools/rotate-pdf"
    />
  );
}
