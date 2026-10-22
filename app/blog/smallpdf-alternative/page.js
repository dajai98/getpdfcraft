import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("smallpdf-alternative");

const article = {
  "title": "A Smallpdf Alternative: Check PDFcraft Against Your Task",
  "intro": "When choosing a Smallpdf alternative, test the particular job you need done. PDFcraft offers 13 free browser-based tools with no account required, but its available controls and output behavior may differ from the workflow you already use.",
  "sections": [
    {
      "heading": "A short evaluation workflow",
      "steps": [
        {
          "title": "Use a non-sensitive sample",
          "body": "Choose a document similar in page count and complexity to your real file. Keep the original so you can compare results."
        },
        {
          "title": "Check the available control",
          "body": "Rotate affects all pages. Watermark offers text and opacity with a fixed displayed angle and automatic text fitting, not manual placement or size controls. Neither offers a full page editor."
        },
        {
          "title": "Inspect the downloaded output",
          "body": "Check page count, legibility, size, and the document features your task depends on. Do not infer that every PDF feature survives merely because the output opens."
        }
      ]
    },
    {
      "heading": "Match the replacement to the job",
      "table": {
        "headers": ["Your task", "PDFcraft workflow", "Check before switching"],
        "rows": [
          ["Combine or rearrange PDFs", "Merge appends files; Reorder uses Up/Down controls.", "Supported navigation is rebuilt, but AcroForm input and unsupported structures are rejected. There is no thumbnail-based page organizer."],
          ["Extract or remove pages", "Split creates separate files for comma-separated ranges; Delete retains at least one page.", "Links to omitted pages are cleaned rather than redirected. Page removal is not secure sanitization."],
          ["Export pages as pictures", "PDF to Image renders complete pages as JPG or PNG at a fixed scale of 2.", "Text and vectors become pixels. There is no OCR or custom resolution control."],
          ["Create a PDF from pictures", "JPG to PDF embeds JPEG/PNG inputs, one image per page in insertion order.", "Page dimensions follow the images; there is no paper-size fitting or HEIC/WebP support."],
          ["Add visible labels", "Page Numbers draws sequential text; Watermark draws a diagonal label.", "Neither edits existing text. A watermark is not encryption or a copying restriction."]
        ]
      }
    },
    {
      "heading": "Compression may not be the replacement you expect",
      "text": "Compress PDF loads and saves the PDF with object streams. It performs structural/object-stream optimization, without explicitly downsampling or recompressing embedded images. Output may be smaller, unchanged, or larger. Compare the result and retain the original until you have checked it. There is no image-quality slider or target file-size control in the current Compress tool."
    },
    {
      "heading": "Password protection has a narrow purpose",
      "text": "Protect applies password-based AES-256 encryption using the same user and owner password. Its current configuration permits printing and extraction; there are no separate permission controls. Unlock requires a supplied correct password for protected PDFs and does not crack an unknown password. Neither tool provides signing or identity verification."
    },
    {
      "heading": "Local document processing is separate from web requests",
      "text": "PDFcraft processes document contents locally in the browser without a PDF-processing upload backend. Website requests still occur. Protect and Unlock load a remote qpdf WebAssembly runtime; PDF-to-image and Grayscale load PDF.js workers from jsDelivr. Advertising resources load after acceptance in the consent banner. Browser and device resources impose practical limits."
    },
    {
      "heading": "Evaluate missing capabilities explicitly",
      "text": "If your Smallpdf workflow depends on OCR, existing-text editing, Word/Excel conversion or e-signatures, PDFcraft cannot replace that step. Verify those requirements against Smallpdf's current documentation or another provider before switching. This is a PDFcraft capability checklist, not a verified current Smallpdf feature or price comparison. No current Smallpdf prices, quotas, account rules or upload policies are asserted here."
    },
    {
      "heading": "Start with a supported task",
      "list": [
        {
          "text": "Compare structural compression output",
          "href": "/tools/compress-pdf"
        },
        {
          "text": "Rotate every page in a PDF",
          "href": "/tools/rotate-pdf"
        },
        {
          "text": "Combine files with the supported navigation checks",
          "href": "/tools/merge-pdf"
        },
        {
          "text": "Export whole pages to JPG or PNG",
          "href": "/tools/pdf-to-image"
        },
        {
          "text": "Read about document and website data",
          "href": "/privacy"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Are PDFcraft’s current tools free?",
      "a": "Yes, and no account is required. This describes the current tools, not a promise about future pricing."
    },
    {
      "q": "Can PDFcraft compress a PDF to a chosen size?",
      "a": "No. The current tool has no target-size control, and the output can grow."
    },
    {
      "q": "What should I compare in a trial document?",
      "a": "Choose a sample containing the features you actually need: a bookmarked report, a form, or fine text in a diagram. Check the relevant output feature as well as file size. An unsupported-form error is a reason to keep a different workflow, not evidence that the original PDF is defective. Browser/device behavior also needs checking in your own environment."
    }
  ],
  "ctaHref": "/tools/compress-pdf",
  "ctaText": "Compare a compression result",
  "tag": "Comparison",
  "tagColor": "#7C3AED",
  "tagBg": "#F5F3FF",
  "date": "February 2, 2026",
  "readTime": "3 min read"
};

export default function Post() {
  return <BlogPost {...article} />;
}
