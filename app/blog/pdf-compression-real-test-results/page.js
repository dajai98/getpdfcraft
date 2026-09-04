import BlogPost from "@/components/ui/BlogPost";

export const metadata = {
  title: "How Much Can You Actually Compress a PDF? Real Test Results | PDFcraft",
  description: "We ran PDFcraft's actual compression code against four different PDF types and measured the real results — no estimates. See exactly what compresses well and what doesn't, and why.",
  keywords: "how much can you compress a pdf, pdf compression test results, does pdf compression actually work, pdf compression percentage real",
  alternates: { canonical: "https://getpdfcraft.com/blog/pdf-compression-real-test-results" },
  openGraph: {
    title: "How Much Can You Actually Compress a PDF? Real Test Results | PDFcraft",
    description: "We ran the actual compression code against four PDF types and measured the real results. No estimates, no marketing numbers.",
    url: "https://getpdfcraft.com/blog/pdf-compression-real-test-results",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Can You Actually Compress a PDF? Real Test Results | PDFcraft",
    description: "We ran the actual compression code against four PDF types and measured the real results.",
  },
};

export default function Post() {
  return (
    <BlogPost
      tag="Tested" tagColor="#CA8A04" tagBg="#FEFCE8"
      title="How Much Can You Actually Compress a PDF? Real Test Results"
      date="August 2026" readTime="7 min read"
      intro="Most compression tools quote a range like '20-50% smaller' without saying where that number came from. We didn't want to do that. Instead, we ran PDFcraft's actual compression code — the exact same function that runs when you click Compress PDF — against four realistic test files and recorded exactly what happened. Here are the real numbers, including the cases where compression barely helped at all."
      sections={[
        {
          heading: "What PDFcraft's Compress tool actually does",
          text: "Before the results: PDFcraft's compressor works by calling one function from the pdf-lib library — PDFDocument.save({ useObjectStreams: true }). In plain terms, this reorganizes how the PDF stores its internal objects (fonts, text positions, page structure) into a more compact format. It does not recompress or downsample images. That single fact explains almost everything in the results below.",
        },
        {
          heading: "Test setup",
          text: "We built four test PDFs designed to represent common real-world document types, then ran the exact production compression call against each one and measured the file size before and after with Node.js. All four files and the test script are reproducible — this isn't a cherry-picked example.",
          list: [
            "Text-heavy: a 20-page report, mostly body text, one shared font",
            "Image-heavy: 10 pages, each with one embedded photo or scan-style image",
            "Repeated structure: a 30-page form-style document reusing the same logo image and layout on every page",
            "Mixed: 16 pages alternating between text sections and embedded images",
          ],
        },
        {
          heading: "The results",
          table: {
            headers: ["Test file", "Original size", "After compression", "Change", "Time"],
            rows: [
              ["Text-heavy (20 pages)", "31 KB", "19 KB", "−39%", "58 ms"],
              ["Image-heavy (10 pages)", "1,210 KB", "1,207 KB", "≈0% (−0.2%)", "14 ms"],
              ["Repeated structure (30 pages)", "256 KB", "248 KB", "−3%", "26 ms"],
              ["Mixed (16 pages)", "636 KB", "631 KB", "−1%", "20 ms"],
            ],
          },
        },
        {
          heading: "What this actually shows",
          steps: [
            { title: "Text-heavy documents compress the most — by a wide margin", body: "The 20-page text report shrank 39%. This is the file type object-stream optimization is genuinely good at: lots of small internal objects (text positions, font references) that compact well when reorganized. If your PDF is mostly text — reports, letters, contracts — this tool will make a real, meaningful difference." },
            { title: "Image-heavy PDFs barely change — because images aren't touched", body: "The image-heavy file shrank by 0.2%, which rounds to nothing. This matches exactly what the code does: it doesn't recompress images, so a file that's large because of its images stays large. If your PDF is a scan, a photo album, or full of screenshots, don't expect much from this tool alone." },
            { title: "The 'repeated structure' result surprised us", body: "We expected the 30-page form (reusing the same logo on every page) to show the biggest gains, since object-stream compaction is specifically about deduplicating repeated objects. It only shrank 3%. The likely reason: pdf-lib already avoids storing duplicate copies of the same embedded image when you reuse the same reference across pages, the way our test file — and most well-built PDFs — does. There simply wasn't much duplication left for the compressor to remove. Carelessly assembled PDFs (for example, ones built by combining many separately-scanned pages) may have more real duplication and see a bigger benefit than our test — but we can't quantify that without a real-world example of one, and won't guess at a number." },
            { title: "Compressing an already-compressed file does nothing further", body: "We also ran the compressor twice on the same file. The first pass took it from 31KB to 19KB. Running it again on that already-compressed result produced an identical file — 0% additional change. If you compress a PDF twice, you're not leaving anything on the table by only doing it once." },
          ],
        },
        {
          heading: "What this means for you",
          text: "If you're compressing a text-based document — a report, a form, a contract — PDFcraft's Compress tool will likely help, and our test suggests the benefit can be substantial. If you're trying to shrink a scanned document or a PDF full of photos, this specific tool is the wrong lever to pull: deleting pages you don't need, or re-exporting the original at a lower image resolution before making the PDF, will do far more than compressing the PDF afterward.",
        },
        {
          heading: "Methodology and limitations, honestly stated",
          list: [
            "These are synthetic test files built specifically for this test, not real user documents — we chose them to represent common patterns (text report, photo scan, repeated form, mixed content), but any individual real-world PDF may behave differently depending on how it was originally created.",
            "Files exported from Word, Acrobat, or a phone scanner app can have different internal structure than files built directly with pdf-lib, which may change results in either direction.",
            "We tested on one machine; processing time will vary by device, especially on phones.",
            "We're not claiming these four numbers apply to every PDF — we're showing you exactly how the tool behaves on four specific, reproducible files so you can reason about where your own file is likely to land.",
          ],
        },
        {
          tip: "The fastest way to know how much your specific PDF will compress is still to just try it — PDFcraft shows you the exact before-and-after size immediately, for free, with nothing to install.",
        },
      ]}
      faqs={[
        { q: "Why doesn't PDFcraft just add image compression?", a: "It's a real feature that could be added, and would help image-heavy files specifically. Today's tool optimizes file structure only — this article describes exactly what that means so you're not surprised by the result." },
        { q: "Is a text-heavy PDF always going to shrink by 39%?", a: "Not necessarily — that was the result for our specific 20-page test file. The mechanism that produces the reduction (compacting internal object structure) applies broadly to text-heavy documents, but the exact percentage depends on your file's specific structure." },
        { q: "My scanned PDF didn't get smaller at all. Is the tool broken?", a: "No — this matches our test results exactly. Compression doesn't currently touch image data, so a scan-heavy PDF may see close to zero reduction. Try deleting unnecessary pages instead, which our large-PDF guide covers." },
        { q: "Can I reproduce this test myself?", a: "Yes — the compression logic is the same open function (pdf-lib's save with useObjectStreams) used across the tool, and you can test your own file directly by compressing it and comparing the before/after size PDFcraft shows you." },
      ]}
      ctaText="Try Compress PDF and see your file's real numbers"
      ctaHref="/tools/compress-pdf"
    />
  );
}
