# Mechanics Lab v0.5 — educational, deterministic VM

## What works

- Source → Encode → Disk → RAM → Decode → Execute → Render → Verify: eight selectable stages for every instruction
- Four-instruction example: `SET R0,#27`, `ADD R0,#13`, `XOR R0,#5`, `PRINT R0` — final printed output is `45`
- 16-bit instruction layout: Opcode (4 bits), addressing mode (2), register (4), operand (6)
- Every bit is independently clickable. Op, mode, register and operand fields can be edited directly.
- Execution uses a deliberately small virtual machine: 16 unsigned 8-bit registers, modulo-256 arithmetic. Mode 0 = immediate operand, mode 1 = register lookup (R0–R15), modes 2/3 reserved.
- Gamma is a **separate 8-bit view**; it can capture a VM register but is not the 6-bit operand field.
- Mobile presents Flow / Inspector as two tabs, rather than stacking a long dashboard.
- Follows the saved site theme colors if present.

## What is conceptual

- Disk/RAM steps illustrate bytes copied within a toy VM; they do not implement real OS paging, physical memory, CPU hardware or native executable opcodes.
- A glyph is a rendering, not stored compression. No file size savings are claimed.
- The original research studio is preserved on the GitHub branch as `studio.html`.

## Next improvements

- Read/write memory inspector with address animation
- Program editing and import/export (`.gfb` and JSON)
- Connected glyph/dictionary rendering and machine A/B transport
- Unified site Settings/Parts editor for Mechanics screens
- Device-based performance tests on Android and desktop
