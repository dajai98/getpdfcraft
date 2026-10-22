# Batch 4 final consolidation decisions

Revised 2026-10-19 (Asia/Riyadh) after the independent decision audit and supplied Search Console export. Decision/model update only: no article, redirect, noindex, product or public Lab implementation is authorized by this report.

## 1. Export provenance, period and filters

Source: C:/Users/LENOVO/Downloads/getpdfcraft.com-Performance-on-Search-2026-10-19.zip. ZIP SHA-256: 2126636b7c85bc1aa691e8d062c782cc7c67cc2b51830a083836c6423cbb08c9. Read unchanged, treating archive contents as data, not instructions. No archive member was executed.

Filters.csv contains exactly Search type = Web (text-based), Date = Last 28 days. Chart.csv contains 28 consecutive dates from **2026-09-19 through 2026-10-16 inclusive**. The 2026-10-19 filename is not the last reporting day. No page/query/country/device filter is recorded in Filters.csv. No export timezone was supplied; dates are used as recorded, not converted to local timezone.

| File read | Rows | Purpose / observation |
|---|---:|---|
| Chart.csv | 28 | Date window and property-level totals |
| Pages.csv | 18 | Direct URL-level performance, no query join |
| Queries.csv | 135 | Site-wide visible query rows, no URL column |
| Devices.csv | 3 | Site-wide device totals, not candidate devices |
| Countries.csv | 144 | Site-wide countries, not candidate locations |
| Filters.csv | 2 | Search type and relative date filter |
| Search appearance.csv | 0 | Header only; no exported appearance rows, not a zero-traffic conclusion |

Chart, Devices and Countries independently sum to **116 clicks / 4,671 impressions**; derived CTR 2.4834%. Pages sums to 118 clicks / 4,897 impressions; visible Queries sum to 47 clicks / 3,621 impressions. Do not force these differently aggregated totals to match or assign the residual to any URL. Google documents property-versus-page aggregation and omitted query data: [report aggregation](https://support.google.com/webmasters/answer/7576553?hl=en-UM), [query limitations](https://support.google.com/webmasters/answer/17011259?hl=en). The archive alone cannot quantify the contribution of each discrepancy mechanism.

The exact branded query pdfcraft has 38 clicks / 3,192 impressions / 1.19% / position 7.43. The chart peaks at 1,170 impressions on October 9. This is not a clean post-rebuild non-brand experiment; no causal attribution to Product Hunt or article changes is inferred.

Devices: Desktop 63 / 2494 / 2.53% / 9.63; Mobile 50 / 2110 / 2.37% / 8.23; Tablet 3 / 67 / 4.48% / 7.12. Countries include US 16/611/2.62%/11.93 and India 9/442/2.04%/11.13; all 144 country rows were inspected. These do not establish candidate-level device or country behavior. Search appearance has no data rows; do not infer absence of AI/rich-result visibility.

The previous statement that no Search Console export exists is superseded. Remaining unavailable evidence: page-query joins, candidate-specific device/country rows, backlinks/referring domains, URL Inspection/index status/selected canonical, and a comparable longer-period trend. An absent URL means **NOT PRESENT IN EXPORTED PAGE DATA**, not zero clicks/impressions or deindexing. No full hidden-query coverage is claimed.

## 2. Direct page evidence

Numbers are clicks / impressions / CTR / average position, copied exactly. Match exact canonical URL, never assign rows by slug similarity.

| Candidate URL | Exported metrics |
|---|---|
| https://getpdfcraft.com/blog/ilovepdf-alternative | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/adobe-acrobat-alternative-free | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/merge-pdf-on-android | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/compress-pdf-for-whatsapp | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/how-to-compress-pdf-for-email | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/split-pdf-into-two | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/convert-pdf-to-png-free | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/how-to-merge-pdf-on-mac | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/how-to-merge-pdf-on-windows | 0 / 13 / 0% / 6.31 |
| https://getpdfcraft.com/blog/how-to-compress-pdf-on-iphone | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/reduce-pdf-size-without-software | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/how-to-encrypt-pdf-files-free | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/how-to-lock-pdf-for-job-applications | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/how-to-lock-pdf-without-adobe | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/password-protect-pdf-on-android | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/lock-pdf-on-iphone | NOT PRESENT IN EXPORTED PAGE DATA |
| https://getpdfcraft.com/blog/secure-pdf-on-mac | NOT PRESENT IN EXPORTED PAGE DATA |

Only Windows merge is present among these 17 candidates. Its new 28-day metrics supersede 0/3/7.0 for this decision; the older Oct 3-9 figures describe a different window and cannot establish a trend by direct subtraction.

Protected-page metrics (not Batch 4 candidate evidence):

| URL | Clicks / impressions / CTR / position |
|---|---|
| /blog/merge-pdf-on-iphone | 12 / 158 / 7.59% / 18.34 |
| /blog/why-is-my-pdf-locked | 5 / 222 / 2.25% / 7.35 |
| /blog/smallpdf-alternative | 0 / 31 / 0% / 6.45 |
| /tools/pdf-to-image | 2 / 32 / 6.25% / 5.5 |

Destination core merge: 1 / 44 / 2.27% / 14.8. Destination size diagnosis: 0 / 3 / 0% / 47.33. Other proposed destinations are not present in exported page rows. Low/absent destination visibility does not reverse the source-code evidence of stronger content. The historical redirected /blog/how-to-make-pdf-smaller is present at 0/15/0%/1.67; do not recreate it or redirect from this performance record. The HTTP homepage row is separate from HTTPS in the raw export; neither was altered.

## 3. Query clusters: site-wide only

No Queries.csv row has a URL column. None can be assigned directly to a candidate. In particular, iPhone merge page clicks cannot be reconciled to visible iPhone query rows by guessing a join.

| Cluster | Visible query evidence | Interpretation |
|---|---|---|
| iPhone/iOS merge or combine | 26 rows; 0 clicks; 61 impressions | Real site-wide device/task demand, not attribution to Android, compression or security pages. |
| Other merge/combine | 15 rows; 0 clicks; 22 impressions | Includes general merge plus four rotate/merge variants; no Windows, Android or Mac terms. |
| Compression: compress, reduce-PDF-size, email, WhatsApp, without software | No matching exported rows | No evidence in export, not proof of no demand. |
| Security: password, encrypt, lock-PDF, secure-PDF | No matching exported rows | No candidate attribution or proof of no demand. |
| PNG / JPG / PDF-to-image | No PNG/JPG or exact PDF-to-image query; adjacent split pdf to images: 0/1/0%/100 | Adjacent intent only, not PNG/JPG page evidence. |
| Competitor alternatives | smallpdf alternative free: 0/2/0%/8.5; smallpdf alternative: 0/1/0%/19 | Protected Smallpdf subject, not iLovePDF or Adobe evidence. |
| Windows / Android / Mac | No explicit matching query rows | No observed native/offline Windows query. General merge queries are hypotheses for Windows only. |

Visible merge-query detail for reproducibility (all site-wide):

| Query | Clicks | Impressions | CTR | Position |
|---|---:|---:|---|---:|
| merge pdf iphone | 0 | 21 | 0% | 24.05 |
| how to combine pdf files on iphone for free | 0 | 6 | 0% | 35.17 |
| combine pdf iphone | 0 | 5 | 0% | 64.4 |
| combine pdf free online | 0 | 3 | 0% | 15 |
| how to merge pdf files free | 0 | 3 | 0% | 15.67 |
| combining multiple pdf into one | 0 | 3 | 0% | 30.67 |
| combine pdfs on iphone | 0 | 3 | 0% | 54 |
| combining a pdf | 0 | 2 | 0% | 12.5 |
| how to merge pdf on iphone | 0 | 2 | 0% | 31 |
| merge pdfs on iphone | 0 | 2 | 0% | 36 |
| how to combine pdf on iphone | 0 | 2 | 0% | 59 |
| how to merge files together on iphone | 0 | 2 | 0% | 68.5 |
| merge pdf online free unlimited | 0 | 1 | 0% | 9 |
| merge pdfs in iphone | 0 | 1 | 0% | 11 |
| merge pdf files free no sign up | 0 | 1 | 0% | 18 |
| merge pdf files free online | 0 | 1 | 0% | 26 |
| how to combine pdf files free | 0 | 1 | 0% | 30 |
| how to combine pdf in iphone | 0 | 1 | 0% | 30 |
| how to merge pdf files in iphone | 0 | 1 | 0% | 30 |
| how to merge pdfs on iphone | 0 | 1 | 0% | 30 |
| combine pdf on iphone | 0 | 1 | 0% | 31 |
| how to merge pdf files on iphone | 0 | 1 | 0% | 33 |
| combine files on iphone | 0 | 1 | 0% | 35 |
| how to combine pdfs on iphone | 0 | 1 | 0% | 39 |
| can i combine files on iphone | 0 | 1 | 0% | 53 |
| combine pdf files iphone | 0 | 1 | 0% | 59 |
| ios merge pdf | 0 | 1 | 0% | 59 |
| merge pdf on iphone | 0 | 1 | 0% | 60 |
| combine pdfs iphone | 0 | 1 | 0% | 61 |
| how to combine pdf files on iphone | 0 | 1 | 0% | 61 |
| how to combine two pdfs on iphone | 0 | 1 | 0% | 61 |
| how to combine pdf files iphone | 0 | 1 | 0% | 62 |
| how to combine files into one pdf on iphone | 0 | 1 | 0% | 63 |
| pdf merge free no sign-up | 0 | 1 | 0% | 64 |
| combine pdf files on iphone | 0 | 1 | 0% | 65 |
| merge pdfs free no sign up | 0 | 1 | 0% | 66 |
| free pdf merge no sign up | 0 | 1 | 0% | 73 |
| pdf merger free no sign up | 0 | 1 | 0% | 80 |
| rotate and combine pdf | 0 | 1 | 0% | 86 |
| pdf rotate and merge | 0 | 1 | 0% | 90 |
| rotate and merge pdf | 0 | 1 | 0% | 96 |

The branded pdfcraft ios row (1/4/25%/3.5) and generic iOS availability questions are not non-brand operation evidence. No competitor capability/pricing assertions or platform-compatibility claims are derived from query text.

## 4. Revised decision rule and final matrix

The independent audit rejected the original blanket external-data gate. Strong content redundancy and adequate destination intent can justify MERGE recommendations despite unknown traffic; absence alone cannot. Search visibility also is not automatic protection. All MERGE entries below require useful-detail transfer and separate implementation review before redirects. Risk is editorial judgment, not a numerical ranking-loss forecast.

All source/destination slugs are /blog/<slug>. NP = NOT PRESENT IN EXPORTED PAGE DATA; metrics are unavailable, not zero.

| Source | Destination | GSC page evidence | Query evidence | Overlap | Current unique value | Final decision | Reason |
|---|---|---|---|---|---|---|---|
| ilovepdf-alternative | best-free-pdf-tools-online | NP | No iLovePDF query in export; only Smallpdf alternative queries, not transferable. | PARTIAL | Competitor-specific replacement selection; current content mostly inventories PDFcraft. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |
| adobe-acrobat-alternative-free | best-free-pdf-tools-online | NP | No Adobe/Acrobat query in export. | PARTIAL | Replacing Acrobat for a bounded task differs from a generic tool directory; current comparison is thin. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |
| merge-pdf-on-android | how-to-merge-pdf-free | NP | Site-wide merge/combine demand exists; no Android query. iPhone demand is not Android evidence. | HIGH | Generic file-picker, download and cloud-transfer advice; no verified Android-specific troubleshooting. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| compress-pdf-for-whatsapp | pdf-file-size-too-large | NP | No compression, WhatsApp or email queries in exported rows. | PARTIAL | Source distinguishes a size problem from a messaging-send problem; destination primarily diagnoses PDF size. | HOLD - MORE EVIDENCE REQUIRED | Resolve delivery-intent coverage, not merely missing traffic. |
| how-to-compress-pdf-for-email | pdf-file-size-too-large | NP | No compression/email query in export. | HIGH | Sending/receiving requirements and 1MB limitation are useful but fit the destination. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| split-pdf-into-two | how-to-split-pdf-online | NP | Site-wide rotate-and-split and split-to-images rows are adjacent intents, not evidence for this source. | HIGH | Even/odd boundaries, one-page limitation and no-gap/no-overlap checks are examples within range splitting. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| convert-pdf-to-png-free | convert-pdf-to-jpg-free | NP | No PNG/JPG query; only adjacent split pdf to images. Protected image tool page metrics cannot be assigned here. | PARTIAL | PNG is actually supported; PNG selection and background/raster behavior are distinct from a JPG-led guide. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |
| how-to-merge-pdf-on-mac | how-to-merge-pdf-free | NP | No Mac query in export; general merge queries are site-wide only. | PARTIAL | Native Preview/Finder options are genuinely different from the browser-only destination; instructions need repair. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |
| how-to-merge-pdf-on-windows | how-to-merge-pdf-free | 0 / 13 / 0% / 6.31 | General merge queries are plausible hypotheses only; zero exported Windows/native/offline query rows. No page-query join exists. | HIGH | Print-jobs-versus-merge distinction and browser-versus-offline decision have potential; current page is not sufficiently specific. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |
| how-to-compress-pdf-on-iphone | compress-pdf-without-losing-quality | NP | No compression/iPhone-compression query. iPhone merge cluster is a different task and cannot be transferred. | HIGH | Generic Files/download guidance and one-file-at-a-time FAQ do not form a verified iOS-specific compression procedure. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| reduce-pdf-size-without-software | pdf-file-size-too-large | NP | No reduce-size/without-software query. Destination has direct page evidence of 0 clicks/3 impressions; not source evidence. | HIGH | Only no-install-versus-offline framing materially extends the stronger diagnostic destination. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| how-to-encrypt-pdf-files-free | how-to-add-password-to-pdf-online | NP | No password/encrypt/lock/secure query in export. | HIGH | AES/password/permissions/compliance caveats largely overlap the primary protection guide. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| how-to-lock-pdf-for-job-applications | how-to-secure-pdf-before-sending-email | NP | No security/job-application query in export. | PARTIAL | Employer/portal acceptance, requested format and minimum necessary documents differ from general email security. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |
| how-to-lock-pdf-without-adobe | how-to-add-password-to-pdf-online | NP | No Adobe or security query in export. | HIGH | Without-Adobe is largely a keyword wrapper around the same Protect operation. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| password-protect-pdf-on-android | how-to-add-password-to-pdf-online | NP | No Android/security query in export. | HIGH | Generic Drive/download/share text and unsupported device compatibility framing, not verified Android value. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| lock-pdf-on-iphone | how-to-add-password-to-pdf-online | NP | No iPhone-security query. Protected iPhone merge page metrics and merge queries do not establish security demand. | HIGH | Generic Files/iCloud/share instructions; storage FAQ does not answer storage usage directly. | MERGE | Stronger destination can absorb small useful details; export does not materially contradict the editorial merge case. |
| secure-pdf-on-mac | how-to-add-password-to-pdf-online | NP | No Mac/security query in export. | PARTIAL | Preview password workflow and native/offline choice are distinct from the PDFcraft-only guide. | DIFFERENTIATE | Distinct task can justify a URL, but current differentiation needs the specified work. |

**Totals: KEEP 0; DIFFERENTIATE 7; MERGE 9; HOLD 1.** These are decisions for review, not implemented URL changes.

## 5. Windows merge: final recommendation

**DIFFERENTIATE; KEEP INDEXED.** Direct evidence is 0 clicks / 13 impressions / 0% / position 6.31. Thirteen impressions are not a proven winner, and average position is not a stable rank for a known query. Nevertheless, a visible URL creates avoidable redirect risk while a concrete Windows workflow can be improved.

General queries such as combine pdf free online (0/3/15.0), how to merge pdf files free (0/3/15.67), and merge pdf files free online (0/1/26.0) could plausibly be involved, but this is a hypothesis only. Their positions cannot be used to identify which URL ranked. No Windows/native/offline query appears. Request a URL-filtered Queries export to refine targeting, but this recommendation does not remain HOLD waiting for it.

Current quality alone is insufficient: the page repeats generic browser instructions and declines to establish built-in/Word capabilities. Minimum improvement is a verified Windows browser selection/download/reopen workflow, specific print-versus-merge explanation, and accurately sourced browser-versus-installed/offline choice. Record tested versions. Do not invent a Windows native merger or infer compatibility from GSC visibility. If that concrete improvement cannot be delivered, reconsider consolidation after transferring the print/offline distinction.

## 6. Nine prior MERGE recommendations re-tested

All nine are NP in Pages.csv. This supplies no zero-traffic finding. Their MERGE decisions survive because the content comparison remains strong, not because they are absent.

| Source | Redundancy / destination adequacy | Relevant query evidence | Ranking risk | Useful details required before redirect | Final decision |
|---|---|---|---|---|---|
| merge-pdf-on-android | Generic file-picker, download and cloud-transfer advice; no verified Android-specific troubleshooting. | Site-wide merge/combine demand exists; no Android query. iPhone demand is not Android evidence. | MEDIUM-HIGH; device demand is plausible but this URL is absent; no measured Android loss estimate. | Transfer concise mobile selection/download/cloud-transfer caveats into the core guide without asserting tested Android compatibility. Core insertion-order, navigation and failure guidance is stronger. | MERGE |
| how-to-compress-pdf-for-email | Sending/receiving requirements and 1MB limitation are useful but fit the destination. | No compression/email query in export. | MEDIUM; no source metrics, not zero traffic. | Transfer sender-and-recipient requirements and explicit no-1MB-target guidance. Destination already covers size decisions, re-export, separate ranges and sharing-link access. | MERGE |
| split-pdf-into-two | Even/odd boundaries, one-page limitation and no-gap/no-overlap checks are examples within range splitting. | Site-wide rotate-and-split and split-to-images rows are adjacent intents, not evidence for this source. | MEDIUM; source query/backlink value unknown. | Preserve one even/odd boundary example, physical-page indexing and one-page impossibility. Stronger destination already covers range outputs and navigation cleanup. | MERGE |
| how-to-compress-pdf-on-iphone | Generic Files/download guidance and one-file-at-a-time FAQ do not form a verified iOS-specific compression procedure. | No compression/iPhone-compression query. iPhone merge cluster is a different task and cannot be transferred. | MEDIUM-HIGH; device-specific demand can exist, but none is attributable to this task/URL here. | Retain sequential processing, configurable output-location and cloud-input caveats; remove assumptions of universal Files behavior. Destination explains actual compressor, quality limits and measured outcomes better. | MERGE |
| reduce-pdf-size-without-software | Only no-install-versus-offline framing materially extends the stronger diagnostic destination. | No reduce-size/without-software query. Destination has direct page evidence of 0 clicks/3 impressions; not source evidence. | MEDIUM; absent source metrics do not establish no ranking/backlink value. | Retain no-install versus offline distinction. Do not duplicate the shared structural-compression, extraction, re-export and grayscale guidance. Update incoming grayscale-tool guide link in later implementation. | MERGE |
| how-to-encrypt-pdf-files-free | AES/password/permissions/compliance caveats largely overlap the primary protection guide. | No password/encrypt/lock/secure query in export. | MEDIUM; encryption-specific search intent is possible but current treatment is redundant. | Preserve compact algorithm-versus-password-strength and no-compliance-guarantee clarification where missing. Update incoming Protect tool guide link later. Four source workflow step bodies also match without-Adobe exactly. | MERGE |
| how-to-lock-pdf-without-adobe | Without-Adobe is largely a keyword wrapper around the same Protect operation. | No Adobe or security query in export. | MEDIUM; no direct performance contradicts consolidation, but absence is not proof of zero traffic. | Preserve no Adobe/account requirement, one-file processing and any concise runtime/confirmation troubleshooting missing from destination. No new competitor feature claims. | MERGE |
| password-protect-pdf-on-android | Generic Drive/download/share text and unsupported device compatibility framing, not verified Android value. | No Android/security query in export. | MEDIUM; unknown traffic/backlinks and possible device demand remain risks. | Keep accurate conditional file-picker/download/cloud-transfer guidance; do not transfer security-stamp overclaim. Core guide already covers encryption, confirmation, runtime and permissions. | MERGE |
| lock-pdf-on-iphone | Generic Files/iCloud/share instructions; storage FAQ does not answer storage usage directly. | No iPhone-security query. Protected iPhone merge page metrics and merge queries do not establish security demand. | MEDIUM-HIGH; distinct device demand is plausible, but current page is redundant and untested. | Transfer only accurate useful file-access/save guidance; clarify that chosen cloud storage is separate from local processing. Do not preserve untested exact picker behavior or unrelated FAQ answer. | MERGE |

No assertion of safe or guaranteed ranking retention is made. Review any newly available backlinks/query evidence before implementation; contradictory evidence can change a decision, but missing data alone is not an indefinite veto. No redirect is implemented here.

## 7. Differentiation and interim indexability

Recommendations only; no robots/meta changes. NOINDEX UNTIL DIFFERENTIATED would intentionally remove search eligibility and requires a separately reviewed implementation; it is not a traffic-neutral action or an AdSense remedy. KEEP INDEXED is temporary through an assigned correction milestone, not acceptance of indefinite weak content.

| Source | Unique intent | Minimum improvement / evidence | Interim recommendation |
|---|---|---|---|
| ilovepdf-alternative | Competitor-specific replacement selection; current content mostly inventories PDFcraft. | A dated comparison of a few defined tasks, supported by primary vendor sources and representative workflow checks; assign a maintenance owner. A keyword alone does not justify this page. | NOINDEX UNTIL DIFFERENTIATED |
| adobe-acrobat-alternative-free | Replacing Acrobat for a bounded task differs from a generic tool directory; current comparison is thin. | Separate assembly from editing/OCR/signing needs with dated edition-specific primary sources and bounded workflow evidence. No price/equivalence claims without support. | NOINDEX UNTIL DIFFERENTIATED |
| convert-pdf-to-png-free | PNG is actually supported; PNG selection and background/raster behavior are distinct from a JPG-led guide. | Remove repeated explanations and original-image-extraction ambiguity. Add controlled PNG/JPG text/diagram examples, actual pixel dimensions and inspected background behavior without promising transparency. | KEEP INDEXED |
| how-to-merge-pdf-on-mac | Native Preview/Finder options are genuinely different from the browser-only destination; instructions need repair. | Replace misplaced PDFcraft instructions inside Preview steps. Use dated Apple documentation plus recorded macOS/Preview/Finder checks for selection, ordering, saving and original-file handling. | KEEP INDEXED |
| how-to-merge-pdf-on-windows | Print-jobs-versus-merge distinction and browser-versus-offline decision have potential; current page is not sufficiently specific. | Build a concise Windows browser workflow with verified picker/multiselect/download/reopen behavior, explain separate print jobs, and distinguish installed/offline options only with primary documentation and tests. Record browser/OS versions; do not invent native features. | KEEP INDEXED |
| how-to-lock-pdf-for-job-applications | Employer/portal acceptance, requested format and minimum necessary documents differ from general email security. | Replace repeated document-type blocks with recipient requirements, encryption acceptance, format/naming, necessary-document and portal-rejection decisions. Source any employer/portal-specific rules; do not invent ATS behavior. | KEEP INDEXED |
| secure-pdf-on-mac | Preview password workflow and native/offline choice are distinct from the PDFcraft-only guide. | Use current Apple guidance and a recorded Preview save/reopen/password test. Distinguish native settings from PDFcraft AES/user-owner options; do not infer encryption algorithm or universal viewer compatibility. | KEEP INDEXED |

Mac native distinctions are supported by Apple documentation for [Preview merging](https://support.apple.com/en-ie/guide/preview/prvw43696/mac), [Finder PDF creation](https://support.apple.com/en-ie/guide/mac-help/mchl21ac2368/27/mac/27) and [Preview password protection](https://support.apple.com/en-ie/guide/preview/prvw587dd90f/mac), checked during the preceding audit. They are not local execution evidence. PNG support is directly visible in app/tools/pdf-to-image/page.js (jpeg/png selector and image-format encoding). A redirect to the existing JPG-led guide is not approved.

## 8. Remaining HOLD and low-value risks

Only compress-pdf-for-whatsapp remains HOLD - MORE EVIDENCE REQUIRED. The specific uncertainty is whether messaging failure/delivery requirements merit a distinct tested guide, or whether generic size diagnosis plus a brief non-size-error warning is enough. Resolve with current provider guidance and a documented workflow, not another generic disclaimer. A page-filtered query export is useful but not the sole gate. Keep its current indexability during that bounded review.

Strongest low-value risks remain the nine redundant wrappers, thin unsourced competitor comparisons, repeated platform instructions and FAQs, misplaced PDFcraft text inside Preview instructions, the PNG original-graphic-extraction ambiguity, the Android security-stamp label, the iCloud-storage non-answer, and repeated job-document advice. These observations are not new edits and do not reopen product behavior. Semantic duplication is supported; measured ranking cannibalization is still unproven without page-query/time joins.

## 9. Changes from earlier recommendations

Initial report: 0 KEEP / 5 DIFFERENTIATE / 0 MERGE / 12 HOLD. Independent audit: 0 / 6 / 9 / 2. Final with this export: 0 / 7 / 9 / 1.

Nine original HOLDs become MERGE based on editorial redundancy, unchanged by the new export. Mac protection moves from initial HOLD to DIFFERENTIATE for native intent, as the audit recommended. Windows moves from audit HOLD to DIFFERENTIATE because direct current visibility plus a concrete platform-improvement path favors improving this URL over redirecting it. WhatsApp remains the one coverage-based HOLD. The original five DIFFERENTIATE recommendations remain, with explicit interim indexability. No protected-page evidence was transferred to other URLs.

## 10. Retained source inventory and internal links

The following metadata/date/depth/link/FAQ inventory is retained from the inspected source and export because those files remain byte-identical. Decisions above supersede the original HOLD classifications. Counts are editorial-string word counts, not quality scores. Dates are existing labels and not verified publication times; no dates are repaired here. Internal incoming routes are not external backlinks.

### ilovepdf-alternative

- Source: app/blog/ilovepdf-alternative/page.js
- Destination: app/blog/best-free-pdf-tools-online/page.js
- Current URL: https://getpdfcraft.com/blog/ilovepdf-alternative
- Export title: An iLovePDF Alternative for Local PDF Workflows | PDFcraft
- H1: An iLovePDF Alternative for Local PDF Workflows
- Canonical: https://getpdfcraft.com/blog/ilovepdf-alternative
- Article date: February 1, 2026; listing date: Feb 1, 2026; updated: not separately established.
- Editorial word count: 431; destination: 619; sections: 6; FAQs: 3.
- Intent: Competitor-specific replacement selection; secondary local-processing tradeoffs.
- Actual workflow links: /tools/merge-pdf, /tools/split-pdf, /privacy, /#tools.
- Internal incoming routes (2): /blog, /.
- Section inventory: Start with your recurring workflow; Check conversion formats carefully; Understand the local-processing tradeoff; Compare the result, not just the button name; What to verify about another service; Try a representative task.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Is PDFcraft categorically better than iLovePDF?** No such ranking is made here. Compare the task, output, privacy requirements, and practical limitations that matter to you.
- **Does PDFcraft provide the same conversions as a larger suite?** No. Its conversion tools are limited to the formats and operations described here.
- **Does local processing mean the site works without a connection?** Not reliably. The website and some processing runtimes load over the network; offline operation is not guaranteed.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

### adobe-acrobat-alternative-free

- Source: app/blog/adobe-acrobat-alternative-free/page.js
- Destination: app/blog/best-free-pdf-tools-online/page.js
- Current URL: https://getpdfcraft.com/blog/adobe-acrobat-alternative-free
- Export title: A Free Adobe Acrobat Alternative for Core PDF Tasks | PDFcraft
- H1: A Free Adobe Acrobat Alternative for Core PDF Tasks
- Canonical: https://getpdfcraft.com/blog/adobe-acrobat-alternative-free
- Article date: February 3, 2026; listing date: Feb 3, 2026; updated: not separately established.
- Editorial word count: 428; destination: 619; sections: 6; FAQs: 2.
- Intent: Acrobat replacement for core tasks; secondary missing editor/OCR/signing capabilities.
- Actual workflow links: /tools/merge-pdf, /tools/split-pdf, /tools/pdf-to-image, /tools/protect-pdf, /#tools.
- Internal incoming routes (1): /blog.
- Section inventory: Match the tool to the task; Start with a supported operation; Check the limitations before switching; Compression is a trial, not a promised saving; Local processing and network access; When to evaluate a broader suite.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can PDFcraft replace every Acrobat workflow?** No. Its 13 tools cover a smaller set of tasks. Choose based on the operation you need, not an assumption of feature equivalence.
- **Does local processing remove every privacy risk?** No. Local document processing is separate from website and third-party requests. Your device, browser, downloaded output, and chosen sharing method still matter.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

### merge-pdf-on-android

- Source: app/blog/merge-pdf-on-android/page.js
- Destination: app/blog/how-to-merge-pdf-free/page.js
- Current URL: https://getpdfcraft.com/blog/merge-pdf-on-android
- Export title: How to Merge PDF on Android Free (No App Needed) | PDFcraft
- H1: How to Merge PDF on Android Free (No App Needed)
- Canonical: https://getpdfcraft.com/blog/merge-pdf-on-android
- Article date: February 2026; listing date: Feb 5, 2026; updated: not separately established.
- Editorial word count: 705; destination: 498; sections: 5; FAQs: 6.
- Intent: Android page assembly; secondary Drive retrieval and locating/sharing downloads.
- Actual workflow links: /tools/merge-pdf, /tools/reorder-pages.
- Internal incoming routes (1): /blog.
- Section inventory: How to merge PDF on Android — step by step; Where to find the merged PDF on Android; Tips for merging PDFs on Android; (tip/link section); Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I merge PDFs on Android without an app?** No PDFcraft app installation is required. Open the tool in your browser; the site and processing code still need to load, and completion depends on the document and device.
- **Where does the merged PDF save on Android?** Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading.
- **Can I merge PDFs from Google Drive on Android?** If that provider is available in your system file picker, you can retrieve a copy there. Cloud retrieval and backup are separate from PDFcraft’s local processing; provider availability varies.
- **Is there a limit on how many PDFs I can merge on Android?** Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result.
- **Does merging PDFs on Android use mobile data?** Loading the site uses network resources, and retrieving or saving a cloud file is a separate transfer. PDFcraft performs the merge locally; this is not a promise of zero network traffic.
- **Does PDFcraft work on Samsung phones?** The phone brand alone does not establish compatibility. This guide does not document a tested Samsung model/browser combination; check the workflow with a non-sensitive sample.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### compress-pdf-for-whatsapp

- Source: app/blog/compress-pdf-for-whatsapp/page.js
- Destination: app/blog/pdf-file-size-too-large/page.js
- Current URL: https://getpdfcraft.com/blog/compress-pdf-for-whatsapp
- Export title: How to Compress a PDF for WhatsApp | PDFcraft
- H1: How to Compress a PDF for WhatsApp
- Canonical: https://getpdfcraft.com/blog/compress-pdf-for-whatsapp
- Article date: February 6, 2026; listing date: Feb 6, 2026; updated: not separately established.
- Editorial word count: 439; destination: 478; sections: 6; FAQs: 3.
- Intent: Deliver a PDF through messaging; secondary distinguish size errors from delivery errors.
- Actual workflow links: /tools/compress-pdf, /tools/split-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Try compression and inspect the result; Why a scan may barely shrink; Split by content if one file is still too large; Tools for this workflow; If sending still fails; Processing on a phone.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **What is WhatsApp’s current PDF limit?** Check the limit in your current app or the provider’s current documentation. This article does not assert a current number.
- **Will PDFcraft reduce image resolution?** Compress PDF does not explicitly downsample embedded images. Image-heavy documents may show little reduction or become larger.
- **Does PDFcraft send the file for me?** No. Download the result and choose how to share it yourself.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: HOLD - MORE EVIDENCE REQUIRED. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-compress-pdf-for-email

- Source: app/blog/how-to-compress-pdf-for-email/page.js
- Destination: app/blog/pdf-file-size-too-large/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-compress-pdf-for-email
- Export title: How to Compress a PDF for Email | PDFcraft
- H1: How to Compress a PDF for Email
- Canonical: https://getpdfcraft.com/blog/how-to-compress-pdf-for-email
- Article date: February 2026; listing date: Feb 8, 2026; updated: not separately established.
- Editorial word count: 664; destination: 478; sections: 6; FAQs: 6.
- Intent: Email attachment sizing; secondary sharing-link access.
- Actual workflow links: /tools/compress-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Check your email provider’s current limits; How to compress PDF for email — step by step; What if the PDF is still too large after compression?; Tips to keep PDF file sizes small; (tip/link section); Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **What is the maximum PDF size I can email?** The limit depends on the sending and receiving services and their current account rules. Check both before preparing the attachment; PDFcraft does not set an email attachment limit.
- **How do I compress a PDF to under 1MB for email?** PDFcraft has no target-size control and cannot promise an output below 1MB. Compare the result; if it is too large, consider source re-export or separate page ranges accepted by the recipient.
- **Does PDF compression reduce quality?** This compressor does not explicitly downsample or recompress images. It rewrites PDF structure; inspect the saved file and any forms, links or signatures you need.
- **Can I compress a PDF for email on my phone?** You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed.
- **Is there a free way to send large PDFs by email?** You can try the free compressor first. If the result still exceeds the attachment limit, agree on another delivery method with the recipient. Any external sharing service has its own terms and limits.
- **What should I check before sending a PDF with a sharing link?** Verify the link permissions and confirm the intended recipient can open the PDF. Check whether access requires signing in, and avoid granting access more broadly than intended.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### split-pdf-into-two

- Source: app/blog/split-pdf-into-two/page.js
- Destination: app/blog/how-to-split-pdf-online/page.js
- Current URL: https://getpdfcraft.com/blog/split-pdf-into-two
- Export title: How to Split a PDF into Two Files by Page Range | PDFcraft
- H1: How to Split a PDF into Two Files by Page Range
- Canonical: https://getpdfcraft.com/blog/split-pdf-into-two
- Article date: February 2026; listing date: Feb 20, 2026; updated: not separately established.
- Editorial word count: 413; destination: 426; sections: 6; FAQs: 3.
- Intent: Two-file partition; secondary odd counts and chapter boundaries.
- Actual workflow links: /tools/split-pdf, /blog/how-to-extract-pages-from-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Example: divide a 12-page PDF; Odd page counts and chapter boundaries; Two files does not mean equal byte sizes; Input validation and document limits; Keep the original; Choose the appropriate workflow.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can PDFcraft automatically split into equal halves?** No. Enter two explicit ranges in Page Ranges mode.
- **Does 1-6,7-12 produce two PDFs?** Yes, for a source with at least 12 pages. It creates one output for each of the two ranges.
- **Will the two files have the same size?** Not necessarily. Page content determines size, so equal page counts do not imply equal byte sizes.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### convert-pdf-to-png-free

- Source: app/blog/convert-pdf-to-png-free/page.js
- Destination: app/blog/convert-pdf-to-jpg-free/page.js
- Current URL: https://getpdfcraft.com/blog/convert-pdf-to-png-free
- Export title: How to Convert PDF to PNG Free Online | PDFcraft
- H1: How to Convert PDF to PNG Free Online
- Canonical: https://getpdfcraft.com/blog/convert-pdf-to-png-free
- Article date: February 2026; listing date: Feb 22, 2026; updated: not separately established.
- Editorial word count: 680; destination: 452; sections: 7; FAQs: 6.
- Intent: PNG page rendering; secondary PNG/JPG encoding choice.
- Actual workflow links: /tools/pdf-to-image.
- Internal incoming routes (1): /blog.
- Section inventory: PNG and JPG encode rendered pixels differently; How to convert PDF to PNG — step by step; When to use PNG vs JPG; Common uses for PDF to PNG conversion; (tip/link section); Password-protected inputs; Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Is PDF to PNG conversion free on PDFcraft?** Yes. The tool is currently free to use and adds no PDFcraft branding watermark. Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result.
- **Does PDF to PNG conversion lose any quality?** PNG losslessly encodes the rendered pixels, but rendering at a fixed scale still replaces PDF text and vectors with pixels. It does not preserve the original PDF semantics or unlimited zoom detail.
- **Can I convert a multi-page PDF to PNG?** All pages are rendered as separate images. Download All triggers individual downloads, subject to browser permissions.
- **Does the PNG support transparency?** Transparency preservation is not promised by this tool. Inspect the rendered background in the downloaded PNG before using it in another design.
- **Can I convert PDF to PNG on Android?** You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed.
- **What is the difference between PDF to JPG and PDF to PNG?** Both render whole pages at the same fixed scale. JPG uses lossy encoding; PNG uses lossless encoding of those rendered pixels. Compare detail and file size for your intended use.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-merge-pdf-on-mac

- Source: app/blog/how-to-merge-pdf-on-mac/page.js
- Destination: app/blog/how-to-merge-pdf-free/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-merge-pdf-on-mac
- Export title: How to Merge PDF on Mac Free (3 Easy Ways) | PDFcraft
- H1: How to Merge PDF on Mac Free (3 Easy Ways)
- Canonical: https://getpdfcraft.com/blog/how-to-merge-pdf-on-mac
- Article date: February 2026; listing date: Feb 23, 2026; updated: not separately established.
- Editorial word count: 698; destination: 498; sections: 6; FAQs: 6.
- Intent: Mac browser versus native merge; secondary Preview/Finder saving and ordering.
- Actual workflow links: /tools/merge-pdf, /tools/reorder-pages.
- Internal incoming routes (1): /blog.
- Section inventory: Method 1 — PDFcraft in your browser; Method 2 — Mac Preview app (built-in, no download); Method 3 — Finder Quick Action, if available; Choose a method that fits your workflow; (tip/link section); Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I merge PDFs on Mac for free?** PDFcraft Merge is free to use. Native app workflows depend on the software available on your Mac.
- **How do I merge PDFs on Mac without Preview?** Use PDFcraft in your browser — go to getpdfcraft.com, click Merge PDF, add your files, and download the merged result.
- **Why does Preview save my PDF merged with the original?** Native saving behavior depends on the app and version. Work on duplicates and choose a separate output filename.
- **Can I merge PDFs on a MacBook?** You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed.
- **Is there a limit to how many PDFs I can merge on Mac?** Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result.
- **Can I merge PDFs on Mac without internet?** PDFcraft does not guarantee offline operation: processing code may still need to load after the page opens. If offline use is required, verify that workflow in your installed application.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-merge-pdf-on-windows

- Source: app/blog/how-to-merge-pdf-on-windows/page.js
- Destination: app/blog/how-to-merge-pdf-free/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-merge-pdf-on-windows
- Export title: How to Merge PDF on Windows Without Installing an App | PDFcraft
- H1: How to Merge PDF on Windows Without Installing an App
- Canonical: https://getpdfcraft.com/blog/how-to-merge-pdf-on-windows
- Article date: February 2026; listing date: Feb 24, 2026; updated: not separately established.
- Editorial word count: 493; destination: 498; sections: 6; FAQs: 6.
- Intent: Windows browser assembly without installation; secondary offline/print alternatives.
- Actual workflow links: /tools/merge-pdf, /tools/reorder-pages.
- Internal incoming routes (1): /blog.
- Section inventory: Method 1 — PDFcraft in your browser; Do not treat printing separate tabs as merging; Method 2 — Evaluate a desktop PDF merger; Choose online or installed processing; (tip/link section); Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I merge PDFs on Windows for free?** Use a PDF merger that explicitly supports your workflow. PDFcraft Merge is free to use in a supported browser; it uses insertion order and practical device limits apply.
- **Does Windows 10 or 11 have a built-in PDF merger?** This guide does not establish a built-in merge feature for your Windows version. Printing separate documents does not combine them; choose a tool that explicitly supports merging PDFs.
- **Can I merge PDFs with Microsoft Word?** This guide does not verify a direct PDF-merge workflow in Word. Use a PDF merger for page assembly; converting through an editable document format can change the layout.
- **Is PDFcraft safe on Windows?** PDFcraft processes document contents locally without a processing upload backend. Website and third-party requests still occur. See the Privacy Policy; local processing is not a general safety guarantee.
- **Can I merge PDFs on Windows without internet?** PDFcraft does not guarantee offline operation. Evaluate an installed tool if that is required.
- **Can I merge more than 2 PDFs at once on Windows?** Practical limits depend on browser capabilities, available memory, and document complexity. A large or complex file may fail; keep your original and check the downloaded result.

Current GSC status: 0 / 13 / 0% / 6.31. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-compress-pdf-on-iphone

- Source: app/blog/how-to-compress-pdf-on-iphone/page.js
- Destination: app/blog/compress-pdf-without-losing-quality/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-compress-pdf-on-iphone
- Export title: How to Compress PDF on iPhone Free (No App Needed) | PDFcraft
- H1: How to Compress PDF on iPhone Free (No App Needed)
- Canonical: https://getpdfcraft.com/blog/how-to-compress-pdf-on-iphone
- Article date: February 2026; listing date: Feb 25, 2026; updated: not separately established.
- Editorial word count: 631; destination: 407; sections: 5; FAQs: 6.
- Intent: iPhone file-size workflow; secondary Files/iCloud downloads and one-at-a-time processing.
- Actual workflow links: /tools/compress-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Why compress a PDF on iPhone?; How to compress PDF on iPhone — step by step; How to find the compressed PDF on iPhone; (tip/link section); Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I compress a PDF on iPhone without an app?** No PDFcraft app installation is required: the compressor runs through the website. Completion still depends on the browser, document and available memory.
- **Where does the compressed PDF save on iPhone?** Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading.
- **Is it safe to compress PDFs on iPhone?** PDFcraft processes document contents locally without a processing upload backend. Website and third-party requests still occur. See the Privacy Policy; local processing is not a general safety guarantee.
- **Can I compress a PDF from iCloud Drive on iPhone?** If that provider is available in your system file picker, you can retrieve a copy there. Cloud retrieval and backup are separate from PDFcraft’s local processing; provider availability varies.
- **Does PDF compression work on iPhone 6S or older?** This guide does not establish support for that model or older devices. Try a non-sensitive sample in your available browser; do not assume a supported minimum iOS version.
- **Can I compress multiple PDFs on iPhone at once?** No. Compress processes one PDF per operation. Finish or reset the current operation before selecting the next file.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### reduce-pdf-size-without-software

- Source: app/blog/reduce-pdf-size-without-software/page.js
- Destination: app/blog/pdf-file-size-too-large/page.js
- Current URL: https://getpdfcraft.com/blog/reduce-pdf-size-without-software
- Export title: Reduce PDF Size Without Installing Software: A Decision Guide | PDFcraft
- H1: Reduce PDF Size Without Installing Software: A Decision Guide
- Canonical: https://getpdfcraft.com/blog/reduce-pdf-size-without-software
- Article date: February 2026; listing date: Mar 1, 2026; updated: not separately established.
- Editorial word count: 454; destination: 478; sections: 7; FAQs: 3.
- Intent: No-install size reduction decision; secondary re-export/extraction and offline distinction.
- Actual workflow links: /tools/compress-pdf, /tools/split-pdf, /tools/pdf-to-grayscale.
- Internal incoming routes (2): /blog, /tools/pdf-to-grayscale.
- Section inventory: Start with a measurable comparison; Why another approach may be necessary; If you do not need every page; If all pages are needed and scans dominate; Do not treat grayscale as a lossless size shortcut; No installation is not the same as offline; Choose a next step.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can PDFcraft guarantee a smaller PDF?** No. Structural optimization may produce a smaller, unchanged, or larger file.
- **Does compression lower image resolution?** The current Compress implementation does not explicitly downsample embedded images.
- **Is converting to grayscale a reliable size reduction method?** No. Rasterization can increase size and loses document semantics. Review that tradeoff before using it.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-encrypt-pdf-files-free

- Source: app/blog/how-to-encrypt-pdf-files-free/page.js
- Destination: app/blog/how-to-add-password-to-pdf-online/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-encrypt-pdf-files-free
- Export title: How to Encrypt a PDF with Password-Based AES-256 | PDFcraft
- H1: How to Encrypt a PDF with Password-Based AES-256
- Canonical: https://getpdfcraft.com/blog/how-to-encrypt-pdf-files-free
- Article date: May 2026; listing date: Mar 4, 2026; updated: not separately established.
- Editorial word count: 420; destination: 428; sections: 5; FAQs: 3.
- Intent: Password-based AES-256 encryption; secondary algorithm/password/permissions distinctions.
- Actual workflow links: /tools/protect-pdf, /tools/unlock-pdf, /privacy.
- Internal incoming routes (2): /blog, /tools/protect-pdf.
- Section inventory: Encrypt an unencrypted PDF; A password is not the encryption key itself; What encryption does not establish; Runtime loading and local processing; Related tools and policy.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Which encryption does the tested tool produce?** Password-based AES-256 via qpdf WebAssembly. There is no encryption-type selector.
- **Does meeting the four-character minimum make a password strong?** No. It only satisfies the current input validation. Choose a longer, unique password rather than relying on the minimum.
- **Does encryption make a document compliant for regulated work?** PDFcraft makes no such guarantee. Encryption alone does not establish that a whole workflow meets an organization’s requirements.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-lock-pdf-for-job-applications

- Source: app/blog/how-to-lock-pdf-for-job-applications/page.js
- Destination: app/blog/how-to-secure-pdf-before-sending-email/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-lock-pdf-for-job-applications
- Export title: How to Lock PDF for Job Applications | PDFcraft
- H1: How to Lock PDF for Job Applications
- Canonical: https://getpdfcraft.com/blog/how-to-lock-pdf-for-job-applications
- Article date: May 2026; listing date: Mar 5, 2026; updated: not separately established.
- Editorial word count: 706; destination: 489; sections: 7; FAQs: 6.
- Intent: Application submission requirements; secondary sensitive supporting documents.
- Actual workflow links: /tools/compress-pdf, /tools/protect-pdf, /tools/merge-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Should you password protect your resume PDF?; Documents to protect in job applications; How to secure job application PDFs; Format and naming tips for applications; Prepare your job application PDFs; (tip/link section); Protection limits and runtime loading.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Should I password protect my resume PDF?** Only if the employer accepts or requests encrypted documents. A password can prevent an application portal or reviewer from opening the file; ask when the instructions are unclear.
- **How do I combine my cover letter and resume into one PDF?** Merge uses the displayed insertion order. Add files in the required order and check the list; there is no drag-to-reorder control. Use Reorder Pages with Up/Down controls afterward if needed.
- **What size should my resume PDF be?** Use the limit stated by the employer or application portal. Check the actual saved file size; encryption and structural compression do not guarantee a smaller file.
- **Should I send my resume as PDF or Word?** Follow the requested format. PDFcraft does not convert to Word; keep your editable source if an employer requires that format.
- **Can I lock a PDF on my phone before applying?** You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed.
- **How do I make my PDF resume professional?** Use a clear filename and readable layout. Follow submission instructions and inspect the file.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

### how-to-lock-pdf-without-adobe

- Source: app/blog/how-to-lock-pdf-without-adobe/page.js
- Destination: app/blog/how-to-add-password-to-pdf-online/page.js
- Current URL: https://getpdfcraft.com/blog/how-to-lock-pdf-without-adobe
- Export title: How to Password-Protect a PDF Without Adobe | PDFcraft
- H1: How to Password-Protect a PDF Without Adobe
- Canonical: https://getpdfcraft.com/blog/how-to-lock-pdf-without-adobe
- Article date: May 2026; listing date: Mar 6, 2026; updated: not separately established.
- Editorial word count: 469; destination: 428; sections: 6; FAQs: 3.
- Intent: Opening-password workflow without Adobe; secondary runtime troubleshooting.
- Actual workflow links: /tools/protect-pdf, /tools/unlock-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Protect, download, and verify; Finish ordinary edits before protecting; Troubleshoot a failed attempt; What locking does and does not do; Network dependencies; Next steps.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Do I need an Adobe subscription for this workflow?** No. PDFcraft’s Protect tool is currently free to use and does not require an account. This does not compare the scope or pricing of Adobe products.
- **Can I protect several files at once?** The current Protect interface processes one selected PDF at a time.
- **Can this prevent recipients from changing the document?** No. Password-based access control is not a guarantee against changes by someone who can open the file.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### password-protect-pdf-on-android

- Source: app/blog/password-protect-pdf-on-android/page.js
- Destination: app/blog/how-to-add-password-to-pdf-online/page.js
- Current URL: https://getpdfcraft.com/blog/password-protect-pdf-on-android
- Export title: How to Password Protect PDF on Android Free | PDFcraft
- H1: How to Password Protect PDF on Android Free
- Canonical: https://getpdfcraft.com/blog/password-protect-pdf-on-android
- Article date: May 2026; listing date: Mar 9, 2026; updated: not separately established.
- Editorial word count: 755; destination: 428; sections: 6; FAQs: 6.
- Intent: Android encryption; secondary Drive/download/share handling.
- Actual workflow links: /tools/protect-pdf, /tools/watermark-pdf, /tools/compress-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: How to password protect PDF on Android — step by step; Where to find the protected PDF on Android; Lock PDF from Google Drive on Android; Android PDF security tools; (tip/link section); Protection limits and runtime loading.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I password protect a PDF on Android without an app?** No PDFcraft app installation is required. Open the tool in your browser; the site and processing code still need to load, and completion depends on the document and device.
- **Where does the protected PDF save on Android?** Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading.
- **Can I protect a PDF from Google Drive on Android?** If that provider is available in your system file picker, you can retrieve a copy there. Cloud retrieval and backup are separate from PDFcraft’s local processing; provider availability varies.
- **Does protecting a PDF on Android use mobile data?** Document contents are processed locally in your browser by PDFcraft, without a PDF-processing upload backend. Website and third-party resource requests are separate; see the Privacy Policy. This is not a guarantee against every privacy risk. Protect and Unlock load the remote qpdf WASM runtime from jsDelivr. PDF-to-image and Grayscale load PDF.js workers from jsDelivr. Document processing remains local, but these downloads require network access and can fail.
- **Does PDFcraft work on Samsung phones?** The phone brand alone does not establish compatibility. This guide does not document a tested Samsung model/browser combination; check the workflow with a non-sensitive sample.
- **Can I share the protected PDF on WhatsApp from Android?** After downloading, use the messaging app’s available document-attachment workflow and check its current requirements. App menus and download locations vary.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### lock-pdf-on-iphone

- Source: app/blog/lock-pdf-on-iphone/page.js
- Destination: app/blog/how-to-add-password-to-pdf-online/page.js
- Current URL: https://getpdfcraft.com/blog/lock-pdf-on-iphone
- Export title: How to Lock PDF on iPhone Free (No App Needed) | PDFcraft
- H1: How to Lock PDF on iPhone Free (No App Needed)
- Canonical: https://getpdfcraft.com/blog/lock-pdf-on-iphone
- Article date: May 2026; listing date: Mar 10, 2026; updated: not separately established.
- Editorial word count: 738; destination: 428; sections: 7; FAQs: 6.
- Intent: iPhone encryption; secondary iCloud/Files sharing.
- Actual workflow links: /tools/watermark-pdf, /tools/compress-pdf, /tools/merge-pdf, /tools/protect-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: How to lock a PDF on iPhone — step by step; Where to find the locked PDF on iPhone; Lock PDF from iCloud Drive on iPhone; Other iPhone PDF security tips; (tip/link section); Protection limits and runtime loading; Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I lock a PDF on iPhone without an app?** No PDFcraft app installation is required. Open the tool in your browser; the site and processing code still need to load, and completion depends on the document and device.
- **Where does the locked PDF save on iPhone?** Use the browser’s download controls to locate the saved file or choose a destination if prompted. The location depends on browser settings and OS version; check the file manager or Files app after downloading.
- **Can I lock a PDF from iCloud Drive on iPhone?** If that provider is available in your system file picker, you can retrieve a copy there. Cloud retrieval and backup are separate from PDFcraft’s local processing; provider availability varies.
- **Does locking a PDF on iPhone use iCloud storage?** Document contents are processed locally in your browser by PDFcraft, without a PDF-processing upload backend. Website and third-party resource requests are separate; see the Privacy Policy. This is not a guarantee against every privacy risk. Protect and Unlock load the remote qpdf WASM runtime from jsDelivr. PDF-to-image and Grayscale load PDF.js workers from jsDelivr. Document processing remains local, but these downloads require network access and can fail.
- **Can I send a locked PDF from iPhone via WhatsApp?** After downloading, use the messaging app’s available document-attachment workflow and check its current requirements. App menus and download locations vary.
- **Does PDFcraft work on iPad too?** This guide does not establish iPad compatibility from an iPhone workflow. Check file selection, processing and the saved output in your iPad browser before relying on it.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: MERGE. No candidate-level country/device/backlink/index-state evidence is supplied.

### secure-pdf-on-mac

- Source: app/blog/secure-pdf-on-mac/page.js
- Destination: app/blog/how-to-add-password-to-pdf-online/page.js
- Current URL: https://getpdfcraft.com/blog/secure-pdf-on-mac
- Export title: How to Password-Protect a PDF on Mac | PDFcraft
- H1: How to Password-Protect a PDF on Mac
- Canonical: https://getpdfcraft.com/blog/secure-pdf-on-mac
- Article date: May 2026; listing date: Mar 11, 2026; updated: not separately established.
- Editorial word count: 590; destination: 428; sections: 7; FAQs: 6.
- Intent: Mac browser/native password options; secondary offline/automation choice.
- Actual workflow links: /tools/protect-pdf.
- Internal incoming routes (1): /blog.
- Section inventory: Method 1 — PDFcraft in your browser; Method 2 — Mac Preview (built-in, no download needed); Command-line workflows require separate verification; Choose based on the task; (tip/link section); Protection limits and runtime loading; Continue with the relevant tool.

FAQ evidence (not automatically unique simply because the question includes a platform):

- **Can I secure a PDF on Mac for free?** PDFcraft Protect is currently free to use. It adds an opening password in a supported browser; it does not make a document tamper-proof.
- **How do I password protect a PDF on Mac without software?** You do not need to install a PDFcraft desktop app. Use the browser tool, which loads website and runtime resources; this is not an offline workflow guarantee.
- **Does Mac Preview encryption use strong encryption?** This guide does not assert a particular encryption algorithm for Preview. Check the exported file independently.
- **Can I secure PDFs on a MacBook?** You can try this browser-based workflow without installing a PDFcraft app. Browser compatibility and usable file sizes depend on the device; universal support is not guaranteed.
- **Can I secure a PDF on Mac without internet?** PDFcraft does not guarantee offline availability. Verify the installed tool and workflow if offline use is required.
- **Will a PDF secured on Mac open on Windows?** Use a viewer that supports the output encryption and test it with the recipient. Universal compatibility is not guaranteed.

Current GSC status: NOT PRESENT IN EXPORTED PAGE DATA. Final decision: DIFFERENTIATE. No candidate-level country/device/backlink/index-state evidence is supplied.

## 11. Scope, validation and next action

Only this decision report is authorized to change. No articles, redirects, noindex, product/shared code, evidence, sitemap or public Lab changes; no new evidence collection, commit or deployment. Site inventory remains 45 articles / 13 tools / 64 indexable routes / 8 redirects.

Validation completed: production build PASS (67 generated static pages, 64 indexable routes); lint PASS with zero errors and three existing warnings; content/export PASS 133/133 including internal links, canonicals and schema; final-repair PASS 106/106; Batch 3 PASS for 17 articles, 12 evidence rows and 32 adversarial checks; tool documentation PASS for 13 routes; sitemap PASS; independent redirect-chain checks PASS for all eight redirects; git diff --check PASS. SHA-256 comparison against the pre-revision checkpoint confirms only this report changed: all 17 candidate articles, all four protected pages, all 320 evidence paths, product/shared code, metadata/dates and redirects remain byte-identical. No new source files or public Lab route were added.

Next step is an implementation audit of these revised decisions and the exact useful-detail transfers. Prepare the nine destination additions and redirect/link/catalog/test impact plan for review; do not remove sources or add redirects before that review. Assign the seven differentiation plans and one WhatsApp resolution task separately. URL-filtered Windows query data should inform its rewrite but does not block the final DIFFERENTIATE recommendation. No Batch 5 work is started.

**BATCH 4 FINAL DECISIONS READY — IMPLEMENTATION AUDIT REQUIRED**
