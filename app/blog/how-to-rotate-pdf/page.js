import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-rotate-pdf");

const article = {
  "title": "How to Rotate PDF Pages Free Online",
  "date": "February 2026",
  "readTime": "4 min read",
  "tag": "Rotate PDF",
  "tagColor": "#2563EB",
  "tagBg": "#EFF6FF",
  "ctaHref": "/tools/rotate-pdf",
  "ctaText": "Rotate your PDF pages now — free",
  "intro": "PDFcraft Rotate changes the page rotation value rather than rendering a new image of each page. The important control is the additional angle: every page receives the same change, including pages that already have rotation.",
  "sections": [
    {
      "heading": "Predict the resulting rotation",
      "table": {
        "headers": [
          "Existing rotation",
          "Selected change",
          "Result modulo 360"
        ],
        "rows": [
          [
            "0 degrees",
            "90 degrees right",
            "90 degrees"
          ],
          [
            "90 degrees",
            "90 degrees right",
            "180 degrees"
          ],
          [
            "270 degrees",
            "90 degrees right",
            "0 degrees"
          ],
          [
            "0 degrees",
            "90 degrees left (270 degrees)",
            "270 degrees"
          ],
          [
            "180 degrees",
            "180 degrees",
            "0 degrees"
          ]
        ]
      }
    },
    {
      "heading": "Correct a consistently sideways document",
      "steps": [
        {
          "title": "Inspect more than the first page",
          "body": "If the document mixes upright and sideways pages, applying one angle to all pages may fix some and disturb others. This tool has no selected-page control."
        },
        {
          "title": "Choose 90, 180 or 270 degrees",
          "body": "Use the available angle buttons and process the PDF. This is relative to the existing page rotation, not an absolute portrait/landscape setting."
        },
        {
          "title": "Check the saved orientation",
          "body": "Reopen the downloaded copy and inspect pages with different dimensions or crop areas. Keep the original so the next attempt does not depend on remembering earlier rotations."
        }
      ]
    },
    {
      "heading": "Page rotation is not the same as rotating an embedded picture",
      "text": "The handler updates each page with pdf-lib and saves the file. It does not intentionally rerasterize content or resize media/crop boxes. If a photograph is sideways inside an otherwise correct page, this rotates the entire page, not just that photograph."
    },
    {
      "heading": "Troubleshoot the result",
      "table": {
        "headers": [
          "Observation",
          "Explanation"
        ],
        "rows": [
          [
            "Some pages now look wrong",
            "The input may have mixed orientations. One global additional angle cannot independently correct them."
          ],
          [
            "Viewer labels have not changed",
            "Rotation does not renumber or reorder pages."
          ],
          [
            "The page is landscape but text is still awkward",
            "Page dimensions, rotation and the orientation of drawn content are different properties."
          ],
          [
            "Input cannot be parsed",
            "Encrypted or malformed inputs can fail; an orientation control is not a file-repair tool."
          ]
        ]
      }
    },
    {
      "heading": "What the checks support",
      "text": "Controlled Node evidence observed the requested rotation and extracted text on the fixture. It does not certify signatures, universal viewer behavior or every document structure. Rotation executes locally, while site resources still load from the web."
    },
    {
      "heading": "Continue with the appropriate tool",
      "list": [
        {
          "text": "Apply an additional rotation to all pages",
          "href": "/tools/rotate-pdf"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can I set every page to portrait with one click?",
      "a": "No. The control adds an angle; it does not inspect content and choose a different correction for each page."
    },
    {
      "q": "Will rotating make a scanned page searchable?",
      "a": "No. Rotating an image-based page does not add OCR or create text objects."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
