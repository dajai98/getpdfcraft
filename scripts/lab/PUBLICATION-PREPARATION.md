# Compression publication preparation (Batch 7D)

This is an internal draft contract, not a published Lab or a completed public benchmark. The existing index and all stored evidence are unchanged. Publication status remains **INTERNAL — NOT READY FOR PUBLICATION**.

Run `node scripts/lab/prepare-compression-publication.cjs` to inspect the public-display JSON envelope on stdout. It reads existing files only: no collection, registration, file writes or web requests. `prepareInternal()` separately provides internal traceability and classification inventory; never pass that model to public rendering. Run `node tests/compression-publication.test.cjs` for the publication preparation tests. No generated copy of the numbers is stored, preventing a stale hand-maintained table.

## Classification

SAFE TO PUBLISH means the specified observation is suitable for a future carefully qualified table after review, not that publication is enabled. All ten results of hardening-02 qualify as synthetic Node observations: text-heavy, noise image proxy, scan-style raster proxy, mixed generated content, generated slides, AcroForm, object-stream control, minimal PDF, invalid input and encrypted synthetic input. Include the two failures and two growth cases alongside the reductions.

Both supplemental NASA results qualify as individual real-document Node observations: Public Access Plan and Apollo 11 press kit (archival scan). Keep their SUPPLEMENTAL role visible; neither replaces the active synthetic run. Source provenance does not establish endorsement. Publishing measurements does not automatically authorize redistribution of PDFs, artwork or review images.

All nine historical results and ten superseded hardening-01 results are INTERNAL ONLY to avoid duplicate or superseded evidence in the table. Any subsequently registered run defaults to INTERNAL ONLY until explicitly audited and approved in the projector. Raw harness diagnostics, source snapshots and the failed renderer attempt remain internal traceability material, not extra benchmark results.

Browser execution/download is BLOCKED, with test status NOT TESTED. Interactive selection, form interaction, signature preservation, exhaustive visual review, cross-browser/device coverage, real photographic-heavy PDFs and an independently observed Office export are NOT TESTED. Absence of these tests must never become PASS.

## Future rendering contract

Use the complete `prepare()` envelope and call `validateProjection(candidate)` immediately before consumption. Do not render an unchecked cached JSON file or select only favorable rows. Validation requires exact agreement with the freshly validated projection, including wording and limitations. New editorial wording requires review and corresponding contract/test changes. These guards cannot constrain an arbitrary future renderer that bypasses this API; integration tests will be required when a route is separately authorized.

Public rows use an explicit field allowlist: run ID/role, fixture ID/label/type/kind/provenance, exact input/output bytes, signed byte delta and percentage, status, bounded observation/scope, environment summary/source revision/time, input/output SHA-256 values, independent reopen status, parser comparisons and explicit untested interaction states. Visual observations include reviewed pages but no internal paths. Raw errors/warnings, path-keyed source hashes, artifact references and the historical classification inventory stay in `prepareInternal()` only. Public validation rejects internal paths and any deviation from the complete allowlisted projection, including additional diagnostic fields. Do not copy raw PDFs or diagnostic artifacts to `public/` by default.

Percentages use `(output - input) / input * 100`: positive is growth, negative is reduction. Preserve the full numeric value; display rounding must not change the underlying measurement. Failure values remain null and should display “No output”, not 0%.

The model includes the exact proposed introduction, methodology and mandatory limitations. A future page must show all seven limitations adjacent to the table, preserve synthetic/real labels and roles, and display browser/download NOT TESTED prominently. The limited six-page Codex image review is not a human or browser test.

## Publication blockers

Batch 7D requires independent audit. Publication itself needs separate authorization and a renderer that enforces this complete contract. Browser/download evidence remains blocked and must either be collected later or remain prominently disclosed. No public compatibility, visual-fidelity, form or signature guarantee is supportable. The two real documents are a small selected sample. Review source permissions separately before any public artifact redistribution. This work does not establish readiness for AdSense resubmission.
