# BinBol — safe branch preview

Working branch: `preview/binbol-landing-v04` (root `index.html`).

## What is changed
- `Bin` and `Bol` now share the same 13-row letter grid, 11-unit character pitch, consistent B shape and matching SVG `viewBox` (306 × 168).
- `Bin` is made of repeating ASCII bits; `Bol` uses the existing vector glyph alphabet on the same typographic grid.
- The complete Studio v0.3 landing, editable Parts, presets, GitHub link, Matrix engine, Explorer and unlisted Developer Library are included. The old research front page is preserved at `studio.html`.
- Main branch is untouched.

## GitHub Pages note
GitHub Pages for one repository normally has **one published site**, not an automatic independent URL for every feature branch. Selecting this branch in Settings → Pages → Deploy from a branch would publish its root as the repository's primary Pages site, potentially replacing what visitors currently see, though it does not merge code into `main`.

For a truly independent Pages preview, use a separate preview repository or a preview deployment pipeline that publishes a subpath while keeping the production artifact intact. Do not deploy this branch over the primary Pages site automatically.

A short-term browser preview can use a third-party static GitHub content renderer (e.g. raw.githack.com); its availability and caching are external and should be verified before sharing as live.

## Local smoke test
From the repository root: `python -m http.server 8080` and open `http://localhost:8080/index.html`; inspect 390px mobile and desktop. The developer library has an unlisted path (`dev.html`) and is **not** access controlled.

## Merge gate
Keep unmerged pending real-phone logo readability and layout review, regression tests of Explorer/Studio, and an explicit preview hosting plan.
