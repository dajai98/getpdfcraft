import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  "title": "How to Split a PDF into Two Files by Page Range | PDFcraft",
  "description": "Choose a boundary and create two PDFs using explicit ranges. Learn why equal page counts do not guarantee equal file sizes.",
  "alternates": {
    "canonical": "https://getpdfcraft.com/blog/split-pdf-into-two"
  },
  "openGraph": {
    "title": "How to Split a PDF into Two Files by Page Range | PDFcraft",
    "description": "Choose a boundary and create two PDFs using explicit ranges. Learn why equal page counts do not guarantee equal file sizes.",
    "url": "https://getpdfcraft.com/blog/split-pdf-into-two",
    "type": "article"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "How to Split a PDF into Two Files by Page Range | PDFcraft",
    "description": "Choose a boundary and create two PDFs using explicit ranges. Learn why equal page counts do not guarantee equal file sizes."
  }
};

const article = {
  "title": "How to Split a PDF into Two Files by Page Range",
  "intro": "To divide one PDF into two files, choose where the first part should end and enter two page ranges in Split PDF. The current tool has no automatic equal-split control. You specify both ranges yourself.",
  "sections": [
    {
      "heading": "Example: divide a 12-page PDF",
      "steps": [
        {
          "title": "Choose the boundary",
          "body": "Review the source and choose the last page of part one. To divide 12 pages into two six-page parts, use page 6 as the boundary."
        },
        {
          "title": "Select Page Ranges",
          "body": "Open Split PDF, select the file, and choose Page Ranges. Enter 1-6,7-12. Each comma-separated range produces a separate PDF."
        },
        {
          "title": "Split and check both downloads",
          "body": "Click Split PDF and download both outputs. Confirm that the first ends at page 6 and the second begins at page 7, with no accidental gap or overlap."
        }
      ]
    },
    {
      "heading": "Odd page counts and chapter boundaries",
      "text": "For 11 pages, 1-5,6-11 produces parts of five and six pages. A chapter boundary may be more useful than a numerical midpoint. The tool uses physical page positions starting at 1; printed page labels can differ. A one-page document cannot become two nonempty, non-overlapping page groups."
    },
    {
      "heading": "Two files does not mean equal byte sizes",
      "text": "A scan or large image can dominate the file size. Equal page counts may produce very different output sizes. If you are meeting a delivery limit, inspect each output and choose a different boundary if necessary. The tool does not target a byte size."
    },
    {
      "heading": "Input validation and document limits",
      "text": "Use ascending ranges within the source page count. Empty comma-separated items, reversed ranges, and invalid page values are rejected. Overlapping valid ranges can repeat pages across outputs, so check your selection. Unlock authorized encrypted input with the correct password before splitting."
    },
    {
      "heading": "Keep the original",
      "text": "Split produces new downloads instead of overwriting the source. Check any document features you need in the outputs. Splitting is not secure redaction, and modifying signed documents may affect their signatures. Browser memory and document complexity limit what can be processed."
    },
    {
      "heading": "Choose the appropriate workflow",
      "list": [
        {
          "text": "Create two range outputs with Split PDF",
          "href": "/tools/split-pdf"
        },
        {
          "text": "Extract selected non-consecutive pages instead",
          "href": "/blog/how-to-extract-pages-from-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can PDFcraft automatically split into equal halves?",
      "a": "No. Enter two explicit ranges in Page Ranges mode."
    },
    {
      "q": "Does 1-6,7-12 produce two PDFs?",
      "a": "Yes, for a source with at least 12 pages. It creates one output for each of the two ranges."
    },
    {
      "q": "Will the two files have the same size?",
      "a": "Not necessarily. Page content determines size, so equal page counts do not imply equal byte sizes."
    }
  ],
  "ctaHref": "/tools/split-pdf",
  "ctaText": "Split into two range outputs",
  "tag": "Split PDF",
  "tagColor": "#EA580C",
  "tagBg": "#FFF7ED",
  "date": "February 2026",
  "readTime": "3 min read"
};

export default function Post() {
  return <BlogPost {...article} />;
}
