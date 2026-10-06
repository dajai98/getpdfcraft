import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-browser-based-pdf-processing-works");

const article = {
  "title": "How PDFcraft Processes Files Locally in Your Browser",
  "intro": "When you select a document in PDFcraft, the application reads its bytes in your browser and uses client-side libraries to generate the output. There is no PDF-processing upload backend in this architecture. That is a statement about document processing, not a claim that the page makes no network requests.",
  "sections": [
    {
      "heading": "From selection to download",
      "steps": [
        {
          "title": "Select a file",
          "body": "The browser exposes the selected file to the application. The tool reads its contents into memory; selecting a file does not itself mean uploading it to a processing server."
        },
        {
          "title": "Load and run the required library",
          "body": "Many page operations use pdf-lib. Protect and Unlock use qpdf WebAssembly, while PDF-to-image and Grayscale use PDF.js and canvas rendering. Some components are downloaded when the tool is used."
        },
        {
          "title": "Generate an output",
          "body": "PDF tools generally create bytes and expose them as a browser download through a Blob/object URL. PDF-to-image uses encoded image data URLs. The application may hold inputs, previews, and outputs in memory during the operation."
        },
        {
          "title": "Save and review",
          "body": "Download the result yourself. Browser downloads and any later sharing are separate from the processing step. Keep the original until you have verified the result."
        }
      ]
    },
    {
      "heading": "Which external requests are expected?",
      "text": "Protect and Unlock request the qpdf WASM runtime from jsDelivr. PDF-to-image and Grayscale configure a remote PDF.js worker on jsDelivr. The site also loads its own pages and scripts. AdSense advertising resources load only after an accepted consent choice; declining keeps core tools available. Request and connection data are separate from the document bytes processed by the application."
    },
    {
      "heading": "Local storage and cleanup are not secure erasure",
      "text": "The consent choice is stored in browser localStorage when available. The application releases generated object URLs and processing resources through its cleanup paths, but this is not a forensic erasure guarantee for browser memory, caches, or downloaded files. Delete Pages is visible page removal, not secure redaction or sanitization."
    },
    {
      "heading": "Local execution does not guarantee semantic preservation",
      "text": "Grayscale rasterizes each page while preserving its intended physical dimensions. It does not preserve searchable/selectable text, links, forms, bookmarks, signatures, or other document semantics as such, and output may grow. Compress performs structural/object-stream optimization rather than explicit image downsampling. Check the particular tool, not just where it runs."
    },
    {
      "heading": "How to inspect the behavior yourself",
      "text": "Use a non-sensitive test file. Open your browser’s developer tools and network panel before loading the page, preserve the request log, then run one tool. Inspect request destinations and payloads and distinguish resource downloads from document transfers. Check accepted and declined advertising choices separately. Observing one session does not prove every possible future script behavior; it gives evidence for the session you tested."
    },
    {
      "heading": "Practical limits",
      "text": "Large files, many pages, and high-resolution raster rendering can require substantial memory. Processing can fail or the tab can become unresponsive. A tool that downloads a runtime may not start without network access. Offline availability and performance are not guaranteed."
    },
    {
      "heading": "Read the relevant details",
      "list": [
        {
          "text": "Privacy Policy: document and website data",
          "href": "/privacy"
        },
        {
          "text": "Protect PDF: password-based encryption",
          "href": "/tools/protect-pdf"
        },
        {
          "text": "PDF to Grayscale: raster conversion",
          "href": "/tools/pdf-to-grayscale"
        },
        {
          "text": "Compress PDF: structural optimization",
          "href": "/tools/compress-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Are document contents sent to a PDFcraft processing server?",
      "a": "The inspected application architecture processes them locally and has no PDF-processing upload backend."
    },
    {
      "q": "Does that mean there are no external requests?",
      "a": "No. Website resources, remote qpdf WASM and PDF.js workers, and consent-dependent advertising can generate network requests."
    },
    {
      "q": "Does releasing an object URL securely erase a document?",
      "a": "No. Resource cleanup is not a promise of forensic erasure of browser memory or downloaded files."
    },
    {
      "q": "Can I use every tool offline after opening the homepage?",
      "a": "No such guarantee is made. Some tool runtimes load when processing starts."
    }
  ],
  "ctaHref": "/#tools",
  "ctaText": "Choose a local-processing tool",
  "tag": "How It Works",
  "tagColor": "#0891B2",
  "tagBg": "#ECFEFF",
  "date": "August 2026",
  "readTime": "3 min read"
};

export default function Post() {
  return <BlogPost {...article} />;
}
