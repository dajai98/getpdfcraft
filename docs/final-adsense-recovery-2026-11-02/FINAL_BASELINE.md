# Final recovery baseline

Recovery continued November 2–3, 2026 in `C:\web\pdfcraft`, Windows / PowerShell. Directory date preserves the first execution segment. Original baseline: `caacbaf8f3816c6736a9d1a97f9ffc34c3973e26`; local branch: `fix/getpdfcraft-final-adsense-recovery`. This is an implementation candidate, not a deployed release. No deployment, AdSense submission or push was performed.

The baseline already contained substantial PDF preservation, navigation, compression evidence, editorial differentiation, 19 redirects and three intentional retirements. Those investments and original evidence were retained. Scope remains 50 canonical pages, 31 articles and 13 tools. There are no added article routes or retired routes in this change.

## Recovered evidence

| Baseline observation | Evidence | Result |
|---|---|---|
| Existing Node/build/content/lint/sitemap checks executed | `evidence/baseline-*.log`, `baseline-test-exits.json` | FAIL for incomplete baseline gate; original logs retained, not reported as candidate passes |
| Mobile shared navigation exceeded viewport | `agent-d/baseline*`, browser report | FAIL before correction |
| Zero-page PDFs could become successful blank outputs in four handlers | Recovery handler tests and `agent-d/final*` comparisons | FAIL before correction |
| Grayscale busy/task lifecycle did not immediately cancel on removal | Browser cancellation evidence and handler test | FAIL before correction |
| Historical collector/current-source hash comparison failed | `agent-a/historical-source-resolution.md` | FAIL as a current-source assertion; archived artifacts remained intact |
| Dependency audit | `evidence/dependency-audit.json`, Agent E classification | FAIL: 27 vulnerable package entries, not 27 distinct advisories |
| Live URLs/assets | Agent C November 2 crawl | PASS for measured HTTP behavior; exact deployed commit NOT TESTED |

## Candidate validation

`package.json` was read before execution. `npm.cmd ci --no-audit --no-fund --cache .recovery-browser/cache --fetch-retries=0 --fetch-timeout=30000` passed after one Windows locked-SWC failure; both logs remain. No dependency or lockfile upgrade was performed. Isolated Playwright and canvas test dependencies are ignored under `.recovery-browser`; canvas version 1.0.11 was restored for preservation rendering.

All 20 `tests/*.test.cjs` suite commands passed in `evidence/release-test-exits.json`. Build, lint, sitemap and content checks passed. Lint has three existing warnings (two image-element warnings and one split hook dependency warning), no errors. A final Page Numbers documentation correction was rebuilt; its pre-build stale-export test failure is retained and superseded by the post-build check. See final verdict for final gate results and explicit limitations.

Historical integrity and current behavior are separate: immutable source snapshots are authenticated, reviewed current dependency hashes are bound to 12 compression and 22 preservation replays, and unknown transitions still fail. Old numeric observations, PDFs and manifests were not rewritten. Replays are current Node handler execution; browser downloads are separately verified by Agent D.

Candidate browser tests use a local static export and headless Microsoft Edge. Viewport emulation is not physical iPhone/Safari/Android execution. Production crawl evidence predates candidate changes and does not demonstrate deployment of this branch.

Final source is committed locally as `b45ac507e6468e29e5e9db9f88e0833fdca8898f`. Independent Agent F completed review, found the final documentation hash synchronization failure, and verified its closure after fresh replays and a constrained record generator. Its independently authored report and the final verdict preserve the remaining dependency/account/deployment gates.
