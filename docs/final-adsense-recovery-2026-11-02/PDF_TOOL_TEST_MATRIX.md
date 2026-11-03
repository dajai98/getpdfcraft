# PDF tool verification

Latest full functional browser evidence: `agent-d/final-verified-retry/results.json`; actual downloads, per-file hashes, screenshots and independent observations are retained beside it. Tests use headless Edge on Windows and a local static export. Inputs are synthetic unless explicitly identified as retained historical fixtures. No private customer files were used.

| Tool | Actual browser operation / independent output observation | Result |
|---|---|---|
| Merge | Two copies of a three-page input; six pages, text order 1, 2, 3, 1, 2, 3 reopened in PDF.js | PASS |
| Split | Requested groups; downloaded PDFs reopened with expected page groups | PASS |
| Compress | Real download, parser page/text checks and byte-size comparison | PASS |
| Rotate | Download reopened; actual rotation checked | PASS |
| Watermark | Added text independently extracted; output page count checked | PASS |
| Protect | Unicode opening password; output requires password and opens correctly | PASS |
| Unlock | Wrong-password rejection then correct Unicode password; output opens without password | PASS |
| JPG to PDF | Actual image inputs become expected PDF pages | PASS |
| PDF to Image | JPG and PNG downloads, dimensions and actual rendered pixel evidence | PASS |
| Delete Pages | Removed selected page; remaining order independently parsed | PASS |
| Add Page Numbers | Output numeric overlays independently extracted | PASS |
| Reorder | Changed page sequence independently parsed | PASS |
| Grayscale | Actual PDF reopened/rendered; grayscale pixel checks | PASS |

Exact selectors/options/observations are in the browser script and results; this table does not replace them. 13 primary workflows and15 supplemental checks pass. Supplemental scope includes navigation, consent, invalid/zero/one-page cases, cancellation/retry including initialized workers, repeated 20-page Blob/canvas cleanup and render guards. Browser logs contain no uncaught page errors; one expected qpdf console error belongs to deliberate wrong-password rejection and is followed by successful retry. That is not zero console output.

## Structural, historical and regression layers

| Layer / command | Counts and result | Limit |
|---|---|---|
| `node tests/final-recovery.test.cjs` |41 PASS | Source-handler harness; not a browser substitute |
| `node tests/final-repair.test.cjs` |106 PASS | Existing detailed PDF validation/geometry/security assertions |
| `node tests/navigation-repair.test.cjs` |126 PASS | Supported navigation reconstruction and failure behavior |
| `node tests/preservation-evidence.test.cjs` |60 PASS | Original saved artifacts, transformations and mutation rejection |
| `node tests/source-review.test.cjs` |6 PASS | Exact current/archive separation, corruption/unknown transition rejection |
| `node docs/final-adsense-recovery-2026-11-02/agent-a/replay-compression-current.cjs` |12 PASS:10 successful outputs,2 expected rejections | Retained-input current handler execution, including254 page NASA PDF; byte lengths may differ0–2 on synthetic files; historical numbers stay historical |
| `node docs/final-adsense-recovery-2026-11-02/agent-a/replay-preservation-current.cjs` |22 PASS;0 FAIL;0 NOT TESTED | Current handlers, parser/render/navigation observations and encrypted/password checks; not universal PDF preservation |
| All `tests/*.test.cjs` |20 suite commands PASS | Do not add nested checks to suite counts as independent test executions |

Set `PDFCRAFT_REVIEW_CANVAS=C:\web\pdfcraft\.recovery-browser\node_modules\@napi-rs\canvas` for the restored1.0.11 renderer. Initial missing-canvas evidence and earlier failures remain available; the complete current replay supersedes them only for the recorded source hashes.

No exhaustive PDF conformance corpus, low-memory physical-device matrix, forensic erasure verification or full assistive-technology audit was executed. These remain NOT TESTED, not hidden PASS entries. A successful output does not establish preservation of every form, signature, annotation or unsupported navigation feature; existing documented rejections and loss warnings remain.

Agent F independently reran 41 handler assertions, six source-review assertions, the schema suite, nine focused browser checks and 12 evidence groups. Its final browser run used the documentation-synchronized export and independently parsed a newly downloaded numbered PDF. F's first source-review FAIL and two browser-harness correction attempts remain saved. Final scoped checks pass; the [independent report](INDEPENDENT_RED_TEAM.md) retains the security and external-verification NO-GO.
