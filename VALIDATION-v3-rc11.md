# v3.0.0-rc.11 — deeper review and calculated-line navigation

Review depth is a remembered 10/12/14 selection. Each analysis run snapshots it. The summary reports actual engine depths; choosing a different depth does not relabel existing results. Restart terminates the old worker; cancellation clears results and disables stale navigation. The analysis timeout allows additional time for deeper searches. Live hints, practice and bot settings are unchanged.

The review board can preview the engine’s replies after the played move or its best line from before the move, up to six legal half-moves. Back/next and SAN buttons navigate these calculated positions. They do not change the live game, history, saves, results or practice source. Invalid PV moves are truncated, and terminal positions have no invented replies.

## Automated

79 unique checks: existing 71 plus 8 depth/line regressions. New coverage includes preference validation/persistence and live-depth independence, actual-depth reporting, branch origins, navigation bounds, unchanged game state, invalid PV handling, checkmate status, cancellation/late results, run-depth snapshots and restarted-review isolation.

## Actual cloud Chrome

- Opened a two-ply saved game and completed standard depth 10 review. Stepped both continuation branches while its live move list stayed e4/c5.
- Cancelled a depth 14 run, observed cancellation and disabled line navigation, then restarted and completed real depth 14 analysis. Selecting depth 12 did not change the completed run’s depth 14 summary.
- Played f3/e5/g4/Qh4# against the Master bot. Automatic depth 12 review analyzed all four plies. Selected g4, stepped Qh4# and observed the end-of-line disabled control; switched to the best line. All 64 live board-square labels were identical before and after previewing.
- At 390px width, reopened the saved checkmate, completed depth 12 review and stepped its mating reply. The corrected status read Checkmate. A subsequent depth 14 run completed quickly; its attempted cancellation did not provide a confirmed phone cancellation test. Desktop cancellation is verified.
- Phone page client width and scroll width both measured 375px. This checks responsive Chrome behavior, not physical iPhone Safari.

## Limits

No physical iPhone Safari, installed-PWA, offline-startup or sound-output test. Longer games at depth 14 may take substantially longer and were not benchmarked. Engine lines and classifications remain finite-depth estimates. Previewed lines are not stored as game variations. The older standalone Playwright smoke suite was not run; browser interaction used the supported cloud browser.
