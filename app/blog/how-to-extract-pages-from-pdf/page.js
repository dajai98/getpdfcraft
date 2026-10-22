import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-extract-pages-from-pdf");

const article = {
  "title": "How to Extract Selected PDF Pages and Ranges",
  "intro": "Extraction in PDFcraft uses Split PDF, not a separate extraction engine. Use it to prepare a focused packet from a longer source, then decide whether you need separate excerpts or one combined PDF.",
  "sections": [
    {
      "heading": "Example: a cover plus two evidence sections",
      "steps": [
        {
          "title": "Map labels to physical positions",
          "body": "Suppose the cover is page 1 and the required sections occupy positions 4-6 and 12-14. Count from the first physical page, not from printed chapter numbering."
        },
        {
          "title": "Extract the groups",
          "body": "Enter 1,4-6,12-14 in range mode. This produces three outputs containing one, three and three pages; it does not create one seven-page file."
        },
        {
          "title": "Assemble only if needed",
          "body": "To make one packet, add those three PDFs to Merge in the desired order. The insertion sequence controls the result. Reopen it and inspect each join."
        }
      ]
    },
    {
      "heading": "Selection order has two levels",
      "text": "Comma-separated groups follow the order you enter. Pages inside a range remain in ascending source order. Entering 6-4 is rejected, not interpreted as reverse order. If a final packet needs another sequence, use Reorder with its Up/Down controls after assembly."
    },
    {
      "heading": "A removed destination does not return when you merge excerpts",
      "text": "Split retains a local navigation target only when it exists in that particular output. Targets outside it are cleaned; the tool does not invent a link to another output. Merging those extracts later does not reconstruct links that were already removed. If navigation between separated sections is essential, evaluate that requirement before splitting."
    },
    {
      "heading": "Forms and unusual navigation need a different plan",
      "text": "The safe page-copy path rejects AcroForm input, linked annotations and unsupported structures. An action chain that includes an omitted local target may fail closed rather than being partially retained. All split outputs must pass serialization/reopen validation before downloads are exposed."
    },
    {
      "heading": "A focused packet is not proof of sanitization",
      "text": "Selecting fewer pages reduces visible scope, not necessarily every recoverable copy of information in PDF objects. Inspect the output for intended content and use a separately verified redaction workflow where irreversible removal is required. Preserve the complete original and do not assume signature validity survives extraction."
    },
    {
      "heading": "Continue with the appropriate tool",
      "list": [
        {
          "text": "Extract the selected ranges",
          "href": "/tools/split-pdf"
        },
        {
          "text": "Join the extracted PDFs",
          "href": "/tools/merge-pdf"
        },
        {
          "text": "Move pages in the assembled packet",
          "href": "/tools/reorder-pages"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Will 12-14,1 put the cover last?",
      "a": "It creates the three-page range output first and a separate page-1 output second. To obtain one PDF with that order, merge those outputs in the same sequence."
    },
    {
      "q": "Why is a cross-section bookmark missing after assembly?",
      "a": "Its target may have been omitted from the individual split output and cleaned there. A later merge cannot recover navigation absent from its input."
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

export default function Post() { return <BlogPost {...article} />; }
