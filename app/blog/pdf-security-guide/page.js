import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("pdf-security-guide");

const article = {
  "title": "PDF Security Guide — How to Protect Your Documents",
  "date": "February 2026",
  "readTime": "8 min read",
  "tag": "Security",
  "tagColor": "#DC2626",
  "tagBg": "#FEF2F2",
  "ctaHref": "/tools/protect-pdf",
  "ctaText": "Protect your PDF now — free",
  "intro": "Choose a protection method by the problem it addresses. Controlling opening access, communicating confidentiality, validating a signature and removing sensitive content are different tasks. PDFcraft does not supply one operation that proves all of them.",
  "sections": [
    {
      "heading": "Do not treat these controls as interchangeable",
      "table": {
        "headers": [
          "Concept",
          "PDFcraft behavior",
          "What it does not establish"
        ],
        "rows": [
          [
            "Encryption and opening password",
            "Protect applies AES-256 using a supplied password.",
            "Perfect security or a strong password merely because encryption is enabled."
          ],
          [
            "Permissions",
            "Current Protect uses the same user/owner password and permits printing/extraction.",
            "A read-only or copy-proof file."
          ],
          [
            "Signatures/certification",
            "No signing, identity-verification or signature-repair workflow is provided.",
            "That a rewritten document retains a valid signature."
          ],
          [
            "Watermark",
            "Draws a visible text label.",
            "Access control, permanence or evidence that content cannot be copied."
          ],
          [
            "Page deletion",
            "Removes selected visible pages and cleans supported navigation.",
            "Secure sanitization of every recoverable object."
          ],
          [
            "Unlocking",
            "Decrypts supported input using a known password.",
            "Cracking, recovering or guessing an unknown password."
          ]
        ]
      }
    },
    {
      "heading": "Start with the recipient and the original",
      "text": "Confirm what the recipient accepts before encrypting or rewriting a document. Keep an appropriate original, especially for signed files. If a viewer reports certification or signature restrictions, examine that status and ask the issuer for a suitable copy; do not use Unlock as a signature-repair method."
    },
    {
      "heading": "Choose a signing workflow before preparing the final copy",
      "text": "PDFcraft has no electronic-signature placement or certificate-based signing workflow. Ask whether the recipient requires a visible mark, a particular signing service or a certificate-based signature; these are not interchangeable requirements. Finalize the unsigned document before using the agreed signing method elsewhere. Reopen the returned file in an appropriate viewer, check its signature status and confirm recipient acceptance. A watermark or opening password is not a substitute for signing. Avoid later page edits unless their effect on the signature is understood; PDFcraft does not validate or guarantee signature preservation."
    },
    {
      "heading": "Separate preparation from distribution",
      "steps": [
        {
          "title": "Minimize what is necessary",
          "body": "Prepare only the content the recipient needs. Removing pages can reduce visible scope, but confidential-data purging requires a workflow designed and verified for sanitization."
        },
        {
          "title": "Finish edits before protection",
          "body": "Complete ordering, overlays and size checks on an unencrypted copy. Page-copy tools reject AcroForm input and may reject other unsupported structures."
        },
        {
          "title": "Protect and verify access",
          "body": "Choose a non-predictable password, confirm it, save the encrypted output and test opening it. The four-character minimum is not a strength assessment."
        },
        {
          "title": "Check delivery access",
          "body": "Verify the address or sharing-link permissions. Where appropriate, provide the password through a separate channel; putting it beside the file offers little separation from whoever receives that message."
        }
      ],
      "list": [
        {
          "text": "Set an opening password",
          "href": "/blog/how-to-add-password-to-pdf-online"
        },
        {
          "text": "Prepare a protected copy on Mac",
          "href": "/blog/secure-pdf-on-mac"
        }
      ]
    },
    {
      "heading": "Local processing has a specific meaning",
      "text": "The document operations run in browser memory without a PDF-processing upload backend. Website requests still occur; qpdf WASM and PDF.js workers load remotely for the relevant tools. This is not a claim that every network request is absent, that memory is securely erased or that every device has been tested."
    },
    {
      "heading": "Evidence is narrower than a security certification",
      "text": "Controlled tests observed password acceptance/rejection and some parsed document features. Interactive forms, signature preservation and universal browser behavior are not established. A file that reopens successfully can still require checks for the particular property you rely on. Visible labels and rasterization do not make a document uneditable."
    },
    {
      "heading": "Continue with the appropriate tool",
      "list": [
        {
          "text": "Add an opening password",
          "href": "/tools/protect-pdf"
        },
        {
          "text": "Decrypt with an authorized known password",
          "href": "/tools/unlock-pdf"
        },
        {
          "text": "Diagnose a locked-looking document",
          "href": "/blog/why-is-my-pdf-locked"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Is a confidentiality watermark evidence that a file is encrypted?",
      "a": "No. It is visible content and can exist in an unencrypted document. Check opening access separately from labels."
    },
    {
      "q": "Can Delete Pages certify that confidential information is gone?",
      "a": "No. PDFcraft does not provide a sanitization certificate or secure-redaction guarantee. Page visibility and complete data removal are separate concerns."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
