# Chess Coach

Browser-local chess practice with bundled Stockfish 19 Lite, coaching, game review and interactive Academy lessons. The current application release is **3.0.0-rc.34**. Difficulty labels are approximate, not measured Elo ratings.

Play at https://immanuelekome-png.github.io/Chess-Coach/ . See [CHANGELOG.md](CHANGELOG.md), [ROADMAP.md](ROADMAP.md) and the release-specific `VALIDATION-v3-rc*.md` records for changes and verification limits.

## Play and learn

- Play as White or Black against configurable bots, or watch Bot vs Bot with playback controls.
- Move pieces by dragging or tapping, with upright Black-side animations. Navigate Undo/Redo one half-move at a time. Use independent teaching-level and assistance controls, with optional hidden live coaching/review.
- Review accuracy estimates and move classifications at selected depth 10, 12 or 14; explore calculated continuations without changing your saved moves. Completed reviews can reopen from a depth-specific local cache; Analyze at selected depth always recalculates. Live hints and mistake practice use depth 10. Position-specific teaching covers pawn challenges, doubled pawns and rook support; a finite curated opening repertoire supplies Book context without overriding significant errors.
- Learn through position-based lessons, plan labs, tactical and positional reply branches, two- and three-decision opposition branches with changed-position reasoning checkpoints, plan choices and explanation checkpoints. Revisit concepts schedules meaningful interactive misses for later practice. Patterns in reviewed games groups flagged moves and opens examples for review/practice; imports are excluded by default.
- Resume browser-local saved games; name/search them and preview/export SAN PGN. Choose a .pgn/.txt file or paste a standard-start PGN (including older coordinate-arrow exports) to save a separate game for replay/review. Imported results do not affect your bot-game record. Saves, results and Academy progress do not sync between devices.
- Select board/piece styles and sound settings. Failed piece images have a readable backup and a retry control.

## Run and install

Serve this directory over HTTP, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. For GitHub Pages, publish the root directory and keep `engine/` and `pieces/` beside `index.html`. Stockfish requires both `engine/stockfish.js` and `engine/stockfish.wasm`. File URLs restrict worker/WASM loading.

On the published HTTPS site, Settings → Offline & app updates shows download readiness, offers offline-file repair/download and activates waiting updates through Load update. Download while online before relying on offline use. App status and update details opens an independent diagnostics page comparing the published build, app page served and installed worker; update errors retain the browser’s exact message. This page is intentionally outside the offline cache and requires network access. Browsers may remove cached files. On iPhone Safari, use Share → Add to Home Screen to install. Physical iPhone/PWA and disconnected-startup tests remain unverified in the current validation record.

## Checks

Run `npm run test:regression` for all **385 unique dependency-free checks** across thirty isolated suites. This command uses Node’s built-in modules and does not need `npm install`. Individual `test:core`, `test:academy`, `test:rules` and other scripts remain available. Fixture checks do not replace real browser interaction.

`npm test` / `RUN-TESTS.cmd` is the older, separate Playwright smoke workflow and requires its dependencies. Recent releases used the supported cloud browser for actual desktop and phone-width interaction; they do not claim physical iPhone Safari, hardware sound or true simultaneous-tab coverage. Dates in the concept schedule are simulated in unit checks, not verified by waiting several days.

Accuracy/classification labels are app-specific engine estimates and can vary with search depth and conditions. Revisit schedules are practice reminders, not measured skill estimates. Material-draw detection handles selected dead-material patterns rather than every possible blocked position.

## Bundled engine

Stockfish.js 19 (c) 2026 Chess.com LLC, GPLv3. Sources: https://github.com/nmrugg/stockfish.js and https://github.com/official-stockfish/Stockfish . Preserve its license and corresponding-source obligations when redistributing it.

## Custom-start PGN imports

Saved games → Import a PGN accepts standard chess games with `[SetUp "1"]` and a six-field `[FEN "…"]` header. Include at least one move. The import retains the starting side, move counters, castling and en passant rights for replay, review and re-export. For example:

```pgn
[SetUp "1"]
[FEN "8/8/4k3/8/4K3/4P3/8/8 b - - 0 37"]
[White "Endgame White"]
[Black "Endgame Black"]

37... Kd6 38.Kd4 Kc6 39.Kc4 *
```

FEN validation checks board shape, kings, pawn ranks/counts, minimum promotion budget, nonmoving-king safety and consistency of castling/en passant fields. It does not prove the complete historical reachability of an arbitrary position. Chess960 and other variants remain unsupported. Earlier captures and repetition history cannot be recovered from FEN; captured lists show only captures in the imported moves. Custom-start reviews do not use the standard-start opening repertoire unless the full starting FEN actually matches the normal initial position.

Academy → Challenges → **Mixed practice: recognize a plan** shuffles four concept families and chooses among sixteen White/Black board variants. Each task requires spotting, explaining and playing. Completed sessions keep recorded misses and guided-practice results on this device (up to 30 sessions); they do not measure Elo or independent mastery. Missed concepts use the same revisit schedule as their normal lessons. A session does not mark an individual source lesson complete.

Human game results are verified against the saved terminal position and revision, then recorded once per game. Browsers with Web Locks serialize result commits. A stale tab keeps its board/review and can save a separate copy; its finish cannot overwrite the existing outcome or add another count for that game.

Bishop coaching identifies the first friendly pawn blocking each diagonal, with a focused Foundations task and conditional pawn-break/redeployment plans at other teaching levels. A bishop-pair observation requires bishops on both square colors; promoted bishops on the same color do not qualify. These are board observations and plans to examine, not guaranteed advantages.

## Bot difficulty and preferences

Bot moves now use full-strength Stockfish MultiPV scores from one completed iteration. Difficulty settings change search limits, candidate width, admitted score loss and selection probability; the 400/700/1000 settings no longer collapse to one clamped UCI Elo value. Style and personality preferences influence choices inside the selected evaluation band. Forced mates are handled separately from centipawn scores. If no complete candidate iteration arrives, the engine’s bestmove is used; illegal/failed responses pause play.

Run `npm run bench:bots` to exercise the bundled engine’s Node UCI entry point on twelve curated positions at six settings. The retained report is `validation/bot-strength-rc28.json`: 72 legal choices from 72 searches, no incomplete-set fallbacks. In shared candidate-pool sampling, mean finite evaluation loss declined across settings. This checks implementation, not human strength: the labels are still approximate and are not calibrated Elo. One spectator result is not rating evidence.

## Recorded assistance context

New human moves retain their selected assistance level, live-review visibility, interruption setting, manual teaching band and hint-request count. Review shows recorded independent settings, enabled assistance, hint requests and unknown context for your chosen side. A request is not proof that a hint was delivered or used; earlier feedback or external help can still influence later moves. These counts are not measured skill and do not change accuracy labels or bot strength.

Context stays in browser-local saves through Undo/Redo, copying and refresh. Score caches carry engine scores, while context comes from the saved move timeline. Old/imported games remain unknown instead of inferring past assistance from their current settings. The first newly played move after reopening or navigating history is conservative when prior hint history is unavailable. PGN export does not include this app-local metadata.

Paired-match baseline: `npm run bench:matches` runs eight color-reversed games from a shared opening and retains move traces. In the rc.29 run, higher settings won five games and three reached the 80-ply cap unresolved; none of those three is scored as a draw. All 530 searched moves were legal. See `validation/PAIRED-BOT-MATCHES.md`. This small run adds relative evidence and does not calibrate the displayed Elo labels.

## Board tools and trying moves

Board tools is a collapsed panel under the playing board and in review. Right-drag draws an arrow; right-click highlights a square. Shift uses green, Alt blue, and Ctrl red arrows/yellow squares. Default arrows are yellow and squares red. Repeat a mark to remove it; Move-mode left clicks clear marks. On phones, choose Arrows and tap the two endpoints, or choose Squares and tap a square. Color and Clear marks controls are available without a keyboard. Marks are temporary and clear when the position changes.

X flips the current board, Z toggles focus mode during play, Left/Right navigate moves and Up/Down jump to first/last. Shortcuts ignore text fields, selectors, Settings and export dialogs. Gesture/shortcut help stays inside Board tools.

Try moves opens a separate board from play or the current review position. Play either side, navigate, branch by returning to an earlier move, reset the line, choose promotions and explicitly analyze with Stockfish. Suggestion arrows can be hidden. Engine analysis remains off during independent or hidden-live-review play; live analysis requests are recorded as assistance. Trial moves never alter the actual game, saves, result record or review. Unsaved trial work is discarded when closed. Saved analysis lines can retain the full line, selected position and that position’s manual arrows/highlights.

In Try moves → Saved analysis lines, enter a name and choose Save line. Reopened or previously saved work uses Save a copy, preserving the original. Saved games → Saved analysis lines opens the same library. Remove moves a line to Removed lines, where Restore brings it back. New saves/restores check a 30-active-line limit; each line supports up to 600 half-moves. Records stay on this device. Their starting FEN preserves turn, counters, castling and en passant; earlier repetition history is not inferred. Engine results are recalculated rather than saved.
