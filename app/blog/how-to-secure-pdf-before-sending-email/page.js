import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-secure-pdf-before-sending-email");

const article = {
  "title": "How to Secure a PDF Before Sending by Email",

  "readTime": "6 min read",
  "tag": "Protect PDF",
  "tagColor": "#DC2626",
  "tagBg": "#FEF2F2",
  "ctaHref": "/tools/protect-pdf",
  "ctaText": "Secure your PDF for email now — free",
  "intro": "Prepare the attachment and its delivery separately. Password protection can add an opening barrier to the PDF, but it does not secure the email service, verify the recipient or make a sharing link private.",
  "sections": [
    {
      "heading": "A practical pre-send sequence",
      "steps": [
        {
          "title": "Confirm submission requirements",
          "body": "Check whether the recipient accepts encrypted PDFs and what size or delivery method is permitted. An attachment that cannot be opened may be unusable even if encryption succeeded."
        },
        {
          "title": "Prepare the minimum required document",
          "body": "Remove unnecessary visible pages or return to the source document to remove unneeded material. Delete Pages is not secure sanitization; use a verified redaction process for confidential data that must be irrecoverable."
        },
        {
          "title": "Compare size before encryption",
          "body": "Run Compress on the unencrypted copy if useful. It rewrites object structure, not image quality, and output may grow. Retain the smaller suitable version rather than assuming the processed file is better."
        },
        {
          "title": "Add only useful labeling",
          "body": "A visible confidentiality watermark can communicate handling expectations. It can be edited or removed and does not provide cryptographic protection."
        },
        {
          "title": "Protect and reopen",
          "body": "Use a password that is not easy to predict or reused for unrelated access, confirm it and test the saved encrypted file. The minimum length in the form is not a strength guarantee."
        }
      ]
    },
    {
      "heading": "Attachment or sharing link?",
      "table": {
        "headers": [
          "Delivery choice",
          "Before sending"
        ],
        "rows": [
          [
            "Email attachment",
            "Check the actual file selected, recipient address and current service/recipient requirements. No universal attachment threshold is assumed here."
          ],
          [
            "Sharing link",
            "Verify permissions, required sign-in and that the intended recipient can access the file. A link is not automatically private."
          ],
          [
            "Password delivery",
            "Where appropriate, use a separate channel from the file. Confirm the recipient knows which document it opens without placing the password in a revealing filename."
          ]
        ]
      }
    },
    {
      "heading": "Understand what the recipient can do",
      "text": "Protect uses AES-256 with the same user and owner password and allows printing and extraction. It is not a read-only control. A recipient who knows the password should be treated as able to access the contents. No signature or identity-verification service is supplied."
    },
    {
      "heading": "Keep the final check about this exact file",
      "text": "Reopen the attachment you intend to send, not an earlier draft. Check page count, sensitive visible content and password access. PDFcraft runs these document operations locally; site resources and the qpdf runtime still require network loading. Neither successful processing nor these checks establish email security or universal PDF compatibility."
    },
    {
      "heading": "Continue with the appropriate tool",
      "list": [
        {
          "text": "Compare the prepared file's size",
          "href": "/tools/compress-pdf"
        },
        {
          "text": "Encrypt the final copy",
          "href": "/tools/protect-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Should I put the password in the same email?",
      "a": "That gives anyone who receives that message both the file and password. Consider a separate appropriate channel and verify the recipient, while recognizing that this does not certify the security of either channel."
    },
    {
      "q": "Can I compress after adding the password?",
      "a": "The Compress handler expects an input it can parse and can reject encrypted PDFs. Prepare and compare size first, then protect the chosen final copy."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
