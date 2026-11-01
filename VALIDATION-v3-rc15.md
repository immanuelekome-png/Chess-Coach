# v3.0.0-rc.15 — special-rule checks and promoted bishops

The material-draw shortcut previously recognized at most two bishops confined to the same square color. A promoted third bishop left the game running despite neither side having mating material. The rule now covers any number of bishops when every non-king piece is a bishop confined to that one color. Opposite-color bishops, two knights, bishop-and-knight, and positions retaining pawns are not indiscriminately drawn.

## Automated

126 unique dependency-free regressions passed, including 11 new special-rule checks: all four castles and piece destinations; forbidden check/transit and permitted attacked-rook/b-file cases; irreversible castling rights; en passant removal/expiry and horizontal pins; all four promotion pieces for both colors and capturing a castling rook; same-color multi-bishop material; non-dead material exclusions; mate/stalemate priority over 75 moves; 50-move/threefold claims versus automatic thresholds; castling/en-passant repetition keys.

## Actual cloud Chrome

- QA-only promotion fixture starts with kings, two dark-square bishops and White’s b7 pawn. Clicked b7–b8, chose Bishop, and observed the Insufficient material result and automatic review startup. Repeated through a 390px frame; client/scroll widths were 375px. These are controlled starting positions, not a naturally played promotion game or a FEN-import feature.
- QA-only castling fixture: clicked e1–g1 and observed White’s king on g1 and rook on f1 through the regular game controls.
- Fixtures change the starting position in an untracked preview copy only. They are excluded from publication. Saved-game behavior for custom starting positions was not tested; regular saves still assume the standard starting position.

## Rules reference and limits

The generalization follows the dead-position rule in FIDE Laws of Chess, Article 5.2.2; castling and automatic-draw checks refer to Articles 3.8.2 and 9.6: https://handbook.fide.com/chapter/e012023 . No quoted rule text is incorporated into the app.

This is a conservative material shortcut, not a solver for every dead position (for example, completely blocked pawn structures). No physical iPhone Safari, installed-PWA, disconnected-startup, hardware-audio or true simultaneous-tab test. Special-rule edge cases beyond these scenarios remain possible. rc.14 live concept-review verification is recorded in its validation document.
