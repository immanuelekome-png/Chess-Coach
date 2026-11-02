# v3.0.0-rc.19 — reviewed patterns and exact practice examples

Academy groups flagged moves (loss at least 60cp by the app’s review scale) for the chosen side into missed mates, allowed mating threats, legal checking/capturing engine replies, pawn moves and other reviewed inaccuracies. These are observations, not inferred causes or a measured player rating. Counts show moves and distinct games. The latest complete summary per game replaces previous analysis; shorter matching-cursor reviews preserve fuller summaries, while changed branches replace obsolete moves.

Spectator reviews are ignored. Imported records are separate and excluded from the displayed summary unless Include imported games is enabled. Retention is bounded to 30 game summaries and 250,000 serialized characters. Clearing derived summaries preserves saved games, results and Academy progress.

Review latest example verifies the source line, replays an earlier cursor if needed, and selects the exact entry in cached or fresh review. Practice this mistake then uses the existing interactive engine-backed exercise. An explicit review of paused history is allowed with hidden live coaching; active native play remains blocked by that preference.

## Automated

186 unique checks across sixteen isolated suites. Fourteen pattern checks cover selected-side counts, replacement without duplication, matching-prefix preservation, changed branches, import/spectator handling, concrete reply categories, mate direction, corrupt records, retention/isolated clearing, storage errors, missing/changed sources, distinct-game counts and exact-index dispatch. Three additional cache/lifecycle checks cover exact-index selection and paused-history versus active-play hide behavior.

## Actual cloud Chrome

- Played f3/e5/g4/Qh4# against the Master bot and completed real four-ply review. Academy showed two flagged White moves in one reviewed game: f3 and g4. Reopening the mating-threat example selected 2. g4 directly. Practice this mistake opened its source position, accepted e4 as a sound move and supplied Stockfish’s ...Nf6 reply.
- At 390px width, reopened the summary and the exact g4 review entry. Imported and reviewed a second checkmate: the default summary stayed at one native game; enabling imports showed two games/four flagged moves, and this persisted after refresh.
- Undid the native saved game to the beginning, enabled hidden live coaching, and reopened its tracked example. The saved cursor replayed to three plies, cached review selected g4, and fuller counts stayed intact. Client/scroll widths were 375px.
- Cleared the pattern summary and confirmed two saved games and unchanged displayed result totals. Reopening/reviewing the native game rebuilt its summary.

## Actual live HTTPS after publication

Applied the waiting update from rc.18 and observed rc.19. Reused analysis of the existing imported four-ply checkmate, opened Academy and enabled imports. The published summary showed two flagged moves in one reviewed game.

## Limits

No physical iPhone Safari, installed-PWA, disconnected-startup, hardware-audio or true simultaneous-tab check. Summaries reflect only reviewed games, chosen sides and finite search depths; this is not a causal diagnosis or longitudinal learning evaluation. No automatic Elo/adaptive learner rating is inferred. Source games removed outside the app cannot be reopened; the UI reports this without replacing the active game.
