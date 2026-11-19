# Binbol — From Binary to Symbol

> **Research prototype v0.5** · *Encode the meaning. Visualize the bits.*

**Binbol** explores the connection between **semantic meaning**, **binary identifiers**, and **visual symbols**. The goal is to prototype reversible encodings, symbol-based code, shared dictionaries, and compact instruction formats — then measure when they help and when they do not.

## Try it

- **[Launch the interactive research studio](./index.html)** — offline-ready, self-contained HTML.
- **[Open the binary / MicroGlyph lab](./lab.html)** — standalone educational binary exploration.
- **[Mobile-friendly offline copy](./Binbol-Mobile.html)**.
- For a hosted phone URL, enable **Settings → Pages → Build and deployment → GitHub Actions**. The deployment workflow is in `.github/workflows/pages.yml`. The live site is not assumed active until deployment succeeds.

## Research map

| Area | Question | Initial mechanism |
| --- | --- | --- |
| Binary encoding | How much storage does an ID need? | Packed IDs, bitfields and variable widths |
| Semantic dictionary | Can frequent phrases or operations be replaced with short IDs? | Shared / embedded dictionaries |
| Visual language | Can binary instructions be rendered as readable glyphs? | GlyphForge and GlyphScript |
| Communication | When does a pre-shared dictionary save bandwidth? | Encode → transfer → decode experiments |
| Security | Can encoded data be protected? | Standard authenticated encryption **after** encoding |
| Adaptive profiles | Which layout suits a device or workload? | Benchmarks of storage, latency, memory and reliability |

A secret dictionary **does not provide cryptographic encryption**. A small visual symbol also does not automatically mean fewer transmitted bits.

## Benchmarks

The [documented example](benchmarks/RESULTS_2026-11-18.md) compares eight repetitions of `player.health -= damage;\n`, totaling 200 bytes of UTF-8. Results are intentionally workload-specific, and the pre-shared dictionary measurement excludes initial dictionary distribution.

## Documentation

- [Project overview (English)](docs/PROJECT_OVERVIEW_EN.md)
- [Roadmap in simple Hebrew](docs/ROADMAP_HE.md)
- [Research references: Base65536, Zstandard, Huffman, BPE, ARM and more](docs/REFERENCES.md)
- [Security model (Hebrew)](docs/SECURITY_MODEL_HE.md)
- [Project architecture map](docs/PROJECT_MAP_EN.md)
- [Explaining the idea (Hebrew)](docs/IDEA_EXPLAINED_HE.md)
- [Message template for a lecturer (Hebrew)](docs/MESSAGE_TEMPLATE_HE.md)
- [Research phases](docs/PHASES.md)

## Current repository status

The first GitHub commit publishes the **self-contained web demos and research documents**. The separate v0.4 source archive also contains the modular Node.js/C engine, CLI, tests and original split CSS/JS files; **those source files have not yet all been imported into this repository**. This distinction is intentional so the visible demo can work without missing dependencies.

The current virtual machine is an educational, restricted interpreter; the project does **not** implement native C/C++ compilation, real end-to-end encryption, or universally superior compression.

## Next experiments

1. Upload and review the complete modular C/JS source and executable tests.
2. Expand the semantic dictionary from a single phrase to a realistic corpus.
3. Add reproducible benchmarks for shared vs embedded dictionaries, Huffman/BPE/varints, and performance.
4. Explore adaptive instruction profiles (8/16/32/64-bit) and compare compact vs aligned access.
5. Keep security and cryptographic mechanisms separate from encoding and rendering.

## Dictionary Registry Lab v0.5

**Try [Dictionary Registry Lab](dictionary-lab.html)** or open its [self-contained mobile version](Binbol-Dictionary-Mobile.html).

The new **BND1** format extends Binbol with a dictionary of dictionaries. The `code` dictionary contains `CHECK_PLAYER`, a composite recipe referencing four individual definitions. Users can create text or recipe entries, inspect tile IDs and expansions, export/import registries, and send a `BND1:` Base64 packet or `.bndr` binary file.

| Stage | Research question | Experiment |
| --- | --- | --- |
| Compose | What should one tile mean? | Create text and preserve unmatched Unicode literals |
| Dictionary Registry | Can entries reference other entries? | Nested recipes, cross-dictionary references and cycle rejection |
| Two Computers | Can the receiver reconstruct the source? | Shared vs embedded dictionaries, registry mismatch test |
| Pipeline / Security | Where does the codec fit? | Source → dictionary → binary → RAM/decoder → glyph; authenticated encryption is separate |

A 16-bit logical tile ID does not imply the complete packet costs two bytes. Shared mode assumes an already installed matching registry, while embedded mode sends its definition. The 32-bit FNV fingerprint is **noncryptographic**; Binbol does **not** provide encryption, real networking or arbitrary program execution.

Run `node dictionary-registry-test.cjs`. Read the [Hebrew guide](docs/DICTIONARY_REGISTRY_HE.md) and [English format notes](docs/DICTIONARY_REGISTRY_EN.md).
