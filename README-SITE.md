# Binball visual landing & Symbol Explorer

A responsive, static website designed to sit at the root of the [Binbol](https://github.com/DorManDel/Binbol) repository.

## Pages

- `index.html` — binary-built wordmark, custom symbolic lettering, animated matrix-like digital rain, liquid-glass landing.
- `explorer.html` — cartridge/AGC comparison table, theoretical 4/8/12/16-bit visual token explorer, interactive Gamma Live 8-bit/256-state grid, UTF-8 text-to-tiles, real benchmark chart and source links.
- `assets/site.css`, `assets/refinement.css`, `assets/site.js`, `assets/favicon.svg` — no frameworks, npm, CDNs or external runtime requirements.

## Integrating with the existing repository

The old `index.html` is an existing self-contained research studio. Before replacing it, **copy the old file to `studio.html`** on the same branch, then install this website's `index.html`, `explorer.html` and `assets/`. Leave `lab.html`, `Binbol-Mobile.html`, docs, benchmarks and GitHub Pages workflow unchanged. The site links directly to `studio.html`.

## Local preview

Serve this folder as a static directory (e.g. `python -m http.server 8080`) and open `http://localhost:8080/`.

## Measurement notes

- Game Boy Tetris 32 KiB and Super Mario Land 64 KiB are cartridge-size examples ([source](https://chciken.com/game/boy/2026/03/21/rom-hacking-a-game-boy-game.html)). Pokémon Red 1 MiB is a cartridge-size example ([source](https://moreorless.io/game/game-file-size/data)). These are not binary source files bundled with the project.
- Apollo AGC Block II fixed memory is 36,864 × 16-bit words = 73,728 bytes (72 KiB) when parity bits are counted ([Apollo Flight Journal](https://apollojournals.org/afj/compessay.html)). Not a measure of Apollo 11 source-code text length.
- Linux 7.3's 30,962,306 code lines are **not** assumed to give any particular number of bytes ([source](https://www.phoronix.com/news/Linux-7.4-Merge-Window)). The UI compares the **published Linux 7.3 .tar.xz compressed source archive size of 162,399,360 bytes** ([Fossies archive measurement](https://fossies.org/linux/kernel/v7.3/linux-7.3.tar.xz/cloc.html)) to visual bit/token counts; this **does not represent raw source bytes, compiled binary size, or Binball compression**. No dictionary result for Linux exists.
- A width-n visual token model gives `ceil(8*bytes/n)` units, and has `2^n` possible values per token. This is a change in the **count of visible units**, not a demonstrated change to binary storage size.
- Gamma Live's tile is a two-mark abstract symbol: one mark for the high nibble, one for the low nibble; 16×16 unique combinations. It does not claim one Unicode codepoint exists per byte.
- A 200-byte recurring-line workload in the existing [research benchmark](https://github.com/DorManDel/Binbol/blob/main/benchmarks/RESULTS_2026-11-18.md) compares raw, gzip, Brotli and Binbol dictionary formats. Shared-dictionary distribution is explicitly excluded.

## Accessibility & performance

- Working keyboard controls; reduced-motion preference honored; animation pauses on background tabs.
- Canvas is a decoration layer, limited to ~30 FPS and 1.5× device pixel ratio.
- All computation runs locally; text samples are never sent to a server.

## One-command installation into an existing clone

The installer safely preserves the existing GlyphForge research studio on its first run:

```bash
python install.py /path/to/Binbol
```

The script refuses to replace an unrecognized existing index without preserving it. It never touches `README.md`, `lab.html`, benchmark data or docs.

## Mobile UX and visual-symbol design experiment (v1.1)

- Home: fixed-screen hero, actually rendered binary-built **B / i / n**, using repeated copies of each letter's correct ASCII code (B=01000010, i=01101001, n=01101110). This is an illustrative letterform, with exact 8-bit codes labeled beneath. The symbolic **ball** outline is an original SVG proposal, not a standardized font. Feature cards paginate instead of making a tall scroll.
- Explorer mobile: six scene controls **Archive / Compare / Gamma / Glyphs / Message / Research**, each with its own compact content. The Archive table uses rounded short number labels for mobile with exact numbers still present in the DOM and tooltips. No horizontal scrolling at 390px. Desktop retains the comprehensive dashboard flow.
- Gamma: existing two-mark tile remains as-is, next to an independent experimental shape×color **standalone glyph**. The 16×16 state grid remains available on demand.
- Glyph Canvas: high 4-bit nibble selects 1 of 16 SVG paths; low nibble selects 1 of 16 indexed palette colors. Full 256-value round-trip is `16*shapeIndex+colorIndex`. The displayed glyph is NOT a storage format. The initial palette uses deliberately vivid colors; the luminance variant highlights accessibility constraints.
- Color theory: RGB8 has 2^24 digital channel combinations; RGBA8 has 2^32 digital channel combinations. This is not a claim that all can be independently and reliably perceived, printed, recovered by a camera, or decoded after lossless/lossy processing. Alpha is opacity, not a blackness/white channel. A palette index must remain in the encoded data if exact decoding matters.
- Benchmark visualizations remain sourced to the 200-byte recurring-command experiment; the shared dictionary excludes distribution, and no Linux/Pokémon encoding benchmark is claimed.

### Verification

Headless Chromium smoke-tested mobile 390×844 and desktop 1440×900: JS no page errors, no horizontal overflow, mobile section switching, Gamma 0→255, shape/color mapping, and Linux archive bit count (1,299,194,880). The new source should still be reviewed by a human for visual language/readability and contrast before merging.
