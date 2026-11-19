# Binbol Dictionary Registry v1 — design and wire format

## Goal

Separate semantic meaning, binary identification and visual rendering. A registry contains several namespaces, each with numeric IDs for text definitions and composite recipes. An acyclic recipe may reference entries in other dictionaries.

## BND1 packet (not compatible with old BNB1)

| Field | Bytes | Notes |
| --- | ---: | --- |
| ASCII magic BNDR | 4 | Format signature |
| Version | 1 | Version 1 |
| Embedded-dictionary flag | 1 | 0 shared; 1 embedded |
| Payload strategy | 1 | 0 flat; 1 context |
| Registry fingerprint | 4 | FNV-1a, *noncryptographic* |
| Active dictionary ID | 1 | Numeric namespace |
| Payload byte count | 4 | Big-endian |
| Optional registry JSON | 4 + N | Length prefix and exact JSON |
| Payload | N | Tagged tokens |

Payload: tag 00 is literal UTF-8 with varuint byte length; tag 01 is flat dictionary+entry byte IDs; tag 02 switches dictionary context; tag 03 is an entry byte ID in context. Auto compares flat and context payload lengths and chooses the smaller.

The 16-bit *logical tile ID* (dictionary byte + entry byte) is not the complete encoded packet cost. Protocol overhead, literals, dictionary distribution and parameters count.

## Built-in demonstrations

Code includes CHECK_PLAYER, a recipe of LOAD_HEALTH, COMPARE_ZERO, JUMP_IF_LE and PRINT_ALIVE. Testing includes a composite TEST_FLOW. Messages includes English and Hebrew examples. The engine accepts user-authored text and references and preserves unmatched Unicode as lossless UTF-8 literal data.

A click on a tile reveals its ID, semantic label, expanded text and recipe references. This is a renderer and a lossless text codec, **not a C interpreter**.

## Validation and threat boundary

The registry limits dictionaries and entries, verifies each reference, rejects cyclic recipes and bounds expansion depth (12) and decoded text size (20 KB). Shared packets must use a matching registry fingerprint. FNV-1a is not authentication. Never use this demonstration for secret data; future secure transport must use established authenticated encryption and address compression side channels.

## Run and test

Open dictionary-lab.html or the standalone Binbol-Dictionary-Mobile.html. Execute node dictionary-registry-test.cjs. Export/import registry JSON and try a shared versus embedded BND1 packet on different devices by copying the text envelope.

## Related research

See the repo references for Base65536, Forth, Piet, Zstandard, Huffman coding, BPE, Protocol Buffers and relevant cryptographic standards.