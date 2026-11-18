# GlyphForge — Phased research and implementation plan

**Objective:** modular binary/semantic encoding with optional visual glyphs, repeatable measurements and educational explanations. Every phase should document *What / Why / How / Evidence / Limits*.

## Milestone 0 — Formalize the research question

- **What?** Distinguish codepoint, glyph, grapheme, token, instruction, symbol, opcode, dictionary ID and serialized byte.
- **Why?** Avoid mistaken assumptions that visually shorter source means smaller or faster machine code.
- **How?** Define representative workloads: repetitive code, natural-language text, small command streams, random binary data and numeric arrays.
- **Tools:** Markdown, JavaScript reference implementation, C native tests; later a benchmark harness.
- **Evidence:** baseline sizes and defined invariants. Verify every input can be recovered by lossless modes.

## Milestone 1 — Binary codec and glyph rendering (prototype)

- **What?** Binary ID streams at configurable widths, round-trip tests, self-contained `.glf` data files, programmable 16-bit visual MicroGlyphs.
- **Why?** Prove encoding and rendering can remain separate.
- **How?** Fixed packed IDs, aligned IDs and varints; 4×4 bit-cell renderer.
- **Tools:** `glyphforge-core.js`, `lab.html`, `vm.c`, `test.cjs`.
- **Metrics:** total output bytes (including embedded dictionary), payload bytes, encode/decode time, exact round-trip.
- **Status:** runnable educational prototype, not optimized native code.

## Milestone 2 — Semantic dictionary and restricted language (demo)

- **What?** Symbols mapping to operations or safe templates; source program -> binary bytecode -> VM; C-readable output.
- **Why?** A symbol should represent *meaning*, not merely a picture.
- **How?** Parse one registered symbol plus optional unsigned byte operand per line. Expand template operations, serialize opcodes and execute in a bounded VM.
- **Tools:** `semantic-core.js`, `studio.js`, `examples/semantic_vm.c`.
- **Metrics:** binary correctness, VM output, source UTF-8 bytes versus bytecode payload; document the dictionary and runtime dependency.
- **Status:** interactive demo; no arbitrary code execution, no native C compiler.

## Milestone 3 — Versioned dictionaries and compiler foundation

- **What?** Independent opcode namespaces, shared/embedded dictionary choice, stable IDs, content hashes and backwards compatibility.
- **Why?** A one-byte ID is useful only if sender and receiver agree on its meaning.
- **How?** Design an AST, validate types/arity, assign namespaces and produce versioned binary containers with checksum.
- **Tools:** C11 parser/VM, test harness, sample schema and fuzz testing.
- **Metrics:** deterministic decoding, corrupt-file rejection, dictionary amortization, compatibility.
- **Status:** planned.

## Milestone 4 — Adaptive optimizer and actual performance

- **What?** Compare packed 4/8/12/16/32/64-bit IDs, varints, bitfields, alignments and other codecs.
- **Why?** The best method depends on data distribution, cache behavior, word size and execution costs.
- **How?** Profile multiple sizes, record warmups, repetitions, medians/p95, total bytes, decode throughput and memory. Compare with raw, gzip/Brotli and Zstandard when available.
- **Tools:** C benchmark, WebAssembly, browser reference, statistical analysis.
- **Metrics:** storage, network bytes, encoded/decoded throughput, peak RSS, correctness, readability survey.
- **Status:** planned; browser profiler currently reports only local JS timings.

## Milestone 5 — Experimental media, authoring and integration

- **What?** File API, binary visualization for arbitrary byte arrays, explicit lossy quantization, reusable editor keyboard/palette, optional IDE plugin.
- **Why?** Explore real workflows beyond a fixed toy language.
- **How?** Separate codecs for text/code, numeric data, images and arbitrary binary; choose lossless or lossy mode explicitly.
- **Tools:** Browser File API, TypedArrays, C/WASM, optional VS Code extension.
- **Metrics:** image quality/error for lossy modes, actual transfer bytes, end-to-end latency and interoperability.
- **Status:** future research. No arbitrary shell commands are run from glyph templates.

## Experiment worksheet

| Question | Required entry |
| --- | --- |
| What? | Input type and target platform |
| Why? | One precise hypothesis |
| How? | Encoding/decoder, dictionary policy and version |
| Baseline? | Raw UTF-8 / C compiler / existing codec |
| Storage? | Payload + dictionary + headers + any needed runtime |
| Speed? | Repeated decode/encode/execution measurements |
| Reliability? | Exact round-trip or measured numerical error |
| Readability? | Human test + fallback textual representation |
| Verdict? | Result, limitations, reproducibility |