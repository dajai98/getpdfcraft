# Batch 5: capability and low-value decisions

Date: 2026-10-21. Branch main; HEAD 6ccfbe45fbe6e671cd968a1e5bbe692aac736dc4.
Existing uncommitted work was the baseline. No product change, evidence collection,
commit, deployment or Lab publication is authorized by this report.

## Independent roles and evidence

Three separate agents inspected independently before the lead reconciled findings.
The lead acted as the fourth, red-team role; decisions were not a majority vote.

- Capability agent read all 13 production handlers and relevant helpers. None
  generates DOC/DOCX or XLS/XLSX, extracts spreadsheet tables, performs OCR,
  creates electronic/certificate signatures or signature fields. Watermark/page
  numbering draw text; Protect encrypts; PDF-to-Image renders pixels. Those are
  not equivalent capabilities. Current candidate disclosures and CTAs were
  honest; retirement is not based on alleging a nonexistent deceptive claim.
- Content agent read all five pages without traffic data and compared the edit,
  security, tools, Adobe and Windows guides. Word repeats three step bodies
  twice; Excel repeats three step bodies three times. Their FAQ answers overlap.
  The elementary PDF page is generic definition/features/use-case material.
  Signing repeats limitations already better located in the security guide.
  PDF-versus-Word has an independent source-versus-delivery decision worth a
  bounded rewrite.
- SEO agent read the original Search Console ZIP directly, plus catalog, source
  hrefs, rendered hrefs, sitemap and redirects. No backlink inventory is supplied.
- Lead rejected convenient redirects where a reader's requested conversion or
  format-explanation intent would not be fulfilled. Honest disclaimers alone
  do not justify keeping repetitive keyword-oriented pages indexed.

Capability evidence: app/tools has exactly 13 page handlers. Merge/Split/Reorder/
Delete use PDF copying; Rotate changes rotation; Watermark/Page Numbers draw
text; Compress saves object streams; image tools render/embed image formats;
Grayscale rasterizes; Protect/Unlock use qpdf encryption/decryption.
The four page-copy tools reject AcroForm input. Dependencies alone were not
treated as exposed product capabilities.

## Search Console baseline

Source: getpdfcraft.com-Performance-on-Search-2026-10-19.zip.
SHA-256: 2126636b7c85bc1aa691e8d062c782cc7c67cc2b51830a083836c6423cbb08c9.
Filters: Web (text-based), Last 28 days. Chart dates: September 19-October 16, 2026.

| Page | Pages.csv | Clicks / impressions / CTR / position |
|---|---|---|
| what-is-pdf | NOT PRESENT IN EXPORTED PAGE DATA | Unavailable |
| pdf-vs-word-which-is-better | NOT PRESENT IN EXPORTED PAGE DATA | Unavailable |
| pdf-to-word-free | NOT PRESENT IN EXPORTED PAGE DATA | Unavailable |
| how-to-convert-pdf-to-excel | NOT PRESENT IN EXPORTED PAGE DATA | Unavailable |
| how-to-sign-pdf-free | NOT PRESENT IN EXPORTED PAGE DATA | Unavailable |

Absence is not zero traffic and was not the deletion rationale. No directly
relevant non-brand query was present for these five topics. The branded query
"what is pdfcraft" has 0 clicks / 33 impressions / 0% CTR / position 9.21;
it cannot be assigned to the generic PDF article. Page and query aggregates
are not page-query pairings. Ranking/backlink consequences remain uncertain.

Each candidate had a catalog-generated blog-index link. PDF-versus-Word also
has a homepage card, which remains unchanged. No other live exact incoming
hrefs to these candidates were found. The nested WhatsApp redirect beneath
pdf-vs-word-which-is-better is a separate URL and stays untouched.

## Lead reconciliation

| Page | Capability verdict | Content verdict | SEO verdict | Conflict | Final decision | Reason |
|---|---|---|---|---|---|---|
| what-is-pdf | Format explanation, no fake tool claim | Generic; no independent product-specific result | No equivalent current destination | Definition could fit format comparison, but would not preserve full source intent | REMOVE / NOINDEX: remove route, no redirect | Do not build a large replacement encyclopedia page just to retain the URL |
| pdf-vs-word-which-is-better | No conversion capability | Distinct handoff decision, weak old execution | Retain URL; no demonstrated traffic strength | None after bounded rewrite | KEEP / DIFFERENTIATE | Working version versus delivery copy, concrete report/appendix example, recipient requirements |
| pdf-to-word-free | Explicitly denies conversion | Duplicated options, no actual converter procedure | SEO agent considered edit-guide redirect possible with a transfer | Content agent says editing guide does not fulfill Word-conversion intent; lead agrees | REMOVE / NOINDEX: remove route, no redirect | Generic recovery advice does not justify a conversion landing page or forced editing redirect |
| how-to-convert-pdf-to-excel | Explicitly denies table extraction/OCR/export | Three repeated alternatives; no worked extraction | No spreadsheet destination | None | REMOVE / NOINDEX: remove route, no redirect | Avoid pretending page editing or rendering satisfies table recovery |
| how-to-sign-pdf-free | Explicitly denies signing | Useful requirements/preparation advice overlaps security | Conditional security-guide fit | Destination cannot perform signing; source did not either | MERGE / REDIRECT | Preserve actual advisory intent in security guide, never imply operational signing |

Content-decision confidence: high for elementary PDF/Word/Excel retirement,
moderate-high for signing consolidation, moderate for retained format guide.
No claim of predicted ranking or AdSense approval follows.

## Removed-source mapping and risk

| Source | Destination | Useful intent preserved | Fit | Risk |
|---|---|---|---|---|
| what-is-pdf | None; route removed | No equivalent successor promised | Homepage/tool/format-comparison redirects rejected | HIGH for forced redirect; removal visibility/backlink risk unmeasured |
| pdf-to-word-free | None; route removed | No equivalent conversion successor promised | Editing guide rejected as insufficient | HIGH for unrelated redirect; removal visibility/backlink risk unmeasured |
| how-to-convert-pdf-to-excel | None; route removed | No spreadsheet-recovery successor promised | No valid current destination | HIGH for unrelated redirect; removal visibility/backlink risk unmeasured |
| how-to-sign-pdf-free | /blog/pdf-security-guide | Recipient method, finalize unsigned copy, verify returned file, watermark/password are not signing | Actual source advisory intent only | MODERATE; no signing execution is supplied |

The first three use removal, not an indexable noindex landing page. There is
no redirect rule for them. Their source/export/catalog/sitemap entries are absent.
Hosting must serve the normal 404 response for those URLs after a separately
authorized deployment; local static artifacts cannot prove live HTTP behavior.
The signing redirect is a direct 301. No homepage/tools funnel is introduced.

## Implementation and low-value review

PDF-versus-Word retains title/H1/slug/canonical/OG/date. Four sections and four
focused FAQs replace broad feature-table padding. Its purpose is immediately
clear: choose the working and delivery artifacts before using page tools. The
report example makes revision -> export -> assembly concrete. It earns a URL
without search traffic and does not duplicate a converter tutorial. The
independent content agent graded the result ADEQUATE, not STRONG.

Microsoft's official opening-PDFs-in-Word documentation was checked on
2026-10-21: https://support.microsoft.com/en-us/word/opening-pdfs-in-word.
It describes conversion of a copy with possible layout differences, not
PDFcraft behavior or local execution. No vendor pricing or test result is added.

The security guide receives one paragraph only: ask which signing method is
required, finalize an unsigned copy first, verify the returned signature status
and recipient acceptance, and do not substitute password/watermark. No generic
converter scaffolding, free-tool roundup or legal-validity claim is transferred.
Its existing title, date, metadata and other sections remain unchanged.

Capability and content agents independently reviewed the implemented survivor
and transfer and found no new misleading capability or content defect.

## Validation contract and protected scope

Expected inventory is derived from four removed article routes and one new
redirect: 31 articles, 13 tools, 50 indexable routes, 19 redirect rules.
Catalog removal also removes the generated index links. The homepage link to
the surviving format guide stays valid and unchanged.

Focused tests check removal/routing, exact direct redirect, absence of forced
redirects, source/export capability assertions, adversarial variants,
source/rendered section meaning, metadata/date invariants and FAQ/schema parity.
Prior content and Batch 4B suite inventory assertions are updated for these
explicit decisions; their substantive checks are preserved. The former
unsupported-converter-page disclosure check now covers retained format/security
guides; focused tests assert that all retired converter routes are absent.

Existing 321 evidence-directory paths, closed differentiated/protected pages,
product/shared code and all unrelated files are checked against pre-Batch-5
SHA-256 values. The only destination content change is the bounded security
paragraph. No Lab route or links are added.

Strongest remaining risk: truthful page-by-page improvements do not themselves
establish site-wide originality or approval readiness. Final navigation/site-wide
audit should assess overlap, headings/CTAs, orphan/removed URLs, legal/trust pages
and the complete rendered experience. Next action is that audit, not AdSense
resubmission. Browser/download and live hosting behavior remain separate checks;
no deployment or approval prediction is made here.
