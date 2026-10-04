import BlogPost from "@/components/ui/BlogPost";
export const metadata = {
  "title": "How to Rotate PDF Pages Free Online | PDFcraft",
  "description": "Apply 90, 180, or 270 degrees of additional rotation to all pages. PDFcraft does not provide selected-page rotation.",
  "alternates": {
    "canonical": "https://getpdfcraft.com/blog/how-to-rotate-pdf"
  },
  "openGraph": {
    "title": "How to Rotate PDF Pages Free Online | PDFcraft",
    "description": "Apply 90, 180, or 270 degrees of additional rotation to all pages. PDFcraft does not provide selected-page rotation.",
    "url": "https://getpdfcraft.com/blog/how-to-rotate-pdf",
    "type": "article"
  }
};
export default function Post() {
  return (
    <BlogPost tag={"Rotate PDF"} tagColor="#2563EB" tagBg="#EFF6FF"
      title={"How to Rotate PDF Pages Free Online"}
      date="February 2026" readTime="4 min read"
      intro={"For a document whose pages all need the same rotation, PDFcraft Rotate applies the chosen angle to every page. It has no selected-page control. Keep the source if only some pages need changing."}
      sections={[
  {
    "heading": "Why do PDF pages need rotating?",
    "steps": [
      {
        "title": "Scanned documents",
        "body": "When scanning physical documents, pages are often placed incorrectly in the scanner — coming out sideways or upside down in the PDF."
      },
      {
        "title": "Mobile phone scans",
        "body": "Photos taken of documents on a phone can have incorrect orientation if the phone was held sideways."
      },
      {
        "title": "Mixed orientation documents",
        "body": "A PDF may have a mix of portrait and landscape pages that need to match a consistent orientation."
      },
      {
        "title": "Incorrectly exported PDFs",
        "body": "Some software exports PDFs with the wrong page rotation metadata, causing them to display incorrectly in PDF viewers."
      }
    ]
  },
  {
    "heading": "How to rotate PDF pages — step by step",
    "steps": [
      {
        "title": "Open PDFcraft Rotate PDF tool",
        "body": "Open getpdfcraft.com in a supported browser and choose the relevant tool. No account is required; browser and device limitations still apply."
      },
      {
        "title": "Select your PDF",
        "body": "Choose the PDF with pages that need rotating. The file stays on your device."
      },
      {
        "title": "Choose an angle for all pages",
        "body": "Select 90°, 180°, or 270°. The tool adds that rotation to every page’s existing rotation. 270° is equivalent to a quarter-turn counter-clockwise."
      },
      {
        "title": "Click Rotate PDF",
        "body": "Click Rotate PDF, wait for the result, then inspect the downloaded pages."
      },
      {
        "title": "Download the rotated PDF",
        "body": "Download your fixed PDF. Pages are now in the correct orientation."
      }
    ]
  },
  {
    "heading": "Rotation options explained",
    "steps": [
      {
        "title": "90° clockwise",
        "body": "Rotates pages to the right. Use this if pages appear sideways leaning left — you need to turn them right to read them."
      },
      {
        "title": "90° counter-clockwise",
        "body": "Rotates pages to the left. Use this if pages appear sideways leaning right."
      },
      {
        "title": "180°",
        "body": "Flips pages upside down. Use this if pages appear completely inverted."
      }
    ]
  },
  {
    "tip": "For mixed-orientation pages needing different changes, use a tool with selected-page rotation. Reorder Pages changes order, not orientation."
  },
  {
    "heading": "Continue with the relevant tool",
    "list": [
      {
        "text": "Open rotate pdf",
        "href": "/tools/rotate-pdf"
      }
    ]
  }
]}
      faqs={[
  {
    "q": "Can I rotate PDF pages for free?",
    "a": "Yes. PDFcraft's Rotate PDF tool is completely free with no sign up required."
  },
  {
    "q": "Can I rotate only specific pages in a PDF?",
    "a": "No. PDFcraft Rotate applies the selected angle to all pages."
  },
  {
    "q": "Will rotating a PDF reduce its quality?",
    "a": "The tool changes page rotation metadata rather than rasterizing the pages. Check the output and document features before relying on it."
  },
  {
    "q": "Can I rotate a PDF on my phone?",
    "a": "You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed."
  },
  {
    "q": "What if my PDF opens sideways in the viewer but prints correctly?",
    "a": "Viewer and print behavior can differ. Inspect both on a copy; rotating the PDF is not a guarantee of identical behavior in every viewer."
  },
  {
    "q": "Can I undo a rotation?",
    "a": "PDFcraft does not modify your original file. If you rotate in the wrong direction, just rotate the downloaded file again in the opposite direction."
  }
]}
      ctaText={"Rotate your PDF pages now — free"}
      ctaHref={"/tools/rotate-pdf"}
    />
  );
}
