import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-convert-jpg-to-pdf");

const article = {
  "title": "How to Convert JPG to PDF Free Online",
  "date": "February 2026",
  "readTime": "5 min read",
  "tag": "Convert",
  "tagColor": "#DC2626",
  "tagBg": "#FEF2F2",
  "ctaHref": "/tools/jpg-to-pdf",
  "ctaText": "Convert JPG to PDF now — free, no watermark",
  "intro": "A PDF can package a sequence of photographs or screenshots as pages. PDFcraft embeds supported JPEG/JPG and PNG images, one image per page, in the order you add them. It does not recognize the words in those images or automatically fit them to office paper sizes.",
  "sections": [
    {
      "heading": "Assemble an ordered image packet",
      "steps": [
        {
          "title": "Prepare supported files",
          "body": "Use actual JPEG or PNG data. Renaming HEIC, WebP or GIF to .jpg does not convert the bytes. Invalid or truncated images may be rejected during validation or embedding."
        },
        {
          "title": "Add images in reading order",
          "body": "For a receipt packet, add the summary image before the detailed receipts. Check the preview list; remove and re-add an image to change insertion order."
        },
        {
          "title": "Convert and inspect the PDF",
          "body": "Each image fills its own page. Compare the first/last pages, orientation and print dimensions before sending the result."
        }
      ]
    },
    {
      "heading": "Pixel dimensions become PDF page dimensions",
      "text": "The implementation sets page width and height to the embedded image width and height in PDF units. A 1200 x 800 image therefore creates a 1200 x 800 point page rather than an automatically fitted A4 sheet. There are no margin, collage or paper-size controls. Different image dimensions can produce a packet with differently sized pages."
    },
    {
      "heading": "Embedding is not text conversion",
      "text": "Words in a screenshot remain part of a picture. The PDF does not gain editable text, OCR or reconstructed tables. JPEG data is embedded without an explicit recompression step; PNG is decoded and embedded. This is not a guarantee that every image input or every viewer will behave identically."
    },
    {
      "heading": "Plan size and printing separately",
      "text": "Large source pictures can produce large PDFs, and embedding cannot recover detail absent from the image. If paper dimensions matter, prepare the images in a suitable workflow or check scaling in the print dialog. Keep the original images for later editing instead of treating the generated PDF as an editable source."
    },
    {
      "heading": "Selection failures are useful information",
      "text": "The input checks inspect image bytes, not just extensions. A rejected file should be converted or repaired with an appropriate image tool. Conversion uses browser memory without an image-upload backend; site loading and device resource limits still apply."
    },
    {
      "heading": "Tools for this task",
      "list": [
        {
          "text": "Package JPEG/PNG images as PDF pages",
          "href": "/tools/jpg-to-pdf"
        },
        {
          "text": "Combine the result with an existing PDF",
          "href": "/blog/how-to-combine-pdf-and-images"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Will several receipts fit onto one PDF page?",
      "a": "Not automatically. The current converter creates a separate page for every image and has no collage layout control."
    },
    {
      "q": "Why cannot I edit a photographed address as text?",
      "a": "The address remains pixels inside an embedded image. This converter does not perform recognition or rebuild editable text objects."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
