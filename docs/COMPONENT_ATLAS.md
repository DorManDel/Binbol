# BinBol Component Atlas · v0.3

This is an index of ideas the user explicitly supplied in the BinBol design discussion and screenshot. The status describes **BinBol integration**, not the capabilities of the linked third-party implementation. The demonstration cards on `dev.html` are small **original examples**, not imported code from the referenced libraries.

| Reference | Source / reference | Planned BinBol use | Status at v0.3 |
| --- | --- | --- | --- |
| Matrix Master Pro | https://matrix.logic-wire.de/ | Three-depth binary/glyph rain background | **Used:** independent canvas rendering |
| Liquid Glass / Glass Slider | https://freedesignmd.com/components/glass-slider | Hero material, settings / Gamma slider | **Used:** CSS glass only; **prototype:** tactile slider; not optical displacement |
| Hover Transitions | https://freedesignmd.com/r/hover-transitions.json | CTA spotlight revealing boundaries | **Used:** custom pointer highlight |
| Floating Capsule Nav | https://freedesignmd.com/r/floating-capsule-nav.json | Header navigation | **Used:** custom capsule |
| Dither Logo | https://freedesignmd.com/r/dither-logo.json | Decompose binary digits and glyphs during transition | **Prototype:** dots; shader not integrated |
| Liquid Metal collection | https://freedesignmd.com/components#cat-liquid-metal | Tiny metallic accents, not whole page | **Prototype:** CSS sheen |
| Count-up Stats | https://freedesignmd.com/components/count-up-stats | Symbol Explorer / sourced measurements | **Prototype:** count-up example |
| Spec Sheet | https://freedesignmd.com/r/spec-sheet.json | Bitfield / benchmark inspector | **Prototype:** compact specimen |
| Booking Nav | https://freedesignmd.com/r/booking-nav.json | Phase progression in Mechanics Lab | **Planned** |
| Hero Climate Data | https://freedesignmd.com/r/hero-climate-data.json | Metric hero / research readouts | **Planned**; no fabricated live data |
| Text Reveal on Scroll | https://freedesignmd.com/r/text-reveal-scroll.json | Guided explanation only, not long landing | **Planned** |
| Magnetic Cursor Grid | User-supplied screenshot, browse https://freedesignmd.com/components | Project gallery & experiments | **Planned**, interactive inspiration |
| Horizontal Pin Gallery | User-supplied screenshot, browse https://freedesignmd.com/components | Project carousel, arrows on mobile | **Planned** |
| Velocity Marquee | User-supplied screenshot, browse https://freedesignmd.com/components | Optional informational ticker | **Planned**, sample is CSS loop, not scroll-velocity implementation |
| Zoom Parallax | User-supplied screenshot, browse https://freedesignmd.com/components | Transition from archive entry to project detail | **Planned**, simple sample only |
| Glass Tab Bar | User-supplied visual references, browse https://freedesignmd.com/components | Mobile lab navigation | **Planned** |
| Screenshot portfolio components | User-supplied screenshot | Layout / spacing / microinteraction references | **Visual references**, not imported |

## Source / licensing policy

- The BinBol examples in `dev.html` are original code snippets using CSS/JS; *none* of the linked components is installed or copied.
- Do not run any third-party `npx shadcn add` command directly on the framework-free site. Consider porting the idea with clear attribution and license review or changing framework only after a concrete decision.
- The prototype metrics in the mini demos are explanatory, not performance or compression benchmarks.

## Dev visibility

The page `dev.html` is **unlisted but not private**. The main navigation does not advertise it. Discover it by five quick brand taps or `Ctrl+Shift+B` on the landing, or from the Developer Library link that appears after unlocking. All files in a public static deployment remain accessible to someone who knows or guesses the URL; the gesture is a convenience mechanism, not authentication.

For true privacy, deploy `dev.html` behind access control (for example Cloudflare Access) or host the developer studio separately. Never put API keys or secrets inside it.

## Export schema

Theme: `binbol:landing:v02` from existing Appearance Studio.

Full site preset: `binbol.site-preset.v1`, with `theme` and `layout`, including visibility, copy, color overrides, safe links, hero order, logo mode, and custom cards. Browser `localStorage` is a local convenience only: exports are needed to move presets between browsers/devices.

## What a full production version still needs

1. Pixel QA on actual Android and iOS, touch target checks and logo optical readability.
2. Authenticated developer hosting if hidden code or data is private.
3. Proper compression and source-size measurements for any project-specific comparison.
4. Persistent shared authoring and safe SVG glyph editor (the current editor controls display components and allows glyph mosaic/outline comparison, not arbitrary glyph path drawing).
5. A review for embedded SVG/template compatibility and reusable versioned JSON schema before production publishing.
