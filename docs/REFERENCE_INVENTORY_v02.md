# BinBol — Component & Mechanic Inventory (2026-11-19)

This inventory maps the user's references to a specific place in BinBol. Inspired implementations are **not** the original React/shadcn components; the current site remains dependency-free.

| Reference | Proposed destination | v0.2 status | Why / scope |
|---|---|---|---|
| [Matrix Master Pro](https://matrix.logic-wire.de/) | **Home**, later every workspace backdrop | **Implemented original Canvas analogue** | Code rain with bright stream heads, 0/1 vs symbols, density, speed, glow, and reduced-motion controls. Not copied from the reference. |
| [Liquid Glass](https://freedesignmd.com/components/liquid-glass) | Shared **design system** across all views | **Material simulation implemented** | CSS backdrop blur, glass tint, outer glow, specular edge; true SVG displacement/refraction **not yet implemented**. |
| [Glass Slider](https://freedesignmd.com/components/glass-slider) | Settings, Gamma Live, Bitfield Designer, Glyph Forge | **Planned** | Stretched glass thumb with velocity + spring; accessible native range underneath. |
| [Liquid Metal](https://freedesignmd.com/components/liquid-metal) | Optional hero accents / future premium theme | **Deferred** | Adds cost; avoid distracting from the original logo. |
| [Dither Logo](https://freedesignmd.com/components/dither-logo) | **BinBol wordmark**, favicon reveal | **Subtle custom reveal implemented**, full dither **planned** | Logo must stay readable. Full WebGL particles depend on testing performance and fallback. |
| [Floating Capsule Nav](https://freedesignmd.com/components/floating-capsule-nav) | Global header | **Inspired capsule implemented** | Minimal translucent navbar; animated docking/scroll response later where scrolling exists. |
| [Booking Nav](https://freedesignmd.com/components/booking-nav) | Mobile header behavior | **Deferred / reference only** | Hide/reveal behavior potentially useful; actual booking UI irrelevant. |
| [Hero Climate Data](https://freedesignmd.com/components/hero-climate-data) | Explorer summary / dashboard hero | **Planned** | Live data-label atmosphere, relevant to information-scale comparisons. |
| [Spec Sheet](https://freedesignmd.com/components/spec-sheet) | Explorer Sources / Mechanics Inspector | **Planned** | Technical metadata/fields, byte accounting, data provenance. |
| [Hover Transitions](https://freedesignmd.com/components/hover-transitions) | Hero CTAs; Explorer project previews | **Spotlight reveal implemented** | Future pixel dissolve/iris views for data conversion. |
| [Text Reveal on Scroll](https://freedesignmd.com/components/text-reveal-scroll) | Technology / Research explanation | **Planned** | Controlled narrative reveal only on text-heavy views; avoid forcing home scroll. |
| [Count-up Stats](https://freedesignmd.com/components/count-up-stats) | Project Explorer / benchmarks | **Planned** | Animate credible measured numbers only; respect reduced motion. |
| [Magnetic Cursor Grid](https://freedesignmd.com/components/magnetic-cursor-grid) | Explorer project gallery | **Planned** | Project shortcuts with accessible no-hover/touch parity. |
| [Horizontal Pin Gallery](https://freedesignmd.com/components/horizontal-pin-gallery) | Known projects story | **Deferred** | Might require scrolling; use compact screen-based gallery instead if it is more ergonomic. |
| [Velocity Marquee](https://freedesignmd.com/components/velocity-marquee) | Optional research/cipher header | **Deferred** | Could distract from real data or impede accessibility. |
| [Zoom Parallax](https://freedesignmd.com/components/zoom-parallax) | Experiment entry / information museum | **Planned, after home** | One educational transition, not infinite scroll. |
| [Glass Tab Bar](https://freedesignmd.com/components/glass-tab-bar) | Mobile screen navigation | **Planned** | Liquid focus lens only once navigation is finalized. |

## Version v0.2 deliverables

- Exact display name **BinBol**. Logo is `Bin` made from repeated exact ASCII bits (`B`=01000010, `i`=01101001, `n`=01101110), and `Bol` composed of **67 vector micro-glyphs** on readable letter outlines. ASCII repetition is a typographic constraint, not a new binary compression format.
- Header icon and favicon use binary/glyph split. No generic emoji symbols.
- Custom layered digital rain Canvas with controls for color, glyph proportion, density, speed and glow; adapts to reduced motion.
- Shared Liquid Glass-inspired surface, spotlight hover-reveal, accessible buttons with SVG Play/Flask icons and separator.
- Settings Studio: seven color controls; five presets; glass/rain/motion sliders; save variations; JSON import/export; CSS export; standalone HTML export carrying the chosen theme.
- Two action paths to the preserved Explorer (Try) and its Gamma section (Experiment). No claim that the old Research Studio was rebuilt inside the Landing.

## Known limits / review gates

- The original visual mockup is a **reference**, not a pixel-perfect reproduction. Glyph architecture remains experimental; ask the user to approve the exact letterform before merging.
- This project currently simulates optical glass via CSS; a physical refractive lens implementation is a separate milestone.
- Test desktop and phone screenshot appearance and interaction in an actual device, including low-power GPU and iOS Safari (not available in Chromium smoke tests).
- All production merge/deployment remain unmodified pending user review.

## What comes after approval

1. Lock identity (logo geometry, glyph meanings, favicons).
2. Lift shared glass, typography, color, hover and settings into modular components; maintain same state contract for future pages.
3. Complete Mechanics Lab with Follow Instruction + A→B + Bitfield + Gamma synchronized inspector.
4. Glyph Forge editor (shape/color/meaning/export) and project comparisons with sources.
5. Real benchmarks: raw bytes vs visual glyphs vs packed encoded bytes vs dictionary + gzip/Brotli/Zstandard.
