# PDFcraft consistency remediation - 2026-10-06

Scope: the existing repaired repository at task start, including the Batch 1-4B and final-repair behavior. No deployment, dependencies upgraded, article removals, new redirects, noindex changes, or PDF-processing changes. Classifications are provisional editorial judgments, not traffic/ranking measurements. A denotes technical/high-value content; it does not certify unique authorship or measured performance.

## Baseline

Next 14.2.5, React 18.3.1; output: export retained. Baseline lint: exit 0, 0 errors, 3 existing warnings (two img warnings, Split hook dependency). Baseline build: exit 0, 67 generated pages. Inventory: 13 tools, 45 article routes, 45 blog-index entries, 64 sitemap URLs (46 blog URLs including /blog), eight direct redirects. Existing export: 65 HTML files including 404, 64 indexable canonicals, no JSON-LD parsing errors.

## Architecture and preservation

- lib/blogCatalog.json supplies slug, listing title, description, historical listing date and tag/styles. The index and every article metadata export use it. Article body/H1/date props remain unchanged. The index-only unsupported Tested badge becomes Measurement; the article already uses the accurate Guide label. No publication date was invented. The 15 previously unresolved publication-date conflicts remain unresolved; listing dates must not generate sitemap lastmod or override article dates.
- lib/blogMetadata.js constructs the same title/description/canonical/OG/Twitter values as before, using lib/siteConfig.json for the origin.
- scripts/generate-sitemap.cjs scans actual app page routes and cross-checks catalog membership and redirects; npm prebuild refreshes public/sitemap.xml. This keeps the same static-host path and copy behavior. No Next API server or runtime sitemap endpoint is required. Unknown dynamic/group/parallel routes fail for review.
- npm run check:sitemap rejects stale output; no clock timestamps or unsupported lastmod are generated. Sitemap URL membership is unchanged; order is deterministic.
- ToolGuides supplies three focused guide links per tool. The index highlights local-processing, measurement and troubleshooting articles without changing listing order.

## Tool audit

All source routes below retain their implementation; metadata comes from lib/toolMetadata.js and layouts, visible FAQs and their schema share the ToolLayout data. RelatedTools still excludes the current tool and displays six alternatives. All are under app/tools/<slug>/page.js.

| Route | Source behavior / content conclusion |
|---|---|
| /tools/merge-pdf | copyPages in insertion order; no drag reorder; document-level feature caveats retained. |
| /tools/split-pdf | Explicit comma-separated items create separate outputs; all mode creates one PDF per page. |
| /tools/compress-pdf | save with object streams; no explicit image recompression/downsampling or guaranteed reduction. |
| /tools/pdf-to-image | PDF.js all pages, fixed scale 2, JPG/PNG canvas output. Download All triggers individual downloads; browser permission remains a runtime check. |
| /tools/jpg-to-pdf | Validated JPEG/PNG, one image per page in insertion order; no new format support. |
| /tools/rotate-pdf | Additional 90/180/270 degrees applied to every page; no selected-page promise. |
| /tools/watermark-pdf | Text/opacity controls; CropBox/rotation-aware automatic placement; no new controls. |
| /tools/delete-pages | Visible page removal, not sanitization. Page-number selection, no preview thumbnails; removed an unverified roadmap promise. |
| /tools/add-page-numbers | Starting number, six positions, three font sizes. Replaced unnecessarily absolute any-starting-number copy. |
| /tools/reorder-pages | Up/Down changes order; copyPages output, no drag-and-drop promise. |
| /tools/pdf-to-grayscale | Rasterizes visible pages to grayscale JPEG in PDF; preserves intended physical size, not exact detail/semantics. |
| /tools/protect-pdf | qpdf AES-256 with same user/owner password, print/extract allowed; four-character minimum is not a security-strength guarantee. |
| /tools/unlock-pdf | Requires supplied password; qpdf decrypt, exit-status checks and cleanup; no cracking. |

## Claim decisions

Corrected: Tested badge without published measurements; image High quality description now states fixed 2x scale; grayscale preservation wording now acknowledges rendering/JPEG detail changes; unspecified future thumbnail roadmap removed; Watermark/Delete descriptions state actual local/visible processing; Protect strength slogan replaced by actual minimum and recovery limitation; compression upload phrase scoped to its processing backend.

Retained after contextual review: practical-limit caveats; not guaranteed statements; best practices/FAQ questions that do not rank products; preserved /best-free-pdf-tools-online URL; never/always used for backup/review advice or current implementation descriptions. Vector scalability is not a file-size guarantee. No competitor prices/features were invented or externally verified. Word/Excel/signing articles already disclose unavailable functionality. No full article-body rewrite was needed.

## Blog classification

A = technical/high value. B = useful but generic. C = overlap, weak differentiation or unsupported-product search intent. C is a review flag only: all URLs remain indexed/self-canonical and linked.

| Article route | Class | Reason |
|---|---|---|
| /blog/how-to-merge-pdf-free | B | Core insertion-order merge workflow and limitations. |
| /blog/compress-pdf-without-losing-quality | B | Core structural-compression explanation; savings and fidelity caveats are explicit. |
| /blog/convert-pdf-to-jpg-free | B | Practical fixed-scale conversion guidance; overlaps PNG guide but serves another format intent. |
| /blog/how-to-split-pdf-online | B | Core page/range syntax and separate-output behavior. |
| /blog/how-to-remove-password-from-pdf | B | Correct-password workflow with qpdf error and authorization caveats. |
| /blog/ilovepdf-alternative | C | Qualified task checklist, but lacks an evidenced direct competitor comparison; validate search intent before restructuring. |
| /blog/smallpdf-alternative | C | Qualified task checklist, but lacks an evidenced direct competitor comparison; validate search intent before restructuring. |
| /blog/adobe-acrobat-alternative-free | C | Qualified task checklist, but lacks an evidenced direct competitor comparison; validate search intent before restructuring. |
| /blog/merge-pdf-on-iphone | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/merge-pdf-on-android | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/compress-pdf-for-whatsapp | B | Task-specific delivery workflow, without asserting current service limits. |
| /blog/what-is-pdf | B | Useful introductory format explanation; generic educational content. |
| /blog/how-to-compress-pdf-for-email | B | Attachment workflow with recipient-specific size checks. |
| /blog/pdf-vs-word-which-is-better | B | Generic format selection guidance; no universal winner claimed. |
| /blog/how-to-add-password-to-pdf-online | B | Core Protect workflow; overlaps encryption guide but has clear operation intent. |
| /blog/how-to-add-watermark-to-pdf | B | Matches text/opacity controls and fixed automatic placement. |
| /blog/best-free-pdf-tools-online | B | Accurate 13-tool overview; useful navigation rather than an unsupported ranking. |
| /blog/how-to-convert-jpg-to-pdf | B | Matches actual JPEG/PNG input support and page sizing. |
| /blog/how-to-edit-pdf-free | B | Explicitly separates supported page edits from unavailable text editing/OCR. |
| /blog/pdf-file-size-too-large | B | Useful size diagnosis and alternatives to ineffective structural compression. |
| /blog/how-to-rotate-pdf | B | Correctly describes rotation of all pages together. |
| /blog/pdf-to-word-free | C | Clearly discloses missing PDFcraft functionality, but generic external-workflow advice may mismatch product intent. |
| /blog/how-to-sign-pdf-free | C | Clearly discloses missing PDFcraft functionality, but generic external-workflow advice may mismatch product intent. |
| /blog/split-pdf-into-two | B | Concrete range example; overlaps Split but answers a specific task. |
| /blog/convert-pdf-to-png-free | B | PNG-specific encoding/quality guidance with fixed rendering limits. |
| /blog/how-to-merge-pdf-on-mac | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/how-to-merge-pdf-on-windows | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/how-to-compress-pdf-on-iphone | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/how-to-extract-pages-from-pdf | B | Useful nonconsecutive-page extraction and merge workflow. |
| /blog/pdf-security-guide | B | General distinctions and limitations; not a security certification. |
| /blog/how-to-convert-pdf-to-excel | C | Clearly discloses missing PDFcraft functionality, but generic external-workflow advice may mismatch product intent. |
| /blog/reduce-pdf-size-without-software | C | Useful decision guidance but overlaps compression and large-file troubleshooting pages. |
| /blog/how-to-combine-pdf-and-images | B | Useful two-tool workflow matching supported image types. |
| /blog/why-is-my-pdf-locked | A | Useful technical distinction between encryption, permissions, viewers and damaged input. |
| /blog/how-to-encrypt-pdf-files-free | B | AES-256 workflow and limits; overlaps the main Protect guide. |
| /blog/how-to-lock-pdf-for-job-applications | B | Recipient/portal requirement checks provide a distinct use case. |
| /blog/how-to-lock-pdf-without-adobe | C | Substantial overlap with the core Protect/encryption workflow. |
| /blog/how-to-secure-pdf-before-sending-email | B | Sequencing preparation and encryption provides a useful delivery checklist. |
| /blog/how-to-protect-pdf-from-editing | A | Explains why passwords, watermarks and rasterization are not tamper protection. |
| /blog/password-protect-pdf-on-android | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/lock-pdf-on-iphone | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/secure-pdf-on-mac | C | Device-specific overlap with core guide; platform behavior is qualified but not browser/device verified. |
| /blog/how-browser-based-pdf-processing-works | A | Implementation-specific document flow, runtime requests and cleanup limits. |
| /blog/pdf-compression-real-test-results | A | Reproducible measurement guidance tied to the actual compressor; not a published benchmark. |
| /blog/pdf-tool-not-working-troubleshooting | A | Concrete input, password, worker, memory and download failure diagnosis. |

Totals: {"A":5,"B":24,"C":16}. All 45 retained.

## Privacy, ads, icons and runtime limits

CookieBanner remains the sole active AdSense loader, conditional on accepted consent, using afterInteractive. Manual ad placement exports return null and retain future slot configuration; Analytics returns null for its placeholder ID. No monetization code was removed. Source/build inspection cannot prove visible ads, Auto Ads settings, CLS, actual network traces or mobile behavior. Do not configure a real analytics ID without revisiting consent and policy behavior.

Existing public/icon.png remains a 512x512 PNG referenced by root metadata, unchanged; generated HTML/export checks cover references and identical bytes. Browser caching/appearance and Google selection are NOT VERIFIED. Google Search Console favicon/canonical/indexing evidence is required before assuming a search-display problem.

## Search Console evidence required before further action

Obtain URL-level indexing/selected canonical, query/click/impression trends and overlapping query sets for the device, password/security, compression, alternative and unsupported-conversion clusters. Check backlinks and entry-page conversions before deleting, redirecting, noindexing or canonicalizing any article away. None of those actions was performed here. Historical dates require reliable publication evidence; do not replace them with current dates.

## Deployment checklist (not executed)

1. Review the complete accumulated uncommitted diff and this report.
2. Run npm run lint, npm run build, npm run check:sitemap, npm run test:content and PDF regression tests.
3. Complete real-browser PDFs/downloads/consent/keyboard/responsive/favicon/network checks; current browser verification remains incomplete.
4. Deploy out only through the existing hosting workflow after separate review; do not run next start for this static export.
5. Check live assets, canonicals, robots, sitemap and all eight hosting redirects. Generic local static hosting does not validate _redirects.
6. Inspect actual AdSense/Auto Ads configuration and behavior separately; script loading does not prove ads display.
7. Submit/inspect the sitemap and representative URLs in Search Console; recrawl timing and favicon appearance cannot be guaranteed.

## Files changed in this remediation

Compared with the task-start baseline, 66 files changed or were added; zero existing files were deleted. The table is a complete task-specific manifest, distinct from older repairs.

| File | Exact purpose |
|---|---|
| `components/ui/ToolGuides.js` | New compact shared guide-link component. |
| `docs/seo-remediation.md` | Baseline, audit decisions, all-article classification, file manifest, evidence limits and review checklist. |
| `lib/blogCatalog.json` | Single listing/route metadata source for all 45 retained articles. |
| `lib/blogMetadata.js` | Generate article title, description, canonical, OG and Twitter metadata from catalog. |
| `lib/siteConfig.json` | Shared canonical origin for blog metadata and sitemap construction. |
| `lib/toolGuides.json` | Map all 13 tools to a relevant existing guide. |
| `scripts/generate-sitemap.cjs` | Deterministic route-derived sitemap with catalog and redirect validation. |
| `tests/content-integrity.test.cjs` | 132 export/catalog/schema/FAQ/link/icon and fail-fast generator checks. |
| `README.md` | Document accurate local processing and catalog/sitemap/test/static-export workflow. |
| `app/blog/adobe-acrobat-alternative-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/best-free-pdf-tools-online/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/compress-pdf-for-whatsapp/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/compress-pdf-without-losing-quality/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/convert-pdf-to-jpg-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/convert-pdf-to-png-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-browser-based-pdf-processing-works/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-add-password-to-pdf-online/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-add-watermark-to-pdf/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-combine-pdf-and-images/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-compress-pdf-for-email/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-compress-pdf-on-iphone/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-convert-jpg-to-pdf/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-convert-pdf-to-excel/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-edit-pdf-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-encrypt-pdf-files-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-extract-pages-from-pdf/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-lock-pdf-for-job-applications/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-lock-pdf-without-adobe/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-merge-pdf-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-merge-pdf-on-mac/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-merge-pdf-on-windows/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-protect-pdf-from-editing/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-remove-password-from-pdf/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-rotate-pdf/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-secure-pdf-before-sending-email/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-sign-pdf-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/how-to-split-pdf-online/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/ilovepdf-alternative/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/lock-pdf-on-iphone/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/merge-pdf-on-android/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/merge-pdf-on-iphone/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/page.js` | Use shared catalog; highlight three technical guides; correct index-only Tested badge through catalog. |
| `app/blog/password-protect-pdf-on-android/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/pdf-compression-real-test-results/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/pdf-file-size-too-large/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/pdf-security-guide/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/pdf-to-word-free/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/pdf-tool-not-working-troubleshooting/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/pdf-vs-word-which-is-better/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/reduce-pdf-size-without-software/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/secure-pdf-on-mac/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/smallpdf-alternative/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/split-pdf-into-two/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/what-is-pdf/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/blog/why-is-my-pdf-locked/page.js` | Replace duplicated metadata object with the shared helper; preserve body, H1, date and URL. |
| `app/tools/add-page-numbers/page.js` | Qualify any-starting-number FAQ; no processing change. |
| `app/tools/compress-pdf/layout.js` | Scope no-upload wording to the PDF-processing backend. |
| `app/tools/delete-pages/page.js` | Remove unsupported thumbnail roadmap and clarify visible removal/local processing. |
| `app/tools/pdf-to-grayscale/page.js` | Acknowledge rendering/JPEG detail changes; preserve processing. |
| `app/tools/pdf-to-image/page.js` | Replace high-quality slogan with actual fixed 2x rendering. |
| `app/tools/protect-pdf/page.js` | Replace best-security wording with actual minimum and recovery limitation. |
| `app/tools/watermark-pdf/page.js` | State actual text/opacity/local-processing behavior. |
| `components/ui/ToolLayout.js` | Render focused guide navigation, without changing tool controls. |
| `package.json` | Add prebuild sitemap generation, check:sitemap and test:content scripts; no dependency changes. |
| `public/sitemap.xml` | Same 64 URLs and priorities, deterministic route ordering. |
| `tests/final-repair.test.cjs` | Compile JavaScript helpers only; do not parse new catalog JSON as JavaScript. |

## Validation results

- Final lint: exit 0, zero errors, same three pre-existing warnings.
- Production build: exit 0; prebuild validates 64 routes, Next generates 67 static pages.
- Content/export suite: 132 PASS, 0 FAIL. An initial assertion incorrectly expected the index badge on the article; it was corrected to inspect the index. Article already had the accurate Guide label.
- Existing final-repair suite: 106 PASS, 0 FAIL. Only its file discovery was adjusted for the new JSON data files.
- Existing combined Batch 1-2 regression: 103 PASS, 0 FAIL.
- check:sitemap: PASS.
- Baseline comparison: all 65 exported HTML title/canonical pairs unchanged; all 45 article bodies/H1/date props unchanged.
- Icon, redirects, dependency lockfile, static-export config and processing helpers remain byte-identical to task baseline.
- git diff --check: exit 0; Git reports line-ending conversion warnings, not whitespace errors.
- Older Batch 3/4 source-parser snapshots assume inline metadata and hard-coded index arrays; they are obsolete for this refactor and were not represented as passing. Current export checks cover their route/index/sitemap/canonical/FAQ/link invariants.
- PDF.js Node tests warn about DOMMatrix/Path2D and standard-font availability. Canvas pixels/browser appearance remain outside these handler checks.

- Local exported-icon HTTP probe: 200 image/png, response bytes identical to out/icon.png (temporary loopback server). This is not browser favicon or production hosting verification.
- Final risky-phrase scan: zero matches for 100% private, completely safe, safest, zero risk, unlimited, no limits, any length, military-grade, identical quality, works offline, instant, under 5 seconds, wins. Remaining any size refers to vector scalability; never/always/best/guaranteed/better than were reviewed in their qualified, instructional, source-comment or preserved-URL context rather than blindly replaced.
- No automatic deployment was performed. Browser appearance, network/consent behavior, real-device compatibility, hosting redirects and Google indexing/favicon selection remain NOT VERIFIED in this phase.
