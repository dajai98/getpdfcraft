# Agent E: dependency, consent and deployment gates

Review date: **2026-11-03**. Actual independent workstream; source review, current installed-graph inspection, registry metadata and primary-source browsing. No package, application, advertising-account or deployment changes made by this agent. This is a release-blocker review, not an exploit test or legal compliance certification.

## Decision

The UX candidate can be reviewed locally, but a clean security/release signoff remains **NO-GO — VERIFICATION INCOMPLETE**. The known Next14 toolchain has unresolved advisory exposure. The site's regional ad mode/CMP and actual Auto ads placement remain unverified. Deployment parity is pending an owner-authorized deployment, not a property of a successful local build.

No evidence establishes these issues as the cause of the historical AdSense rejection. No claim of AdSense approval follows from UI or technical test results.

## Exact dependency exposure recovered

The previous [27-entry dependency matrix](../final-adsense-recovery-2026-11-02/DEPENDENCY_TRIAGE.md) and [full advisory paths/ranges](../final-adsense-recovery-2026-11-02/evidence/final-dependency-triage.json) remain the advisory inventory: **27 affected package entries, not 27 independent vulnerabilities**. Their severity distribution was 12 moderate, 13 high and 2 critical. Inherited advisories appear repeatedly through parent packages.

Fresh command `node docs/final-ux-release-2026-11-03/agent-e-evidence/recheck-installed.cjs` completed successfully. [Current installation evidence](agent-e-evidence/installed-recheck.json) rechecks all 27 entries against the current lock and physical package files: **zero locked-version changes**, with `@mapbox/node-pre-gyp` and `tar` absent from this node_modules. [npm ls evidence](agent-e-evidence/installed-before.json) completed exit 0.

| Execution surface | Observed exposure | Severity and release treatment |
|---|---|---|
| Static browser production | `output: "export"`; unoptimized images; deployed host configuration not independently attested. Browser PDF runtimes are PDF.js4.4.168, pdf-lib1.17.1, @cantoo/pdf-lib2.7.1 and qpdf-wasm0.3.0. They had no direct entry in the saved audit. | Most Next request-time server findings lack an execution surface in `out`. This is a narrower exposure finding, not proof that every shipped bundle is safe or deployed architecture matches. |
| Windows development / Next server | Installed Next14.2.5. `npm run dev` invokes Next on this Windows workspace. | **Critical upstream Windows-server RCE range applies.** Do not expose or use the affected Next server for this candidate's verification; preview static `out` through the existing static browser harness. This removes that server from the test flow; it is not a vendor-certified fix. |
| Build CSS/source-map processing | PostCSS root8.5.14 and nested Next8.4.31; source-map-js1.2.1; browserslist/baseline mapping/nanoid/parser also listed. Input is repository CSS/config, with no visitor-controlled CSS path established. | High/moderate toolchain entries remain; malicious build inputs can matter. Keep builds on trusted source and separate from untrusted uploads. Same-major fixes are feasible to investigate but must cover nested copies and pass production CSS/browser checks. |
| Lint/config/glob dependencies | ESLint8 and Next14 lint configuration inherit minimatch/glob/brace/yaml findings. No application import or visitor glob input found. | Build/lint risk rather than a demonstrated visitor exploit. Do not equate a clean lint result with vulnerability remediation. Do not force incompatible glob/minimatch majors merely to quiet the scanner. |
| Optional installation chain | `pdfjs-dist -> canvas -> @mapbox/node-pre-gyp -> tar6.2.1` retained in lock; latter two physically absent here. | Critical tar entry concerns environments installing/extracting that optional chain. Not a demonstrated browser PDF-to-tar path. Every deployment install needs assessment; blanket `--omit=optional` risks omitting Next SWC binaries. |

The [official Next Windows advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36), fetched on this review date, affects Next >=13.4 and <15.5.24 (also16.0–<16.3.3), lists patched15.5.24/16.3.3 and states no known workaround for affected Windows-hosted applications. The [official support policy](https://nextjs.org/support-policy) lists14 as unsupported,15 Maintenance LTS through2027-01-31 and16 Active LTS. These facts prevent calling a14.x patch a complete repair.

### Compatible remediation assessment

Registry metadata was read without modifying packages. [Next14 versions](agent-e-evidence/next14-versions.json) end at14.2.35. `npm.cmd view postcss@8.5.23 version` returned8.5.23; `npm.cmd view source-map-js@1.2.2 version` returned1.2.2. These are availability checks, not upgrade tests.

| Proposed scope | Feasibility and decision |
|---|---|
| Next + eslint-config-next14.2.35 | Same-major maintenance change can reduce older findings, but cannot close the critical Windows-server finding or unsupported-framework gate. Do not present it as a release fix. |
| PostCSS8.5.23 plus source-map-js1.2.2 | Narrow same-major candidates. The [upstream PostCSS disclosure fix](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp) identifies8.5.23. Root update alone leaves Next's pinned8.4.31. A scoped Next PostCSS override would need clean install, full build, CSS/visual tests and a new audit; it is not validated here. |
| glob/minimatch overhaul | No safe blanket override established. [Upstream minimatch amplification advisory](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249) lists11.0.1 patch and10.2.6 affected, while the saved npm range is broader; preserve that discrepancy instead of silently narrowing the scanner result. |
| Supported Next migration | Needed for vendor-supported Windows server remediation; requires framework/lint/React compatibility work and complete current-tool/browser/source-integrity replay. This is a separate tested migration, not a blind major update within cosmetic changes. |

The lead was sent these concrete candidates **before any package mutation**. No package change was made or claimed tested by Agent E. Existing trusted-source/static-preview mitigations reduce exposure during local work but do not close the security gate.

### Audit refresh limitation

The sandboxed `npm.cmd audit --json` failed to reach the advisory endpoint; its error is retained in [audit-before.json](agent-e-evidence/audit-before.json). A separately approved refresh was interrupted before producing JSON; [audit-refreshed.json](agent-e-evidence/audit-refreshed.json) is empty and is **not valid audit evidence**. Registry version requests succeeded. The27 count above is explicitly the saved inventory, corroborated by unchanged locked versions, **not a freshly successful scan**. A new successful registry audit is required after any dependency repair. No failure was converted to PASS.

## Advertising consent: intended regions are still unknown

Current source defaults to unanswered; advertising code is loaded only after accepted local preference. Decline leaves tools available. Withdrawal saves declined then reloads, warns that in-memory results are lost, and reports failure if storage cannot persist withdrawal. Manual placements render null. Analytics remains a placeholder and returns null. Source has no demonstrated certified CMP integration. Loading a script is not proof that an ad impression occurred.

Google's [current certified CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en), fetched2026-11-03, require a Google-certified CMP with IAB TCF integration for **personalized** ads to EEA, UK and Swiss visitors. Google's text permits non-certified traffic to be eligible for non-personalized or limited ads where supported. Thus intended personalized serving to those visitors requires a certified CMP; the custom banner alone does not establish it. Owner location is not the relevant visitor-region test. Actual target regions and account ad modes were not available, so a site-specific exemption cannot be asserted.

The separate [EU user consent policy](https://www.google.com/about/company/user-consent-policy/) requires applicable consent, records, revocation guidance and identification of parties receiving or using personal data. Switching to non-personalized ads does not automatically remove all consent duties. The [publisher content-screen policy](https://support.google.com/publisherpolicies/answer/11112688?hl=en) must also be considered for error/navigation-only screens.

| Gate | Status | Evidence needed to close |
|---|---|---|
| Source-level accepted/declined gating | REVIEWED | Existing browser tests cover preference interaction; final UX browser evidence must establish unobstructed controls and unchanged behavior. |
| Intended ad-serving regions/modes | NOT TESTED | Owner's current AdSense privacy/message and ad-serving settings, with sensitive IDs redacted where appropriate. |
| Certified CMP when personalized EEA/UK/Swiss ads intended | NOT TESTED | Certified product/CMP ID; published consent message and current vendor/purpose configuration; actual regional test session/consent signals. |
| Denial, acceptance and withdrawal network behavior | NOT TESTED for real regional ad delivery | Fresh browser sessions in each intended region, request/storage traces before choice, after decline, after accept and after withdrawal; keep PDF input synthetic. Browser geolocation emulation alone does not change IP-region delivery. |
| Auto ads on tool controls, 404 and low-content screens | NOT TESTED | Account exclusions plus actual direct404/client-navigation screenshots and network checks, and tool upload/result UI placement review. Never click live ads for tests. |
| Vendor list/privacy alignment | NOT TESTED | Actual enabled vendor inventory reconciled with disclosures and CMP. |

No activation, account configuration or deployment was performed. Keep the advertising activation gate open until owner-authorized configuration and regional verification are complete; no unsupported claim of full compliance or confirmed existing violation is made.

## Exact Cloudflare deployment-parity procedure

**Prepared; not executed.** Follow only after owner authorization to deploy. A deployment will be needed to close this gate. Cloudflare's [build configuration documentation](https://developers.cloudflare.com/pages/configuration/build-configuration/) describes command/output configuration; its [preview deployment documentation](https://developers.cloudflare.com/pages/configuration/preview-deployments/) distinguishes deployment URLs from branch aliases.

1. Freeze the reviewed local source. Record full Git commit, clean `git status --short`, Node/npm versions and SHA256 of package-lock.json. Retain successful candidate build log and a sorted manifest of each `out` relative path, byte length and SHA256. Store the manifest outside `out` to avoid self-reference. Record this review's test source fingerprints and commit linkage.
2. In the owner's Cloudflare Workers & Pages project, record project/environment, production branch, root directory, install/build commands, output directory (`out` for this configuration), runtime version, build variables by non-secret name/value where safe, and any build cache/settings affecting output. Verify no Next server adapter/Functions changed the assumed static architecture. Never save tokens/secrets in evidence.
3. Record Cloudflare deployment ID, immutable deployment URL, build log, completion timestamp and **full source commit SHA**. A branch name, successful build badge, `cf-ray`, title match or matching article text is insufficient proof of commit parity. For direct upload, retain the exact uploaded artifact manifest and upload/deployment association instead of pretending there is a Git build SHA.
4. If Cloudflare rebuilds, generate or retain a build-output manifest from that specific build. Compare the deployed bytes to that manifest. A separately rebuilt local export can have different generated chunk names/build IDs; differences require explanation and semantic verification, not an invented byte-identical result. For exact uploaded `out`, verify byte equality after HTTP content decoding. Document transformations such as email obfuscation individually, preserving raw response hashes and expected visible-email comparison.
5. Fetch the immutable deployment URL first, then `https://getpdfcraft.com`, with GET requests and timestamps. Check all50 canonical routes for200, canonical/title/H1/robots/schema and visible GetPDFCraft branding; verify50 internal route destinations and all referenced assets. Check19 redirects for direct expected301-to200, the3retired routes and a random missing path for404/noindex, plus robots.txt, sitemap.xml and ads.txt. Use the existing recovery URL matrix as the expected set; do not invent new targets.
6. Compare decoded JS/CSS/image bytes and HTML metadata to the deployment manifest. Check the domain maps to the same active deployment, not stale cache or a branch preview. Record Cloudflare response headers/caching and any substantive differences. Do not silently purge or change cache/account settings without authorization.
7. Re-run the affected browser/category/menu/focus checks and all13 PDF download workflows on that immutable candidate, then a focused custom-domain smoke test. Record browser/version, widths, output validity, HTTP/console failures, screenshots and requests. Regional CMP/ad tests are separate; a Saudi browser session cannot prove EEA/UK/Swiss behavior.
8. Close parity only when source/deployment association, served artifact evidence and route/workflow results agree. Keep local candidate readiness, live production parity, advertising readiness and AdSense approval as separate statuses. No status here implies Google approval.

## Agent E completion record

- Completed independent source/installed dependency review and current primary-source checks.
- Recovered27 historical affected entries, unchanged current locked versions,2absent physical packages; no exploit or fresh successful audit claimed.
- Proposed specific compatible partial remediation and explained why it cannot close the framework gate; no package mutation.
- Supplied region-dependent CMP decision, exact missing evidence and deployment-parity procedure.
- Product implementation, final browser tests and source-integrity checks remain the lead/other agents' scope. Agent F should challenge these conclusions against the final source and evidence.
