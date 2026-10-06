# PDFCraft — Free PDF Tools

13 free tools with local document processing in your browser. No account required. The website and some processing runtimes still load web resources.

## Tools
- Merge PDF
- Split PDF
- Compress PDF
- PDF to Image
- Rotate PDF
- Watermark PDF
- JPG to PDF
- Delete Pages
- Add Page Numbers
- Reorder Pages
- PDF to Grayscale
- Protect PDF
- Unlock PDF

## Tech Stack
- Next.js 14
- pdf-lib
- pdfjs-dist
- @neslinesli93/qpdf-wasm
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy
Hosted on Cloudflare Pages.

## By
[Dajai Studio](https://github.com/dajai98) — Nepal

## Content and static export maintenance

- Edit `lib/blogCatalog.json` for blog listing titles, descriptions, tags and historical listing dates. Article metadata uses `lib/blogMetadata.js`; article body/date props stay in their route files. Do not infer new publication dates from listing labels.
- `npm run build` runs the sitemap generator before Next.js. It scans actual static page routes and checks the catalog and redirects before updating `public/sitemap.xml`. Keep the generated file in the reviewed changeset; do not hand-edit it.
- `npm run check:sitemap` detects drift without writing. `npm run test:content` checks the built export, metadata, schema/visible FAQs, internal links, catalog and favicon. Run it after a build.
- `node tests/final-repair.test.cjs` checks PDF geometry, image validation, stale errors and consent handlers. It does not replace real-browser verification.
- Publish the generated `out` directory using the existing hosting workflow. `next start` is not the serve command for `output: "export"`. Hosting redirects and real-browser behavior still need verification.
- See [the remediation report](docs/seo-remediation.md) for the 45-article classification, unresolved dates, evidence limits and deployment checklist.
