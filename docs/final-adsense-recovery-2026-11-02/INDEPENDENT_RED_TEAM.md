# Independent red-team review

**NO-GO — VERIFICATION INCOMPLETE.** The corrected local candidate passes this independent targeted review. Release/submission remains blocked by the existing dependency gate and unverified advertising/account and deployed-candidate behavior. This is not an AdSense approval prediction or a finding about the cause of a historical rejection.

Author: actual independent agent `/root/f_independent_red_team`, November 3, 2026, after implementation and the lead's release checks. Baseline `caacbaf8f3816c6736a9d1a97f9ffc34c3973e26`; branch `fix/getpdfcraft-final-adsense-recovery`. I read the changed source, the eight supplied release reports, source-transition records and their generator, raw A/C/D evidence, and relevant tests. I made no product changes. My scripts/results are under `agent-f/`.

## Finding and verified closure

**F01 / P1: final documentation change invalidated the reviewed-source gate. CLOSED.** My first independent `node tests/source-review.test.cjs` exited 1 because `lib/toolDocumentation.json` had changed after the previous passing suite run. Expected normalized hash began `764c6cd6`; actual began `c946708f`. Thus the previously reported all-pass state was stale. The failure is retained in `agent-f/source-review.log` and was reported immediately to the lead. The guard correctly failed closed; the error was release-evidence synchronization.

The lead retained the original review/replays under `evidence/pre-doc-sync/`, reran all 12 compression and 22 preservation replay cases, and generated a new review using `agent-a/record-doc-sync-review.cjs`. I inspected that generator: it requires exactly the reviewed Page Numbers paragraph replacement, verifies all other bound dependencies unchanged, checks actual replay source and script hashes, requires complete passing rows and fresh timestamps, and runs documentation plus handler tests before writing the record. Historical byte measurements are not rewritten.

My independent closure run exits 0 with all six source-review assertions passing (`agent-f/source-review-closure.log`). I also checked the final replay file hashes, every recorded source hash against current bytes, complete passing row counts, and six separate changed-dependency injections. Those injected edits are rejected. No blanket acceptance of future source changes was introduced. The review record remains a code-review trust artifact, not a cryptographic attestation by an external authority.

## Tests I actually executed

| Independent execution | Result | Scope |
|---|---|---|
| `node tests/final-recovery.test.cjs` | 41 assertions PASS | Actual handler serialization and PDF.js inspection; zero/empty/malformed/wrong-content rejection, valid page counts, stale failures, invalid numbering, controlled grayscale cancellation on removal/replacement/unmount. |
| `node tests/source-review.test.cjs` | Initial FAIL; closure 6 PASS | Found F01, then independently verified closure. Both logs retained. |
| `node tests/batch9c-corrections.test.cjs` | PASS | Rendered schema/date adversaries, chronology/privacy and route inventory checks. The legacy summary's date terminology is not a new publication-date claim. |
| `node docs/final-adsense-recovery-2026-11-02/agent-f/independent-browser.cjs` | 9 targeted checks PASS | Final static export, real headless Edge 156.0.4314.58, 320px viewport. |
| `node docs/final-adsense-recovery-2026-11-02/agent-f/independent-evidence.cjs` | 12 evidence groups PASS | Historical integrity, public numbers, tamper rejection, raw report counts, current replay binding, dependency state. |

These are five independently executed commands, with the source-review command repeated for closure. They do not mean I reran all 20 project suites, all 300 D viewport cases, all 13 D workflows or the live crawl. Those broader results were reviewed as supporting evidence, separately from my executions. Browser harness corrections required additional attempts as described below.

The nine browser checks cover final Page Numbers instructions and empty layout; mobile navigation Enter/Tab/Escape/focus and Contact overflow; zero-page rejection in Compress, Rotate, Watermark and Page Numbers; loaded Page Numbers with short and long filenames; and invalid start `0`, retry with `3`, and an actual downloaded PDF. PDF.js independently reopened that download and extracted `AGENT F ONE PAGE  3` from its single page. There were no uncaught page errors. Screenshots were inspected: the 320px Page Numbers controls and long filename remain within the viewport and the removal control is visible.

My first browser attempt accidentally selected Next's route-announcer alert and produced false early passes for rejection cases plus a false invalid-number failure. A second selector was too narrow for Compress's `div` alert. Both attempts remain as `browser-results-initial.json` / `browser-initial.log` and `browser-results-selector-correction.json` / `browser-selector-correction.log`; neither is final acceptance evidence. Final selector `main [role="alert"]` waits for the actual tool error. Final results in `agent-f/browser-results.json` record the nonempty error messages and all nine checks pass.

## Challenge of the reported fixes

| Claim challenged | Independent assessment |
|---|---|
| R01 zero-page correctness / P0 | Reproduced all four refusals in the final browser and reran the handler suite. No successful download was exposed for those inputs. PASS within the tested corpus. |
| R02 grayscale cancellation / P0 | Read owned-task destruction and token guards; independently reran removal/replacement/unmount controlled-task tests. Inspected D's initialized-worker cancel/retry evidence. PASS for these conditions; I did not independently repeat the full real-worker experiment. |
| R03 mobile navigation / P0 and R04 Contact | Independently exercised keyboard menu/focus and measured Contact at 320px. Final Page Numbers empty/loaded/long-filename layouts also pass. D's raw 300 rows agree with its zero-overflow summary. No physical mobile or screen-reader claim. |
| R05 publication dates | Shared source no longer emits unsupported visible/schema dates. Export/schema suite passes. Historical labels remain records rather than newly invented provenance. |
| R06/R07 editorial claims | Editing title/CTA now describe page operations. The Smallpdf comparison is narrow and clearly documentation-based. I independently fetched the three official Smallpdf pages; they support the stated thumbnail/cloud, compression-level and Pro existing-text distinctions. |
| R08 resource controls | Source checks pixel/side limits before canvas allocation and aggregate encoded size before accumulating output; unpublished object URLs and canvases are cleaned up. D records guards and repeated cleanup. Bounds mitigate specific allocation risks; they do not guarantee success or universal memory safety. |
| R09/R10 input and stale error handling | Independent handler suite and browser invalid-number/retry pass. Changed error/output paths are token-guarded; this does not certify all application races. |
| R11 historical integrity | Git comparison against baseline shows no changes under `tests/evidence`, `data`, the lockfile or redirect rules. All 12 public observations independently match retained original input/output hashes and byte counts; successful arithmetic matches. Fresh replay hashes and rows verified. F01 exposed and then closed the final synchronization gap. |
| R12 dependencies | Still OPEN. Next 14.2.5 is actually installed, and the saved triage still contains 27 affected package entries. Static export narrows server-specific exposure, but cannot establish a clean development/build/install dependency gate. No exploit or fresh full audit was executed by F. |

The final eight editorial changes materially improve specific reader decisions without adding thin routes. I checked their diffs and the B matrix rather than claiming a second complete independent line-by-line review of all 31 articles. Windows execution scope stays explicitly headless; iPhone navigation does not claim device testing; downloadable compression data stays explicitly historical Node evidence. Public observation hashes are identifiers, not a claim that third-party source PDFs are redistributed.

Primary sources independently rechecked November 3: [Smallpdf Merge](https://smallpdf.com/merge-pdf), [Smallpdf Compress](https://smallpdf.com/compress-pdf), [Smallpdf Edit](https://smallpdf.com/edit-pdf). These checks confirm documented controls, not competitor output quality or a hands-on benchmark.

## Remaining release gates and limits

1. **R12 / FAIL:** dependency remediation and supported framework/toolchain validation remain unfinished. The 27 figure counts affected package entries, not unique advisories or proven exploitable production paths.
2. **G01 / NOT TESTED:** custom consent gating is not proof of applicable certified CMP configuration or real regional advertising behavior. Account/vendor settings and covered-region requests remain unverified.
3. **G02 / NOT TESTED:** actual Auto ads and 404/empty-screen exclusions require account/delivery evidence. Script presence alone proves no violation and no safe placement.
4. **G03 / NOT TESTED:** the candidate has not been deployed. Agent C's raw 78 successful route expectations and 59 successful assets were internally consistent, but measured earlier production and did not establish its exact Git identity. They cannot certify final candidate-to-live parity.

No new unresolved P0/P1 product defect was confirmed in this review; F01 is closed. Existing security and external verification gaps prevent a readiness verdict. Physical iPhone/Safari/Android, low-memory devices, full assistive technology, complete PDF conformance/preservation, forensic erasure, real advertising delivery and deployment identity were not established. No deployment, push or AdSense submission was performed by F.
