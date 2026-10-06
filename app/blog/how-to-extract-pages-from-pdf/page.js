import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-extract-pages-from-pdf");

const article = {
  "title": "How to Extract Selected PDF Pages and Ranges",
  "intro": "If you need only selected pages from a larger document, use Split PDF in Page Ranges mode. The key detail is how the list is interpreted: each comma-separated page or range becomes its own PDF. Non-consecutive selections are not automatically combined into one file.",
  "sections": [
    {
      "heading": "Extract a selection",
      "steps": [
        {
          "title": "Choose the source PDF",
          "body": "Open Split PDF and select a valid, unencrypted PDF. Use the document’s page count to check your selection."
        },
        {
          "title": "Choose Page Ranges",
          "body": "Enter 2-5 for one four-page PDF. Enter 1,3-5,9 for three outputs: page 1, pages 3 through 5, and page 9."
        },
        {
          "title": "Split and download each result",
          "body": "Click Split PDF. Download the required output files individually and check their visible pages against your source."
        }
      ]
    },
    {
      "heading": "Combine non-consecutive pages into one file",
      "text": "For one PDF containing pages 1, 3, and 7, first split with 1,3,7. Then add the three resulting PDFs to Merge in the order you want. Merge uses insertion order and has no drag reordering; use Reorder Pages with Up/Down controls afterward if needed."
    },
    {
      "heading": "Use physical page positions",
      "text": "Enter page positions starting at 1, not a printed chapter number or Roman-numeral label. Blank items, reversed ranges, non-integer values, and pages beyond the document count are rejected. For example, 5-2 is not a way to reverse pages."
    },
    {
      "heading": "Check content before sharing",
      "text": "The source file is not overwritten by the tool. However, extraction is not a secure-redaction or sanitization guarantee. Check the output for the content and document features you intend to share; page selection alone is not evidence that all sensitive information has been purged."
    },
    {
      "heading": "Encrypted and large documents",
      "text": "Unlock an authorized encrypted input with its correct password before splitting. Large or complex inputs may exceed browser resources; there is no promise of processing any document."
    },
    {
      "heading": "Tools for selective extraction",
      "list": [
        {
          "text": "Extract with Split PDF",
          "href": "/tools/split-pdf"
        },
        {
          "text": "Combine the extracted files with Merge",
          "href": "/tools/merge-pdf"
        },
        {
          "text": "Change page order with Up/Down controls",
          "href": "/tools/reorder-pages"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Does 1,3,7 create a single three-page PDF?",
      "a": "No. It creates three separate one-page PDFs. Merge those outputs if you need a single combined file."
    },
    {
      "q": "Can I extract a consecutive range as one PDF?",
      "a": "Yes. A single range such as 2-5 produces one PDF containing those four pages."
    },
    {
      "q": "Does extraction securely remove excluded confidential material?",
      "a": "Do not rely on it for that purpose. PDFcraft does not provide a secure-redaction or sanitization guarantee."
    }
  ],
  "ctaHref": "/tools/split-pdf",
  "ctaText": "Extract selected pages",
  "tag": "Guide",
  "tagColor": "#EA580C",
  "tagBg": "#FFF7ED",
  "date": "February 2026",
  "readTime": "2 min read"
};

export default function Post() {
  return <BlogPost {...article} />;
}
