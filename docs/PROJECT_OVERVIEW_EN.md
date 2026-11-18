# Binbol — From Binary to Symbol

**Tagline:** Encode the meaning. Visualize the bits.

## Why build it?

Humans prefer readable symbols and meaningful words; machines store bits. Binbol investigates whether an explicit semantic dictionary and custom binary encoding can make some workloads smaller to store or transmit, while still being understandable through an optional visual language.

## What is Binbol?

A small, test-driven research playground with three layers:

1. **Binary identity** — store numeric IDs and operand fields in packed, aligned, or variable-length formats.
2. **Semantic meaning** — attach well-defined operations, strings or templates to dictionary entries; version the dictionary and verify both endpoints agree.
3. **Visual representation** — render binary IDs as glyphs, colored patterns, or readable syntax without confusing the visual symbol with the storage format.

## What is the research question?

For a specific workload and platform, when does a compact semantic representation improve **total transport bytes, memory usage, encoding/decoding latency and human readability** relative to a conventional format?

## What does the current prototype do?

- Encode/decode arbitrary UTF-8 strings with one replaceable semantic dictionary phrase and explicit literal fallback, using a simple BNB1 packet. Users can download a packet and load it into a receiver view; no socket transport exists yet.
- Compare **pre-shared dictionary** and **self-contained dictionary** packet sizes, including actual header/payload/dictionary bytes; round-trip-check decoded data.
- Show sender → encoder → link → decoder → receiver as an interactive conceptual animation (no network sockets used).
- Split a 16-bit word into opcode (4), mode (2), register (4), operand (6); show exactly 65,536 possible bit patterns, not 65,536 independent values at once.
- Preserve the existing GlyphForge demo for microglyphs, code in symbols, C translation and an educational VM.

## What is explicitly NOT proven?

- Fewer visible glyphs do **not** imply fewer UTF-8 bytes, faster CPU execution or lower LLM token usage.
- A shared dictionary is not free — it has creation, distribution, synchronization and versioning costs.
- This toy bytecode is not a C/C++ compiler or an ARM instruction set. It does not execute user-provided shell commands.
- BNB1 is a toy learning format, not an authenticated, encrypted, production network protocol.
- Compression cannot shrink every arbitrary input losslessly; quantization may be lossy and requires error bounds.

## Suggested next milestones

- **M0:** Working local app, byte-counted transport, round-trip tests, transparent assumptions (done as prototype).
- **M1:** Multiple dictionary tokens, frequency-aware assignment, stable versioned IDs, streaming and deterministic decoder.
- **M2:** Benchmark against gzip/Brotli/Zstandard on repeating text, structured messages, source code, random data and small images.
- **M3:** C implementation with fair, repeatable CPU/RAM measurements on x86-64, ARM64 and constrained targets.
- **M4:** Semantic AST and dedicated editor with a glyph palette, macro definitions and a read-only generated C view.
- **M5:** Optional quantization as a separate, clearly labeled lossy experiment; file/image APIs only if benchmarks justify them.

## Primary metrics

`total transmitted bytes`, `dictionary bytes (amortized / shipped)`, `encode time`, `decode time`, `peak RAM`, `correct round-trip`, `editing effort`, `perceived readability`.