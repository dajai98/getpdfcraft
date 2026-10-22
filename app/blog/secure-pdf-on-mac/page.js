import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";
export const metadata = blogMetadata("secure-pdf-on-mac");
export default function Post() {
  return (
    <BlogPost tag={"Mac"} tagColor="#374151" tagBg="#F9FAFB"
      title={"How to Password-Protect a PDF on Mac"}
      readTime="6 min read"
      intro={"Before choosing a Mac PDF protection method, separate two needs: requiring a password to open the document, and managing permissions after it opens. Preview documents controls for both. PDFcraft provides a narrower opening-password workflow. Pick the capability your recipient actually needs rather than treating every password dialog as the same security feature."}
      sections={[
  {
    "heading": "Preview separates opening access from permissions",
    "text": "Apple documents an opening password and an owner password for managing permissions such as printing, copying text and annotations. In the documented workflow, open a copy, choose File > Export, then Permissions. Set the opening-password requirement if needed, choose the permissions, enter the owner password and save. Apple says changes apply when the PDF is reopened; an existing protected file also has an Edit Permissions route.",
    "steps": [
      {
        "title": "Choose the control deliberately",
        "body": "If the goal is a password prompt before reading, check the opening-password setting. A permission setting is a different decision about permitted operations. Do not assume that selecting a printing restriction alone creates the opening prompt you intended."
      },
      {
        "title": "Treat the help page as a control guide",
        "body": "Menu labels are version-sensitive. Apple documents the controls, but that does not establish a specific encryption algorithm or equivalence to another tool. This guide does not report a local Preview execution or a comparison of cipher strength."
      }
    ],
    "list": [
      {
        "text": "Apple: password-protect a PDF in Preview",
        "href": "https://support.apple.com/guide/preview/password-protect-a-pdf-prvw587dd90f/mac"
      }
    ]
  },
  {
    "heading": "PDFcraft provides a narrower opening-password workflow",
    "text": "Protect PDF accepts an unencrypted PDF and asks you to enter and confirm a password. Its current processing applies password-based AES-256 encryption using the same password for user and owner access, with printing and extraction allowed. It does not expose all Preview permission controls. A successfully protected file is not thereby read-only, tamper-proof or a signed document.",
    "steps": [
      {
        "title": "Use it when the narrower requirement fits",
        "body": "If an agreed recipient needs an opening password and accepts the output, the browser workflow may fit. If you need separate permission choices, do not infer them from the Protect button. Review a tool that explicitly supports those choices instead."
      },
      {
        "title": "Keep the source and the password available",
        "body": "Work from an authorized original or an authorized unencrypted copy. Retain the source separately, choose a longer unique password and store it safely. PDFcraft does not recover an unknown password, and its input minimum is not a recommendation for password strength."
      }
    ],
    "list": [
      {
        "text": "Open Protect PDF",
        "href": "/tools/protect-pdf"
      },
      {
        "text": "Opening-password workflow and its limits",
        "href": "/blog/how-to-add-password-to-pdf-online"
      }
    ]
  },
  {
    "heading": "Choose native controls or browser protection",
    "text": "For a native workflow, check whether the installed Preview controls meet the opening and permission requirements. For offline work, make the source available locally and verify that workflow on your Mac. For PDFcraft, document processing is local but the website and processing runtime still load web resources; local processing does not promise offline availability.",
    "steps": [
      {
        "title": "Agree on access before applying protection",
        "body": "Ask whether the receiving system accepts encrypted PDFs and how the recipient will obtain the password. If a portal cannot accept a protected file, adding encryption can prevent delivery. Do not substitute a permission checkbox for that conversation."
      },
      {
        "title": "Do not rely on permissions as universal enforcement",
        "body": "Permission restrictions are not a guarantee against every viewer or later use of the content. Once an authorized recipient can read the document, this guide does not promise that copying or redistribution is impossible. Share only the information needed for the task."
      }
    ]
  },
  {
    "heading": "Verify the saved copy, not just the dialog",
    "text": "Close and reopen the actual output in a compatible viewer. Check that the intended password opens it and that an incorrect password does not. Inspect page count and readable content, then check recipient compatibility using the intended viewing workflow. A password prompt alone is not evidence that forms, signatures or every document feature survived.",
    "steps": [
      {
        "title": "Keep the verification result specific",
        "body": "Record which file you opened and which viewer you used for your own checks. Success on one Mac viewer does not establish universal Windows, mobile or browser compatibility. If the recipient cannot open it, confirm the password and supported workflow before replacing or weakening protection."
      }
    ]
  }
]}
      faqs={[
  {
    "q": "Is an owner password the same as requiring a password to open?",
    "a": "They are different controls in Preview documentation. Choose the opening requirement explicitly when a password prompt before reading is the goal."
  },
  {
    "q": "Can PDFcraft reproduce all Preview permission settings?",
    "a": "No. Its Protect workflow adds opening-password encryption and permits printing and extraction; it is not an equivalent permission-management interface."
  },
  {
    "q": "Does this comparison establish which encryption algorithm Preview uses?",
    "a": "No. The Apple help page supports the documented controls, not a cipher-equivalence or security-strength comparison with PDFcraft."
  },
  {
    "q": "What should I check before sending the protected copy?",
    "a": "Reopen the saved output with the intended password, inspect its contents and confirm that the recipient accepts encrypted files and can obtain the password."
  }
]}
      ctaText={"Secure PDF on Mac now — free"}
      ctaHref={"/tools/protect-pdf"}
    />
  );
}
