# v3.0.0-rc.4 (prepared locally)

- Added position-based plans and tradeoffs to live coaching, full-move hints and review.
- Added legal Stockfish continuations, with stale-PV and terminal-position guards.
- Names whose plan is being discussed and distinguishes teaching suggestions from calculated lines.
- Includes the rc.3 Academy promotion chooser.

# v3.0.0-rc.3

- Academy promotion challenges now require choosing Queen, Rook, Bishop or Knight.
- Incorrect choices keep the original position for another attempt; underpromotion feedback explains the knight check.
- Added Cancel and prevented extra moves after a completed challenge.

# v3.0.0-rc.2

- Undo and Redo navigate one move at a time. Continue game resumes the bot when needed.
- Automatic post-game review includes both accuracy percentages, clickable category counts and all move scores.
- Added Brilliant, Great, Book and Miss estimates alongside Best, Good, Inaccuracy, Mistake and Blunder.
- Hide live review/coaching during play with a remembered checkbox.
- Result records use separate game keys to prevent stale tabs from replacing totals.
- Corrected discovered attack with check; disabled terminal spectator controls.

# 3.0.0-rc.1

- Replace shallow local evaluations in live coaching and hints with a separate, unlimited-strength Stockfish analysis worker. Show depth and label analysis estimates honestly; show an error if analysis fails.
- Explain concrete replies that win exposed pieces or deliver mate. Name the piece and square, and add actual pawn control squares and piece targets.
- Preserve mate scores distinctly from centipawn changes. Handle checkmate before generic check commentary and avoid spurious losses when a forced mate is retained.
- Snapshot the game for review, cancel outdated work, clear old review results and disable navigation/practice while analysis starts. Use chess move numbering in detail panels.
- Clear coaching, analysis and promotion state when the game or history changes. Undo no longer leaves a stale checkmate message.
- Replace placeholder sequences for Opposition, King activity, Passed pawns, Rook endings, IQP, Outposts, Open files, Forks, Skewers and Discovered attacks with relevant positions and explanations.
- Add an explicit completion action to explanatory study lessons, including Pins. Keep personal-game exercises outside the 40-item curriculum counter and refresh drill totals immediately.
- Correct the Knight Fork puzzle's illegal starting position (Black's king was already in check from the white queen).
- Use one visible/exported application version, preserve the configured spectator speed, and explain blocked castling.
- Correct WhiteConfig/BlackConfig in exports when the human plays Black.
- Restore the missing icon referenced by the manifest and offline precache; rotate the service-worker cache version.
- Add dependency-free core/content regressions and record actual browser checks.

This candidate does not add calibrated Elo, saved-game recovery, an expanded promotion selector in Academy, or a new sound-settings interface. These remain separate work items.
