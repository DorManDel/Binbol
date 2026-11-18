# GlyphForge — Research Project Brief

**Working title:** GlyphForge — Semantic Binary & Visual Language Lab  
**Type:** Experimental software engineering / programming languages / encoding systems

## Problem

Programs and data can be represented as source text, semantic structures, compact binary formats and visual symbols. These layers are often confused: a source representation with fewer visible characters does not necessarily occupy fewer bytes, reduce network cost or execute faster.

## Hypothesis

A modular representation engine that separates **semantics**, **binary encoding**, and **visual rendering**, and selects an appropriate encoding strategy per workload, can provide measurable benefits for selected use cases without sacrificing correctness.

## Proposed system

- A versioned dictionary mapping tokens, typed operations and templates to stable numeric IDs.
- A configurable codec supporting packed IDs, byte-aligned IDs, variable-length integers and eventual shared dictionaries.
- A restricted semantic language and compiler/translator to a small binary instruction set.
- A glyph renderer that presents byte sequences as grids or human-recognizable symbols.
- A benchmark harness that measures total storage cost, CPU performance, memory, reliability and human readability.

## Smallest convincing experiment

Symbolic source `◈ 10 / ⊖ 3 / ◎` is compiled to the five bytes `10 0A 30 03 40`; independent JavaScript and C interpreters execute this defined bytecode and print `7`. The symbolic program can also be rendered as equivalent C. This demonstrates a mapping of syntax to semantics to binary instructions, **not** a faster C compiler or a general compression algorithm.

## Evaluation

Measure full file bytes including dictionary/header, encoder/decoder time over repeated trials, memory consumption, exact round-trip (or quantified error for future lossy modes), and usability. Compare against raw UTF-8, mature compressors, and standard compiler output where relevant.

## Non-goals (initial scope)

Reinventing Unicode, creating a general-purpose C/C++ compiler immediately, universally compressing arbitrary files, executing arbitrary shell commands, or claiming speed improvements from shorter identifiers alone.

## Next research question

When do shared semantic dictionaries and adaptive bit-width selection outperform conventional text or binary representations on realistic workloads after including dictionary, decoding and runtime overhead?