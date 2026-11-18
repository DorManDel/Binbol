# Binbol · Security Research Track (HE)

> **Status: proposal only.** Binbol v0.4 does **not** implement end-to-end encryption. Its `.bnb` BNB1 packets are **not encrypted**, and their 16-bit dictionary checksum is **not an authentication tag**. Do not use Binbol for secrets or untrusted network traffic today.

## 1. Three different jobs

| Job | Purpose | What it does **not** do |
| --- | --- | --- |
| Semantic encoding | Represent a word, command, or typed expression by a numeric ID | Does not hide its meaning securely |
| Dictionary compression | Send fewer bytes for repetitive or predictable inputs | Does not provide secrecy, integrity or sender authentication |
| Authenticated encryption (AEAD) | Protect confidentiality and detect unauthorized changes | Does not automatically compress, authenticate user identities, prevent all replay, or establish keys |

### Why a private dictionary is not encryption

Consider `0x2A -> "Transfer 100 credits"`. If an observer sees `2A`, they cannot immediately expand it without the dictionary. However the packet still reveals repetition, frequency, sizes and timing. If any mappings become known or the dictionary leaks, the protection disappears. A malicious party can also alter the unauthenticated packet. A 16-bit noncryptographic checksum is insufficient even for robust adversarial collision resistance.

Rotating dictionary assignments may change byte patterns, but this is **obfuscation**, not cryptographic key rotation. Use well-reviewed cryptographic schemes for actual secrecy.

## 2. Two pipelines, one research project

### Already implemented (education; no encryption)

```
Text / source → Semantic dictionary → BNB1 binary bytes
               → Simulated network / saved file
               → Decoder + matching dictionary → Exact original text
```

### Proposed *protected* mode (not yet built)

```
[Endpoint A]
  Source → validate/normalize → encode & optionally compress
  → approved AEAD / secure E2E protocol
  → ciphertext + nonce + authenticated metadata → network
[Endpoint B]
  verify AEAD tag + decrypt (reject on failure)
  → check dictionary version + bounded decode → original
```

- The dictionary version and codec parameters must be authenticated along with ciphertext (e.g., as AEAD associated data, or inside authenticated plaintext). They are not necessarily secret.
- Keys must be established and held by the *endpoints*. TLS protects client-to-server channels; it is **not inherently end-to-end** if the server terminates TLS and can read the data.
- Use established libraries and standard protocols (TLS 1.3 for transport, approved AEAD modes such as AES-GCM for protected messages, or vetted E2E protocols/HPKE for the appropriate scenario). Never design a new encryption primitive or improvise key exchange.
- Standard AES-GCM schemes commonly use a 12-byte nonce and 16-byte tag. Authentication and protocol headers add bytes, making tiny packets potentially *larger* than plain Binbol. Nonce uniqueness and key handling are mandatory.
- For application messaging, also design sender authentication, device identity, key management, replay defense, version negotiation, limits on decompressed size and failure behavior. Some forward-secrecy goals need an appropriate session/ratchet design.
- **Compression side channel:** when attacker-influenced input and secrets are compressed together, observable output lengths can leak secrets (CRIME/BREACH class). Treat mixing them as unsafe unless the design separates compression contexts or avoids compression for secret-bearing content.

## 3. Experiments to run (do not confuse with production security)

| Experiment | Question | Evidence |
| --- | --- | --- |
| Dictionary known / missing | Does the format require the correct agreed dictionary? | Decode succeeds/fails; not a security proof |
| Rotate dictionary mapping | How much do byte patterns and storage cost change? | Repetition histogram and version mismatch tests |
| Plain vs encoded | Does an observer still learn message lengths/repetition? | Byte and frequency plots |
| AEAD applied using standard library | Do ciphertext tampering/wrong keys fail authentication? | Automated tamper/replay-focused tests, verified library |
| Compress then encrypt | What is the real total packet size? | Includes dictionary amortization, nonce, tag, framing and headers |
| Secret mixed with attacker input | Do lengths become correlated with guessed secret? | Controlled side-channel demo, no real secret data |

## 4. Threat model questions before implementing E2E

- Whom do we protect against: casual reader, passive network listener, active network attacker, compromised intermediary, compromised endpoint?
- Is the dictionary public, pre-installed, downloadable or private? What metadata leaks if public?
- How are peers identified and authenticated? How are encryption keys provisioned, rotated and revoked?
- How do we handle packet replay, loss, reordering, corrupted data and hostile input size?
- Are we compressing confidential and attacker-controlled data in the same context?

## Primary sources

- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html) — avoid custom cryptographic algorithms; understand key management and authenticated encryption.
- [TLS 1.3, RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html) — proven encrypted transport protocol.
- [HPKE, RFC 9180](https://www.rfc-editor.org/rfc/rfc9180.html) — standardized hybrid public-key encryption building block.
- [AES-GCM, NIST SP 800-38D](https://csrc.nist.gov/pubs/sp/800/38/d/final) — authenticated encryption.
- [Secure TLS recommendations, RFC 9325](https://www.rfc-editor.org/rfc/rfc9325.html) — CRIME/BREACH compression risks.