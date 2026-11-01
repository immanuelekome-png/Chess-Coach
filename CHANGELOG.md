# v3.0.0-rc.11

- Added remembered Standard / Detailed / Deep review depths (10/12/14), restart and cancel controls, and actual searched-depth reporting. Live coaching and practice remain at depth 10.
- Added calculated continuation navigation on the review board: preview replies to the played move or the best line, step backward/forward, and tap SAN move buttons.
- Previews leave actual game moves, history and saves unchanged; illegal/terminal continuations stop safely. Changing moves or cancelling clears the preview.

# v3.0.0-rc.10

- Keep pieces and squares fully visible while Academy locks the board for a question or engine evaluation. Locked squares remain non-interactive.

# v3.0.0-rc.9

- Added four interactive Academy plan labs: spot a key square, choose a plan, then play a legal move achieving the goal. Several goals accept multiple moves.
- Added nine end-of-lesson reasoning checkpoints; new completion credit waits for a correct answer.
- Put lesson boards and activity panels side by side on desktop, with a stacked phone layout. Removed smooth navigation scrolling after fast-click testing exposed moving targets.
- Added saved-game names and search by name, opponent, color or difficulty. Names use separate metadata without rewriting game timelines.
- Added SAN PGN exports with preview/selectable text, correct player colors and results, and exports limited to the saved cursor.

# v3.0.0-rc.8

- Added remembered Quick / Standard / Extended mistake practice (1, 3 or 5 learner decisions), with recaps tied to the original tactical or positional issue.

- Replaced green brand accents with blue-violet while retaining charcoal surfaces, layout, board themes and semantic move-quality colors.
- Added remembered Foundations / Developing / Advanced / Expert teaching bands in Settings, with a link from game setup.
- Tailored live feedback, staged hints and review plans to the selected learner band; advanced bands add recognition/calculation tasks and longer legal engine lines within existing assistance permissions.
- Added opponent-difficulty practice context without treating the bot’s difficulty as the learner’s rating. Teaching bands are manual, not measured Elo or automatic skill estimates.

# v3.0.0-rc.7

- Added distinct game/Academy sounds, gesture-based audio startup, saved volume/mute preferences and a sound test with visible status.
- Reorganized navigation into Play, Academy, Saved games and Settings, with Coach / Moves / Review game panels.
- Added standard algebraic move notation and separate coaching cards for feedback, plans, tradeoffs and engine lines.
- Preserved single-move Undo/Redo, accuracy categories and hidden live review; adjusted board sizing for desktop and phone layouts.

# v3.0.0-rc.6

- Automatically save games on this device and reopen them from setup after refresh.
- Preserve color, bot setup, board, Undo/Redo cursor and supported draw claims.
- Reopen finished games for review without counting the result twice.
- Detect stale save revisions and offer a separate copy. Reject illegal or corrupt saves safely.

# v3.0.0-rc.5

- Personal mistake practice now continues through three learner decisions and Stockfish replies.
- Rejects unsound continuations without moving the board; summarizes decisions, attempts and losses.
- Handles terminal positions, cancellation and retrying an engine reply without recounting a move.

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
