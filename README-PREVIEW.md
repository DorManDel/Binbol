# BinBol Studio · Landing v0.3

**From Binary to Symbol** · local review build

This version preserves the visual direction agreed for the BinBol landing and expands the **working v0.2 template** into an editable component studio. No React dependencies, no CDN requirements, and no third-party component code installed.

## Open

- `index.html` — actual landing, mobile and desktop responsive, custom Matrix rain, inline binary/glyph SVG wordmark, icon, two CTAs, repository access.
- `BinBol-Landing-Standalone.html` — a self-contained landing preview (CSS, JavaScript, SVG inlined). Best for one-click preview or direct file opening.
- `dev.html` — interactive mechanics library with 17 cards, status, reference links, mini demonstrations, and a live `index.html` iframe. **Requires the whole folder**; best opened via local static server.
- `explorer.html` — preserved explorer preview from previous package; current full GitHub repository has its own active explorer.
- `docs/COMPONENT_ATLAS.md` — exact component list and usage status.

From the unzipped site folder, optional local HTTP preview:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/index.html and http://localhost:8080/dev.html.

## Appearance Studio

Open the sliders icon, then **Parts**. Available controls:

- Toggle each header, nav item, logo, headline, legend, action, utility and footer on/off.
- Change text and safe destination links; choose per-object color overrides.
- Reorder hero components with up/down controls; the top-level hero stays readable.
- Add/edit/disable/remove safe custom text-and-link components.
- Switch the `Bol` wordmark between glyph mosaic (v0.3) and previous outline (v0.2).
- The original Colors, Matrix, Glass, Motion sliders and color presets remain.
- Save a named variation; export **Full site preset** JSON, Theme JSON, CSS tokens, or standalone HTML using the existing exporter. Import the full preset back with the existing JSON import field.

The site icon is a hexagon with 3 binary rows, a diagonal separator and one line of small glyph marks. The bottom decorative arcs are removed.

## Developer library visibility

`dev.html` does not appear in main site navigation. Unlock with `Ctrl+Shift+B` or five rapid clicks/taps on the BinBol brand logo. The Developer Library link then becomes visible inside Appearance Studio. This is **obscurity only**, not an access control or password system. If the public GitHub Pages site hosts `dev.html`, everyone can load it directly by URL. Host privately or protect using an external access layer before using it for confidential development.

## Scientific / engineering notes

A visual glyph count is not a wire-size or binary compression measurement. The new landing icon and glyph mosaic are renderings of visual symbols, not proof of a novel data format.

The full original `studio.html` and `lab.html` are in the GitHub repository and must be retained when this landing eventually replaces `index.html` on the feature branch; they are not part of this review ZIP.

## Review status

Chromium headless tests: desktop 1440×900 and mobile 390×844, no JS page errors or page-level horizontal overflow. Component editor visibility, custom component add and dev gallery 17 cards exercised. More detailed real-device/keyboard and round-trip testing needed before publishing.
