# v3.0.0-rc.20 — positional teaching and opening-context audit

Supported knight posts now name their pawn support and distinguish current pawn attacks from possible future adjacent-file challenges. The wording does not promise permanence: pieces can exchange the knight and pawn captures can change the structure. Doubled pawns are identified by actual file occupancy. Rook-behind-passed-pawn teaching requires the pawn to be passed and the supporting line clear, for either color. King activity without queens still accounts for enemy rooks.

Promotion no longer runs ordinary pawn-structure text after the pawn has become another piece. Future positional plans are omitted after board-detectable automatic material/75-move endings, as well as mate/stalemate. Recognition is board-derived teaching, not a claim about the engine’s reason or a guarantee that a suggested plan is best.

The finite Book repertoire contains 21 legally replayed study lines rather than seven. It adds Ruy Lopez, Scotch, Petrov, Scandinavian, English/Reti, Pirc/Modern and additional Sicilian/queen-pawn lines. An opening name appears only when all matching prefixes identify the same family. Book still requires an exact prefix and loss below 60cp; a known opening cannot conceal a significant engine error. Current names and labels are rebuilt when cached raw analysis is loaded.

## Automated

202 unique dependency-free checks across seventeen isolated suites. Sixteen new audit checks cover all opening lines, ambiguous family names, error precedence, empty/beyond-repertoire histories, materialized opening context, mirrored supported-post/pawn-challenge recognition, unsupported knights, doubled pawns, clear/blocked rook support, promotion, material-draw suppression and enemy-rook king safety.

## Actual cloud Chrome

- Controlled preview position: played Nf3–e5 and received live depth 10 coaching naming d4 support, the absence of a direct adjacent-file pawn challenge and the limits of the post.
- 390px controlled preview: played Rc1–a1 and received live depth 10 coaching identifying clear support behind the passed a5 pawn, along with blockade/capture cautions. Client/scroll widths were 375px.
- Normal app: imported a ten-ply Ruy Lopez and completed real depth 10 review. All ten moves were recognized as Book at their actual low losses. Selected Bb5 and observed the named Ruy Lopez context, actual cp loss and development advice.
- Controlled starting-position fixtures are untracked preview copies and are excluded from publication. They do not add custom-FEN import to the app.

## Publication

Applied the waiting update from rc.19 and observed rc.20. Imported the ten-ply Ruy Lopez on the published site, completed real depth 10 review and selected Bb5. The detail showed Book, its actual 12cp loss and the named Ruy Lopez context. Controlled-position phone/desktop coaching checks above were performed before publication.

## Limits

No physical iPhone Safari, installed-PWA, disconnected-startup or hardware-audio test. Static recognition cues do not model every pawn transformation or calculate a full strategic plan. Opening coverage is deliberately finite and is not a full opening database or a calibrated accuracy standard. Automatic learner-rating adaptation remains future work requiring representative, assistance-aware data.
