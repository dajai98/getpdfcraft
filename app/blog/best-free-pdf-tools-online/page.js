import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  "title": "13 Free PDFcraft Tools: What Each One Actually Does | PDFcraft",
  "description": "A practical guide to all 13 PDFcraft tools, supported formats, controls, and limitations.",
  "alternates": {
    "canonical": "https://getpdfcraft.com/blog/best-free-pdf-tools-online"
  },
  "openGraph": {
    "title": "13 Free PDFcraft Tools: What Each One Actually Does | PDFcraft",
    "description": "A practical guide to all 13 PDFcraft tools, supported formats, controls, and limitations.",
    "url": "https://getpdfcraft.com/blog/best-free-pdf-tools-online",
    "type": "article"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "13 Free PDFcraft Tools: What Each One Actually Does | PDFcraft",
    "description": "A practical guide to all 13 PDFcraft tools, supported formats, controls, and limitations."
  }
};

const article = {
  "title": "13 Free PDFcraft Tools: What Each One Actually Does",
  "intro": "Choose a PDF tool by the result you need. PDFcraft currently offers 13 free tools with no account required. This guide describes their actual scope rather than ranking them against other products.",
  "sections": [
    {
      "heading": "Choose one of the 13 tools",
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
          "text": "Watermark PDF: text and opacity controls; fixed placement/angle/size behavior",
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
    },
    {
      "heading": "Keep the distinction between pages and document semantics",
      "text": "Page operations and conversions are not a full PDF editor. Grayscale rasterizes pages, so searchable/selectable text, links, forms, bookmarks, signatures, and other PDF semantics are not preserved as such. Its output may grow. Delete Pages removes pages from the visible structure; it is not secure content purging."
    },
    {
      "heading": "Watch output size and password requirements",
      "text": "Compress PDF loads and saves the document with object streams. It performs structural/object-stream optimization and does not explicitly downsample or recompress embedded images. Output can be smaller, unchanged, or larger. Keep the original and compare both size and usability before replacing it. Protect is not a read-only or tamper-proof mechanism. Unlock does not crack unknown passwords."
    },
    {
      "heading": "What free and local mean here",
      "text": "PDFcraft processes document contents locally in your browser without a PDF-processing upload backend. That does not mean the page makes no network requests: website resources load over the internet, and some tools download processing components. Advertising resources load after acceptance in the consent banner. Practical limits depend on browser support, device memory, and document complexity. PDFcraft adds no branding watermark, although Watermark PDF adds the text you explicitly request."
    },
    {
      "heading": "Before relying on an output",
      "text": "Keep the original. Open the result, count pages, inspect orientation and content, and check any features you need. A successful download does not establish that a complex document retained every feature."
    }
  ],
  "faqs": [
    {
      "q": "Does PDFcraft have a signing or OCR tool?",
      "a": "No. It does not currently provide an e-signature tool, OCR, or editing of existing PDF text."
    },
    {
      "q": "Can any file size be processed?",
      "a": "Browser and device resources impose practical limits. Large or complex files may fail, even without an application-level size quota."
    },
    {
      "q": "Which image inputs does JPG to PDF accept?",
      "a": "JPEG/JPG and PNG only. Other formats need conversion elsewhere before using that tool."
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

export default function Post() {
  return <BlogPost {...article} />;
}
