import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-split-pdf-online");

const article = {
  "title": "How to Split PDF Online Free — No Sign Up",

  "readTime": "5 min read",
  "tag": "Split PDF",
  "tagColor": "#EA580C",
  "tagBg": "#FFF7ED",
  "ctaHref": "/tools/split-pdf",
  "ctaText": "Split your PDF now — free",
  "intro": "Decide how many output files you need before entering ranges. PDFcraft Split interprets every comma-separated item as a separate PDF, which is useful for dividing a report into deliveries but different from building one nonconsecutive selection.",
  "sections": [
    {
      "heading": "Predict the files before splitting",
      "table": {
        "headers": [
          "Selection",
          "Outputs"
        ],
        "rows": [
          [
            "All pages of a four-page document",
            "Four one-page PDFs."
          ],
          [
            "1-3, 4-8",
            "Two PDFs containing three and five pages respectively."
          ],
          [
            "1-6,7-12 for a 12-page PDF",
            "Exactly two outputs of six pages each."
          ],
          [
            "1-5,6-11 for an 11-page PDF",
            "Exactly two outputs of five and six pages."
          ],
          [
            "2, 6, 9-10",
            "Three PDFs: page 2, page 6, and a two-page range."
          ],
          [
            "5-2 or an empty comma-separated item",
            "Rejected rather than guessed or reversed."
          ]
        ]
      },
      "text": "For exactly two parts, choose two ranges that cover the intended pages and check the boundary for gaps or overlaps."
    },
    {
      "heading": "Divide a report into deliverable ranges",
      "steps": [
        {
          "title": "Identify physical positions",
          "body": "Use positions starting at 1, including covers and blank pages. A printed label such as iii or Chapter 2 is not the range input."
        },
        {
          "title": "Choose the split mode",
          "body": "Select all individual pages or enter explicit ranges. The parser rejects non-integers, out-of-bounds numbers and reversed ranges."
        },
        {
          "title": "Check every output",
          "body": "Download the individual PDFs and compare their starting and ending pages with your plan. There is no automatic equal-byte split or ZIP packaging."
        }
      ]
    },
    {
      "heading": "Each output has its own navigation boundary",
      "text": "Local links to retained pages are mapped to their output copies. Targets outside that output are removed, not sent to a neighboring page or another file. Named destinations are pruned. A bookmark with an omitted target can remain as a non-clickable heading only when surviving children need that hierarchy. Supported remote actions retain their remote meaning."
    },
    {
      "heading": "Why one range can stop the batch",
      "text": "All requested outputs are serialized, reopened and validated before any download URLs are exposed. AcroForm input and unsupported linked annotations are rejected. A chain containing an omitted local action can be ambiguous, so it fails rather than silently changing execution order. No partial batch is offered if validation fails."
    },
    {
      "heading": "What splitting cannot promise",
      "text": "Page extraction does not establish secure removal of confidential information from every PDF structure. It also does not prove signature validity or visual fidelity. The browser holds input and output data locally; many outputs can consume substantial memory even when individual files are small."
    },
    {
      "heading": "Choose the next operation",
      "list": [
        {
          "text": "Create separate page-range PDFs",
          "href": "/tools/split-pdf"
        },
        {
          "text": "Build one file from nonconsecutive extracts",
          "href": "/blog/how-to-extract-pages-from-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can two outputs retain a link to the same original page?",
      "a": "Only if each output contains that page. Each file is evaluated independently; Split does not invent cross-file links to another output."
    },
    {
      "q": "Will Split make every file the same size?",
      "a": "No. Equal page counts do not imply equal bytes, and the tool does not calculate ranges to meet a target file size."
    },
    {
      "q": "Can I divide a one-page PDF into two page groups?",
      "a": "Not into two nonempty, nonoverlapping page groups. Split selects whole pages; it does not cut one page into two."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
