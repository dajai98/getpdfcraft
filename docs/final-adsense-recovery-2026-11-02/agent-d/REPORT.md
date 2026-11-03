# Agent D: final candidate browser verification

Verified 3 November 2026, Asia/Riyadh. Final complete run: **PASS**, exit 0. This is local static-export candidate evidence, not deployed-production verification or release-wide approval.

## Evidence and exact results

- [Final structured evidence](final-verified-retry/results.json), [full execution log](final-verified-retry.log), [browser harness](browser-audit.cjs).
- Run started 2026-11-03T00:15:28.635Z; headless Microsoft Edge 156.0.4314.58, Windows. Export files were served over loopback HTTP; actual PDF worker dependencies could load over the network. Evidence records the harness SHA-256 and four representative exported HTML hashes/mtime values.
- **300/300 responsive checks passed**: all 50 sitemap pages at 320, 360, 390, 768, 1280 and 1440 pixels; zero document overflow and zero measured offscreen navigation/main controls. Contact at 320 pixels now has document width 320 pixels. The 13 completed tool states at 390 pixels also had zero measured overflow/offscreen controls.
- **13/13 primary tools passed**: merge, split, compress, rotate, watermark, protect, unlock, JPG/PNG to PDF, PDF to image, delete pages, page numbers, reorder, grayscale.
- **15/15 supplemental cases passed** (listed below).
- **1/1 consent sequence passed**: ad-script request count 0 before choice, 0 after decline, 2 after accept, still 2 after withdrawal/reload; stored choice was declined. Ad responses were intercepted with harmless JavaScript, so no actual ad delivery was exercised.
- Zero uncaught page errors or browser dialogs; zero recorded primary-workflow request failures. One recorded console error was the expected QPDF diagnostic, `this.program: /input.pdf: invalid password`, during deliberate wrong-password testing. The UI rejected that password and then successfully retried with the correct one. No unexpected critical console error was observed.

## Output checks

All downloaded PDF primary outputs were reopened with PDF.js 4.4.168, independently of the pdf-lib producer. Assertions checked relevant page identities/order/count, rotation, physical dimensions, added text and readable content. All primary PDF outputs rendered nonblank in browser PDF.js. Grayscale outputs had equal RGB channels. Protect output declared AESV3/256-bit encryption and rejected missing/wrong passwords; the Unicode-password round trip preserved the three page identities.

The split workflow downloaded and parsed all three output PDFs. JPG and PNG inputs produced a two-page PDF with expected dimensions. PDF-to-image saved and checked the JPEG and PNG signatures and verified dimensions of all three rendered page previews. This suite does not claim to download every image-format/page combination or test every PDF semantic feature.

## Supplemental checks

All passed:

- mobile-navbar-keyboard
- pdf-to-image-png
- protect-unlock-unicode-wrong-password-retry
- pdf-to-grayscale-remove-replace-cancel-retry
- pdf-to-image-remove-replace-cancel-retry
- pdf-to-grayscale-active-worker-cancel-retry
- pdf-to-image-active-worker-cancel-retry
- rotate-pdf-zero-malformed-one-page
- watermark-pdf-zero-malformed-one-page
- add-page-numbers-zero-malformed-one-page
- compress-pdf-zero-malformed-one-page
- pdf-to-grayscale-raster-guard
- pdf-to-image-raster-guard
- pdf-to-image-repeated-20-pages-url-canvas-cleanup
- grayscale-repeated-url-canvas-cleanup

The menu case verified Menu → Close menu → Menu accessible names, Enter/Space activation, toggle close, Tab to the first link, Escape and focus restoration, link activation, and five visible desktop links.

The stale-read cases deliberately held and rejected an obsolete File.arrayBuffer read after remove/replace; no stale error, progress or download appeared, and retry succeeded. Initialized-worker cases allowed the worker handshake, held its first GetDocRequest, removed the source, observed termination, and retried successfully. Both cases recorded two workers started and two terminated over cancellation plus retry.

Raster guards rejected a 3000×3000-point page before oversized canvas output. The repeated image case converted 20 small pages twice, observed the first 20 URLs revoked on replacement and all 40 revoked on removal, with zero retained nonzero canvas dimensions. Grayscale similarly revoked both generated URLs after two runs and removal. These are deterministic lifecycle checks, not physical-device peak-memory measurements.

## Preserved failures and test corrections

[Previous final evidence](final/results.json) remains unchanged: 300 responsive checks, one confirmed 8-pixel Contact overflow at 320 pixels, all 13 tools passed, and a menu test timed out because its fixed accessible-name locator stopped matching after the button became Close menu.

[First continuation-4 run](final-verified/results.json) also remains unchanged: all 300 responsive checks and 13 tools passed; 12/15 supplemental cases passed. Three harness failures were corrected:

1. The menu clicked Blog then compared the URL before asynchronous navigation completed. The corrected test awaits the Blog URL and retains all accessibility assertions.
2. Both active-worker cases held the worker module before PDF.js completed its handshake, then expected initialized-worker termination. PDF.js only assigns its internal web-worker reference after handshake. The corrected tests hold GetDocRequest after initialization, retain the termination assertion, and verify successful retry. They do not claim immediate termination while an external module download is indefinitely stalled.

The entire suite was rerun as final-verified-retry after those harness corrections; no app source changed between these two runs. The four recorded export fingerprints and mtimes match exactly. The final run adds explicit console-error collection and a harness fingerprint. Earlier evidence was neither overwritten nor relabeled as a pass.

## Later documentation synchronization

Tested export SHA-256 fingerprints:

| File | SHA-256 |
| --- | --- |
| out/index.html | e1901b64806b2c0bb9bb313f3ded8ce4968c7dab18f85f7b0d281cfc3eac21ec |
| out/contact.html | 4f6132b8835b1b801bdfd090b3c5bb7df6090350a561c6d1cf5b80044e41421a |
| out/tools/pdf-to-image.html | cd86bf71af7b3d908222931332644d27bce972ec1045a1611b8bd63b808d8ebc |
| out/tools/pdf-to-grayscale.html | 85df496fb68e3a9e71f4c11fce25ca7cf23109b4b80a560d399a53cd5902d025 |

Executed harness SHA-256: c9f35369c716ad2e956b67b0fabc4d1ab79cd0eac495de01cb6740b04a6f9a01.

After this browser run, the lead corrected one sentence in lib/toolDocumentation.json: page-number starting values must be positive integers, matching the already-tested handler's rejection behavior. The lead is rebuilding that documentation change and independently checking rendered wording and final layout. This report's hashes identify the export actually tested above; it does not claim this browser suite was rerun against the later documentation-only build. No handler change was reported for that synchronization.

## Limits

Headless Edge at desktop/mobile viewport sizes was tested, not physical phones, Safari, Firefox or assistive technologies. Responsive measurement and selected screenshot inspection are not a full visual or WCAG audit. Synthetic PDFs exercise defined output/lifecycle assertions; arbitrary damaged, signed, form-heavy or very large real-world files remain outside this browser suite. Node PDF.js emitted DOMMatrix/Path2D polyfill warnings during text/structure inspection; actual rendering checks ran in the browser and passed. Consent verification covers request gating and local choice persistence, not Google's policy acceptance or ad serving. Production was not deployed or changed.

Browser verification has no remaining confirmed blocker within this scope. Release-wide readiness remains subject to the lead's other checks and independent red-team review.
