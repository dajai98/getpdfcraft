import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  "title": "How to Combine PDF and Images Into One File Free | PDFcraft",
  "description": "Convert JPEG/JPG and PNG images to PDF, merge in insertion order, then adjust pages with Up/Down controls.",
  "alternates": {
    "canonical": "https://getpdfcraft.com/blog/how-to-combine-pdf-and-images"
  },
  "openGraph": {
    "title": "How to Combine PDF and Images Into One File Free | PDFcraft",
    "description": "Convert JPEG/JPG and PNG images to PDF, merge in insertion order, then adjust pages with Up/Down controls.",
    "url": "https://getpdfcraft.com/blog/how-to-combine-pdf-and-images",
    "type": "article"
  }
};

export default function Post() {
  return (
    <BlogPost
      tag={"Guide"} tagColor="#DC2626" tagBg="#FEF2F2"
      title={"How to Combine PDF and Images Into One File Free"}
      date="February 2026" readTime="5 min read"
      intro={"Need to combine a PDF document with photos or scanned images into one file? Whether you are adding a signed page scan to a contract, combining receipts with a PDF report, or merging photos with a document — PDFcraft makes it free and in your browser. No sign up, no software, no uploads."}
      sections={[
  {
    "heading": "Why combine PDFs and images?",
    "steps": [
      {
        "title": "Add a scanned signature page to a contract",
        "body": "Sign a page by hand, scan or photograph it, then combine it with the original PDF contract. The result is a single complete document."
      },
      {
        "title": "Combine receipts with an expense report",
        "body": "Merge scanned or photographed receipts with your PDF expense report so everything is in one file for submission."
      },
      {
        "title": "Add photos to a PDF report",
        "body": "Insert photos taken on your phone into a PDF report — site inspection photos, product photos, or event documentation."
      },
      {
        "title": "Create a portfolio from mixed files",
        "body": "Combine PDF documents and JPG images of your work into one portfolio document for sharing with clients."
      }
    ]
  },
  {
    "heading": "Method 1 — Convert images to PDF first, then merge",
    "steps": [
      {
        "title": "Convert your images to PDF",
        "body": "Go to PDFcraft and use the JPG to PDF tool. Select your JPEG/JPG or PNG images and convert them to a PDF file. Only JPEG/JPG and PNG images are supported."
      },
      {
        "title": "Open the Merge PDF tool",
        "body": "Go to PDFcraft and click Merge PDF."
      },
      {
        "title": "Add all your files",
        "body": "Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result."
      },
      {
        "title": "Arrange the order",
        "body": "Merge uses the displayed insertion order. Add files in the required order and check the list; there is no drag-to-reorder control. Use Reorder Pages with Up/Down controls afterward if needed."
      },
      {
        "title": "Click Merge and download",
        "body": "Click Merge PDFs and download the combined document. All files are now in one PDF."
      }
    ]
  },
  {
    "heading": "Method 2 — Use JPG to PDF for multiple images",
    "steps": [
      {
        "title": "Select all your images at once",
        "body": "PDFcraft's JPG to PDF tool accepts multiple JPEG/JPG or PNG images in one go. Select all your photos together and they become a multi-page PDF automatically."
      },
      {
        "title": "Arrange image order",
        "body": "Merge uses the displayed insertion order. Add files in the required order and check the list; there is no drag-to-reorder control. Use Reorder Pages with Up/Down controls afterward if needed."
      },
      {
        "title": "Convert to PDF",
        "body": "Click Convert and download the image PDF."
      },
      {
        "title": "Merge with your document PDF",
        "body": "Use the Merge PDF tool to combine the image PDF with your document PDF in any order you choose."
      }
    ]
  },
  {
    "heading": "PDFcraft tools you need for this",
    "list": [
      {
        "text": "JPG to PDF — convert images to PDF first",
        "href": "/tools/jpg-to-pdf"
      },
      {
        "text": "Merge PDF — combine all PDFs into one file",
        "href": "/tools/merge-pdf"
      },
      {
        "text": "Reorder Pages — arrange pages in any order",
        "href": "/tools/reorder-pages"
      }
    ]
  },
  {
    "tip": "If you need to insert images at specific positions within a PDF (not just at the beginning or end), convert all images to PDF first, then use the Reorder Pages tool to arrange everything in the exact order you need."
  },
  {
    "heading": "Ordering and formats",
    "text": "JPG to PDF accepts JPEG/JPG and PNG only. Convert the images first, merge the resulting PDFs in insertion order, then use Reorder Pages with Up/Down controls for page-level changes."
  }
]}
      faqs={[
  {
    "q": "Can I combine a PDF and images for free?",
    "a": "Yes. Use PDFcraft's JPG to PDF tool to convert images to PDF first, then use the Merge PDF tool to combine everything. Both tools are completely free."
  },
  {
    "q": "What image formats does PDFcraft accept?",
    "a": "PDFcraft's JPG to PDF tool accepts JPG and PNG images. Convert them to PDF first, then merge with your document."
  },
  {
    "q": "Can I add images to the middle of a PDF?",
    "a": "Yes. Convert your images to PDF, merge all files together, then use PDFcraft's Reorder Pages tool to move pages to the exact position you need."
  },
  {
    "q": "Is there a limit on how many images I can combine?",
    "a": "Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result."
  },
  {
    "q": "Are my files safe when combining PDFs and images?",
    "a": "PDFcraft processes document contents locally without a processing upload backend. Website and third-party requests still occur. See the Privacy Policy; local processing is not a general safety guarantee."
  },
  {
    "q": "Can I combine PDFs and images on my phone?",
    "a": "You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed."
  }
]}
      ctaText={"Combine your PDFs and images now — free"}
      ctaHref={"/tools/merge-pdf"}
    />
  );
}
