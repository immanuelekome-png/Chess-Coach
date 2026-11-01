# v3.0.0-rc.6 — saved-game recovery

Games automatically save a compact legal move timeline, current Undo/Redo cursor, color, bot settings and supported draw claims to this browser. Setup lists saved games. Opening a save legally replays the moves and restores the board, history and controls. Games reopen paused; a finished game can be reviewed again without recording another result. Saves remain local to this browser/device, not account-synced. Personal practice sessions and computed review results are not restored; review can be recalculated.

Revision checks detect a stale tab before overwriting a newer save and offer a separate copy. Opening a game is read-only. This is optimistic conflict detection, not an atomic cross-tab write lock. Corrupt/illegal data is rejected before replacing the active game. Storage errors are displayed without deleting existing saves.

## Automated

42 unique checks pass: 26 core/content, 8 asynchronous practice and 8 saved-game regressions. Saved-game coverage includes exact replay/Undo/Redo, Black/spectator settings, corrupt saves, stale revisions and copies, duplicate result prevention, castling/en passant/underpromotion, claimed repetition draw through Undo/Redo after reload, and read-only reopening.

## Actual cloud Chrome interaction

- Played e4 and a Stockfish reply, undid one ply, refreshed and opened the save. All 64 board-square labels matched the pre-refresh board; Redo remained available and restored the reply.
- Opened the same game in two tabs. Opening originally rewrote the revision; this bug was found and corrected. Repeated test showed the stale-tab warning and Save separate copy produced two saved games.
- Started as Black, refreshed, reopened and compared all squares (identical), confirmed flipped orientation, continued and played ...e5.
- Completed a 47-ply spectator checkmate and full review. After refresh, reopened its save: identical board, correct checkmate, human record still 0W/0L/0D. Rebuilt the saved game’s review.
- The deployed rc.5 practice session also completed all three decisions with real Stockfish replies and summary.

## Limits

No new iPhone Safari, disconnected-offline or audio verification. Saved reviews are recalculated rather than cached; personal practice sessions are not persisted. Quota failures and truly simultaneous writes were not exercised through the browser.
