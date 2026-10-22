# Batch 8: navigation architecture

Internal implementation record, 2026-10-21. No deployment, commit, new URL or Lab publication.

## Inventory before implementation

`batch8-navigation-inventory.json` was derived before site edits from the existing static export. It maps all 50 public pages: type, purpose, conceptual area, main-content incoming/outgoing links, discovery risk, repeated navigation pattern and next action. Script payloads and global header/footer links were excluded from the main-content graph. About has no main-content incoming link but is deliberately reachable through the sitewide navigation; it is not an orphan.

All 31 articles and 13 tools were reachable. Six articles had only blog-index incoming links: Adobe alternative, PNG rendering, Mac merge, Windows merge, Mac security and Smallpdf alternative. The blog index presented all articles as one list. All tools repeated the same two generic help links, and RelatedTools selected six cards by array position rather than task relevance. No new article or pillar URL was justified.

Existing Search Console context was retained from the Batch 4B research: iPhone merge had 12 clicks/158 impressions and Windows merge 0 clicks/13 impressions in that export. This is not a new performance measurement. Both source pages, their metadata and search intent remain untouched; the core merge guide now helps readers discover them. Missing exported query/page rows are not treated as zero demand.

## Adopted structure

The homepage `/#tools` remains the tools index. It groups all 13 tools into page management; size/output appearance; password access; and image rendering/PDF creation. Category jump links have real fragment targets. The page hierarchy is H1, tools H2, category H3, tool card H4.

The existing blog index groups all 31 articles exactly once into:

- Merge and page management (7)
- Security and sharing (9)
- Compression and file size (2)
- Image rendering and PDF creation (4)
- Choose a tool or document workflow (6)
- How it works and measured results (3)

Together these cover PDF Tools, Security, Optimization, Page Management, Conversion/Rendering, and public Evidence/How It Works. The last category contains only existing public explanations/results/troubleshooting, never internal evidence or `/lab`. Platform articles remain with their actual task rather than being duplicated into another index. Category H2s contain article H3s; native anchors provide keyboard semantics.

## Tool-to-guide contract

Primary guides are unchanged. Secondary recommendations replace the two automatic general-help links and are bounded to two per tool.

| Tool | Primary guide slug | Secondary guide slugs |
| --- | --- | --- |
| Merge | how-to-merge-pdf-free | how-to-combine-pdf-and-images |
| Split | how-to-split-pdf-online | how-to-extract-pages-from-pdf |
| Compress | pdf-compression-real-test-results | compress-pdf-without-losing-quality; pdf-file-size-too-large |
| PDF to Image | convert-pdf-to-jpg-free | convert-pdf-to-png-free |
| JPG to PDF | how-to-convert-jpg-to-pdf | how-to-combine-pdf-and-images |
| Rotate | how-to-rotate-pdf | None needed |
| Watermark | how-to-add-watermark-to-pdf | pdf-security-guide |
| Delete Pages | how-to-extract-pages-from-pdf | how-to-edit-pdf-free |
| Page Numbers | best-free-pdf-tools-online | how-to-edit-pdf-free |
| Reorder | how-to-merge-pdf-free | how-to-extract-pages-from-pdf |
| Grayscale | pdf-file-size-too-large | compress-pdf-without-losing-quality |
| Protect | how-to-add-password-to-pdf-online | pdf-security-guide |
| Unlock | how-to-remove-password-from-pdf | why-is-my-pdf-locked |

Related tool recommendations now have an explicit task mapping, one or two per tool, plus a path back to all tools. Examples: Merge -> Reorder/Split; Protect -> Unlock; Grayscale -> Compress. These reciprocal choices serve distinct next actions rather than an arbitrary recommendation loop. All existing article-to-tool links remain; every article has a main-content path to a supported tool. The full tools overview deliberately retains its comprehensive 13-tool list.

## Contextual additions and copy reduction

Only three article sources gain links, with no prose, metadata or FAQ rewrites:

- Core merge: iPhone file handling in the phone section; Windows and Mac workflows beside next operations.
- File-size diagnostic: compression/quality guide beside the rasterization warning.
- Security guide: password workflow and Mac preparation beside distribution guidance.

The homepage adds security guidance and a public How It Works category entry. It describes page operations/rendering rather than vaguely promising PDF editing. It explicitly excludes existing-text editing, OCR and PDF-to-Word conversion. The old 'Latest' guide label is replaced with task-oriented wording without inventing dates.

The article CTA removes the repeated free/local/no-account marketing sentence. Its existing accessible helper-text color now carries a useful link to processing limits/troubleshooting. Button labels distinguish opening a tool from browsing the tool index. Article-specific CTA headings and task-specific warnings remain.

A source-string repetition scan across the 31 article files found zero cross-article exact strings of 16 or more words. This is not proof of semantic originality: shorter repetitions, paraphrases and homepage/shared claims still need editorial judgment. Shared navigational text is intentional. No broad content rewrite was performed.

## Discovery gate and journeys

`batch8-navigation-after.json` records the final main-content and full-site link graphs. There are no unreachable articles/tools, no public pages with zero incoming links including global navigation, and no broken/removed/redirect-dependent/Lab internal links.

Index-only article discovery changes from six to three:

- Adobe alternative: sufficient discovery within the six-guide workflow-decision category; no unrelated tool endorsement link added.
- Smallpdf alternative: the same intentional decision category; its protected source remains byte-identical.
- Troubleshooting: prominent technical-guide entry and the three-guide How It Works category. Article helper links lead directly to that category. A universal troubleshooting link on every tool was replaced by specific help, not by removing the troubleshooting page.

The five requested journeys pass against exported main-content anchors: home/Merge/core guide/Windows; home/Compress/quality; home/Protect/security/password; home/PDF-to-Image/PNG; blog/PDF-vs-Word/editing. JPG is also directly available from PDF-to-Image. This is static-export navigation verification, not actual browser clicking.

## Verification and scope

Focused tests independently declare primary/secondary editorial relationships, inspect rendered category/guide blocks, traverse the graph from home, require guide-to-tool paths and check fragments and labels. Ten in-memory mutations reject removed URLs, redirects, Lab links/publication, broken targets, orphaned discovery, unrelated primary/secondary guides, empty anchors and broken category fragments.

The existing content-integrity test now checks the approved contextual guide list instead of requiring the removed blanket help links; no metadata, schema, link or route checks were removed. The new focused suite independently checks relevance, cardinality and rendered agreement rather than trusting the configuration alone.

Inventory remains 31 articles / 13 tools / 50 indexable routes / 19 redirects. The 321 evidence paths, catalog, redirects, sitemap, tool handlers, processing libraries and protected article sources remain byte-identical against the pre-Batch 8 hash checkpoint. Protected pages receive only the shared navigation presentation changes. No title/H1/canonical/date change is intended or required.

Browser/mobile visual behavior and a full accessibility audit remain NOT TESTED. Native link semantics and logical index headings were inspected; this is not accessibility certification. Next action: independent final site-wide audit, including real-browser navigation/responsiveness and remaining repetition/trust/claim issues, before deployment or AdSense resubmission.
