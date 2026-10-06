import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("pdf-tool-not-working-troubleshooting");

export default function Post() {
  return (
    <BlogPost
      tag={"Troubleshooting"} tagColor="#DC2626" tagBg="#FEF2F2"
      title={"Why Isn't My PDF Tool Working? A Troubleshooting Guide"}
      date="August 2026" readTime="6 min read"
      intro={"Start with the actual error and a non-sensitive sample when a tool fails. The cause may be the document, browser resources, a blocked runtime download, or a product defect. Local document processing does not mean every failure is local or user-fixable."}
      sections={[
  {
    "heading": "\"Nothing happens when I click the button\"",
    "steps": [
      {
        "title": "Check for a progress indicator first",
        "body": "Look for the tool’s current progress/status and result area. Compress starts after file selection; it has no separate Compress button."
      },
      {
        "title": "Large files take time proportional to your device",
        "body": "Since processing happens on your device rather than a server, a large or complex PDF on an older phone can take noticeably longer than the same file on a laptop. Give it a few extra seconds before assuming it's stuck."
      },
      {
        "title": "Check if JavaScript is disabled or blocked",
        "body": "The tools require JavaScript. Inspect whether a required page script or runtime is blocked; do not disable security settings indiscriminately."
      }
    ]
  },
  {
    "heading": "\"I got a generic error message\"",
    "text": "Error reporting varies by tool: some show inline messages, and some still use alerts. Protect/Unlock distinguish runtime-loading failures from qpdf status errors, but a status failure can still mean a wrong password, damaged PDF, or unsupported input.",
    "steps": [
      {
        "title": "The PDF is password-protected",
        "body": "Many page tools reject encrypted input. Unlock an authorized copy with its correct password before retrying. PDFcraft does not crack unknown passwords."
      },
      {
        "title": "The file isn't actually a valid PDF",
        "body": "A .pdf extension does not prove valid PDF bytes. Several tools validate the header or parsing result; damaged or incomplete files can fail. Obtain a valid copy if needed."
      },
      {
        "title": "The PDF uses an unusual or non-standard internal structure",
        "body": "Some PDFs — particularly very old ones, or ones produced by uncommon software — use structures that trip up parsing libraries. This is rare but not impossible. Try opening the file in a different PDF viewer first to confirm it isn't corrupted."
      }
    ]
  },
  {
    "heading": "\"The tool won't accept my file\"",
    "text": "File-picker accept settings are hints, not full validation. JPG to PDF validates JPEG/JPG and PNG bytes and rejects unsupported formats. PDF validation differs by tool; renamed or damaged input may fail before or during parsing."
  },
  {
    "heading": "\"The page froze or my browser crashed on a large file\"",
    "steps": [
      {
        "title": "There's no artificial file size limit — your device's memory is the real ceiling",
        "body": "The inspected tools do not impose an app-level file-size quota, but available browser memory and document complexity limit processing. Large raster pages can be especially demanding."
      },
      {
        "title": "Close other tabs before processing a large file",
        "body": "Each open tab competes for the same pool of memory. Closing unused tabs — especially other media-heavy ones — frees up room for the PDF tool to work."
      },
      {
        "title": "Try on a desktop or laptop instead of a phone",
        "body": "A different device or browser may have more usable resources, but success is not guaranteed. Test the same non-sensitive file to narrow the cause."
      },
      {
        "title": "Split the PDF into smaller pieces first",
        "body": "If Split can load the file, explicit page ranges can divide it into parts. Split itself still needs to load the source and may fail on the same input."
      }
    ]
  },
  {
    "heading": "\"My download didn't start\"",
    "steps": [
      {
        "title": "Check your browser's download prompt or blocked-popup indicator",
        "body": "Click the result’s Download control and check the browser’s download prompts. PDF-to-image Download All triggers separate downloads and may need browser permission."
      },
      {
        "title": "Check your Downloads folder even if nothing seemed to happen",
        "body": "Some browser configurations save files silently without a visible prompt."
      },
      {
        "title": "Try a different browser if it persists",
        "body": "This flow relies on standard browser download behavior. It's rare, but browser extensions or unusual privacy settings can occasionally interfere with it."
      }
    ]
  },
  {
    "heading": "Quick diagnostic checklist",
    "list": [
      "Does the input open in a compatible viewer?",
      "If encrypted, do you have the correct password and authorization to modify it?",
      "Can the browser load the tool’s required worker or WASM runtime?",
      "Does a smaller, non-sensitive file work with the same tool?",
      "Check the browser download list and chosen save location."
    ]
  },
  {
    "tip": "Testing a smaller file can help narrow the cause, but does not prove that the product has no bug. Report the error through Contact without sending sensitive documents or passwords."
  },
  {
    "heading": "Related reading",
    "list": [
      {
        "text": "How browser-based PDF processing actually works",
        "href": "/blog/how-browser-based-pdf-processing-works"
      },
      {
        "text": "Unlock a password-protected PDF",
        "href": "/tools/unlock-pdf"
      },
      {
        "text": "Why is my PDF locked?",
        "href": "/blog/why-is-my-pdf-locked"
      },
      {
        "text": "PDF file too large? How to fix it",
        "href": "/blog/pdf-file-size-too-large"
      }
    ]
  }
]}
      faqs={[
  {
    "q": "Why doesn't the error message tell me exactly what went wrong?",
    "a": "Error reporting varies by tool: some show inline messages, and some still use alerts. Protect/Unlock distinguish runtime-loading failures from qpdf status errors, but a status failure can still mean a wrong password, damaged PDF, or unsupported input."
  },
  {
    "q": "Is there a file size limit on PDFcraft?",
    "a": "Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result."
  },
  {
    "q": "Will my file be lost if a tool fails partway through?",
    "a": "The selected source is not overwritten by processing. Preserve it when saving downloads; cleanup is not a secure-erasure guarantee."
  },
  {
    "q": "Does this happen because of a bug, or is it expected behavior?",
    "a": "Either is possible. File validity, resources, runtime access, and application defects can cause failures. Keep the actual error when asking for help."
  }
]}
      ctaText={"Choose the tool to retry with a test file"}
      ctaHref={"/#tools"}
    />
  );
}
