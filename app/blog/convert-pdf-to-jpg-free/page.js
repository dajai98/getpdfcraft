import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("convert-pdf-to-jpg-free");

const article = {
  "title": "How to Convert PDF to JPG Free — No Watermark",
  "date": "January 20, 2026",
  "readTime": "6 min read",
  "tag": "PDF to Image",
  "tagColor": "#16A34A",
  "tagBg": "#F0FDF4",
  "ctaHref": "/tools/pdf-to-image",
  "ctaText": "Convert PDF to image now — free, no watermark",
  "intro": "Use PDF to Image when you need a picture of an entire page, such as a report preview. PDFcraft renders page content into a canvas; it does not simply extract the original photographs embedded inside the PDF.",
  "sections": [
    {
      "heading": "From a page to a downloadable image",
      "steps": [
        {
          "title": "Select the document and format",
          "body": "Choose JPG or PNG before converting. All pages are processed; there is no selected-page conversion control."
        },
        {
          "title": "Wait for page rendering",
          "body": "PDF.js renders each page at a fixed scale of 2. The canvas viewport follows page dimensions and orientation, so different page sizes produce different image dimensions."
        },
        {
          "title": "Download the image you need",
          "body": "After conversion, use an individual page download or Download All. The latter starts separate downloads, not a ZIP; browser download permissions can affect completion."
        }
      ]
    },
    {
      "heading": "JPG and PNG keep different things",
      "table": {
        "headers": [
          "Choice",
          "Useful distinction",
          "What neither retains"
        ],
        "rows": [
          [
            "JPG",
            "Canvas encoding uses quality 0.92 and can introduce compression artifacts. Inspect fine text.",
            "Selectable PDF text, editable vector paths and interactive links/forms."
          ],
          [
            "PNG",
            "Lossless encoding stores the rendered pixels without JPG encoding loss; it does not restore detail missing from the render.",
            "The original PDF objects and their editing behavior."
          ]
        ]
      }
    },
    {
      "heading": "A rendering scale is not a print-quality guarantee",
      "text": "Scale 2 is fixed, not a choice of final print dimensions or a promise of suitability for a particular printer. Zoom into the downloaded page and inspect small lettering at its intended use size. Enlarging a raster image does not recover vector detail. No OCR recreates text selection."
    },
    {
      "heading": "Existing marks stay in the picture",
      "text": "The exporter adds no PDFcraft branding watermark. A stamp or watermark already visible on the source page can appear in its rendered image. If you need the original embedded photo rather than the whole page, this tool is not an image-extraction workflow."
    },
    {
      "heading": "If rendering or saving fails",
      "text": "A password prompt requires an authorized unlocked copy first. The PDF.js worker loads from jsDelivr; blocked worker loading, canvas limits or memory pressure can prevent completion. File bytes are rendered locally, but that does not imply offline operation or tested compatibility with every browser. Inspect the actual saved image rather than just its on-page preview."
    },
    {
      "heading": "Choose the next operation",
      "list": [
        {
          "text": "Render PDF pages to JPG or PNG",
          "href": "/tools/pdf-to-image"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can I render only page 8 to save processing?",
      "a": "Not with the current controls. The converter renders the full input, after which you can download page 8 individually. For a smaller input, extract the needed page first."
    },
    {
      "q": "Why does copying text stop working in the JPG?",
      "a": "The characters are now colored pixels. Keep the PDF for text selection or use a separate OCR workflow if you need recognition from the image."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
