# Chess Coach

Browser-local chess practice with bundled Stockfish 19 Lite, coaching, game review and interactive Academy lessons. The current application release is **3.0.0-rc.17**. Difficulty labels are approximate, not measured Elo ratings.

Play at https://immanuelekome-png.github.io/Chess-Coach/ . See [CHANGELOG.md](CHANGELOG.md), [ROADMAP.md](ROADMAP.md) and the release-specific `VALIDATION-v3-rc*.md` records for changes and verification limits.

## Play and learn

- Play as White or Black against configurable bots, or watch Bot vs Bot with playback controls.
- Navigate Undo/Redo one half-move at a time. Use independent teaching-level and assistance controls, with optional hidden live coaching/review.
- Review accuracy estimates and move classifications at selected depth 10, 12 or 14; explore calculated continuations without changing your saved moves. Live hints and mistake practice use depth 10.
- Learn through position-based lessons, plan labs, tactical and positional reply branches, plan choices and explanation checkpoints. Revisit concepts schedules meaningful interactive misses for later practice.
- Resume browser-local saved games; name/search them and preview/export SAN PGN. Paste a standard-start PGN (including older coordinate-arrow exports) to save a separate game for replay/review. Imported results do not affect your bot-game record. Saves, results and Academy progress do not sync between devices.
- Select board/piece styles and sound settings. Failed piece images have a readable backup and a retry control.

## Run and install

Serve this directory over HTTP, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. For GitHub Pages, publish the root directory and keep `engine/` and `pieces/` beside `index.html`. Stockfish requires both `engine/stockfish.js` and `engine/stockfish.wasm`. File URLs restrict worker/WASM loading.

On the published HTTPS site, Settings → Offline & app updates shows download readiness, offers offline-file repair/download and activates waiting updates through Load update. Download while online before relying on offline use. Browsers may remove cached files. On iPhone Safari, use Share → Add to Home Screen to install. Physical iPhone/PWA and disconnected-startup tests remain unverified in the current validation record.

## Checks

Run `npm run test:regression` for all **155 unique dependency-free checks** across fourteen isolated suites. This command uses Node’s built-in modules and does not need `npm install`. Individual `test:core`, `test:academy`, `test:rules` and other scripts remain available. Fixture checks do not replace real browser interaction.

`npm test` / `RUN-TESTS.cmd` is the older, separate Playwright smoke workflow and requires its dependencies. Recent releases used the supported cloud browser for actual desktop and phone-width interaction; they do not claim physical iPhone Safari, hardware sound or true simultaneous-tab coverage. Dates in the concept schedule are simulated in unit checks, not verified by waiting several days.

Accuracy/classification labels are app-specific engine estimates and can vary with search depth and conditions. Revisit schedules are practice reminders, not measured skill estimates. Material-draw detection handles selected dead-material patterns rather than every possible blocked position.

## Bundled engine

Stockfish.js 19 (c) 2026 Chess.com LLC, GPLv3. Sources: https://github.com/nmrugg/stockfish.js and https://github.com/official-stockfish/Stockfish . Preserve its license and corresponding-source obligations when redistributing it.
