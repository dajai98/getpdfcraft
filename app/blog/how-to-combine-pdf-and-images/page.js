import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-combine-pdf-and-images");

const article = {
  "title": "How to Combine PDF and Images Into One File Free",

  "readTime": "5 min read",
  "tag": "Guide",
  "tagColor": "#DC2626",
  "tagBg": "#FEF2F2",
  "ctaHref": "/tools/merge-pdf",
  "ctaText": "Combine your PDFs and images now — free",
  "intro": "PDFcraft does not have a one-step mixed PDF/image merge. First convert supported pictures into a PDF, then merge that output with the existing PDFs. Plan both the image order and where that image packet belongs in the final document.",
  "sections": [
    {
      "heading": "Example: report followed by photo evidence",
      "steps": [
        {
          "title": "Build the picture packet",
          "body": "In JPG to PDF, add JPEG/PNG images in the intended reading order. Each becomes one PDF page. Download and inspect that intermediate file."
        },
        {
          "title": "Place it after the report",
          "body": "In Merge, add the report PDF first and the image packet second. Every page of each input is appended; Merge does not sort photographs by their filenames."
        },
        {
          "title": "Check the join and page sizes",
          "body": "Review the last report page and first image page. Images use their embedded width/height as PDF page dimensions, so they may be much larger or smaller than report pages."
        }
      ]
    },
    {
      "heading": "If pictures must appear between report sections",
      "text": "Split the report at the intended boundaries, then merge the section PDFs and image packet in sequence. That introduces navigation cleanup in each extract: links to omitted pages may be removed before the final merge. Do not assume that reassembly restores those original cross-section links."
    },
    {
      "heading": "Pictures remain pictures",
      "text": "The image converter accepts JPEG/JPG and PNG, not HEIC or WebP. It embeds one picture across each page without OCR, collage layout or automatic A4 fitting. Printed words in the photograph do not become selectable or editable text."
    },
    {
      "heading": "The merge stage has its own input limits",
      "text": "Supported local navigation and bookmarks are reconstructed, while source OpenActions are omitted. AcroForm input and other unsupported navigation structures are rejected. A picture packet does not bypass a form restriction in the report you are merging it with."
    },
    {
      "heading": "Use two checkpoints, not one success message",
      "text": "Save both the image-only PDF and final combined PDF until the task is complete. Confirm image order at the first checkpoint and overall order at the second. Both operations process locally, but web resources and browser memory are still needed; device/download behavior is not universally verified."
    },
    {
      "heading": "Continue with the appropriate tool",
      "list": [
        {
          "text": "Convert supported images into pages",
          "href": "/tools/jpg-to-pdf"
        },
        {
          "text": "Merge the intermediate PDF with the report",
          "href": "/tools/merge-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can I drop PNG files directly into Merge PDF?",
      "a": "Use JPG to PDF first. The Merge handler loads PDF documents; it is not a mixed-format conversion engine."
    },
    {
      "q": "Will the images automatically match the report's paper size?",
      "a": "No. Image page dimensions follow the embedded images. Inspect the intermediate PDF and use a separate layout workflow if consistent paper sizing is required."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
