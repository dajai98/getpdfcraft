import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("why-is-my-pdf-locked");

const article = {
  "title": "Why Is My PDF Locked? Diagnose the Actual Problem",
  "intro": "A PDF that will not open and a PDF that opens but cannot be edited are different problems. Start with the exact message from your viewer. PDFcraft Unlock can decrypt an authorized file with a supplied correct password; it does not solve every cause of a locked-looking document.",
  "sections": [
    {
      "heading": "Match the symptom to a next step",
      "table": {
        "headers": [
          "Symptom",
          "What to check"
        ],
        "rows": [
          [
            "Password prompt before opening",
            "Ask the sender for the correct password or use your saved password."
          ],
          [
            "Opens but editing is unavailable",
            "Check the viewer’s capabilities and document permissions; opening alone does not diagnose the cause."
          ],
          [
            "Blank pages or damaged-file message",
            "Obtain a fresh copy and check it in a compatible viewer before treating it as a password problem."
          ],
          [
            "Viewer reports a signature or certification restriction",
            "Read the viewer's signature status and ask the sender for an editable copy if needed. Unlock does not verify or repair signatures."
          ],
          [
            "Cannot save changes, but the PDF opens",
            "Check whether the app supports editing and whether the chosen storage location allows saving a copy. Do not assume an opening-password problem."
          ],
          [
            "PDFcraft security engine cannot load",
            "Check the connection and browser restrictions affecting the remote qpdf runtime."
          ]
        ]
      }
    },
    {
      "heading": "Opening passwords and permissions answer different questions",
      "text": "An opening-password prompt asks for access to encrypted content. An editing or printing restriction concerns permitted operations and may appear after a document opens. Encryption is the protection mechanism, not a diagnosis for every disabled button. Check the viewer's document-security information and the sender's instructions before deciding whether decryption matches the problem. PDFcraft Unlock requires a password you know; it is not a password-cracking or general restriction-bypass workflow."
    },
    {
      "heading": "Use Unlock only for a matching problem",
      "text": "For a PDF you are authorized to modify, select it in Unlock, enter the current password, click Unlock PDF, and download the result if processing succeeds. Open the downloaded file afresh to check that it no longer requests a password and that the needed content is present. Keep the original until verification is complete."
    },
    {
      "heading": "Understand a failed unlock",
      "text": "A qpdf error may indicate a wrong password, damaged PDF, or unsupported input. The current error message cannot always identify which. Try the password against the original in a compatible viewer or ask the sender for a valid copy. PDFcraft does not recover unknown passwords."
    },
    {
      "heading": "An unencrypted file is a different case",
      "text": "If the PDF is unencrypted, there is nothing to decrypt. The current Unlock interface still requires a nonempty password entry. Do not enter a made-up password as a general repair method. A viewer restriction, document permission, or damaged file needs its own diagnosis."
    },
    {
      "heading": "Local processing still needs runtime resources",
      "text": "Unlock runs locally using qpdf WebAssembly downloaded from jsDelivr. A loading failure is distinct from a password error. Browser and device limits can also prevent processing."
    },
    {
      "heading": "Related guidance",
      "list": [
        {
          "text": "Unlock with a known password",
          "href": "/tools/unlock-pdf"
        },
        {
          "text": "Understand what password protection does not prevent",
          "href": "/blog/how-to-protect-pdf-from-editing"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can PDFcraft recover a forgotten PDF password?",
      "a": "No. Check your own records or ask the sender for access."
    },
    {
      "q": "Why does a PDF open but remain difficult to edit?",
      "a": "First check whether your viewer offers editing and what its security panel reports. If the page is a scanned image, opening it does not create editable text. PDFcraft Unlock only decrypts; PDFcraft has no OCR or existing-text editor."
    },
    {
      "q": "Does Unlock repair a damaged PDF?",
      "a": "It is a decryption tool, not a general PDF repair service. Request a valid copy when the input is damaged."
    }
  ],
  "ctaHref": "/tools/unlock-pdf",
  "ctaText": "Unlock with a known password",
  "tag": "Unlock PDF",
  "tagColor": "#16A34A",
  "tagBg": "#F0FDF4",

  "readTime": "3 min read"
};

export default function Post() {
  return <BlogPost {...article} />;
}
