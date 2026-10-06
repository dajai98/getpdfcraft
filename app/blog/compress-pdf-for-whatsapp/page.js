import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("compress-pdf-for-whatsapp");

const article = {
  "title": "How to Compress a PDF for WhatsApp",
  "intro": "If a PDF will not send through WhatsApp, first check the current limit and error shown by your app. This guide does not assume a fixed attachment limit. PDFcraft can try structural compression or divide a document into smaller parts, but neither route guarantees that a particular file will be accepted.",
  "sections": [
    {
      "heading": "Try compression and inspect the result",
      "steps": [
        {
          "title": "Keep the original",
          "body": "Save a copy before processing. Open Compress PDF and select the PDF; processing starts after selection."
        },
        {
          "title": "Compare the displayed sizes",
          "body": "The tool reports input and output bytes. If the result is unchanged or larger, keep the original when size is your goal."
        },
        {
          "title": "Check and share the chosen file",
          "body": "Download the useful result, open it to check the pages, then choose that file through your messaging app. Sending it through WhatsApp is a separate sharing action, outside PDFcraft’s local processing."
        }
      ]
    },
    {
      "heading": "Why a scan may barely shrink",
      "text": "Compress PDF loads and saves the document with object streams. It performs structural/object-stream optimization and does not explicitly downsample or recompress embedded images. Output can be smaller, unchanged, or larger. Keep the original and compare both size and usability before replacing it."
    },
    {
      "heading": "Split by content if one file is still too large",
      "text": "For a 12-page document, Page Ranges such as 1-6,7-12 create two separate PDFs. Page count does not predict byte size: a scanned page can be larger than several text pages. Check each output against the limit reported by your app. Do not split a form or signed workflow without checking what the recipient needs."
    },
    {
      "heading": "Tools for this workflow",
      "list": [
        {
          "text": "Try structural compression",
          "href": "/tools/compress-pdf"
        },
        {
          "text": "Split a PDF into ranges",
          "href": "/tools/split-pdf"
        }
      ]
    },
    {
      "heading": "If sending still fails",
      "text": "Check the actual app error, connection, and selected file. If your recipient accepts another delivery method, agree on it with them and check its access settings. Repeated compression is not a substitute for diagnosing a non-size error."
    },
    {
      "heading": "Processing on a phone",
      "text": "PDFcraft processes document contents locally in your browser without a PDF-processing upload backend. That does not mean the page makes no network requests: website resources load over the internet, and some tools download processing components. Advertising resources load after acceptance in the consent banner. Practical limits depend on browser support, device memory, and document complexity."
    }
  ],
  "faqs": [
    {
      "q": "What is WhatsApp’s current PDF limit?",
      "a": "Check the limit in your current app or the provider’s current documentation. This article does not assert a current number."
    },
    {
      "q": "Will PDFcraft reduce image resolution?",
      "a": "Compress PDF does not explicitly downsample embedded images. Image-heavy documents may show little reduction or become larger."
    },
    {
      "q": "Does PDFcraft send the file for me?",
      "a": "No. Download the result and choose how to share it yourself."
    }
  ],
  "ctaHref": "/tools/compress-pdf",
  "ctaText": "Try structural compression",
  "tag": "Tips",
  "tagColor": "#CA8A04",
  "tagBg": "#FEFCE8",
  "date": "February 6, 2026",
  "readTime": "3 min read"
};

export default function Post() {
  return <BlogPost {...article} />;
}
