# Chess Coach 3.0.0-rc.1

Browser-local chess practice with bundled Stockfish 19 Lite, coaching, game review and Academy lessons. Difficulty labels are approximate and are not measured Elo ratings.

This release candidate addresses the October 31 interactive test report. See CHANGELOG.md and VALIDATION-v3.md.

## Run

Serve this directory over HTTP, for example `python3 -m http.server 8000`, then open `http://localhost:8000`. For GitHub Pages, publish the root directory and keep engine/ and pieces/ beside index.html. Stockfish requires both engine/stockfish.js and engine/stockfish.wasm.

Do not open index.html through a file URL: browsers restrict worker and WASM loading there. Offline caching requires a successful first visit in a secure browser context.

## Checks

`npm run test:core` runs the dependency-free chess/content regressions. These do not replace browser interaction. The existing `npm test` / RUN-TESTS.cmd workflow runs a separate Playwright smoke suite after dependencies are installed. The v3 validation notes distinguish tests actually performed from checks not run.

Live advice and review use Stockfish at depth 10. Scores and classifications can vary with search conditions. They are estimates, not human accuracy ratings. Review-practice attempts are tracked separately from curriculum completion.

## Bundled engine

Stockfish.js 19 (c) 2026 Chess.com LLC, GPLv3. Sources: https://github.com/nmrugg/stockfish.js and https://github.com/official-stockfish/Stockfish. The bundled engine is unchanged by this release. Preserve its license and corresponding-source obligations when redistributing it.
