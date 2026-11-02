# v3.0.0-rc.22 — capture history and promoted pieces

Capture lists now replay actual capture events up to the current cursor, rather than subtracting board pieces from the standard starting counts. En passant uses the bypassed pawn’s square; promotion is a transformation, not a capture. A promoted queen can appear in the captured list while the original queen remains, and two captured queens are not capped at one.

Material lead is computed separately from the current board using the existing piece weights. Labels/accessibility identify the capturing side. The opponent’s row stays above and the selected player’s row below for either color; imported/spectator games use White/Black labels.

## Automated

226 unique dependency-free regressions across nineteen isolated suites. Twelve new capture checks cover empty/nonstandard material, ordinary captures, en passant, quiet and capturing promotions, captured promoted/original queens, replay prefixes, Black-side rows, import/spectator labeling, material lead and a legal standard-start sequence with promotions by both sides.

## Actual cloud Chrome

- Imported a legal sixteen-ply standard-start replay in which both sides promote, then both promoted queens are captured while the original queens remain. Selected Black for review. The upper White-captured row showed black queen/rook/pawn; the lower Black-captured row showed white queen/rook/pawn, with one actually captured pawn each.
- Undoing the last capture removed the promoted queen from Black’s captured list and showed White’s actual +9 board-material lead. Redo restored the queen capture and the equal-material position.
- At 390px width, reopened the persisted replay as Black, observed the flipped board and correct captured rows, and measured 375px client/scroll width.

## Limits

No physical iPhone Safari, installed-PWA, disconnected-startup or hardware-audio check. The displayed material count remains a simple weighted piece tally, not the Stockfish positional evaluation. A later live verification tool call timed out and the browser session reset; post-publication checks are recorded separately rather than assumed from the preview tests.
