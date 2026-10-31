# Validation: 3.0.0-rc.1

October 31, 2026. Local managed preview, cloud Chrome desktop. This is a release candidate, not an all-device certification.

## Automated checks actually run

- Inline JavaScript parsed with Node's vm.Script.
- Core/content regressions: initial-position perft at depth 3 = 8902; all 40 curriculum starting positions and scripted lines valid; mate commentary; hanging-bishop explanation; mate-distance comparison; mate display; curriculum/practice separation; review reset; multiple mate solutions; existence of every offline precache asset.
- git diff --check.

## Actual browser interaction

- Stockfish reached ready in the preview and replied in human games.
- Played the corrected Opposition position: ...Ke6-d6 and Ke4-f5; the lesson completed and progress increased.
- Advanced all four Pins steps, clicked Finish lesson, and observed its saved checkmark and 2/40 progress after Opposition. Confirmed completed explanations remain navigable when going Back.
- Played an eight-ply opening game including legal kingside castling with live analysis. A preview source refresh interrupted its review, so that particular review completion is not counted as passed.
- On the updated preview, attempted blocked initial-position castling and received “clear f1 and g1 first.”
- Played 1.f3 e5 2.g4 Qh4# against Master. The four-ply review completed and displayed a mate-in-one transition and an explicit checkmate explanation with correct 2... numbering.
- Practiced the g4 blunder: repeating g4 was rejected with the Qh4 mate threat explained; e4 was accepted. Curriculum progress remained 2/40.
- Undid checkmate: returned to White's move with no stale terminal coaching. Redo restored the checkmate position.
- Played 1.e4 d5 2.Qh5 Nf6 3.a3 Nxh5. Live coaching explicitly identified the attacked queen on h5 and ...Nxh5. The six-ply review completed.
- Opened review for that second game: old move buttons, metrics and board were absent during loading; navigation and practice were disabled until ready.
- Requested a level-4 hint after losing the queen; it returned Stockfish's e4xd5 recommendation.
- Started as Black, observed White's e4, requested a hint (Stockfish recommended ...e6), played ...e5 and received a correct Black-side analysis with d4/f4 control squares.
- Started a spectator game with setup speed Fast and observed Fast selected in-game. Paused, single-stepped Black's kingside castle, changed to Very fast and resumed. The game finished after 79 half-moves with White winning by checkmate; all 79 half-moves were reviewed. Downloaded and read the export, confirming AppVersion 3.0.0-rc.1 and the 1-0 / Checkmate result.

## Limits and remaining work

No actual iPhone Safari, other-browser, disconnected-network or audio verification was performed for this candidate. The old Playwright smoke runner was retained but not executed in this environment; browser interaction used the cloud browser directly. New lesson scripts all passed legality checks, but only Opposition and Pins received complete interactive walkthroughs during this pass. No engine Elo/personality calibration was performed.

The preview does not exercise production HTTPS service-worker installation. The missing cached asset is fixed and the asset-existence regression passes, but actual offline behavior still needs verification after deployment. Other devices, cancellation stress tests and broader special-rule coverage remain release-gate work.
