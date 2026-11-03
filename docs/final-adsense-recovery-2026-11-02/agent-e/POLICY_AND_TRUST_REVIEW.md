# Agent E — policy, trust and dependency review

Reviewed 2026-11-02, Windows / PowerShell / Node 24.15.0. Scope: read-only product review; evidence/report writes only. No AdSense account access, settings changes, deployment, ad click, or resubmission. No product files changed by this agent. Source fingerprints and all exact advisory ranges are in `dependency-classification.json`; the 27-package table is in `dependency-matrix.md`.

## Decision and limits

**NOT TESTED — complete advertising-policy readiness.** The repository implements a custom advertising preference banner, not demonstrated Google-certified CMP integration. The actual account ad mode, injected CMP, regional delivery and vendor inventory remain unverified. Do not represent this banner as satisfying the personalized-ad requirements for EEA/UK/Swiss visitors. This is an unresolved activation/verification gate, not proof of the cause of the previous rejection.

**FAIL — clean dependency audit.** The saved audit reports 27 vulnerable package entries (12 moderate, 13 high, 2 critical), not 27 distinct advisories. Many entries inherit the same advisory through dependencies. The installed Next version is 14.2.5. Critical tar 6.2.1 is an optional lockfile entry and is **not installed in this workspace**. The configured production export lacks the request-time Next server features implicated in most Next advisories. That narrows exposure; it does not make the audit clean or prove the production deployment matches this configuration.

No confirmed new document-exfiltration path or intentionally misleading service was identified in the inspected implementation. This is a source review, not an assertion of exhaustive privacy or legal compliance. Tool correctness, final browser coverage and all 31 article decisions belong to the other workstreams and must be attached to the final verdict.

## Official policy sources fetched live

All links below were read through the web tool on the review date. The first required URL timed out in default/en variants, then succeeded with en-GB.

| Source | Applicable interpretation |
|---|---|
| [AdSense content and user experience](https://support.google.com/adsense/answer/10015918?hl=en-GB) | Site value, originality, substantial useful content and navigability matter. Repeated long passages and nearly identical pages deserve evaluation. This supplies no minimum article count, word count or approval probability. |
| [Manual actions report](https://support.google.com/webmasters/answer/9044175#thin-content) | Search Console manual actions are an account-specific search process. An AdSense rejection does not establish that a Search manual action exists. Actual Search Console state was not accessed. |
| [Publisher spam policy](https://support.google.com/publisherpolicies/answer/11035931?hl=en) | Google-served ads must not appear on screens violating Search spam policies; false services and doorway approaches are relevant. |
| [Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | Similar query targeting alone does not prove doorway abuse; the actual page purpose, useful answer and user path matter. Scaled content abuse concerns ranking manipulation with low-value content, irrespective of creation method. No factual basis here to label every guide AI spam. |
| [Ads on screens without publisher content](https://support.google.com/publisherpolicies/answer/11112688?hl=en) | Low-value, navigation-only and error screens are not eligible ad placements. |
| [Google CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en) | Certified CMP with TCF integration is required for personalized advertising to EEA, UK and Swiss users. Current text allows non-certified traffic to be eligible for non-personalized or limited ads where supported; therefore a missing certified CMP is not evidence that every possible ad mode is forbidden. |
| [EU user consent policy](https://www.google.com/about/company/user-consent-policy/) | Requires relevant consent, consent records, revocation instructions and identification of parties receiving/using personal data for covered visitors. Owner location does not remove the visitor-region obligations. |
| [Required privacy content](https://support.google.com/adsense/answer/1348695?hl=en) | Disclose Google/third-party advertising cookies, prior-visit personalization and opt-out. Additional vendor disclosures depend on actual third-party ad serving. |

## Implementation observations

| Check | Result | Evidence and limit |
|---|---|---|
| Source gates advertising behind accepted preference | PASS | `CookieBanner.js` defaults to undefined then saved choice/null; renders AdSense Script only when accepted. Decline/unanswered leave tools available. No claim of region-specific policy compliance follows. |
| Withdrawal implementation matches disclosed behavior | PASS | Saves declined then reloads; warns about lost in-memory files/results and existing third-party cookies. Failed persistence reports that ads remain enabled rather than pretending withdrawal succeeded. Browser revalidation remains Agent D's responsibility. |
| Custom banner is demonstrated certified CMP | NOT TESTED | No `__tcfapi`/fundingchoices/CMP integration found in application source. Account-injected behavior and regional signals unknown. |
| Manual ad units obstruct tools | PASS | `Ads.js` exports null for both placements, no reserved empty ad blocks. This does not establish Auto ads behavior. |
| Actual Auto ads placement and regional vendor behavior | NOT TESTED | Account settings and real regional ads were not inspected. Do not turn on Auto ads based solely on source inspection. |
| Analytics currently disabled | PASS | `Analytics.js` returns null for placeholder `G-XXXXXXXXXX`. Replacing this with a real ID would load analytics independently of this banner and would require separate privacy/consent review. |
| Local document processing representation | PASS | `lib/qpdf.js` supplies bytes to a local WASM filesystem; PDF.js consumes ArrayBuffer bytes. Remote requests load the worker/runtime, not document uploads. Privacy section 03 names jsDelivr and relevant tools. A grayscale fetch of a data URL is local decoding, not HTTP exfiltration. Network-interception validation is separate. |
| Security claims match configured feature | PASS | Protect uses QPDF 256-bit encryption with same user/owner password and printing/extraction permitted. Security guide explains these permissions, signatures, redaction limitations and four-character minimum not being a strength test. Unlock explicitly requires a known password. Actual encryption output needs engineering evidence. |
| Ownership/contact/corrections disclosures | PASS | About identifies Rai Dajai/Dajai Studio, publisher role and correction path; Contact offers support email and discourages private documents/passwords. Mailbox deliverability and biographical claims were not independently verified. |
| Terms ownership qualification | PASS | Excludes third-party/open-source components, trademarks and user documents from the studio ownership claim. This is not a complete distribution-license audit. |
| Privacy disclosure for actual third-party vendor list | NOT TESTED | Google cookies, prior visits and Ads Settings are disclosed, but generic references to other vendors cannot demonstrate that every enabled vendor is identified. Need actual account vendor inventory before activation. |
| Copyright originality across the web | NOT TESTED | No external plagiarism corpus or publisher-source history was examined. Editorial improvements cannot prove universal originality. Avoid claiming that they do. |
| Author/date claims | NOT TESTED | Date-provenance and publisher-label corrections are being integrated by coordinator/editorial workstream; final built HTML must verify them. |

The site uses PDFcraft for product display, getpdfcraft.com for the domain and Dajai Studio for publisher/owner. These are compatible roles, not inherently conflicting identities. Keep this convention. Do not fabricate credentials, author biographies, test results or dates to simulate trust.

## Findings and release implications

### E-POL-01 — P1 conditional regional-ad gate (potential risk)

- Files: `components/ui/CookieBanner.js`, `app/privacy/page.js`, account configuration unavailable.
- Reproduction: `rg -n '__tcfapi|fundingchoices|cookies_accepted|adsbygoogle' components app`; inspect banner accepted branch and privacy advertising section.
- Root cause: a single local preference is used to load advertising; no demonstrable certified CMP/vendor-purpose integration in repository.
- Impact: if personalized ads are served to covered visitors without a certified CMP, the documented Google requirement is unmet. Account auto-injection and actual ad mode must be checked before concluding an existing violation.
- Correction: configure and verify an appropriate certified CMP and vendor disclosures before personalized covered-region ads; otherwise ensure the actual ad configuration/region behavior is appropriate or keep advertising disabled pending verification. Do not equate a non-personalized setting with automatic exemption from all consent obligations.
- Actual change: none; no account authority used.
- Validation: source inspection PASS; actual regional CMP/ad-mode/withdrawal network verification NOT TESTED.
- Status: NOT TESTED; release/advertising activation gate unresolved. Not a supported explanation for the historical low-value decision.

### E-POL-02 — P2 error-page advertising eligibility (potential risk)

- Files: `app/layout.js`, `app/not-found.js`, `components/ui/CookieBanner.js`.
- Reproduction: root layout mounts CookieBanner for the application; accepted state has no route/content eligibility guard. 404 is an error/navigation screen.
- Root cause: global script gate concerns consent only, not ad-placement eligibility.
- Impact: Auto ads could place ads on an error screen if enabled. Script presence alone does not prove an impression or policy violation.
- Correction: exclude error/empty screens in the actual ad setup or add a tested page-eligibility guard if enabling ads. Check both direct 404 and client navigation; do not rely on pathname guessing alone.
- Actual change: none. Actual 404 ad serving NOT TESTED; source routing evidence PASS.
- Remaining risk: account rules may already exclude these screens; no account inspection performed.

### E-DEP-01 — P1 vulnerable installed Next/toolchain; conditional critical server exposure

- Files: package manifest/lock, `next.config.mjs`; full inventory in sibling JSON/Markdown.
- Reproduction: run evidence collector and `npm.cmd ls --all next pdfjs-dist tar postcss source-map-js minimatch glob brace-expansion --json`.
- Root cause: Next is exactly pinned to 14.2.5 and dependency graph includes advisory-affected versions.
- Actual change: none. Audit cleanliness FAIL, exact-version collection PASS, exploitation NOT TESTED.
- Impact: most listed Next server-actions/RSC deserialization, middleware authorization/cache, rewrites/SSRF and image optimizer advisories need a Next request-time server or features absent in a static export. Configuration sets `output: "export"` and unoptimized images. Search found no relevant user-supplied beforeInteractive script or CSP nonce flow. Production host configuration itself is unverified here.
- Additional local risk: upstream reports Windows-hosted Next server RCE for this version, fixed in 15.5.24/16.3.3. This workspace is Windows and its dev script starts Next. Do not expose an affected Windows Next server; use static-export preview for this mission. Loopback restriction reduces exposure but is not an upstream-certified fix. A Next 14 patch does not close that advisory.
- Remaining risk: a clean deployment-security signoff cannot be inferred from a successful static build. No automatic major upgrade or audit-force command is justified.

### E-DEP-02 — P2 optional vulnerable install chain

- Lockfile chain: `pdfjs-dist@4.4.168 -> optional canvas@2.11.2 -> @mapbox/node-pre-gyp@1.0.11 -> tar@6.2.1`.
- Reproduction: collector checks each node's physical package.json; canvas, node-pre-gyp and tar are absent. `npm.cmd ls` likewise shows no tar installation.
- Impact: risk during environments that install/extract optional native archives; no identified browser PDF-to-tar execution path. Do not describe it as a currently installed browser RCE.
- Correction: review the optional dependency strategy in a controlled install job or a compatible PDF.js maintenance change; upstream tar current fixes require major 7 from major 6. Do not inject a cross-major tar override without API/install verification. Do not blanket omit all optional packages without accounting for Next SWC binaries.
- Actual change: none. Vulnerable lock graph FAIL; deployed/browser exposure NOT TESTED and not established by source.

## Targeted dependency remediation candidates

These are recommendations to test in an isolated change, **not validated upgrades**. All minimums below are derived from the saved advisory ranges unless a primary source is linked. Re-audit the chosen resolution at installation time; do not use old ranges as a perpetual safety certificate.

| Package/path | Observed | Narrow candidate and limitation |
|---|---|---|
| Next + eslint-config-next | 14.2.5 | Moving together to a verified 14.2 maintenance release (at least 14.2.35 for the older listed fixes) reduces older issues but cannot clear newer server advisories whose patches begin in 15/16. Plan supported-major migration separately; no blind major upgrade. |
| Root and nested Next PostCSS | 8.5.14 / 8.4.31 | Evaluate 8.5.23+ within major 8; upstream [source-map disclosure fix](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp). Updating root alone leaves Next's pinned copy; any scoped override must pass CSS generation/render checks. Only repository-owned CSS enters current build; attacker CSS ingestion is not exposed by these tools. |
| source-map-js | 1.2.1 | 1.2.2+; recheck both PostCSS consumers. |
| postcss-selector-parser | 6.1.2 | 6.1.5+ within major 6. |
| nanoid | 3.3.12 | 3.3.18+ within major 3. Current path is build tooling; no app-provided negative/zero random-ID size. |
| baseline-browser-mapping | 2.10.29 | 2.11.0+ within major 2. |
| browserslist | 4.28.2 | 4.28.7+ within major 4; current project-controlled query/config, no visitor custom stats. |
| js-yaml | 4.1.1 | 4.3.2+ within major 4; lint/config path. |
| brace-expansion | 1.1.14 / 2.1.0 | 1.1.21+ / 2.1.7+ on their respective major branches; avoid flattening incompatible majors. |
| glob | 10.3.10 / 7.2.3 | 10.5.0+ addresses older CLI injection, but newest audit cancellation issue spans through 14.0.1. Do not call that partial patch clean. App does not invoke glob CLI with user filenames. |
| minimatch | 3.1.5 / 9.0.3 / 9.0.9 | 9.0.7+ addresses older v9 ReDoS but saved audit's new amplification range is <11.0.1. Upstream metadata lists 10.2.6 while npm range is broader; retain conservative audit finding, do not force minimatch11 into old consumers. |
| ESLint/Next lint chain | exact versions in matrix | Inherited effects from minimatch/glob/brace packages. Audit suggests ESLint4 downgrade and Next config16 major jump: neither is an acceptable automatic repair. Fix compatible transitive branches, then plan supported tooling update. |

Browser runtimes are `pdfjs-dist@4.4.168`, `pdf-lib@1.17.1`, `@cantoo/pdf-lib@2.7.1`, `@neslinesli93/qpdf-wasm@0.3.0`. None has a direct advisory entry in this saved audit. This is not proof of absence of vulnerabilities. PDF.js 4.4.168 is beyond the 4.2.67 patch for [CVE-2024-4367](https://github.com/mozilla/pdf.js/security/advisories/GHSA-wgrm-67xf-hhpq). Workers use its exact version; qpdf WASM CDN URL pins 0.3.0. Pinned third-party code remains a supply-chain dependency and can observe in-memory documents when executed; current code does not upload documents to that CDN. Self-hosting is a future resilience option, not a proven AdSense requirement.

Primary exposure references: [Next static export behavior](https://nextjs.org/docs/app/guides/static-exports), [Next Windows server RCE](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36), [middleware authorization prerequisites](https://github.com/vercel/next.js/security/advisories/GHSA-f82v-jwr5-mffw), [tar extraction resource exhaustion](https://github.com/isaacs/node-tar/security/advisories/GHSA-23hp-3jrh-7fpw), [minimatch new amplification advisory](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249), [glob cancellation advisory](https://github.com/isaacs/node-glob/security/advisories/GHSA-3g3m-2fjr-6pw4). These were fetched live; no destructive advisory proof-of-concept was executed.

## Reproducible validation and evidence

| Procedure | Result | Evidence |
|---|---|---|
| `node docs/final-adsense-recovery-2026-11-02/agent-e/collect-evidence.cjs` | PASS | Collector exits 0; generates all 27 entries, exact lock/installed versions and source SHA256 fingerprints. |
| `npm.cmd ls --all next pdfjs-dist tar postcss source-map-js minimatch glob brace-expansion --json` | PASS | Exit 0; installed graph confirms Next14.2.5, PDF.js4.4.168, two PostCSS copies and absent tar. The collector independently records physical versions for every audit node. |
| Parse saved audit (UTF-16LE BOM) | PASS | `../evidence/dependency-audit.json`; initial UTF-8 parse failed, corrected in collector. No fresh audit falsely claimed. |
| Review current source against fetched policy | PASS | Tables above and collector hashes identify scope; this is review completion, not Google compliance certification. |
| Actual certified CMP / regional requests / vendor inventory | NOT TESTED | Needs actual account configuration and regional browser evidence. |
| Auto ads on 404 / tool controls | NOT TESTED | Manual units disabled; account delivery unknown. |
| Runtime exploit tests / exhaustive third-party security review | NOT TESTED | No exploit payloads executed. |
| Targeted dependency upgrades / post-upgrade tests | NOT TESTED | No dependency changes authorized to this workstream; recommendations are not validated fixes. |

PowerShell's `npm` shim was blocked by execution policy; `npm.cmd` succeeded without changing execution policy. One shell fetch of Google failed network connection; the web tool supplied all three required Google documents, including en-GB fallback. Preserve these limitations when integrating the final release verdict.
