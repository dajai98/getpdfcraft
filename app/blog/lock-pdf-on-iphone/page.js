import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";
export const metadata = blogMetadata("lock-pdf-on-iphone");
export default function Post() {
  return (
    <BlogPost tag={"iPhone"} tagColor="#2563EB" tagBg="#EFF6FF"
      title={"How to Lock PDF on iPhone Free (No App Needed)"}
      date="May 2026" readTime="5 min read"
      intro={"Use the browser-based Protect tool to add password-based AES-256 encryption without installing a PDFcraft app. Start with an unencrypted PDF. Browser support and device resources determine whether the workflow completes."}
      sections={[
  {
    "heading": "How to lock a PDF on iPhone — step by step",
    "steps": [
      {
        "title": "Open Safari on your iPhone",
        "body": "Open getpdfcraft.com in a supported browser and choose the relevant tool. No account is required; browser and device limitations still apply."
      },
      {
        "title": "Tap Protect PDF",
        "body": "Tap the Protect PDF tool from the home screen."
      },
      {
        "title": "Select your PDF",
        "body": "Tap Select File. The Files app picker opens. Navigate to your PDF in iCloud Drive, On My iPhone, or Downloads."
      },
      {
        "title": "Enter your password",
        "body": "Select an unencrypted PDF, enter and confirm a longer, unique password, then click Protect PDF. The input minimum is four characters, not a security recommendation. Verify the downloaded result in a compatible viewer."
      },
      {
        "title": "Tap Protect PDF",
        "body": "Click Protect PDF after entering and confirming the password. The runtime must load before local encryption can complete."
      },
      {
        "title": "Download and share",
        "body": "After locating the saved output, use the sharing options your browser or file manager offers. Available apps and menus vary."
      }
    ]
  },
  {
    "heading": "Where to find the locked PDF on iPhone",
    "steps": [
      {
        "title": "Open the Files app",
        "body": "Tap the Files app on your iPhone home screen."
      },
      {
        "title": "Go to Downloads",
        "body": "Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading."
      },
      {
        "title": "Share from Files",
        "body": "Long press the PDF → Share to send via AirDrop, Mail, WhatsApp, or any other app."
      }
    ]
  },
  {
    "heading": "Lock PDF from iCloud Drive on iPhone",
    "steps": [
      {
        "title": "Select from iCloud",
        "body": "Use the tool’s file chooser to select a locally accessible file. Available locations and multi-select gestures depend on your system. If a cloud provider is offered, retrieving that file can involve a separate network transfer."
      },
      {
        "title": "Save locked PDF back to iCloud",
        "body": "After downloading, move the locked PDF from Downloads to iCloud Drive using the Files app for backup."
      }
    ]
  },
  {
    "heading": "Other iPhone PDF security tips",
    "list": [
      {
        "text": "Add watermark to PDF on iPhone",
        "href": "/tools/watermark-pdf"
      },
      {
        "text": "Compress PDF on iPhone before sharing",
        "href": "/tools/compress-pdf"
      },
      {
        "text": "Merge PDFs on iPhone",
        "href": "/tools/merge-pdf"
      }
    ]
  },
  {
    "tip": "If your browser offers a home-screen shortcut, you can use it for quick access. PDFcraft remains a website; page scripts and processing resources may still require a network connection."
  },
  {
    "heading": "Protection limits and runtime loading",
    "text": "Protect applies tested password-based AES-256 encryption. Enter and confirm a longer, unique password; four characters is only the minimum validation requirement. The same password is used for user and owner access, with printing and extraction allowed. This is not a read-only or tamper-proof mechanism. Protect and Unlock load remote qpdf WASM from jsDelivr. Document contents and passwords are processed locally, but runtime downloads make network requests. PDFcraft cannot recover an unknown password."
  },
  {
    "heading": "Continue with the relevant tool",
    "list": [
      {
        "text": "Open protect pdf",
        "href": "/tools/protect-pdf"
      }
    ]
  }
]}
      faqs={[
  {
    "q": "Can I lock a PDF on iPhone without an app?",
    "a": "You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed."
  },
  {
    "q": "Where does the locked PDF save on iPhone?",
    "a": "Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading."
  },
  {
    "q": "Can I lock a PDF from iCloud Drive on iPhone?",
    "a": "If that provider is available in your system file picker, you can retrieve a copy there. Cloud retrieval and backup are separate from PDFcraft’s local processing; provider availability varies."
  },
  {
    "q": "Does locking a PDF on iPhone use iCloud storage?",
    "a": "Document contents are processed locally in your browser by PDFcraft, without a PDF-processing upload backend. Website and third-party resource requests are separate; see the Privacy Policy. This is not a guarantee against every privacy risk. Protect and Unlock load the remote qpdf WASM runtime from jsDelivr. PDF-to-image and Grayscale load PDF.js workers from jsDelivr. Document processing remains local, but these downloads require network access and can fail."
  },
  {
    "q": "Can I send a locked PDF from iPhone via WhatsApp?",
    "a": "After downloading, use the messaging app’s available document-attachment workflow and check its current requirements. App menus and download locations vary."
  },
  {
    "q": "Does PDFcraft work on iPad too?",
    "a": "You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed."
  }
]}
      ctaText={"Lock PDF on iPhone now — free, no app"}
      ctaHref={"/tools/protect-pdf"}
    />
  );
}
