# Binbol · Related work and study guide

This is a collection of **inspiration and baselines**, not evidence of a unique invention. Each link has a specific experiment we can reproduce and adapt. Read this together with [Benchmarks](../benchmarks/RESULTS_2026-11-18.md) and the [Security track](SECURITY_MODEL_HE.md).

| Technique / reference | What it does | Our experiment | What it does **not** prove |
| --- | --- | --- | --- |
| [Base65536](https://github.com/qntm/base65536) | Translates binary data to a high-radix Unicode text representation; nominally 16 data bits per code point | Compare number of Unicode code points, UTF-8 bytes, binary bytes and readability | Shorter visible text ≠ smaller wire size or encryption |
| [Base32768](https://github.com/qntm/base32768) | Unicode-based binary-to-text encoding designed with UTF-16 use cases in mind | Alternative glyph alphabet + byte counts | No general-purpose compression guarantee |
| [Zstandard · RFC 8878](https://www.rfc-editor.org/rfc/rfc8878.html) | General lossless compressor, supports dictionaries | Compare trained/pre-shared vs shipped dictionary and small messages | Binbol is not necessarily faster or smaller |
| [Zstandard dictionary examples](https://python-zstandard.readthedocs.io/en/latest/dictionaries.html) | Training a compression dictionary from representative samples | Compare dictionary training time, transfer cost and amortization | A dictionary is not cost-free |
| [Brotli · RFC 7932](https://www.rfc-editor.org/rfc/rfc7932.html) | LZ77-style matching, Huffman coding and static dictionary | Compare results on repeated source code and text | Built-in dictionary is not a secret |
| [Huffman original 1952 paper](https://web.stanford.edu/class/ee398a/handouts/papers/Huffman%20-%20Min%20Redundancy%20Codes%20-%20IRE52.pdf) | Shorter prefix codes for more frequent symbols | Build tiny frequency-aware codebook and compare its average bit length | Prefix codes don't add information capacity |
| [tiktoken / byte-pair encoding](https://github.com/openai/tiktoken) | Groups frequent byte sequences into token IDs | Compare token count vs raw bytes and our IDs | A GPT token is not a byte and is not necessarily a Binbol token |
| [Protocol Buffers encoding](https://protobuf.dev/programming-guides/encoding/) | Field tags, varints and known schemas provide compact structured formats | Model `field_id + type + value` for typed messages | One fixed width is not optimal for every field |
| [ARM instruction encoding](https://support.arm.com/documentation/ddi0406/c/Application-Level-Architecture/ARM-Instruction-Set-Encoding/ARM-instruction-set-encoding) | CPU instruction words split into opcode, condition and operand fields | Compare our 4+2+4+6 layout with actual documented instruction encodings | Our toy VM is not ARM and does not execute native code |
| [Unicode grapheme clusters UAX #29](https://www.unicode.org/reports/tr29/) | Defines text segmentation and explains multi-code-point user-perceived characters | Compare graphemes, code points, UTF-8 bytes and rendered glyphs | A displayed symbol need not be one code point |
| [TLS 1.3 RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html) | Authenticated encrypted transport | Keep cryptography outside the binary codec | Encoding alone does not secure a channel |
| [HPKE RFC 9180](https://www.rfc-editor.org/rfc/rfc9180.html) | Standardized hybrid public-key encryption | Consider for a future endpoint encryption scheme under review | Not a full messaging protocol with identity and replay handling |
| [NIST AES-GCM](https://csrc.nist.gov/pubs/sp/800/38/d/final) | Authenticated symmetric encryption | Include nonce/tag bytes and detect tampering | Does not perform semantic compression |
| [OWASP cryptographic storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html) | Practical guidance on threat models, key management and avoiding custom algorithms | Document security boundaries before implementing a secure layer | Secret dictionary is not a key |
| [RFC 9325 on TLS compression](https://www.rfc-editor.org/rfc/rfc9325.html) | Explains security pitfalls including CRIME/BREACH-style attacks | Test length leakage when compression mixes secret and attacker input | Compression is not always safe before encryption |

## Suggested reading sequence

1. **Representation:** binary IDs → Unicode / Base65536 → graphemes / glyph renderer.
2. **Compression:** Huffman → BPE → Brotli / Zstandard → dictionary training.
3. **Structured encoding:** varints and Protocol Buffers → Bitfields → opcode layouts.
4. **Security:** threat model → AEAD / TLS → key exchange → compression side channels.
5. **Evaluation:** same workload, same machine, comparable codec settings, exact round trips and full costs.

## Important distinction

*Adaptive Instruction Profiles* is our proposed design idea: a configuration for ID width, dictionary policy, byte alignment, VM instruction layout and target device. It is not an established universal standard. Its value must be proven experimentally.