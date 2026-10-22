# Batch 7A: compression evidence only

Collected 15 October 2026. This is an internal, synthetic fixture study, not a public benchmark or a browser compatibility/preservation study. No `/lab` route or public assets were added.

## Exact implementation

`app/tools/compress-pdf/page.js` takes `files[0]`, calls `PDFDocument.load(await f.arrayBuffer())` with default options, and saves with `{ useObjectStreams: true }`. It uses pdf-lib 1.17.1. It does NOT call the stricter `loadPdf` wrapper in `lib/pdfInput.js`. It imports only that module's error-message classifier. No explicit image downsampling/recompression, target-size logic, deduplication guarantee or quality guarantee exists.

Processing starts on file selection. The current generation token gates publication of the result. Input changes/reset revoke the previous object URL through `components/hooks/useGeneratedResult.js`; the download is a PDF Blob named `processed.pdf`. The UI reports input/output bytes and whether the result grew. Errors containing password/encryption terms receive a password message; other errors receive the generic invalid/damaged PDF message. These classifications are messages, not an independent diagnosis of every possible parser failure.

## Method and provenance

Run command: `node scripts/lab/collect-compression.cjs` from repository root. The script compiles and executes the actual current page and hook source in a small React/URL harness. It supplies real File/Blob bytes and the installed pdf-lib. React rendering, object URLs and download controls are simulated. No actual browser, file picker or downloaded file is exercised. Output bytes are obtained from the Blob created by the handler.

All inputs are generated from repository-owned procedural instructions; no private documents, stock photography or external downloads are used. The generator creates the fixture set twice and requires matching SHA-256 hashes. Fixture metadata uses a fixed 2020 timestamp for reproducibility, not a publication date. Noise image patterns use a fixed integer seed. These are deliberately limited proxies:

- Image-heavy: seeded RGB noise in a PNG, reused on four pages; not a camera photograph or JPEG corpus.
- Scan-style: raster line patterns and background noise without a text/OCR layer; not an actual readable scanned document.
- Presentation-style: generated landscape pages with headings/bullets/vector bars; not a presentation-application export.
- Already optimized: object-stream serialization of the text fixture; not a claim of optimal compression.
- Negative: non-PDF text presented as a PDF file. Encrypted input was NOT TESTED in this collection.

`data/lab/compression.json` stores execution/environment/source hashes, every input/output hash, byte counts, percentage calculations, observed UI summaries and per-fixture evidence paths. `tests/fixtures/compression/manifest.json` records fixture provenance and hashes. All eight successful outputs and nine raw independent inspection records are retained here, including size increases and failure evidence.

Before rerunning the collector, archive the entire existing data JSON, fixture manifest and this results directory together. The current collector writes the named result files and latest JSON; do not rerun over the only copy of a prior run. The recorded script hash binds this run to its generator/harness implementation. No clock is mocked in the actual compressor. pdf-lib updates modification metadata, so output hashes and occasionally sizes can vary across dates/runs; fixed fixture hashes should reproduce on the recorded generator/runtime.

## Independent checks and observed limits

PDF.js 4.4.168 independently opened all eight outputs, extracted page text, built operator lists, inspected dimensions/rotation and parsed field/annotation data. The invalid input failed parsing as expected. Raw inspections include full extracted strings, fields and before/after metadata.

Text extraction and geometry matched for all eight outputs. The two raster-only fixtures have empty text before and after: equality does not imply selectable text. Interactive text selection is NOT TESTED. The form's parsed text value and checkbox value matched, but visual appearance and actual form interaction are NOT TESTED. The `formValuesMatch` field compares page annotation values; on documents without fields it compares empty lists. Likewise image-stream equality for a text-only PDF is vacuous; inspect the raw image inventory before interpreting it.

Supporting checks using pdf-lib found identical encoded image stream hashes and dimensions in the three image-containing fixture types. That is same-engine structural evidence, not independent pixel-quality proof. It does not establish preservation for arbitrary inputs.

Observed changes include Producer and ModDate metadata updates. The minimal input gains Info metadata and changes PDF version from 1.4 to 1.7. It grows from 595 to 726 bytes. The already-object-stream fixture grows by 50 bytes. These are valid results, not hidden failures.

The unsupported-input UI error is `This PDF could not be read. Select a valid, undamaged PDF and try again.` The raw alert text ends with `Retry`, because the harness also captures the retry button label; it is not part of the error message. PDF.js logged an object-indexing warning for this invalid input.

PDF.js also warned that DOMMatrix and Path2D could not be polyfilled. Python/Poppler and a Node canvas renderer were unavailable on PATH/in the installed project dependencies. No pixels were rendered or visually inspected. Every visual-quality observation is therefore NOT TESTED. A successful parse/operator-list build is not a visual pass.

## Interpretation

This small, deliberately constructed set demonstrates that the current operation can shrink structural overhead, barely change image-dominated inputs, increase size, or reject input. It provides no population savings estimate, fixed savings percentage, target-size capability, universal losslessness or quality-preservation guarantee. No speed benchmark was measured. No product defect was confirmed by this run. Unverified visual/browser behavior must not be labeled working based on these results.

Required follow-up within compression evidence: real photo/JPEG and scanner/application exports with documented licenses; encrypted input; actual browser execution/download and independent viewer rendering/selection; visual inspection of the existing form output. These do not authorize starting the separate browser-compatibility or document-preservation studies.

## Validation

Run `node tests/compression-evidence.test.cjs` to validate measurement arithmetic, hashes, source traceability, negative/growth retention and parsed form values. Run existing `node tests/final-repair.test.cjs` and `npm.cmd run test:content` without weakening them. The latter uses the existing export and is not a new build or browser result.
