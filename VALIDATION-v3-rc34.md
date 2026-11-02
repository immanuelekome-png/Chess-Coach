# Chess Coach rc.34 validation

## Automated

All 385 unique dependency-free checks across 30 isolated suites passed. Fourteen saved-line checks cover full-line/future/cursor/orientation/mark persistence without native-save mutation; refresh-style reconstruction; non-overwriting branch copies; independent/hidden-review permissions versus standalone analysis; reversible removal; custom Black-to-move counters and en passant; promotion; malformed/oversized/illegal records; safe failure without replacing current analysis; bounded literal names; quota failures; active-line limits and restore limits; metadata-list performance with legal validation on open; and checkmate analysis never committing results or Academy progress. The existing 19 board-tool checks share a DOM fixture without reducing their coverage.

## Actual Chrome interaction

Desktop preview: began independent native play and opened Try moves. Played e4/e5, returned to the position after e4 (cursor 1/2), added a green d4 square, flipped the board and saved Centre reply. Engine analysis remained disabled during independent play. Closing retained the zero-move actual game. After a full refresh, Saved games → Saved analysis lines reopened cursor 1/2, Black orientation and the green mark. Played ...c5 and saved a distinct Sicilian branch copy. Both records remained listed. Removed that copy, opened Removed lines and restored it through the normal UI.

375px Chrome iframe: opened Centre reply from the library, used the Arrows tool to add e7-e5 and saved Phone arrow line. After a full refresh, the line reopened with its arrow, green square, Black orientation, cursor and future move retained. Main document client/scroll widths both measured 360px; dialog widths both measured 320px. Explicit Stockfish analysis on the reopened line completed at depth 10. The desktop library summary updated from two to three records without a reload after the phone-frame save.

## Limits

Phone-width Chrome is not physical iPhone Safari. Hardware audio and disconnected PWA startup remain unverified. Saved lines are local records rather than cross-device sync or full PGN variation trees. Only manual marks on the selected saved position are retained, and engine results are recalculated. Earlier repetition history is not reconstructed from FEN. Capacity/error fixtures are separate from actual browser evidence. Removal is reversible and no permanent-delete control was added.
