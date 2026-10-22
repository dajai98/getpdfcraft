# Internal preservation evidence after destination repair

Publication is not authorized. No `/lab` integration is supplied.

`data/lab/preservation-index.json` is the registration authority for this study.
The older Lab-wide manifest is retained byte-identically (its preservation
placeholder predates this study). It must not be used to select preservation
evidence. A separate future integration review is required.

The active internal run is `preservation-20261018-postrepair-02`. It executes the
current production handlers in a simulated React/object-URL Node harness. It is
not a real browser/download test. Its source snapshots include the uncommitted
navigation helpers, so HEAD alone is not sufficient to identify the implementation.

Historical/debug runs remain immutable:

- `preservation-20261016-01`, `-02`, `-03`: before destination repair. Run 03 is
  explicitly not accepted preservation evidence even though it has a manifest.
- `preservation-20261018-postrepair-01`: after repair, but incomplete because the
  collector checked page text instead of also checking Merge's alert for an
  expected unsupported-form error. Its artifacts and failure record are retained.

The navigation fixture contains text markers, an embedded synthetic PNG, vectors,
URI and remote GoToR links, first/middle/last direct and local GoTo destinations,
legacy PDF Name destinations, a String name-tree destination, outlines, OpenAction,
metadata, varied dimensions, rotation and crop/media boxes. A separate fixture
contains an AcroForm field/value and widget. Neither is a real-world document.
Fixture dates are fixed generation inputs, not collection dates. No signed fixture
is available.

All 11 handler stages (including separate Protect and Unlock) are attempted for
both fixtures. The four page-copy handlers reject the form fixture under the
approved unsupported-structure policy. These are UNSUPPORTED results, not lost
form preservation or product failures. The other 18 executions retain 20 PDFs
(Split emits three PDFs).

Every PDF is independently reopened through PDF.js. Unencrypted navigation
fixtures additionally pass the low-level page-tree/navigation validator after
serialization; expected logical target identities, name counts, outline targets,
OpenAction policy, URI and annotation owners are checked. PDF.js page-index
inference is not used as proof of destination validity. Form fixture navigation
is NOT TESTED by that validator, whose scope excludes linked widgets. Protected
bytes reopen with the known password; the validation suite rejects absent/wrong
passwords. Unlock outputs are reparsed separately.

Measurements and raw observations are in the run's result/inspection files.
Matrices compare outputs against the operation's selected page sequence.
PRESERVED means the specific recorded observation matched, not universal fidelity.
Image/vector operator counts are structural observations; image pixels and vector
equivalence remain NOT TESTED. Grayscale's loss of text, links, forms, outlines and
vector semantics is an EXPECTED CHANGE. Text additions and rotation are expected
transformations. Metadata changes are recorded, not claimed preserved. Deletion
is not sanitization, and a watermark is not a security mechanism.

No visual review, interactive text selection, form interaction, signature validity,
browser execution, real downloads or cross-device compatibility was tested. Canvas
rendering uses a previously installed local Node canvas adapter; qpdf uses installed
WASM instead of production CDN loading. Compression has no guaranteed savings.

## Reproduction and validation

`node scripts/lab/preservation-postrepair.cjs --run-id <new-preservation-ID>` creates
a new directory exclusively. Existing run IDs and artifact names cannot overwrite
previous runs. Failed runs retain `failure.json` and cannot become active. Collection
does not automatically register or promote evidence. Reconcile every run in the
index, retaining incomplete runs as historical/debug evidence. Fixtures regenerate
deterministically; encryption salts and tool metadata timestamps may change outputs.

Run `node tests/preservation-evidence.test.cjs` for hash/index checks, source-hash
checks, fixture regeneration, independent artifact reparsing, feature derivation,
repaired target checks, negative registration tests and password rejection checks.
Run `node scripts/lab/validate-preservation.cjs` for read-only registration validation.
Neither command collects a new run. The duplicate-run test verifies rejection before
any write. Browser and visual testing require separate evidence and authorization.
