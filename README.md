# Binbol — From Binary to Symbol

> **Research prototype v0.4** · Encode the meaning. Visualize the bits.

**Goal:** Build a modular laboratory for mapping **meaning ↔ binary IDs ↔ visual glyphs**, then test whether semantic dictionaries, bitfields and adaptive encoding can reduce bytes or improve usability for specific workloads.

**What Binbol is not:** a magical new information capacity, universal compression, native C/C++ compiler, or an encryption algorithm. **A secret dictionary is not encryption.** Current BNB1 demo packets are not confidential or authenticated.

## Quick start

- **Mobile / offline:** open `Binbol-Mobile.html` (all CSS/JS in one HTML file).
- **Full studio:** open `index.html`; explore the additional binary/MicroGlyph experiments in `lab.html`.
- No server or external dependencies are required for the educational web UI. GitHub Pages can host the static site.
- **Run tests:** `node binbol-test.cjs && node semantic-test.cjs && node test.cjs`.
- **Reproduce byte-size measurements:** `node scripts/bench_example.cjs` (Zstandard requires the optional `zstd` CLI).

## Our plan — what, why and how?

| Workstream | What are we building? | Why? | Method |
| --- | --- | --- | --- |
| Binary codec | Reversible ID streams | Control storage layout | Packed IDs, alignment, varints, 4–64-bit widths |
| Semantic dictionary | Short IDs for defined phrases and operations | Reuse repeated meaning | Dictionary tokens, explicit semantics, versioning |
| Instruction profiles | Different formats for different devices | Avoid one-size-fits-all layout | Bitfields, opcodes, operand widths |
| Visual glyphs | One ID, multiple readable representations | Explore human-readable / artistic code | GlyphForge renderer and symbol palette |
| Transport | Sender and receiver agree on an ID map | Test real byte savings | `.bnb` packets, shared/embedded dictionaries |
| Security (research) | Protect encoded messages with standard cryptography | Confidentiality & integrity | Threat modeling; future vetted AEAD/E2E, *not* secret dictionary |
| Adaptive profiler | Pick the better codec for a given workload | Prove or disprove the advantage | Fair baseline comparisons and reproducible metrics |

Read the [simple Hebrew step-by-step plan](docs/ROADMAP_HE.md) and [English research overview](docs/PROJECT_OVERVIEW_EN.md).

## Current example: 8 × `player.health -= damage;\n`

| Representation | Total bytes | Notes |
| --- | ---: | --- |
| Raw UTF-8 | **200** | Full text |
| Binbol BNB1, shared dictionary | **23** | Dictionary distribution not counted |
| Binbol BNB1, embedded dictionary | **52** | Self-contained; dictionary counted |
| gzip | **48** | Node default |
| Brotli | **33** | Node default |
| Zstandard | **45** | `zstd -3` CLI |

This is **one deliberately repetitive test case**. It does not establish compression superiority, CPU speed or security. See [exact methodology and repeatable script](benchmarks/RESULTS_2026-11-18.md).

## Current demos

- Editable phrase + UTF-8 message, `BNB1` binary encoding, simulated sender/receiver, exact decoded output and mismatched-dictionary rejection; downloadable packets.
- 16-bit instruction layout: 4-bit Opcode, 2-bit Mode, 4-bit Register, 6-bit Operand. A single 8-bit ID chooses **one of 256 options**.
- GlyphScript → bytecode → JS/C educational virtual machines → equivalent C view, with user-editable safe macros.
- GlyphForge 16-bit visual glyphs and packed/aligned/variable-length ID experiments.
- Proposed security pipeline and threat-model overview; **no live encrypted channel or crypto implementation**.

## Learning & documentation

- [References and what we will test](docs/REFERENCES.md) · Base65536, Zstandard, Brotli, Huffman, BPE, ARM Bitfields, Protobuf and security standards
- [Security and encryption research (HE)](docs/SECURITY_MODEL_HE.md) · secrecy vs obfuscation, AEAD/E2E, compression side channels
- [Research roadmap in simple Hebrew](docs/ROADMAP_HE.md) · what / why / how / evidence
- [Preserved conversational message for a lecturer (HE)](docs/MESSAGE_TEMPLATE_HE.md)
- [Older concise lecturer message (HE)](docs/MESSAGE_TO_LECTURER_HE.md)
- [Benchmark plan](docs/BENCHMARK_PLAN.md) · [Architecture](docs/ARCHITECTURE.md) · [Research phases](docs/PHASES.md)

## Status & safety boundaries

Educational prototype hosted in this repository. GitHub Pages may require separate configuration; publication status is not implied. `BNB1` uses a **noncryptographic 16-bit dictionary checksum**; it is not a MAC/signature, and uploaded packets are not authenticated. The bytecode VM is intentionally constrained and does not execute arbitrary shell commands. Lossy quantization is a **separate future experiment**, never implicit in lossless mode.