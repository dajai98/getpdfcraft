import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("best-free-pdf-tools-online");

const article = {
  "title": "13 Free PDFcraft Tools: What Each One Actually Does",
  "intro": "The useful tool is the one that produces the result you need without losing a feature you rely on. This is a task map for PDFcraft's 13 tools, not an objective ranking of competing products or a claim that one site covers every PDF workflow.",
  "sections": [
    {
      "heading": "Organize the document",
      "table": {
        "headers": [
          "Task",
          "Tool and control",
          "Boundary"
        ],
        "rows": [
          [
            "Append complete files",
            "Merge: insertion order",
            "Supported navigation is rebuilt; AcroForm and other unsupported structures are rejected."
          ],
          [
            "Create separate page groups",
            "Split: individual pages or explicit ranges",
            "One file per comma-separated item, not one combined selection."
          ],
          [
            "Change sequence",
            "Reorder: Up/Down controls",
            "No thumbnail or drag-order interface."
          ],
          [
            "Remove visible pages",
            "Delete: numbered selection",
            "At least one page remains; not sanitization."
          ],
          [
            "Turn every page",
            "Rotate: additional 90/180/270 degrees",
            "No selected-page rotation."
          ]
        ]
      }
    },
    {
      "heading": "Change representation or add content",
      "table": {
        "headers": [
          "Task",
          "Tool",
          "Trade-off"
        ],
        "rows": [
          [
            "Compare byte size",
            "Compress",
            "Object-stream rewrite; may grow and has no target-size control."
          ],
          [
            "Make page pictures",
            "PDF to Image",
            "JPG/PNG at scale 2; text and vectors become pixels."
          ],
          [
            "Collect pictures as pages",
            "JPG to PDF",
            "JPEG/PNG only; one image per page using its dimensions."
          ],
          [
            "Make image-based gray pages",
            "Grayscale",
            "Rasterization and JPEG encoding lose text/link/form/vector semantics."
          ],
          [
            "Draw a sequence",
            "Add Page Numbers",
            "Visible overlays do not update page-label metadata."
          ],
          [
            "Label document status",
            "Watermark",
            "Text/opacity controls with automatic fitting; not security."
          ]
        ]
      }
    },
    {
      "heading": "Control an opening password",
      "table": {
        "headers": [
          "Tool",
          "Implemented behavior",
          "Not provided"
        ],
        "rows": [
          [
            "Protect",
            "AES-256 with the same user/owner password; printing and extraction allowed.",
            "Separate permissions controls or tamper-proof output."
          ],
          [
            "Unlock",
            "qpdf decryption with the supplied known password.",
            "Unknown-password recovery or signature repair."
          ]
        ]
      }
    },
    {
      "heading": "Choose by the feature you cannot afford to lose",
      "text": "A form requiring interaction is a poor input for page-copy tools that reject AcroForm. A searchable report should not be converted to Grayscale merely because a smaller file is desired: full-page JPEGs can grow. If you need existing-paragraph editing, font replacement, OCR, Word/Excel conversion or signing, PDFcraft is not enough."
    },
    {
      "heading": "Build a short workflow rather than running every tool",
      "text": "For a cover plus report, merge first and inspect boundaries. Add numbering only if the printed sequence needs changing. For a photo attachment, decide whether the recipient wants an image or a PDF before converting. Every extra rewrite creates another output to verify."
    },
    {
      "heading": "No account does not mean no dependencies",
      "text": "The current tools are free with no account requirement. Document operations run locally, while website resources and some runtimes load over the network. Browser memory and input complexity impose practical limits. Internal Node evidence is not a universal device-compatibility test."
    },
    {
      "heading": "Open the tool you selected",
      "list": [
        {
          "text": "Merge PDF: combines PDFs in insertion order; no drag reordering",
          "href": "/tools/merge-pdf"
        },
        {
          "text": "Split PDF: one output per comma-separated page or range",
          "href": "/tools/split-pdf"
        },
        {
          "text": "Compress PDF: structural/object-stream optimization; size reduction varies",
          "href": "/tools/compress-pdf"
        },
        {
          "text": "PDF to Image: renders all pages to JPG or PNG at a fixed 2x scale",
          "href": "/tools/pdf-to-image"
        },
        {
          "text": "JPG to PDF: accepts JPEG/JPG and PNG only",
          "href": "/tools/jpg-to-pdf"
        },
        {
          "text": "Rotate PDF: rotates all pages by the selected angle",
          "href": "/tools/rotate-pdf"
        },
        {
          "text": "Watermark PDF: text and opacity with automatic fitting",
          "href": "/tools/watermark-pdf"
        },
        {
          "text": "Delete Pages: removes visible pages; not secure redaction or sanitization",
          "href": "/tools/delete-pages"
        },
        {
          "text": "Add Page Numbers: adds number overlays with a starting number and position",
          "href": "/tools/add-page-numbers"
        },
        {
          "text": "Reorder Pages: changes page order using Up/Down controls",
          "href": "/tools/reorder-pages"
        },
        {
          "text": "PDF to Grayscale: creates raster-based grayscale PDF pages",
          "href": "/tools/pdf-to-grayscale"
        },
        {
          "text": "Protect PDF: password-based AES-256 encryption",
          "href": "/tools/protect-pdf"
        },
        {
          "text": "Unlock PDF: removes encryption using a supplied correct password",
          "href": "/tools/unlock-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Which tool is best for a smaller email attachment?",
      "a": "First compare Compress output with the original. If the saving is insufficient, decide whether you can omit pages or re-export from the source; rasterizing a document is not a reliable size shortcut."
    },
    {
      "q": "Does choosing a free tool remove the need to inspect the result?",
      "a": "No. Check the property relevant to your task: page order, target links, image detail or password access. Price does not establish feature preservation."
    }
  ],
  "ctaHref": "/#tools",
  "ctaText": "Browse the 13 tools",
  "tag": "Guide",
  "tagColor": "#4F46E5",
  "tagBg": "#EEF2FF",
  "date": "February 2026",
  "readTime": "3 min read"
};

export default function Post() { return <BlogPost {...article} />; }
