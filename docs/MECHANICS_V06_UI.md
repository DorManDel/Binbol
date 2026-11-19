# BinBol v0.6 — Mechanics UI review

- A single educational VM: 16-bit instruction word (4-bit opcode, 2-bit mode, 4-bit register, 6-bit operand).
- Eight visually distinct stages: Source, Encode, Disk, RAM, Decode, Execute, Render, Verify.
- Disk and RAM stages **illustrate** two bytes; no physical file or memory is written.
- Actual computations: 16-bit encoding/decoding; unsigned 8-bit register arithmetic; PRINT output; round-trip byte check.
- Icons and visual explanations now distinguish conceptual and computed stages.
- Gamma 8-bit view is a separate byte inspector, not the instruction operand size.
- Landing is targeted to one phone viewport, without public bottom replay/customize/footer controls.
- Developer replay is only exposed on the top bar in dev-preview mode (`?dev=1` or existing dev unlock). This is discoverability only, **not authentication**.
- UI review is provisional; confirm the semantics with the product owner before expanding the VM.
