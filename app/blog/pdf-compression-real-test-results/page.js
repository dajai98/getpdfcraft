import { blogMetadata } from "@/lib/blogMetadata";
import BlogPost from "@/components/ui/BlogPost";

export const metadata = blogMetadata("pdf-compression-real-test-results");

const article = {
  "title": "How Much Can You Compress a PDF? Measure Your Own Result",
  "date": "August 2026",
  "readTime": "7 min read",
  "tag": "Guide",
  "tagColor": "#CA8A04",
  "tagBg": "#FEFCE8",
  "ctaHref": "/tools/compress-pdf",
  "ctaText": "Try Compress PDF and see your file's real numbers",
  "intro": "The useful compression result is the one measured on the actual input, including growth or failure. These audited internal observations cover ten controlled synthetic cases and two real NASA documents. They show what happened to those files under a Node harness, not typical savings or a completed browser benchmark.",
  "sections": [
    {
      "heading": "Measured bytes, including the inconvenient outcomes",
      "text": "Negative change means reduction; positive means growth. Percentage change is ((output bytes - input bytes) / input bytes) x 100, rounded here to four decimals. Rejected inputs have no output and therefore no measured percentage; they are not zero-percent successes.",
      "table": {
        "headers": [
          "Input type",
          "Input bytes",
          "Output bytes",
          "Byte change",
          "Size change",
          "Outcome"
        ],
        "rows": [
          [
            "Synthetic text-heavy PDF",
            "55978",
            "28359",
            "-27619",
            "-49.3390%",
            "Output reparsed"
          ],
          [
            "Synthetic image-heavy noise proxy",
            "2362383",
            "2361500",
            "-883",
            "-0.0374%",
            "Output reparsed"
          ],
          [
            "Synthetic scan-style raster proxy",
            "724227",
            "722909",
            "-1318",
            "-0.1820%",
            "Output reparsed"
          ],
          [
            "Synthetic mixed text/image/vector PDF",
            "2363673",
            "2362409",
            "-1264",
            "-0.0535%",
            "Output reparsed"
          ],
          [
            "Synthetic presentation-style pages",
            "6969",
            "4325",
            "-2644",
            "-37.9394%",
            "Output reparsed"
          ],
          [
            "Synthetic AcroForm PDF",
            "4237",
            "3024",
            "-1213",
            "-28.6287%",
            "Output reparsed"
          ],
          [
            "Synthetic already-object-stream control",
            "28309",
            "28359",
            "50",
            "+0.1766%",
            "Output reparsed"
          ],
          [
            "Synthetic minimal PDF",
            "595",
            "725",
            "130",
            "+21.8487%",
            "Output reparsed"
          ],
          [
            "Invalid synthetic input",
            "58",
            "No output",
            "Not measured",
            "Not measured",
            "Rejected; no output"
          ],
          [
            "Encrypted synthetic input",
            "58576",
            "No output",
            "Not measured",
            "Not measured",
            "Rejected; no output"
          ],
          [
            "Real NASA Public Access Plan",
            "1081214",
            "1077480",
            "-3734",
            "-0.3454%",
            "Output reparsed"
          ],
          [
            "Real Apollo 11 press kit archival scan",
            "28028612",
            "27891686",
            "-136926",
            "-0.4885%",
            "Output reparsed"
          ]
        ]
      }
    },
    {
      "heading": "What was run and how it was checked",
      "text": "The collector exercised the production compression handler through a simulated React/URL harness in Node v24.15.0 on Windows x64, using pdf-lib 1.17.1. The operation loads the PDF and saves with useObjectStreams enabled. File lengths and SHA-256 hashes were recorded, and successful outputs were independently reparsed using PDF.js 4.4.168. This was actual byte processing, but not an actual browser session or download test."
    },
    {
      "heading": "Why the synthetic and real rows are separate",
      "text": "The noise image is not a photograph, the synthetic scan proxy is not a physical scan, and the generated presentation is not an observed Office export. The two real inputs were downloaded unchanged: NASA's published Public Access Plan and the archival Apollo 11 press kit. They are supplemental real-document observations, not a representative population. NASA does not endorse PDFcraft; using these measurements does not grant permission to redistribute the source PDFs or review images."
    },
    {
      "heading": "What the reductions and growth mean",
      "text": "The synthetic text-heavy file lost 27,619 bytes, while the image-heavy noise proxy lost only 883 bytes. The already-object-stream control gained 50 bytes and the minimal control gained 130 bytes. The NASA policy file lost 3,734 bytes; the much larger Apollo scan lost 136,926 bytes, still less than half a percent. These differences are consistent with a structural rewrite whose usefulness depends on the input, not a fixed-percentage compressor."
    },
    {
      "heading": "Changes beyond byte size",
      "text": "Both real-document outputs lost linearization. PDF version and producer/modification metadata changed in the recorded real-document inspections, and PDF.js font warnings appeared before and after. Reopening, text extraction and geometry observations do not prove interactive text selection or universal preservation. The form row is a parsed fixture result, not evidence that its fields work in every viewer."
    },
    {
      "heading": "The visual review covered six pages only",
      "text": "Stored rendered images were reviewed by Codex at a 750-pixel page height: policy pages 1, 14 and 27, and Apollo pages 1, 127 and 254. At that scale the recorded review found no obvious new clipping, missing content or visible corruption. This is limited image review, not human or browser testing, pixel-perfect comparison or whole-document visual fidelity."
    },
    {
      "heading": "What remains NOT TESTED",
      "list": [
        "Browser execution and downloads remain BLOCKED / NOT TESTED; no browser or device compatibility is established.",
        "Interactive text selection, form interaction and signature preservation are NOT TESTED.",
        "Real photographic-heavy inputs and an independently observed Office export are not represented.",
        "Exhaustive visual inspection and universal lossless preservation are not proven.",
        "No target-size optimization or explicit image downsampling was performed. Output can be unchanged or larger on other inputs."
      ]
    },
    {
      "heading": "Measure your own decision",
      "steps": [
        {
          "title": "Keep the original and record its bytes",
          "body": "Use a non-sensitive copy representative of your task. Do not substitute a different export between measurements."
        },
        {
          "title": "Compare one processed output",
          "body": "Record input/output bytes and calculate the signed difference. Keep a failure as a failure, and a larger output as a larger output."
        },
        {
          "title": "Inspect before replacing",
          "body": "Reopen the output and check the pages and features you need. A size reduction alone is not a reason to discard the original."
        }
      ]
    },
    {
      "heading": "Try the same structural operation",
      "list": [
        {
          "text": "Process a PDF and compare actual bytes",
          "href": "/tools/compress-pdf"
        },
        {
          "text": "Troubleshoot a file that remains too large",
          "href": "/blog/pdf-file-size-too-large"
        }
      ]
    }
  ],
  "faqs": [
    {
      "q": "Can I expect the text-heavy percentage on my report?",
      "a": "No. That percentage belongs to one synthetic fixture. Its structure differs from other reports, and the two real samples had much smaller percentage reductions."
    },
    {
      "q": "Were the invalid and encrypted inputs silently excluded?",
      "a": "No. Both appear as rejected cases with no output. No size change is calculated for either failure."
    }
  ]
};

export default function Post() { return <BlogPost {...article} />; }
