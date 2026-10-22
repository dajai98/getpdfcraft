import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";
export const metadata = blogMetadata("merge-pdf-on-iphone");
export default function Post() {
  return (
    <BlogPost tag={"iPhone"} tagColor="#2563EB" tagBg="#EFF6FF"
      title={"How to Merge PDF on iPhone Free (No App Needed)"}
      date="February 2026" readTime="5 min read"
      intro={"To combine PDFs on iPhone without installing a PDFcraft app, open Merge PDF in your browser and add files in the order you need. The merge runs locally, but website resources still load over the network. This guide explains the controls and checks to make; it does not establish tested compatibility with every iPhone or Safari version."}
      sections={[
  {
    "heading": "How to merge PDF on iPhone — step by step",
    "steps": [
      {
        "title": "Open Safari on your iPhone",
        "body": "Open getpdfcraft.com in Safari. If the page or file chooser fails to load, first check your connection and browser restrictions. No PDFcraft account is required."
      },
      {
        "title": "Tap Merge PDF",
        "body": "Tap the Merge PDF tool from the home screen."
      },
      {
        "title": "Select your PDF files",
        "body": "Tap Select Files and use the file picker offered by your browser and device. Available storage locations and multi-select gestures vary; add PDFs one at a time if needed to establish the required order."
      },
      {
        "title": "Arrange the order",
        "body": "Merge uses the displayed insertion order. Add files in the required order and check the list; there is no drag-to-reorder control. Use Reorder Pages with Up/Down controls afterward if needed."
      },
      {
        "title": "Tap Merge PDFs",
        "body": "Tap Merge PDFs after checking the list. For example, add a cover PDF before a report PDF to place the cover first. The handler appends every page from each file; it does not sort by filename."
      },
      {
        "title": "Download the merged PDF",
        "body": "Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading."
      }
    ]
  },
  {
    "heading": "How to find the merged PDF on iPhone",
    "steps": [
      {
        "title": "Confirm that a download completed",
        "body": "A successful merge and a saved download are separate steps. Use the tool's download button, then inspect your browser's download status. If no file was saved, keep the original inputs available rather than treating the success message as proof of a completed download."
      },
      {
        "title": "Open the saved copy",
        "body": "Locate the downloaded PDF through the browser or Files app. Check its first page, the boundary between input files, and its final page. Printed page numbers from the source documents are not automatically replaced with one new sequence."
      },
      {
        "title": "Share the checked copy",
        "body": "Use an available sharing option for the saved PDF after checking it. Confirm that you selected the merged output rather than one of the originals; the receiving app or service has its own file requirements."
      }
    ]
  },
  {
    "heading": "Also available on iPhone — iCloud Drive PDFs",
    "steps": [
      {
        "title": "Access iCloud PDFs when selecting files",
        "body": "Use the tool’s file chooser to select a locally accessible file. Available locations and multi-select gestures depend on your system. If a cloud provider is offered, retrieving that file can involve a separate network transfer."
      },
      {
        "title": "Save merged PDF to iCloud",
        "body": "If you choose to store the result with a cloud provider, use the storage options available on your device and verify that the upload completes. PDFcraft's local merge does not itself confirm cloud synchronization or create a backup."
      }
    ]
  },
  {
    "heading": "If Safari stops before a result appears",
    "text": "Try a smaller pair of PDFs to separate a document problem from a resource problem. Merge holds document data in browser memory; a large or complex input can fail without a fixed file-size threshold. A password-protected input needs an authorized unencrypted copy. If the error names unsupported navigation or AcroForm, changing the file order will not fix that structure. Keep the originals and do not assume another browser will preserve an unsupported feature."
  },
  {
    "heading": "What happens to links, bookmarks and forms",
    "text": "PDFcraft rebuilds supported local links, named destinations and bookmarks so their targets follow the inserted pages. Repeated inputs have separate destination namespaces. Source opening actions are deliberately omitted, and external links to old named anchors may no longer work. AcroForm inputs, linked popup annotations and unsupported navigation are rejected. The saved PDF is reopened and structurally checked before a download is offered; that is not proof of visual fidelity, working interactive forms or signature preservation."
  },
  {
    "heading": "Continue with the relevant tool",
    "list": [
      {
        "text": "Open merge pdf",
        "href": "/tools/merge-pdf"
      },
      {
        "text": "Adjust page order with Up/Down controls",
        "href": "/tools/reorder-pages"
      }
    ]
  }
]}
      faqs={[
  {
    "q": "Can I merge PDFs on iPhone without an app?",
    "a": "No PDFcraft app installation is required. Open the tool in your browser; the site and processing code still need to load, and completion depends on the document and device."
  },
  {
    "q": "Where does the merged PDF save on iPhone?",
    "a": "PDFcraft does not choose a universal iPhone folder. Start with the browser's download status to identify the saved file, then use the location available on your device. A merge success message alone does not confirm it was saved."
  },
  {
    "q": "Can I merge PDFs from iCloud Drive on iPhone?",
    "a": "If that provider is available in your system file picker, you can retrieve a copy there. Cloud retrieval and backup are separate from PDFcraft’s local processing; provider availability varies."
  },
  {
    "q": "Can I merge more than 2 PDFs on iPhone?",
    "a": "The Merge handler accepts two or more files and appends them in insertion order. There is no fixed file-count control, but available memory and document complexity can limit how many finish successfully."
  },
  {
    "q": "Does merging PDFs on iPhone use iCloud storage?",
    "a": "The merge handler does not write to iCloud. Cloud storage is involved only if your own file-selection or saving workflow uses it. Loading PDFcraft and retrieving cloud inputs can still require network requests."
  },
  {
    "q": "Does PDFcraft work on iPad too?",
    "a": "This guide does not establish iPad compatibility from an iPhone workflow. Check file selection, processing and the saved output in your iPad browser before relying on it."
  }
]}
      ctaText={"Merge your PDFs — free to use"}
      ctaHref={"/tools/merge-pdf"}
    />
  );
}
