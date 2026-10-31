# Chess Coach v3.0.0-rc.2 validation

Changes: single-ply Undo/Redo with explicit Continue game; automatic post-game review; side accuracy cards, nine move categories and per-move scores; persistent hide-live-review toggle; isolated per-game result keys; discovered-attack explanation; disabled terminal spectator controls.

Accuracy is an app-specific centipawn-loss estimate, not Chess.com CAPS. Full method appears in the review screen. Great uses MultiPV second-choice separation; Brilliant additionally requires an offered piece captured by the principal reply, material loss and retained evaluation. Book covers a deliberately small curated repertoire. Special labels are estimates at depth 10, not calibrated classifications.

## Verified through cloud Chrome interaction

- Actual human e4 and Stockfish reply; two Undo clicks removed one ply each, two Redo clicks restored them separately.
- Hide toggle hid coaching/hints and disabled live review; turning it off restored review. Preference survived refresh.
- Four-ply review completed, showed side and per-move accuracy, and category count navigation selected the correct move.
- Full 29-ply spectator game ended with checkmate; automatic analysis completed all 29 entries. Book, Best, Good, Inaccuracy, Mistake and Blunder appeared. Post-game summary worked despite hidden live review.
- Pause and Step disabled after checkmate. Spectator result left the human record unchanged.

- Final-build spectator game completed 41 plies with automatic review visible at game end, even with live review hidden. Both scores rendered; Undo reenabled spectator controls and Redo disabled them again at checkmate.
- Black-side Undo removed the first White bot move; Continue game let the bot move again and returned control to Black.

- Final scoring pass: a third spectator game ended in checkmate after 63 plies; all 63 entries completed automatic review. Accuracy displayed 92.0% White / 83.3% Black. The final formula is 100 × exp(−cp loss / 300), so large evaluation losses cannot display as 100% move accuracy.

## Automated

18 core/content checks include legal curriculum, chess perft, undo/redo state, scoring bounds/color symmetry, curated Book, Miss, Great uniqueness, sound-sacrifice Brilliant predicates, stale-tab result isolation/idempotency, terminal controls, mate commentary and precache integrity.

## Limits

No iPhone Safari, audio or disconnected-offline retest in this pass. Brilliant/Great/Miss rules are checked with fixtures; the 41-ply game also demonstrated Great; Brilliant and Miss were not observed during actual play. Cross-tab persistence is regression-tested with shared storage fixtures; a two-tab human terminal-game scenario was not repeated interactively.
