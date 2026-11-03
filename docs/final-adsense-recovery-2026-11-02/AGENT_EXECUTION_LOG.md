# Actual agent execution

This mission used actual independent Codex subagents across interrupted execution segments. Earlier agents no longer appear in the live roster; their saved work and resumed follow-ups are retained. Do not interpret a resumed report as an uninterrupted original run.

| Workstream | Actual agent/task | Delivered evidence and integration |
|---|---|---|
| A: PDF correctness/security | `a_pdf_security`, resumed `a_history_resolution` | Original findings informed handler fixes; persisted historical-source analysis and replay scripts in `agent-a/`. Lead reran both retained-input replay scripts after restoring the renderer: 12 compression and 22 preservation cases PASS. |
| B: editorial | `b_editorial`, resumed `b_editorial_resume` | `agent-b/REPORT.md` explicitly reconstructs the interrupted review by reading all 31 articles and 13 tool entries; 23 KEEP / 8 IMPROVE. Lead integrated the eight bounded changes. |
| C: SEO/live crawl | `c_seo` | `agent-c/production-crawl.json`, `URL_MATRIX.md`, crawler; 78 URL requests and 59 referenced assets, actual live HTTP evidence. No duplicate audit substituted for this completed run. |
| D: browser | `d_browser_resume`, `d_browser_finish`, resumed `d_final_run` | `agent-d/browser-audit.cjs`, baseline and candidate runs, screenshots/downloads and final report. Failed runs are retained; final corrected harness executes 300 responsive / 13 primary / 15 supplemental checks. |
| E: policy/dependencies | Independent policy/security workstream, saved report | `agent-e/POLICY_AND_TRUST_REVIEW.md`, exact-version/advisory inventory and collector. No fabricated compliance verdict or exploit proof. Lead refreshed physical installed-version triage after successful npm ci. |
| Lead | `/root` | Product integration, source-review gate, regression tests, fresh quality gates, replay execution and report assembly. Only the lead integrates product changes. |
| F: independent red team | `/root/f_independent_red_team`, invoked after implementation and verification | Independently reproduced F01's stale documentation hash; independent checks and final decision are authored by F in `INDEPENDENT_RED_TEAM.md`. |

## Evidence chronology and corrections

1. Initial mobile defects and zero-page/cancellation findings were implemented without replacing established PDF-copy/navigation behavior.
2. Browser baseline first encountered sandbox CDN access restrictions; network-enabled test evidence is separately labeled.
3. Candidate run found Contact overflow at 320 px; padding/wrapping was fixed. Menu locator was corrected to recognize the accessible-name change.
4. Historical hash failure was traced to byte normalization and deliberate current validation changes. Immutable measurements were preserved; exact current-source review and retained-input replays were added.
5. npm ci first failed on a Windows locked binary, then completed. Missing isolated canvas first left two preservation render cases NOT TESTED; after restoring the exact runtime all 22 passed, with the incomplete report preserved.
6. Browser `final-verified` passed all primary flows but exposed three harness errors: immediate URL assertion before navigation and two cancellations before PDF.js had initialized a worker. `final-verified-retry` waits for navigation and an initialized worker handshake, and captures console errors separately. Failed evidence is retained.
7. Final editorial synchronization corrected Page Numbers documentation; build and focused documentation/content validation repeated. Functional browser evidence remains tied to its recorded export, with final-export follow-up recorded separately.

8. F reproduced a source-review failure introduced by that final documentation edit. Lead preserved the failed state, reran both replays, generated a narrowly validated review with `agent-a/record-doc-sync-review.cjs`, and passed all affected integrity/publication/preservation/editorial checks. F independently verifies closure; earlier failures are not erased.

No agent report is treated as proof beyond its actual scope. Independent review completion is not an AdSense approval prediction.
