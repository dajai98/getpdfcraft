import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";
export const metadata = blogMetadata("how-to-split-pdf-online");
export default function Post() {
  return (
    <BlogPost tag={"Split PDF"} tagColor="#EA580C" tagBg="#FFF7ED"
      title={"How to Split PDF Online Free — No Sign Up"}
      date="February 2026" readTime="5 min read"
      intro={"Split a PDF into individual pages or explicit page ranges to separate chapters or share a selection. Each comma-separated item produces a separate PDF. The tool is currently free to use with no account required."}
      sections={[
  {
    "heading": "Why split a PDF?",
    "steps": [
      {
        "title": "Share only relevant pages",
        "body": "Extract the specific pages a client needs instead of sending a 100-page document."
      },
      {
        "title": "Separate chapters or sections",
        "body": "Divide a large document into individual chapters, each as its own PDF."
      },
      {
        "title": "Reduce file size for sending",
        "body": "Explicit ranges create separate files. Check each output’s size against the actual receiving limit."
      },
      {
        "title": "Choose pages to share",
        "body": "Extraction is not secure redaction or sanitization. Do not assume all sensitive objects or metadata have been purged merely because excluded pages are not visible."
      },
      {
        "title": "Reorganize documents",
        "body": "Split and then re-merge in a different order using PDFcraft's Merge PDF tool."
      }
    ]
  },
  {
    "heading": "How to split a PDF online — step by step",
    "steps": [
      {
        "title": "Open PDFcraft Split PDF tool",
        "body": "Go to PDFcraft and click Split PDF. No account or software needed."
      },
      {
        "title": "Select your PDF",
        "body": "Choose a valid input file with the file selector. PDFcraft processes document contents locally; website resource requests are separate."
      },
      {
        "title": "Choose how to split",
        "body": "Choose Split All Pages for one file per page, or Page Ranges. For example, 1,3-5 produces two files: page 1 and pages 3 through 5."
      },
      {
        "title": "Click Split PDF",
        "body": "PDFcraft splits the PDF in your browser."
      },
      {
        "title": "Download your split files",
        "body": "Download the resulting PDF or files. No watermarks on any output."
      }
    ]
  },
  {
    "heading": "Split options explained",
    "steps": [
      {
        "title": "Extract a page range",
        "body": "Extract pages 3-8 into a new PDF. The original is unchanged."
      },
      {
        "title": "Extract specific pages",
        "body": "Enter 1,4,7 for three separate one-page PDFs. Use Merge afterward if you need one combined selection."
      },
      {
        "title": "Specify equal page-count ranges yourself",
        "body": "There is no automatic equal-split control. For a 20-page source, enter 1-5,6-10,11-15,16-20 to request four PDFs. Equal page counts do not guarantee equal byte sizes."
      },
      {
        "title": "Split every page",
        "body": "Create a separate PDF for every single page in the document."
      }
    ]
  },
  {
    "heading": "Split then merge for full control",
    "text": "Split into the desired ranges, then add the output files to Merge in insertion order. Use Reorder Pages with Up/Down controls for further page-order changes."
  },
  {
    "tip": "PDFcraft uses structural/object-stream optimization and does not explicitly downsample or recompress embedded images. Output may be smaller, unchanged, or larger. Compare the displayed byte counts, keep the original if size increases, and inspect any result you choose to use."
  },
  {
    "heading": "Continue with the relevant tool",
    "list": [
      {
        "text": "Open split pdf",
        "href": "/tools/split-pdf"
      }
    ]
  }
]}
      faqs={[
  {
    "q": "Can I split a PDF for free with no sign up?",
    "a": "Yes. PDFcraft's Split PDF tool is completely free with no account required."
  },
  {
    "q": "Can I split a PDF into individual pages?",
    "a": "Yes. Choose the option to split every page into a separate PDF file."
  },
  {
    "q": "Is there a limit on how many pages I can split?",
    "a": "Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result."
  },
  {
    "q": "Does splitting a PDF reduce quality?",
    "a": "Split copies selected pages rather than rasterizing them. Review the output; preservation of every form, link, bookmark, or signature is not guaranteed."
  },
  {
    "q": "Can I split a PDF on mobile?",
    "a": "You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed."
  },
  {
    "q": "Can I split a password protected PDF?",
    "a": "Unlock an authorized copy with its correct password first. PDFcraft does not crack unknown passwords."
  }
]}
      ctaText={"Split your PDF now — free"}
      ctaHref={"/tools/split-pdf"}
    />
  );
}
