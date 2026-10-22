# Batch 4B: differentiation research and implementation plan

Research date: 2026-10-19. Planning only; no authorization to change indexability, articles or redirects. Branch main, HEAD 6ccfbe45fbe6e671cd968a1e5bbe692aac736dc4. Existing uncommitted work is the baseline, not a fresh checkout. Browser execution remains NOT TESTED; documentation research is not execution evidence.

## Decision

Differentiate seven pages; merge the WhatsApp page into `/blog/pdf-file-size-too-large` in a separately approved implementation. Do not retain eight near-duplicate tutorials. The seven survivors must satisfy the distinct decisions below, not merely change their wording.

`NP` in this report means **NOT PRESENT IN EXPORTED PAGE DATA**, never zero traffic. `D` means **DIFFERENTIATE — IMPLEMENT**. Indexability recommendations are proposals, not changes made here.

| Page | Direct GSC evidence | Distinct intent | Current quality | Evidence available | Final decision | Interim indexability | One-sentence reason to exist |
|---|---|---|---|---|---|---|---|
| ilovepdf-alternative | NP | Choose a narrower local workflow instead of a suite | Generic comparison without comparison facts | Official merge/features pages; PDFcraft implementation | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should help an iLovePDF user decide whether their specific merge/split task fits PDFcraft and identify suite features they would lose. |
| adobe-acrobat-alternative-free | NP | Decide whether a full editor is necessary | Honest limitations but mostly a generic tool list | Adobe feature/OCR documentation; product boundaries | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should distinguish page operations from existing-text editing, OCR, forms and signing so readers can decide whether a full editor is necessary. |
| convert-pdf-to-png-free | NP | Decide what a PNG export actually retains | Repetitive; extraction wording misleading | Actual canvas/PDF.js path; conditional pixel tests planned | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should explain PNG pixel encoding, dimensions and background behavior so readers can choose an image deliverable without mistaking it for extracted objects or a searchable PDF. |
| how-to-merge-pdf-on-mac | NP | Choose native thumbnail assembly, Finder creation or browser append | Mixed native/product instructions | Apple Preview and Finder documentation | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should help a Mac user choose between native page assembly, Finder file combination and PDFcraft while preserving originals and controlling order. |
| how-to-merge-pdf-on-windows | 0 clicks / 13 impressions / 0% CTR / 6.31 | Distinguish structural merge from print conversion and Word reflow | Some useful distinction, mostly generic workflow | Microsoft print/Word documentation; safe-copy code | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should prevent a Windows user from confusing separate print jobs or Word conversion with combining existing PDF pages. |
| how-to-lock-pdf-for-job-applications | NP | Submission acceptance versus confidentiality | Repeated categories; unconditional security steps | USAJOBS instructions as a scoped example; Protect implementation | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should help an applicant decide whether encryption is permitted or counterproductive before preparing the requested documents. |
| secure-pdf-on-mac | NP | Opening password versus native permission controls | Generic security prose and vague native steps | Apple Preview password documentation; PDFcraft implementation | D | KEEP INDEXED DURING IMPLEMENTATION | This URL should distinguish Preview opening/owner-permission controls from PDFcraft's narrower protection workflow and help choose a native or browser route. |
| compress-pdf-for-whatsapp | NP | Compression versus delivery failure | Little unique information beyond the destination | Official WhatsApp sending information; current size guide | MERGE | MERGE | No separate URL is justified by the current evidence: a size diagnosis and a short delivery-channel caveat satisfy its useful intent in the existing file-size guide. |

Confidence: high in technical/documentation distinctions and current duplication; moderate in editorial retention and merge decisions; low in any predicted ranking outcome. These recommendations are not an AdSense approval prediction.

Temporary noindex for the two competitor pages is not recommended now. Research establishes implementable task-level comparisons, their existing wording already disclaims full equivalence, and the export does not prove they have no value. Adding an indexing transition immediately before a bounded rewrite offers no demonstrated benefit here. This is not a claim that today's generic comparison content is good enough indefinitely. If the planned evidence-backed rewrite is abandoned, reassess consolidation/indexability separately rather than retaining a title-only comparison.

## Search Console evidence and limits

Source: `getpdfcraft.com-Performance-on-Search-2026-10-19.zip`; SHA-256 `2126636b7c85bc1aa691e8d062c782cc7c67cc2b51830a083836c6423cbb08c9`. Export window September 19–October 16, 2026; filters Web (text-based), Last 28 days. Pages.csv and Queries.csv are separate aggregates, not page-query pairings.

Only Windows appears among these eight page URLs. Each of the other seven is NP. Windows visibility supports careful improvement without changing URL/title/H1; 13 impressions is too small to infer a durable rank or why Google selected the page. Query/country/device mix could affect average position. No Windows-specific visible query establishes its driver.

Relevant visible query context: `how to merge pdf files free` 0 clicks/3 impressions/15.67; `merge pdf online free unlimited` 0/1/9; `merge pdf files free no sign up` 0/1/18; `merge pdf files free online` 0/1/26. These are site-level general merge signals only, potentially relevant to Mac/Windows workflow intent, not attributable to either page. No visible query row specifically establishes iLovePDF, Acrobat, PNG, Mac protection, job-encryption or WhatsApp demand in this export. Absence of exposed queries is not absence of demand.

Protected iPhone page: 12 clicks/158 impressions/7.59%/18.34. Query `merge pdf iphone` has 0/21/24.05; other iPhone variants exist. None of this demand is transferred to Mac, Windows, competitor or WhatsApp pages. No protected page needs editing for this plan. Fuller page-query/backlink evidence would improve ranking confidence but is not needed to identify the concrete content weaknesses.

## Primary-source fact ledger

All sources below were accessed/researched on 2026-10-19. Vendor statements describe documented capabilities, not a locally tested account, application or device. Recheck change-prone claims immediately before implementation. No pricing comparison is needed.

| ID / source | Fact usable in the plan | Stability and boundary |
|---|---|---|
| S1 [iLovePDF Merge](https://www.ilovepdf.com/merge_pdf) | The web merge workflow offers file selection and drag ordering. | UI can change. A visible Login link does not prove a login is mandatory or that a completed guest workflow was tested. |
| S2 [iLovePDF features](https://www.ilovepdf.com/features) | The suite describes broader operations and a desktop local/offline option. | Product/plan scope can change. Do not equate all iLovePDF use with cloud upload or all PDFcraft use with offline use. |
| S3 [Adobe Acrobat features](https://www.adobe.com/acrobat/features.html) | Acrobat's family includes existing-text/image editing, document organization, conversion, forms and signing workflows beyond PDFcraft. | Edition/plan availability changes; do not promise all features in free Reader or every Acrobat plan. |
| S4 [Adobe OCR](https://helpx.adobe.com/in/acrobat/desktop/create-documents/scan-documents-to-pdfs/recognize-text.html) | OCR recognizes image text to make it searchable/selectable. | UI/edition sensitive; OCR accuracy is not guaranteed. PDFcraft's raster exporter is not OCR. |
| S5 [Apple Preview combine](https://support.apple.com/en-ie/guide/preview/prvw43696/mac) | Preview can combine whole PDFs or chosen thumbnails and reorder them; changes autosave, so duplicate originals first. | Version-sensitive UI; documented, not locally executed. |
| S6 [Apple Finder combine](https://support.apple.com/en-ie/guide/mac-help/mchl21ac2368/27/mac/27) | Finder Quick Actions/Create PDF combines selected files; documented order follows selection; output is created automatically. | This URL is explicitly version 27. Do not relabel it as a test of every macOS version. |
| S7 [Apple Preview passwords](https://support.apple.com/guide/preview/password-protect-a-pdf-prvw587dd90f/mac) | Export/Permissions offers an opening password and owner-controlled permissions; reopening applies changes. | Version selector present. No algorithm equivalence with PDFcraft is established by this page. |
| S8 [Microsoft Word: opening PDFs](https://support.microsoft.com/en-us/word/opening-pdfs-in-word) | Word converts a copy into an editable document; layout can change, particularly with complex content. | Applies to documented Word versions; not proof of structural merging. |
| S9 [Microsoft printing](https://support.microsoft.com/en-us/outlook/getstarted/print-messages-calendars-or-other-outlook-items) | Microsoft Print to PDF is selected as a printer to save printable content. | App-specific documentation; does not establish a multi-file structural merge command. |
| S10 [USAJOBS resume guidance](https://help.usajobs.gov/faq/application/documents/resume/what-to-include) | Follow the announcement's required documents; its resume guidance excludes encrypted/digitally signed documents and unnecessary sensitive identifiers. | A specific portal example, not a universal employer/ATS rule. Its limits can change; no numeric limit is needed here. |
| S11 [USAJOBS application steps](https://help.usajobs.gov/how-to/application) | Review How to Apply and Required Documents before submission. | Supports a requirements-first decision, not promises about every portal. |
| S12 [WhatsApp messaging](https://www.whatsapp.com/messaging) | Official page advertises file sending up to 2 GB without requiring compression. | Current vendor statement, not an execution guarantee, universal diagnosis or reason to add a stale numeric target to PDFcraft. |
| S13 [WhatsApp sending help](https://faq.whatsapp.com/453914586839706/?cms_platform=web&locale=fr_FR) | Sending documents is a distinct attachment workflow. | Platform/locale sensitive. No browser/device sending test was performed. |

Research limits: iLovePDF help/security URLs attempted were not retrievable in the research tool. Therefore no account requirement, retention guarantee, server-location assertion or comparative privacy ranking is approved. Microsoft documentation supports printing and Word-conversion distinctions; it does not establish an exhaustive negative statement that no Windows configuration has any native PDF-combination option. Say that these documented print/Word workflows are not evidence of structural multi-document merging. Do not add unsupported PDF24 claims.

## Implementation evidence and overlap

All eight route files were read in full, together with catalog/shared metadata and the strongest overlap material. Primary overlap destinations include the corrected general Merge guide, `pdf-file-size-too-large`, the JPG guide, the general password guide and the tools guide. The current generic Merge guide already explains insertion order, navigation reconstruction, omitted source OpenActions and unsupported AcroForms; do not replicate that full guide into each platform article.

PDF-to-Image source: `app/tools/pdf-to-image/page.js` renders **all** pages using `getViewport({ scale: 2 })`, assigns viewport dimensions to a canvas, calls PDF.js render, then `toDataURL(image/format, 0.92)`. Names are `page-N.png` or `page-N.jpg`. Download All triggers separate downloads, not a ZIP. It does not extract embedded image objects or retain PDF interactive objects in image files. PDF.js is loaded with a versioned external worker. Installed PDF.js canvas code uses a white default background when no override is supplied; the app supplies no override. This is code evidence of the current render default, not a tested transparency result for all PDFs or browsers. The 0.92 argument is not a PNG quality slider. Do not present finite pixel rendering as vector preservation or lossless conversion of the whole PDF.

Compression uses structural/object-stream saving; no target size or explicit downsampling. Existing internal evidence includes reductions and growth, not universal savings or browser compatibility. Existing preservation evidence is not a native Preview/Windows test. Reuse bounded product facts without publishing internal artifacts or `/lab` links.

### Concrete overlap findings

| Page | Overlap estimate/examples | Current unique substance | Required correction |
|---|---|---|---|
| iLovePDF | Most of six sections repeat tool ordering, unavailable conversions, local-network and compression limitations from general guides. | One paragraph inviting comparison with another service, but few actual comparison facts. | Replace generic tour with a small task/constraint comparison grounded in S1–S2. |
| Adobe | Supported-operation list and limitation paragraphs largely reproduce the tools guide; compression and local-processing blocks also occur on WhatsApp. | Full-suite warning, currently not explained by documented examples. | Build editor-versus-page-operation decision, with S3–S4. |
| PNG | Same PNG pixel-encoding explanation occurs three times; five-step conversion overlaps JPG guide; free/mobile/general format FAQs repeat broad guidance. | PNG encoding distinction, not yet enough depth. | Remove repeated blocks and misleading diagram/logo extraction examples; add dimensions/background and deliverable checks. |
| Mac merge | Browser sequence and insertion-order explanation recur in multiple sections, including the wrong Preview step. | Preview/Finder alternatives are meaningful but poorly explained. | Rewrite native steps against Apple; remove speed/simplicity rankings unsupported by execution. |
| Windows merge | Most browser steps and free/limit/privacy FAQs overlap general Merge; repeated insertion-order wording even within a step. | Printing separate tabs is not merging. | Develop print-versus-merge-versus-Word decision rather than another click-through. |
| Job applications | Four document-category bodies repeat exactly; generic protection/runtime paragraph also appears on Mac security. | Recipient requirements and document necessity are useful. | Replace categories with submission decision gates; remove blanket encryption/compression instructions. |
| Mac security | Browser steps duplicate general password guide; native method vague; long limitations paragraph duplicates jobs. | Preview as a native alternative. | Explain opening passwords versus owner permissions using S7. |
| WhatsApp | Compression and network paragraphs duplicate Adobe; split-range sequence and size checks overlap size/Split guides. | Distinguishes compression failure from sending failure in a short paragraph. | Transfer only a short channel-independent delivery diagnostic if not already covered. |

These are qualitative overlap assessments, not invented similarity percentages. FAQ overlap is primarily semantic (free/device/offline/limits) rather than a claim that every FAQ string is identical. The inventory appendix preserves the exact question lists for review.

## Seven implementation blueprints

Common constraints: preserve slug, canonical, OG URL, title/H1 and existing dates for all seven. Do not infer publication dates from catalog labels. No invented updated/tested date. Keep visible FAQ and schema answers identical through BlogPost. Do not edit protected JPG-rendering tool content, protected competitor pages or the corrected merge destinations. No metadata change is required to implement these blueprints; description revisions, if later desired, require explicit review. Word caps below are ceilings, not targets; include FAQs in the cap.

### 1. Windows merge — first implementation

- **Purpose:** distinguish append-existing-pages from print/reflow workflows; preserve the currently visible query intent.
- **KEEP:** current title/URL, warning about separate print jobs, original-file/output-order checks.
- **DELETE:** speculative PDF24 paragraph, duplicate insertion-order prose, generic privacy/free/limit FAQ padding.
- **REWRITE:** Method 1 into one concise PDFcraft append workflow. Replace the vague online-versus-installed section with a three-row decision: existing PDF pages, printable app content, editable Word content.
- **NEW:** a two-input A/B page-order example and a boundary check; explain why printing separate documents does not establish a combined result. Avoid an absolute claim about all Windows native features.
- **Evidence:** S8–S9 plus Merge handler/safe-copy code and existing Node navigation tests. These do not prove Chrome/Edge downloads work on a particular Windows release.
- **FAQs:** keep and answer Word conversion using S8; rewrite built-in question narrowly around documented print behavior; retain offline distinction without claiming browser offline support. Replace free/safe/more-than-two padding with how to correct input order and why a supported-structure error is not fixed by printing.
- **Links:** keep `/tools/merge-pdf`, `/tools/reorder-pages`; add `/blog/how-to-merge-pdf-free` for detailed supported-navigation limits. Do not add iPhone links to borrow traffic.
- **Maximum scope:** 650–850 words, at most four substantive sections plus four focused FAQs.
- **Risk:** moderate because of direct visibility; stop if title/intent changes, unsupported native claims or browser PASS labels appear.

### 2. iLovePDF alternative

- **Purpose:** help a suite user choose a supported local page task without promising feature parity.
- **KEEP:** narrower alternative framing and explicit missing Word/Excel/OCR/signing capabilities.
- **DELETE:** generic runtime recital, generic compression tutorial, categorical-better FAQ.
- **REWRITE:** comparison around three tasks only: append/reorder pages, extract ranges, obtain an image rather than an editable Office file. Show the observed web ordering control versus PDFcraft insertion order, not a superiority score.
- **NEW:** a compact requirement check: need a suite conversion/signing feature -> PDFcraft is not a substitute; need offline desktop use -> local browser processing alone does not establish offline availability. Include dated official links, not prices or retention promises.
- **Evidence:** S1–S2; actual Merge/Split/PDF-to-Image controls. Login completion remains unverified: omit account-requirement claims for iLovePDF. A public upload interface is not a privacy-policy audit.
- **FAQs:** replace better-than with how to decide from task; retain missing-conversion answer with examples; shorten offline answer and link the process guide.
- **Links:** retain Merge/Split and privacy; add `/blog/how-browser-based-pdf-processing-works`; replace generic `/#tools` CTA with the relevant supported task if the article selects one, otherwise retain a single tools link.
- **Maximum scope:** 600–800 words; maximum four comparison rows. No review scores, subscription roundup or testing claims.
- **Risk:** moderate stale-vendor risk; verify cited product facts immediately before writing.

### 3. Adobe alternative

- **Purpose:** decide whether page operations suffice or existing-content editing/document workflows are essential.
- **KEEP:** warning that PDFcraft is not a complete Acrobat replacement, core task links.
- **DELETE:** repeated network/privacy block, generic structural-compression explanation already covered elsewhere, unsupported pricing implications.
- **REWRITE:** two task groups: page operations/rendering/password opening versus text editing/OCR/forms/signing. Describe Acrobat as a product family with edition-specific availability, not a single free feature bundle.
- **NEW:** three concrete decisions: combine a report -> Merge may fit; change a sentence -> page tools do not; turn scan text into searchable text -> OCR required. No claim to test vendor output.
- **Evidence:** S3–S4 and actual PDFcraft operation boundaries. Cite vendor facts close to the relevant group.
- **FAQs:** replace privacy-risk FAQ with existing-text editing versus watermark overlay; keep full-replacement answer; add OCR-versus-image-rendering distinction.
- **Links:** retain Merge/Split/Image/Protect; add `/blog/how-to-edit-pdf-free` and `/blog/how-to-add-password-to-pdf-online` only at those decisions, not a generic crosslink list.
- **Maximum scope:** 650–850 words; no encyclopedic feature matrix.
- **Risk:** moderate misrepresentation/staleness; stop if any claim implies all Acrobat features are free or all can be replaced.

### 4. PNG

- **Purpose:** explain the pixel deliverable rather than repeat JPG conversion steps.
- **KEEP:** finite-resolution caveat, format choice, input-password explanation.
- **DELETE:** two duplicate encoding paragraphs; diagram/logo extraction wording; generic Android/free FAQ padding.
- **REWRITE:** whole-page PNG uses: line art/text previews where avoiding additional JPEG encoding artifacts matters. For photographs, compare actual output sizes and appearance; never assert JPG is always smaller or PNG always better. Retain PDF when selectable text or vector scaling matters.
- **NEW:** dimensions follow the rendered page viewport, rotation and integer canvas dimensions; current code's white-default background; all-pages processing/separate-image downloads; difference between embedded-image extraction and rendering. Exact pixel/background examples require the controlled test below.
- **Evidence:** app code and installed PDF.js default; JPG guide already covers generic workflow. New pixel claims gated on PNG tests, not inferred from prior compression tests.
- **FAQs:** quality answer distinguishes render loss from PNG encoding; transparency answer describes current default without promising alpha preservation; multi-page answer distinguishes processing all from downloading one; replace mobile question with why PNG text is no longer PDF-selectable.
- **Links:** keep `/tools/pdf-to-image`; add `/blog/convert-pdf-to-jpg-free` only for JPEG workflow and `/tools/split-pdf` for isolating a page before rendering. No edit to protected tool.
- **Maximum scope:** 650–850 words, four technical sections and four FAQs; no generic online-converter list.
- **Risk:** moderate evidence risk until pixel tests; code-established limits can be written without pretending those tests ran.

### 5. Mac merge

- **Purpose:** native page assembly versus Finder combination versus browser append.
- **KEEP:** three-method title, originals/output-order check, existing tool links.
- **DELETE:** PDFcraft instructions inside Preview steps; unsupported speed/simplicity labels; MacBook/free/limits filler.
- **REWRITE:** Preview method from S5, Finder from S6, browser method once only. Put native choice first for an existing offline/native need. Label Apple instructions documented rather than locally tested.
- **NEW:** choose individual thumbnails versus whole files; preserve originals before autosave; distinguish selection order from filename assumptions. State version sensitivity with the source version instead of inventing universal UI labels.
- **Evidence:** S5–S6; Merge handler and general guide. No current Mac execution evidence.
- **FAQs:** autosave gets the direct duplicate-originals explanation; offline answer separates native from browser dependencies; replace MacBook question with selected pages versus entire files; keep without-Preview only if it adds the Finder/browser choice.
- **Links:** retain Merge/Reorder, add `/blog/how-to-merge-pdf-free` for PDFcraft-specific structure limits and Apple source links at native methods.
- **Maximum scope:** 750–950 words, three methods plus a compact chooser; no native password tutorial.
- **Risk:** moderate UI-version risk. No guarantee all forms/signatures survive any method.

### 6. Mac security

- **Purpose:** choose opening protection versus owner-permission controls, with a native option.
- **KEEP:** authorized original/copy and reopen checks, native-versus-browser choice.
- **DELETE:** generic command-line section, repeated runtime block, MacBook/free/stronger-encryption FAQs without evidence.
- **REWRITE:** Preview workflow against S7; PDFcraft workflow as an opening-password option, not equivalent permission-management UI. Put native workflow first when it meets the user's need.
- **NEW:** opening password versus permission settings; original versus protected copy; recipient check; no inferred algorithm equivalence or universal enforcement. Link detailed PDFcraft behavior instead of duplicating it.
- **Evidence:** S7 plus Protect implementation and established internal encryption evidence. Neither proves Preview's exact cipher or Windows-viewer interoperability.
- **FAQs:** require password on reopening? opening-versus-owner password? native/offline use? recipient cannot open? Replace broad compatibility answer with an actual recipient-viewer check.
- **Links:** keep `/tools/protect-pdf`; add `/blog/how-to-add-password-to-pdf-online` for product details and `/blog/pdf-security-guide` for password/permission limits.
- **Maximum scope:** 600–800 words, no command-line detour.
- **Risk:** moderate security/algorithm wording risk; no personal test claim.

### 7. Job applications

- **Purpose:** decide whether protection is accepted before preparing sensitive attachments.
- **KEEP:** check employer/portal instructions, minimize documents, recipient access and file requirements.
- **DELETE:** four duplicate document categories, unconditional Protect identity/financial forms step, 'Compress all PDFs' heading, watermark-as-security framing, absolute filename admonition.
- **REWRITE:** sequential gates: requested documents -> permitted format -> encrypted-file acceptance -> agreed delivery/password channel -> reopen/preview final submission. Compression is conditional on an actual size requirement, not a mandatory security step.
- **NEW:** scoped USAJOBS counterexample shows why no universal encrypted-resume rule is safe; privacy/minimization, opening encryption and portal compatibility are different questions. If rules are silent, contact the recipient rather than guessing. An encrypted file requiring a password may block a reader without it; do not assert all ATS systems behave identically.
- **Evidence:** S10–S11, product behavior. Separate password communication is practical advice conditional on an agreed channel, not a guarantee or universal employer rule.
- **FAQs:** resume protection -> only if accepted/requested; PDF or Word -> instructions; size -> current recipient requirement; replace phone/professional/merge padding with rejected encrypted file, unnecessary sensitive documents and how to confirm access.
- **Links:** keep Protect conditional; retain Compress only at size decision; remove generic Merge promotion unless the submission explicitly calls for one combined file; add `/blog/how-to-add-password-to-pdf-online` and `/blog/pdf-file-size-too-large` at relevant branches.
- **Maximum scope:** 600–800 words, one decision sequence and four FAQs; no employment/legal advice or exhaustive portal directory.
- **Risk:** moderate compatibility/security wording risk; never generalize the USAJOBS example to all employers.

## WhatsApp resolution: MERGE

Destination: `/blog/pdf-file-size-too-large`. Official WhatsApp material supplies a current sending fact but does not establish a new compression algorithm or a PDFcraft-specific workflow. The existing destination already covers byte measurement, growth, scanned-image limits, range extraction, link access and processing failure. Do not create a long troubleshooting page about WhatsApp connectivity merely to preserve this URL.

Future transfer: at most 60–90 words after the destination's receiving-requirement step: first identify whether the sending error is actually size-related; use the app's current documented requirements; compare the actual PDF result; if processing succeeded but delivery failed, compression alone has not diagnosed the delivery problem. Link official sending help if retained. No hard-coded maximum is necessary. This is a proposed future change; the closed destination was not edited now.

Do not transfer: duplicate structural-compression/network paragraphs, generic phone boilerplate, invented compression savings, the redundant split example, or a promise that reducing bytes fixes delivery. No current numeric limit is stale in the article because it avoids one; the weakness is its unanswered limit FAQ and thin differentiation.

Future redirect work must also retarget the existing legacy source `/blog/pdf-vs-word-which-is-better/compress-pdf-for-whatsapp` directly to the destination; otherwise the new redirect introduces a chain. Add one direct 301 from the current WhatsApp URL, remove one catalog item and source route, regenerate sitemap. Current runtime reference search found the article itself, catalog entry and that redirect; the index is catalog-driven. Repeat reference search at implementation time. Do not rewrite historical reports/evidence references.

Predicted inventory after this separately approved merge: **35 articles / 13 tools / 54 indexable routes / 18 redirects**. Redirect count rises by one: retargeting the legacy redirect does not add another entry. Seven differentiations alone leave **36 / 13 / 55 / 17** unchanged. No merge/noindex is implemented in this research task.

## Controlled evidence plan before unsupported claims are written

| Test | Fixture/operation | Observe and record | Supports / does not support |
|---|---|---|---|
| PNG dimensions/background | Deterministic two-page PDF: 612x792 unrotated, second page rotated/cropped; text, vector line, photo patch and unpainted background. Render through actual handler to PNG and JPG. | Actual pixel dimensions, alpha/background samples, encoding type, per-page filenames, hashes and library/browser versions. Standard unrotated first-page hypothesis is 1224x1584; measure rather than prefill. | Supports that fixture/version's viewport/background behavior; not universal transparency/color fidelity. |
| PNG/JPG comparison | Same fixture and identical viewport; independently reopen saved images. | Bytes and visual edge/photo observations at fixed scale; record both formats even if expected size ordering reverses. | Supports bounded encoding comparison, not always-smaller/better or whole-PDF losslessness. |
| Download behavior | Actual browser, three-page input; individual and Download All actions. | File selection, number/names of actual downloads, format signatures; browser permission effects. | Supports one environment only; no assumed Safari/Android/Windows/Mac compatibility. If unavailable, NOT TESTED. |
| Windows append versus print | Two PDFs labelled A1/A2 and B1, with links and mixed geometry. Actual Merge; separate print jobs only if environment supports them. | Download, A1/A2/B1 order, independent reopen; separate print artifacts and lost/changed features if observed. | Supports exact workflow; not exhaustive absence of a Windows native merger. |
| Mac native methods | Same labelled PDFs, originals hashed; Apple documented Preview/Finder steps on a recorded OS version. | Ordering, original mutation, output location/reopen; permissions where relevant. | Supports tested version only; until available use 'Apple documents', never 'we tested'. |
| Mac opening/permissions | Disposable PDF; Preview opening password and owner settings, separately PDFcraft Protect. | New copy, reopen prompt, correct/wrong password, viewer behavior. | Supports observed access behavior, not cipher equivalence, tamper-proofing or universal permission enforcement. |
| Job submission | No real applicant data or unsolicited portal submission. Review explicit portal/employer instructions. | Record rule/source/date; only a separately authorized sandbox could establish actual acceptance. | Supports a scoped rule; no invented ATS/browser/recipient pass. |

Existing Node tests can support source behavior but cannot substitute for browser download or native-app tests. No evidence was collected in this planning task. Failures and unavailable environments must stay visible. Do not change the 320 existing evidence paths to manufacture the missing coverage.

## Implementation order, scope and acceptance

1. Windows first: preserve existing search intent and metadata; review the structural-merge distinction.
2. iLovePDF and Adobe together as a bounded comparison batch; separate task decisions, not two renamed feature lists.
3. PNG after deciding whether proposed pixel claims need new controlled evidence; code-based limits can proceed without inventing measurements.
4. Mac merge and security together for consistent version/source attribution, with separate purposes.
5. Job applications: requirements-first and no blanket encryption recommendation.
6. WhatsApp merge as a separate routing/inventory batch, after transfer/redirect review. Do not bundle route removal with seven content rewrites.

Expected survivor implementation files: the seven `app/blog/<slug>/page.js` files only, plus narrowly scoped tests/report as necessary. Preserve `lib/blogCatalog.json` metadata and dates unless a separately reviewed description change is required. No shared component or product change is needed. Current tests that assert obsolete exact wording should be updated to preserve semantic boundaries, not weakened. Run `tests/batch3-articles.test.cjs`, content/export, final-repair and tool-documentation checks; explicitly hash protected pages/evidence and enforce no metadata/date edits. No `/lab` link may appear.

Future WhatsApp merge files: its source route removal, destination's small delivery caveat if needed, `lib/blogCatalog.json`, `public/_redirects`, generated `public/sitemap.xml`, and inventory/content tests that legitimately change counts. No reference currently requires a protected-page edit. Re-scan live internal references before implementation. Source search intent must remain addressed at the destination before redirect acceptance.

Acceptance gate for each rewrite: one distinct reader decision supported by current source/code; no repeated generic runtime blocks; every FAQ answers its question; no invented test result, pricing, device guarantee, updated date or security superiority. Stop on unsupported source facts, drift in protected hashes, unexplained count changes or requests that expand into product behavior. Keep ranking outcome uncertain and observe after any later authorized deployment.

Exact next action: review/approve this differentiation plan, then authorize the Windows-only rewrite with title/H1/URL/date invariants. This document does not authorize implementation, noindex, further merge or deployment.

## Current source inventory appendix

The following inventory is derived from the actual route/catalog data. Approximate word counts measure section/FAQ text only, excluding site chrome and read-time labels; they are depth indicators, not quality scores. Date discrepancies are reported, not corrected. No independently verified update timestamp is established by these article props.


### ilovepdf-alternative

- File: `app/blog/ilovepdf-alternative/page.js`
- Metadata title: An iLovePDF Alternative for Local PDF Workflows | PDFcraft
- H1: An iLovePDF Alternative for Local PDF Workflows
- Canonical/OG URL: https://getpdfcraft.com/blog/ilovepdf-alternative
- Visible date: February 1, 2026; catalog listing: Feb 1, 2026. No date change proposed.
- Depth: approximately 378 section/FAQ words; 6 sections; 3 FAQs.
- Current sections: Start with your recurring workflow; Check conversion formats carefully; Understand the local-processing tradeoff; Compare the result, not just the button name; What to verify about another service; Try a representative task.
- Current FAQs: Is PDFcraft categorically better than iLovePDF? / Does PDFcraft provide the same conversions as a larger suite? / Does local processing mean the site works without a connection?
- Current internal/tool links: `/tools/merge-pdf`, `/tools/split-pdf`, `/privacy`, `/#tools`.

### adobe-acrobat-alternative-free

- File: `app/blog/adobe-acrobat-alternative-free/page.js`
- Metadata title: A Free Adobe Acrobat Alternative for Core PDF Tasks | PDFcraft
- H1: A Free Adobe Acrobat Alternative for Core PDF Tasks
- Canonical/OG URL: https://getpdfcraft.com/blog/adobe-acrobat-alternative-free
- Visible date: February 3, 2026; catalog listing: Feb 3, 2026. No date change proposed.
- Depth: approximately 365 section/FAQ words; 6 sections; 2 FAQs.
- Current sections: Match the tool to the task; Start with a supported operation; Check the limitations before switching; Compression is a trial, not a promised saving; Local processing and network access; When to evaluate a broader suite.
- Current FAQs: Can PDFcraft replace every Acrobat workflow? / Does local processing remove every privacy risk?
- Current internal/tool links: `/tools/merge-pdf`, `/tools/split-pdf`, `/tools/pdf-to-image`, `/tools/protect-pdf`, `/#tools`.

### convert-pdf-to-png-free

- File: `app/blog/convert-pdf-to-png-free/page.js`
- Metadata title: How to Convert PDF to PNG Free Online | PDFcraft
- H1: How to Convert PDF to PNG Free Online
- Canonical/OG URL: https://getpdfcraft.com/blog/convert-pdf-to-png-free
- Visible date: February 2026; catalog listing: Feb 22, 2026. No date change proposed.
- Depth: approximately 636 section/FAQ words; 7 sections; 6 FAQs.
- Current sections: PNG and JPG encode rendered pixels differently; How to convert PDF to PNG — step by step; When to use PNG vs JPG; Common uses for PDF to PNG conversion; (tip); Password-protected inputs; Continue with the relevant tool.
- Current FAQs: Is PDF to PNG conversion free on PDFcraft? / Does PDF to PNG conversion lose any quality? / Can I convert a multi-page PDF to PNG? / Does the PNG support transparency? / Can I convert PDF to PNG on Android? / What is the difference between PDF to JPG and PDF to PNG?
- Current internal/tool links: `/tools/pdf-to-image`.

### how-to-merge-pdf-on-mac

- File: `app/blog/how-to-merge-pdf-on-mac/page.js`
- Metadata title: How to Merge PDF on Mac Free (3 Easy Ways) | PDFcraft
- H1: How to Merge PDF on Mac Free (3 Easy Ways)
- Canonical/OG URL: https://getpdfcraft.com/blog/how-to-merge-pdf-on-mac
- Visible date: February 2026; catalog listing: Feb 23, 2026. No date change proposed.
- Depth: approximately 653 section/FAQ words; 6 sections; 6 FAQs.
- Current sections: Method 1 — PDFcraft in your browser; Method 2 — Mac Preview app (built-in, no download); Method 3 — Finder Quick Action, if available; Choose a method that fits your workflow; (tip); Continue with the relevant tool.
- Current FAQs: Can I merge PDFs on Mac for free? / How do I merge PDFs on Mac without Preview? / Why does Preview save my PDF merged with the original? / Can I merge PDFs on a MacBook? / Is there a limit to how many PDFs I can merge on Mac? / Can I merge PDFs on Mac without internet?
- Current internal/tool links: `/tools/merge-pdf`, `/tools/reorder-pages`.

### how-to-merge-pdf-on-windows

- File: `app/blog/how-to-merge-pdf-on-windows/page.js`
- Metadata title: How to Merge PDF on Windows Without Installing an App | PDFcraft
- H1: How to Merge PDF on Windows Without Installing an App
- Canonical/OG URL: https://getpdfcraft.com/blog/how-to-merge-pdf-on-windows
- Visible date: February 2026; catalog listing: Feb 24, 2026. No date change proposed.
- Depth: approximately 456 section/FAQ words; 6 sections; 6 FAQs.
- Current sections: Method 1 — PDFcraft in your browser; Do not treat printing separate tabs as merging; Method 2 — Evaluate a desktop PDF merger; Choose online or installed processing; (tip); Continue with the relevant tool.
- Current FAQs: Can I merge PDFs on Windows for free? / Does Windows 10 or 11 have a built-in PDF merger? / Can I merge PDFs with Microsoft Word? / Is PDFcraft safe on Windows? / Can I merge PDFs on Windows without internet? / Can I merge more than 2 PDFs at once on Windows?
- Current internal/tool links: `/tools/merge-pdf`, `/tools/reorder-pages`.

### how-to-lock-pdf-for-job-applications

- File: `app/blog/how-to-lock-pdf-for-job-applications/page.js`
- Metadata title: How to Lock PDF for Job Applications | PDFcraft
- H1: How to Lock PDF for Job Applications
- Canonical/OG URL: https://getpdfcraft.com/blog/how-to-lock-pdf-for-job-applications
- Visible date: May 2026; catalog listing: Mar 5, 2026. No date change proposed.
- Depth: approximately 662 section/FAQ words; 7 sections; 6 FAQs.
- Current sections: Should you password protect your resume PDF?; Documents to protect in job applications; How to secure job application PDFs; Format and naming tips for applications; Prepare your job application PDFs; (tip); Protection limits and runtime loading.
- Current FAQs: Should I password protect my resume PDF? / How do I combine my cover letter and resume into one PDF? / What size should my resume PDF be? / Should I send my resume as PDF or Word? / Can I lock a PDF on my phone before applying? / How do I make my PDF resume professional?
- Current internal/tool links: `/tools/compress-pdf`, `/tools/protect-pdf`, `/tools/merge-pdf`.

### secure-pdf-on-mac

- File: `app/blog/secure-pdf-on-mac/page.js`
- Metadata title: How to Password-Protect a PDF on Mac | PDFcraft
- H1: How to Password-Protect a PDF on Mac
- Canonical/OG URL: https://getpdfcraft.com/blog/secure-pdf-on-mac
- Visible date: May 2026; catalog listing: Mar 11, 2026. No date change proposed.
- Depth: approximately 554 section/FAQ words; 7 sections; 6 FAQs.
- Current sections: Method 1 — PDFcraft in your browser; Method 2 — Mac Preview (built-in, no download needed); Command-line workflows require separate verification; Choose based on the task; (tip); Protection limits and runtime loading; Continue with the relevant tool.
- Current FAQs: Can I secure a PDF on Mac for free? / How do I password protect a PDF on Mac without software? / Does Mac Preview encryption use strong encryption? / Can I secure PDFs on a MacBook? / Can I secure a PDF on Mac without internet? / Will a PDF secured on Mac open on Windows?
- Current internal/tool links: `/tools/protect-pdf`.

### compress-pdf-for-whatsapp

- File: `app/blog/compress-pdf-for-whatsapp/page.js`
- Metadata title: How to Compress a PDF for WhatsApp | PDFcraft
- H1: How to Compress a PDF for WhatsApp
- Canonical/OG URL: https://getpdfcraft.com/blog/compress-pdf-for-whatsapp
- Visible date: February 6, 2026; catalog listing: Feb 6, 2026. No date change proposed.
- Depth: approximately 378 section/FAQ words; 6 sections; 3 FAQs.
- Current sections: Try compression and inspect the result; Why a scan may barely shrink; Split by content if one file is still too large; Tools for this workflow; If sending still fails; Processing on a phone.
- Current FAQs: What is WhatsApp’s current PDF limit? / Will PDFcraft reduce image resolution? / Does PDFcraft send the file for me?
- Current internal/tool links: `/tools/compress-pdf`, `/tools/split-pdf`.

## Validation and scope result

- Content/export: 127 PASS, 0 FAIL, including internal links, canonicals, schema, all nine removed source routes and direct redirects.
- Batch 3: 17 article checks, all 12 evidence rows and 32 adversarial rejections PASS.
- Final-repair: 106 PASS, 0 FAIL. Node PDF.js reports existing DOMMatrix/Path2D limitations; this is not browser/visual verification.
- Tool documentation: 13 routes PASS; 72 unique paragraphs, 28 unique FAQ answers.
- Sitemap: 55 validated routes PASS. Redirect inventory: 17. Articles/tools: 36/13. No /lab route.
- Lint: exit 0, zero errors, three existing warnings (two img warnings and Split useCallback dependency).
- git diff --check: exit 0; existing LF/CRLF conversion notices only.
- No fresh production build was run: this task added only this Markdown research report; the existing export was checked. No application input to the prior build changed.
- SHA-256 comparison against the turn checkpoint: all 472 pre-existing files under app/components/lib/tests/scripts/data/public/docs unchanged, including all eight candidates, four protected pages, every existing evidence file and all data/lab records. The requested 320-path evidence scope is covered by this broader comparison; the tree currently contains 318 files beneath tests/evidence and three data/lab files, so those directory totals are not relabelled as the historical 320-path selection.
- Only new repository file: docs/batch4b-differentiation-plan-2026-10-19.md. No article, product, metadata, date, redirect, sitemap or indexability changes; no commit/deployment.

BATCH 4B DIFFERENTIATION PLAN READY ? IMPLEMENTATION AUDIT REQUIRED
