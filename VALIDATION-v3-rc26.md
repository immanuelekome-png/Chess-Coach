# Chess Coach rc.26 validation

## Automated

All 280 unique checks across 23 isolated suites passed. Twelve new result checks cover nonterminal/spectator exclusion, verified single counting, opposite-outcome immutability, stale save revisions, invalid saved timelines, claimed repetition draws, write/read failures, simulated Web Lock serialization, captured identity when switching games, revisions changed during a queued lock and lock rejection. The original core result fixture now constructs a coherent saved move history because outcome verification depends on that history.

## Actual browser interaction

Desktop Chrome preview and a 375px phone-width iframe shared the same native human game. Chose Master, White, independent assistance; played f3, observed ...e5, then opened the same two-ply save in the phone frame. Desktop played g4 and received ...Qh4#. Exactly one loss was recorded. The paused stale phone game continued with g4 and received ...Qh4#; it retained its board, displayed a rejected-result/conflict notice and offered Save this game as a separate copy. Both tabs still showed one loss.

Adjusted notice placement to the board column beside the copy control and reran all checks. Repeated the two-tab scenario on a fresh game (...e6 this time, then ...Qh4#). Total losses moved from one to two, then stayed two when the stale tab finished. The notice appeared inside .play-surface immediately before the copy button. Phone client/scroll widths both 360px inside the 375px iframe. Final screenshot shows the notice, copy option and review remaining available.

## Limits

The browser scenarios exercise real stale human tabs, not every possible simultaneous storage interleaving. Queued result serialization and failure paths are also tested using isolated Web Lock fixtures; unsupported browsers use the revision-checked synchronous fallback. Physical iPhone Safari, hardware sound and PWA/offline startup remain unverified. No measured Elo or learning-outcome claim is made.
