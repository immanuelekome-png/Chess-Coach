# Chess Coach

Browser-local chess practice with bundled Stockfish 19 Lite, coaching, game review and interactive Academy lessons. The current application release is **3.0.0-rc.27**. Difficulty labels are approximate, not measured Elo ratings.

Play at https://immanuelekome-png.github.io/Chess-Coach/ . See [CHANGELOG.md](CHANGELOG.md), [ROADMAP.md](ROADMAP.md) and the release-specific `VALIDATION-v3-rc*.md` records for changes and verification limits.

## Play and learn

- Play as White or Black against configurable bots, or watch Bot vs Bot with playback controls.
- Navigate Undo/Redo one half-move at a time. Use independent teaching-level and assistance controls, with optional hidden live coaching/review.
- Review accuracy estimates and move classifications at selected depth 10, 12 or 14; explore calculated continuations without changing your saved moves. Completed reviews can reopen from a depth-specific local cache; Analyze at selected depth always recalculates. Live hints and mistake practice use depth 10. Position-specific teaching covers pawn challenges, doubled pawns and rook support; a finite curated opening repertoire supplies Book context without overriding significant errors.
- Learn through position-based lessons, plan labs, tactical and positional reply branches, two-decision opposition branches, plan choices and explanation checkpoints. Revisit concepts schedules meaningful interactive misses for later practice. Patterns in reviewed games groups flagged moves and opens examples for review/practice; imports are excluded by default.
- Resume browser-local saved games; name/search them and preview/export SAN PGN. Choose a .pgn/.txt file or paste a standard-start PGN (including older coordinate-arrow exports) to save a separate game for replay/review. Imported results do not affect your bot-game record. Saves, results and Academy progress do not sync between devices.
- Select board/piece styles and sound settings. Failed piece images have a readable backup and a retry control.

## Run and install

Serve this directory over HTTP, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. For GitHub Pages, publish the root directory and keep `engine/` and `pieces/` beside `index.html`. Stockfish requires both `engine/stockfish.js` and `engine/stockfish.wasm`. File URLs restrict worker/WASM loading.

On the published HTTPS site, Settings → Offline & app updates shows download readiness, offers offline-file repair/download and activates waiting updates through Load update. Download while online before relying on offline use. Browsers may remove cached files. On iPhone Safari, use Share → Add to Home Screen to install. Physical iPhone/PWA and disconnected-startup tests remain unverified in the current validation record.

## Checks

Run `npm run test:regression` for all **290 unique dependency-free checks** across twenty-four isolated suites. This command uses Node’s built-in modules and does not need `npm install`. Individual `test:core`, `test:academy`, `test:rules` and other scripts remain available. Fixture checks do not replace real browser interaction.

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
