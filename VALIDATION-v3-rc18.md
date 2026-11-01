# v3.0.0-rc.18 — completed review caching

Completed raw Stockfish evaluations can be reused for the same saved game, engine profile, selected depth and matching move/position sequence. A matching earlier cursor can reuse a prefix. Current move classifications, accuracy and teaching are rebuilt from those scores; the cache does not preserve stale UI markup. Cached PVs, best moves, score types, terminal states, fingerprints and metadata are validated before reuse. A mismatch falls back to real analysis.

Opening Review can reuse a match; Analyze at selected depth explicitly bypasses it. Saved analysis controls can disable reuse or clear derived analysis without removing games, results or Academy progress. Retention is at most five records and 750,000 serialized characters, across games/depths. Large reviews may not be retained. Cancellations/errors never save partial results, and storage failure leaves the completed live review usable.

Also fixes an imported-game review guard: hiding live coaching no longer prevents analysis of an imported, nonterminal game.

## Automated

169 unique dependency-free regressions across fifteen isolated suites. Fourteen new cache checks cover raw-score persistence, no-worker reuse, current classifications, prefix reuse, wrong branch/depth/engine/position rejection, corrupt scores/PVs, secondary evaluations, fresh reanalysis, disabled reuse, retention, isolated clearing, quota errors, cancellation, live-state isolation and the imported-game hide preference. Engine lifecycle tests explicitly request fresh review to continue testing cancellation/restart rather than a cache hit.

## Actual cloud Chrome

- Desktop: completed real depth 14 review of a nine-ply imported game. The cache control reported it saved. Reopening at depth 10 ran real analysis instead of reusing depth 14; choosing depth 14 reopened Saved analysis. The nonterminal imported game also reviewed successfully with Hide review & coaching enabled.
- 390px frame: completed real depth 10 review of a four-ply imported checkmate, refreshed/reopened, and observed Saved analysis at depth 10. Analyze at selected depth visibly began a fresh run. Disabled reuse and cleared saved analysis; confirmation stated that games/progress were unchanged. Client/scroll widths were both 375px.

## Limits

No physical iPhone Safari, installed-PWA, disconnected-startup, hardware-audio or simultaneous-tab write check. Cache retention is best-effort under browser storage limits. Long-game performance was not benchmarked; the cache is not a cloud backup. Cached scores remain finite-depth engine estimates and do not establish measured player skill.
