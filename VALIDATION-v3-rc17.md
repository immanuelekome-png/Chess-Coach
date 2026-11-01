# v3.0.0-rc.17 — paste PGN for replay and review

Saved games offers a main-line import preview, review-side selector and separate Save/Open actions. Every main-line move is resolved against legal moves before a new record is written. SAN and coordinate notation are accepted, including arrows from older Chess Coach exports. Castling, captures, disambiguation, promotion and check/mate markers are checked. A recorded nonterminal result can represent resignation or agreement and remains source metadata; a result contradicting an automatic board outcome is rejected.

Imported games are replay/review records: board moves, bot continuation, draw claims and bot-game statistics are blocked. Undo/Redo and real Stockfish review remain available. Full re-export preserves players and the recorded result; partial re-export uses the result of the displayed position. Choosing New game restores normal bot play. Imports remain browser-local and do not replace the current game.

Scope: one standard-start game, up to 100,000 characters and 600 half-moves. Main-line moves are imported; comments, numeric annotations and side lines are skipped rather than stored or validated. Malformed delimiters, duplicate headers, multiple games, unsupported variants/custom starts, illegal/ambiguous moves, inconsistent results and stale previews are rejected. Import writes one new game key; storage errors cannot partially overwrite existing records.

## Automated

155 unique checks across fourteen isolated suites, including 18 new import regressions: export round-trips, SAN/coordinate/arrows, annotation skipping, en passant, promotion, disambiguation, results, malformed input, size limits, stale previews, storage errors, imported metadata, read-only/result isolation and partial/full exports.

## Actual cloud Chrome

- Desktop: pasted a nine-ply Ruy Lopez with comments, a variation and a recorded 1–0 resignation. Preview showed only the legal main line. Saved and opened as Black; the board flipped and remained unchanged after attempted pawn clicks. Undo reverted castling; Redo restored it. Real Stockfish review completed all nine plies. Re-export showed Alice/Bob and the recorded 1–0 result. Started a new normal game and played e4; the bot began its reply.
- 390px frame: imported an older coordinate-arrow Fool’s Mate, previewed canonical SAN and saved/opened it as White. Observed Checkmate, refreshed, reopened the persisted import and completed real four-ply review. Invalid Kf6 produced a move-specific error and left Save disabled. Both the import form and game measured 375px client/scroll widths.

## Actual live HTTPS after publication

Applied the waiting update from rc.16 and observed rc.17. Opened Import a PGN in the published Saved games view, pasted e4/c5 with source names, and observed its valid two-ply preview. Full save/replay/review checks above were performed before publication.

## References and limits

PGN specification reference (main line, SAN, annotations and matching Result markers): https://github.com/echecsjs/pgn/blob/main/SPEC.md . The parser is intentionally a bounded import subset, not a full PGN database/editor implementation. File picking and custom FEN starts remain future work. No physical iPhone Safari, installed-PWA, disconnected-startup or hardware-audio test. Export text was checked; a fresh file-download test was not performed.
