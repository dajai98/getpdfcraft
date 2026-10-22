import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("how-to-merge-pdf-free");

const article = {
  "title": "How to Merge PDF Files Free Online — No Sign Up",

  "readTime": "6 min read",
  "tag": "Merge PDF",
  "tagColor": "#DC2626",
  "tagBg": "#FEF2F2",
  "ctaHref": "/tools/merge-pdf",
  "ctaText": "Merge your PDFs — free to use",
  "intro": "A combined PDF is only useful if the pages arrive in the right order and its important links still work. PDFcraft appends two or more PDFs in insertion order, then reconstructs supported navigation. Start with an ordered set of originals rather than treating Merge as a full document editor.",
  "sections": [
    {
      "heading": "Build a cover -> report -> appendix sequence",
      "steps": [
        {
          "title": "Add the cover first",
          "body": "Open Merge PDF and add the cover, report and appendix in that sequence. The displayed list is the append order; filenames are not used to sort it."
        },
        {
          "title": "Correct the list before processing",
          "body": "Remove and re-add a misplaced file. There is no drag-order control in Merge. Each input contributes all its pages, so use Split first if you only need part of a source."
        },
        {
          "title": "Merge and check the boundaries",
          "body": "Run Merge, download the result and inspect the first page of each source section. Existing printed page numbers stay in the page content; Merge does not replace them with a continuous numbering scheme."
        }
      ]
    },
    {
      "heading": "Using Merge on a phone",
      "text": "Available file-picker locations and multi-select gestures depend on your browser and device. Retrieving a cloud-hosted input is a separate transfer from the local merge. Locate the saved output through your browser's download controls; the storage location can vary.",
      "list": [
        {
          "text": "Find and save files on iPhone",
          "href": "/blog/merge-pdf-on-iphone"
        }
      ]
    },
    {
      "heading": "What follows a page into the output",
      "text": "Supported direct local destinations, named destinations, GoTo actions and bookmarks are rebuilt against the actual inserted pages. Repeated copies of one input are separate source occurrences. Their destination names are namespaced to avoid collisions, so external links into old named anchors are not guaranteed to keep working. Supported remote GoToR and web-link destinations keep their remote meaning."
    },
    {
      "heading": "Opening instructions are deliberately different",
      "text": "Source OpenActions are omitted rather than choosing one file's initial destination or action for the merged document. Bookmark hierarchies remain distinct. The output is serialized, reopened and structurally validated before a download is exposed; that check is not a visual review or a signature-validity test."
    },
    {
      "heading": "When another workflow is needed",
      "table": {
        "headers": [
          "Input or requirement",
          "What to do"
        ],
        "rows": [
          [
            "AcroForm document",
            "The safe copy path rejects it. Use a workflow that explicitly supports the form structure rather than assuming visible fields were preserved."
          ],
          [
            "Linked popup annotations, tagged structures or unsupported navigation",
            "These can stop the merge. An unsupported-structure error is not a request to reorder files."
          ],
          [
            "Encrypted or very large inputs",
            "Use an authorized unencrypted copy; smaller groups may help with browser memory, but cannot resolve unsupported structures."
          ]
        ]
      }
    },
    {
      "heading": "Check links as well as page count",
      "text": "Try a bookmark and a cross-page link from each source. Controlled Node tests cover supported mappings, not every PDF feature or browser. The handler copies locally without a processing upload; website resources still load. Keep each original until the combined document meets its intended use."
    },
    {
      "heading": "Choose the next operation",
      "list": [
        {
          "text": "Combine the ordered inputs",
          "href": "/tools/merge-pdf"
        },
        {
          "text": "Move individual pages afterward",
          "href": "/tools/reorder-pages"
        },
        {
          "text": "Choose a Windows merge workflow",
          "href": "/blog/how-to-merge-pdf-on-windows"
        },
        {
          "text": "Compare Mac merge workflows",
          "href": "/blog/how-to-merge-pdf-on-mac"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Why are two copies of the same document treated separately?",
      "a": "Each occurrence needs its own page mapping. A link in the second copy should target that copy's inserted pages, not jump into the first one."
    },
    {
      "q": "Can Merge preserve every form and digital signature?",
      "a": "No. AcroForm input is rejected, and this workflow does not establish signature preservation or complete document-level fidelity."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
