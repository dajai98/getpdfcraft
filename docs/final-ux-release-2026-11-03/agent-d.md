# Agent D — branding and metadata review

Reviewed 2026-11-03. Scope: read-only public product sources, metadata, structured data and assets. Root owns implementation. This report records inspection of the pre-polish candidate; final rendered verification must follow the rebuild.

## Required current-public changes

- Replace the exact current product spelling `PDFcraft` with `GetPDFCraft` in `app/`, `components/`, `lib/blogCatalog.json`, `lib/toolDocumentation.json`, `lib/blogMetadata.js` and `lib/toolMetadata.js`. References found include Navbar/Footer, homepage, policy/contact/about copy, tool FAQs, blog headings/body/CTAs, descriptions, title suffixes, Open Graph/Twitter metadata, image alternative text and root WebSite structured data.
- Blog catalog headings and corresponding article headings must change together. Tool names themselves and article slugs remain unchanged.
- `public/og.svg` has a P mark and generic tool text, but no written product name. Add the visible `GetPDFCraft` name so previews identify the same product as page metadata.
- **Raster exception requiring action:** visual inspection of `public/icon.png` shows `PDFCraft` embedded in the image. A text search does not reveal it. This image is referenced by root layout and BlogPost structured-data logos. Replace its public use with an appropriate current-brand icon, and verify icon/logo references in the export. A simple code-native document icon without a wordmark is suitable at favicon sizes; do not falsely report the old raster as rebranded.

## Deliberate exceptions

| Surface | Treatment and reason |
| --- | --- |
| `Dajai Studio` | Retain creator/publisher identity, including BlogPosting author/publisher and about-page Organization. It is not the product-name defect. |
| `getpdfcraft.com`, email and URL paths | Retain functional host, contact address, canonical links, blog slugs and tool routes. |
| `package.json` name `pdfcraft` | Retain internal package identity. |
| `lib/copyPdfPagesSafe.js` prefix `pdfcraft-source-` | Retain generated navigation namespace; changing it would affect PDF behavior/evidence. |
| Storage identifiers and qpdf/dependency identifiers | Retain; unrelated to public branding. |
| `public/examples/compression-observations.json` | Preserve measured records and hashes; do not relabel historical data mechanically. |
| Tests/evidence, archived reports and source snapshots | Preserve historical measurements, exact source bytes/hashes and prior verdicts. |
| Smallpdf, iLovePDF, Adobe, Apple, Microsoft | Retain unrelated provider identities and existing qualified comparison claims. |

## Test implications

Existing content tests use literal old headings, the ` | PDFcraft` title suffix and forbidden-claim mutation strings/regexes. Current-public expectations and paired claim-detection mutations must follow the new spelling. Do not merely relax tests until they pass, remove claim checks, or update historical manifests. In particular, update both the forbidden patterns and their negative/positive controls in batch4b/batch5-style editorial tests so capability protections still recognize `GetPDFCraft`.

Rebuild before inspecting exported titles, Open Graph `site_name`/image alternatives, Twitter metadata, WebSite name, BlogPosting headline and unchanged publisher. Recheck all 50 canonical routes rather than assuming source string changes reached every metadata path. Verify the raster/icon replacement is actually linked in generated HTML and JSON-LD.

## Encoding finding

Node read each `.js`, `.json`, `.svg`, `.css` and `.txt` file under app/components/lib/public as UTF-8 and scanned for replacement characters and common mojibake sequences. No suspicious occurrences were found. PowerShell's default decoding displayed the attachment's em dash as `â€”`; this display symptom is not evidence that public product sources contain corrupt text. Use explicit UTF-8 or Node for future inspections.

## Status

Inventory and safe replacement boundaries complete. Initial product scan found public old-brand references throughout the listed source areas and the visual raster exception. This is not yet a final branding PASS; root implementation, rebuilt-route verification and final image inspection remain required.

## Final rebuilt-candidate addendum — 2026-11-03

**Branding verification: PASS for the inspected local export.** Reproducible inspection: `node docs/final-ux-release-2026-11-03/agent-d-final-check.cjs`. Detailed route results and exact export/asset hashes are in `agent-d-final-check.json`.

- All 50 canonical routes from the sitemap were inspected in `out/`. Every route has visible GetPDFCraft branding, a current-brand title, Open Graph title and Twitter title, `og:site_name` GetPDFCraft, WebSite schema name GetPDFCraft and publisher Dajai Studio. Article publisher identities remain Dajai Studio.
- Zero standalone old `PDFcraft`/`PDFCraft`/`PDFCRAFT`/`Pdfcraft` matches and zero detected encoding defects in inspected current app/components/lib/public text and canonical HTML. Boundaries distinguish the old name from the substring inside GetPDFCraft.
- Visually inspected the replaced 512px icon: an orange-red rounded square with a white P; the old embedded PDFCraft wordmark is gone. Public and exported icon bytes match, SHA-256 `116dea4a5ab754b174a17a1f36e36707200324e31d796b03c96df4d2a86d948d`. All canonical HTML links reference `/icon.png`.
- The OG SVG now includes the visible GetPDFCraft wordmark and retains By Dajai Studio. Public and exported SVG bytes match, SHA-256 `e48450ba318e9d28cfb88f0009902217285bae0e2580076fe28669bd43056a47`.
- Existing non-blocking metadata limitation: 44 article/tool exports do not specify `og:image`; the helper Open Graph objects already omitted image properties before this polish. Their titles/site names are consistent. The six other canonical pages supply the updated OG asset. This is not recorded as a newly introduced branding regression or a verified social-network rendering result.

No product files were edited by Agent D. This inspection establishes local export consistency; it does not establish deployment parity or prove that external social platforms support/cache the SVG preview.

### Second rebuild verification

Root added image properties to the shared blog and tool metadata helpers and rebuilt. Re-ran the check against all 50 canonical exports, now explicitly requiring both `og:image` and `twitter:image` to equal `https://getpdfcraft.com/og.svg`. **50/50 pass; zero missing images, wrong site names, old-brand matches or encoding defects.** All title/visible-brand/schema-publisher checks still pass. Public/exported icon and SVG hashes remain identical to those recorded above. The previously noted 44-route metadata omission is resolved. Results are preserved separately in `agent-d-final-check-2.json`; the first check remains available in `agent-d-final-check.json`.
