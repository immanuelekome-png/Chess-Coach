# Chess Coach rc.28 validation

## Defects found

The old active UCI path clamped 400/700/1000 to the same 1320 minimum and ignored style/personality. The apparent style logic was in an unreachable experimental fallback. Replaced it with completed MultiPV scoring and tier-specific candidate selection; removed the unreachable fallback.

## Regression checks

All 312 unique checks across 26 isolated suites passed. Eighteen new selector checks cover distinct/monotonic profiles, candidate loss budgets, shared-pool sampling, invalid roots/scores, mate handling, complete/partial/duplicate/bound MultiPV records, bounded collection, style/personality preferences and UCI settings. Four asynchronous queue checks cover native settings and stale cancellation, independent spectator settings, invalid-response pause and FIFO handler completion.

## Bundled engine benchmark

`npm run bench:bots` ran the actual bundled engine through its Node UCI entry point on twelve curated opening, development, tactic, mate, castling, en passant, promotion and endgame positions at 400/700/1000/1500/2100/2200 settings. All 72 choices were legal; all searches returned a completed scored iteration. The retained JSON report records depths, widths, elapsed times, selected/raw moves and limits.

Shared scored-pool sampling over 250 selections per setting/position produced finite mean losses of about 20.54, 14.91, 8.91, 0.94, 0 and 0 cp respectively across eleven finite-score reference positions. The mating reference retained mate. This isolates candidate selection and verifies tier controls; it does not measure actual Elo or guarantee monotonic strength in every individual position.

## Actual browser interaction

Desktop Chrome preview: played three White moves against Beginner 400 and received legal replies (...d5, ...e5, ...dxc4). Ran spectator White 400/Defensive versus Black 2200/Aggressive; pause froze the game, Step advanced exactly 29 to 30 plies, and speed changed from Fast to Slow. The match later ended by checkmate for Black, disabled pause/step and did not affect human results. A subsequent native Master game f3/e5/g4/Qh4# recorded one loss and completed separate full-strength depth-10 review with the correct mating labels.

Phone-width Chrome preview: selected Guardian and played Black, received e4/Nf3/Be2 with legal Black e5/Nc6 input. Board stayed flipped. Started custom 700/Endgame/Gambler, immediately cancelled to New game, then restarted: only the new game’s opening e3 appeared, followed by legal d5/d4. Client/scroll widths both 360px in the 375px iframe. A screenshot records the Black custom game. The core checks verify the actual profile/style arguments; browser moves alone are not proof of a style’s strategic quality.

## Limits

No calibrated Elo, full tournament study, physical iPhone Safari, hardware audio or PWA/offline-startup pass is claimed. Search-depth/time outcomes vary with device speed; complete shallow iterations may be used when the time budget expires. Finite score bands apply to the collected engine scores, not a guarantee against all deeper tactical discoveries.
