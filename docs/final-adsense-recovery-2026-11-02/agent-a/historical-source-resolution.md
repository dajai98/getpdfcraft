# Historical source resolution proposal

Scope: bounded continuation follow-up; no product, test, historical run, registration, or golden expectation changes were made by this agent. A read-only replay script is beside this report.

## Cause and exact recovery bytes

Historical artifacts are intact. Several historical tests incorrectly use the current working source file when an old source snapshot was not registered. A valid product fix therefore trips historical source equality without corrupting the historical evidence.

`tests/evidence/preservation/runs/preservation-20261018-postrepair-02/source-snapshots.json` already includes the exact archived compression page. Decode its `app/tools/compress-pdf/page.js` base64 value using `Buffer.from(value, 'base64')`. Its SHA-256 is `1bc4a7c268e12d3ce66fe8f70bb281e8b60ffd71fcc327bea6963bc770c8a8ce`, the expected value in every compression manifest. Validate the enclosing immutable snapshot using its registered digest `8659dca8e329b97e1abd1eda40a16914d265860c1e6961435f02b4f0079fefce` before extracting. Do not use `git show HEAD` or normalize line endings: HEAD compression bytes are a different hash.

The same snapshot holds exact historical `scripts/lab/preservation.cjs` bytes with SHA `c957f479381f11596b0919a25e7e757fb3611b39fefba15e6affb657b6991559`. Current bytes are `e99d2aec33d7cc5d57f97bc5a306785fa20ed32a95c7dac9901a714bf3543cb2`; current LF-normalized bytes are `b69b3ddd7c07228c5a11c7ac0f63746e62b0685aa3b761d0e22186ab3d4c1da3`. Direct line comparison after CRLF-to-LF conversion finds only one additional terminal blank line in the archive. It is not a semantic collector change.

## Recommended concrete implementation

1. Add a small historical-source resolver. For original per-run collector snapshots, retain existing snapshot resolution. For paths that now differ, resolve the immutable expected digest from validated archived bytes. It can directly read the existing preservation snapshot; alternatively extract exact bytes once to a new content-addressed directory outside existing immutable run directories, e.g. `tests/evidence/source-archive/<expected-sha>.bin`. The filename is not proof: hash the bytes and compare to the original manifest hash every time. Never rewrite manifests or registered hashes; never fall back to accepting an unrecognized current hash.

2. Use that resolver only for historical integrity in these locations:
   - `tests/compression-evidence.test.cjs:19–22`
   - `tests/compression-runs.test.cjs:29,48` (keep active collector protection at line 49)
   - `tests/compression-realworld.test.cjs:25`
   - `tests/preservation-evidence.test.cjs` historical registration/snapshot check, already enforced by `validate-preservation.cjs:44`.

3. Keep current-source protection separate. Add an explicit reviewed source-transition record with exact old/new hashes, changed files, reason (strict loading/input validation or whitespace-only legacy collector), complete current dependency hashes, replay script hash, run timestamp, retained input hashes, and results. An unknown current source or lockfile hash must still fail. In preservation `currentDependencies`, accept only the precise reviewed version, not an unconditional exemption of changed tool pages. Preserve existing mutation rejection tests and add corruption tests for archived bytes and the transition/replay binding.

4. Current validation must execute the current handlers on retained inputs, rather than merely reparse old outputs. Compression replay should cover all ten active synthetic inputs and both supplemental NASA PDFs. Preservation replay should cover 22 operation/fixture records using retained navigation/form/tail inputs, expected form rejection cases, and the original exact operation options, with current `harness`, `inspect`, `assertTransformation`/independent oracle and navigation validation. Encryption outputs need semantic/password checks rather than exact byte equality; metadata timestamps also make equality inappropriate elsewhere. No new canonical historical run is necessary: an append-only recovery replay report outside old run directories is sufficient when explicitly identified as current replay, not replacement evidence.

5. Publication is a separate deliberate gate: `scripts/lab/prepare-compression-publication.cjs:47–48` must not merely switch to archived hashes. Retain fail-closed current-source checks, permitting a precise reviewed source transition only when bound to the successful current replay. Keep the historical measured source revision/hashes/dates and historical numeric observations. Clarify wording in the projection to call these retained historical measurements and describe the current replay scope separately. Keep the changed-source adversarial test in `tests/compression-publication.test.cjs:104–106`. `tests/batch3-articles.test.cjs:185` calls this projector, so fixing this gate correctly resolves its dependency failure without changing article numeric goldens.

6. Run historical integrity suites plus current replay and adversarial unknown-source/archive-tamper checks. Do not update the lockfile merely to satisfy guards. A later intentional lockfile update requires another recorded review/replay and exact archived old lockfile bytes, rather than changing historical expected hashes.

## Actual current compression reproduction

Command: `node docs/final-adsense-recovery-2026-11-02/agent-a/replay-compression-current.cjs`.

Result: 12/12 cases passed. Ten successful outputs independently reopened through PDF.js and matched the historical output's complete per-page parser observations, page count, form fields and embedded-image stream hashes. Unsupported input and encrypted input both rejected with no output. This includes the 254-page Apollo document. Some synthetic output byte lengths differ by 0–2 bytes; NASA output lengths matched. Historical numeric rows must remain historical observations. This is Node source-handler execution with simulated React/URL plumbing, not browser/download/visual proof.

Current source hashes during this replay:

```
app/tools/compress-pdf/page.js f5122ff9337600b5d2fc63ce0d53aaa8e97e23be73401b94dde1a3371fa9f7c2
components/hooks/useGeneratedResult.js 9339b89373ac431390938a5e0fdd0234210f7f72382adc223cb67c28d572a4f5
lib/pdfInput.js 1ecb23b28e6f1db46b2fc030faf13d2fcef1d3b9de9f361f8c888f502ecd24a5
package-lock.json 1b26912f3edd6be0d1c55808dc427a70810fa5637e371182ba481090ed82063e
scripts/lab/collect-compression.cjs fa76bd8df9fafde98762fa55e3873b405519733dfaf6349b15d24143235a6ae4
```

Cost: archive lookup/helper and four historical loops are small changes. Correct publication/current-source review binding and preservation current replay are the substantive work. The compression replay completed in well under a minute on this environment. A blanket exemption or golden rewrite is faster but would not establish current behavior and is not recommended.
