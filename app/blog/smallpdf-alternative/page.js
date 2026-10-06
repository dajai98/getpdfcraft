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
          "body": "Rotate affects all pages. Watermark lets you set text and opacity, with fixed placement/angle/size behavior. Neither offers a full page editor."
        },
        {
          "title": "Inspect the downloaded output",
          "body": "Check page count, legibility, size, and the document features your task depends on. Do not infer that every PDF feature survives merely because the output opens."
        }
      ]
    },
    {
      "heading": "Compression may not be the replacement you expect",
      "text": "Compress PDF loads and saves the PDF with object streams. It performs structural/object-stream optimization, without explicitly downsampling or recompressing embedded images. Output may be smaller, unchanged, or larger. Compare the result and retain the original until you have checked it. There is no image-quality slider or target file-size control in the current Compress tool."
    },
    {
      "heading": "Password protection has a narrow purpose",
      "text": "Protect applies password-based AES-256 encryption, not read-only or tamper-proof restrictions. Unlock requires a supplied correct password for protected PDFs and does not crack an unknown password. Neither tool provides signing or identity verification."
    },
    {
      "heading": "Local document processing is separate from web requests",
      "text": "PDFcraft processes document contents locally in the browser without a PDF-processing upload backend. Website requests still occur. Protect and Unlock load a remote qpdf WebAssembly runtime; PDF-to-image and Grayscale load PDF.js workers from jsDelivr. Advertising resources load after acceptance in the consent banner. Browser and device resources impose practical limits."
    },
    {
      "heading": "Evaluate missing capabilities explicitly",
      "text": "If you need OCR, existing-text editing, Word/Excel conversion, or e-signatures, choose a tool that documents that capability. Larger suites may cover more workflows, but verify their current offering directly. This guide does not assert current Smallpdf prices, quotas, account rules, or upload policies."
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
      "q": "Is every device supported?",
      "a": "Compatibility and usable document size depend on browser capabilities and device resources. Test the workflow you need."
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
