# v3.0.0-rc.30

- Add an independent App status page showing the published build, app page served, installed offline worker, downloaded file count and waiting update.
- Retain exact browser update exceptions in Settings and a selectable diagnostic report. Keep status checks independent so a failed network check does not hide worker information.
- Offer explicit update checks and waiting-worker activation without clearing games or silently reloading play. Keep the status page and published build marker outside the offline cache so an old app shell cannot trap them.
- Validate release-marker consistency and stale, denied, missing, incomplete and failed update states with fifteen additional regression checks.

# v3.0.0-rc.29

- Record bounded assistance context on new human moves: selected level, hidden live review, interruptions, manual teaching band and hint requests for the current position.
- Show per-move context chips and a selected-side review summary, distinguishing recorded independent settings, available assistance, hint requests and unknown provenance. These observations are not skill estimates.
- Preserve context in local saved timelines and through Undo/Redo; reconstruct cached review context from moves rather than engine-score cache. Older/imported/spectator data is not retroactively classified as independent.
- Keep metadata out of PGN exports and validate its shape, timeline length and human-side ownership when loading a save.

# v3.0.0-rc.28

- Fix novice/intermediate difficulty settings collapsing to the same minimum Stockfish UCI Elo, and styles being ignored in the active engine path.
- Select legal moves from full-strength scored MultiPV candidates using tier-specific search limits, score-loss bands and probabilities. Only complete, unique, same-depth candidate sets are compared; early searches can use the engine bestmove.
- Activate bounded Aggressive, Defensive, Positional, Tactical and Endgame preferences and personality mappings inside each tier’s score band. Strongest tiers retain the best evaluated score; mate outcomes are kept distinct from finite evaluations.
- Remove unreachable experimental move selection and correct the stale engine README. Add a repeatable bundled-engine benchmark without installing dependencies.

# v3.0.0-rc.27

- Add bishop-diagonal coaching that names the actual friendly pawn blockers and compares a safe pawn break with finding another bishop route.
- Give Foundations learners one focused blocker-recognition task before generic development advice, for either color.
- Discuss retaining the bishop pair only when bishops cover both square colors, with explicit caveats about blocked lines, threats and king safety. Same-color promoted bishops do not trigger the observation.

# v3.0.0-rc.26

- Make per-game human results immutable. Later finishes cannot change an already recorded win/loss/draw or add another count for the same game.
- Require a terminal, legally replayable saved game with matching revision, position and player side before recording its outcome. Keep imports and spectator games excluded.
- Serialize result commits with Web Locks where available, capture game identity before waiting, and recheck the saved revision inside the commit.
- Keep stale, blocked-storage and lock-failure feedback separate from ordinary save status, beside the copy control. Board and review remain available when a result cannot be verified.

# v3.0.0-rc.25

- Add shuffled four-position mixed plan practice with sixteen White/Black variants across development, supported knight posts, open files and king activity. Every task requires spotting, explaining and playing.
- Keep Black’s board orientation stable after the learner move. Generalize plan goals to either side and to the displayed supported square.
- Feed mistakes into the underlying concept’s revisit schedule; track completed sessions separately from individual lesson checkmarks. Store up to 30 sessions under independent keys, with clear retry and storage-failure feedback.
- Fix mirrored answer wording for lowercase color names found during phone-width interaction. Guided results are explicitly not skill ratings.

# v3.0.0-rc.24

- Import custom-start standard-chess PGNs with SetUp/FEN headers. Validate the supplied position and replay every move legally before enabling Save.
- Preserve source position, side, counters and rights through saves, refresh, Undo/Redo and PGN re-export. Black-first move lists reserve the White column and retain original fullmove numbers.
- Keep standard-start opening Book labels out of custom-position reviews, including cached review reconstruction. Review pattern summaries use the supplied turn/numbering and check source-position identity before opening examples.
- Explain that capture lists and repetition history start at the supplied position. Existing standard-start saves remain compatible.

# v3.0.0-rc.23

- Add an interactive opposition lesson under Academy → Endgames. Predict either legal king reply, choose a plan, and play two king decisions while Black answers the first move. Both branches are required.
- Keep multi-decision branch progress separate from branch completion, validate each opponent reply before moving the board, and reset the decision cursor between branches.
- Include specific wrong-move feedback and the existing missed-concept revisit schedule. The lesson teaches opposition without promising a forced win.

# v3.0.0-rc.22

- Derive captured-piece lists from actual move history, including en passant and captures of promoted pieces. Promotion itself no longer appears as a captured pawn, and captures are not capped by starting-piece counts.
- Compute the material lead from the current board, independently of the captured list. Undo/Redo updates both from the displayed position.
- Keep the opponent’s captured row above the board and your row below when playing Black. Imported and spectator games identify capturing colors instead of calling source players bots.

# v3.0.0-rc.21

- Choose a .pgn or .txt file under Saved games → Import a PGN. Files are read locally, previewed through the existing legal-move validator and saved only after an explicit Save action.
- Bound file/text size, report read/format errors, and preserve existing text when a file cannot load. An old asynchronous read cannot overwrite a newer file or manual edit; changing review side during loading uses the latest side.
- Keep the file input within phone-width layouts and allow reselecting the same file.

# v3.0.0-rc.20

- Add board-specific teaching for supported knight posts and current/future pawn challenges, doubled pawns, and rooks supporting passed pawns from behind on a clear file.
- King-activity guidance accounts for remaining enemy rooks. Promotion guidance names the new piece instead of describing an imaginary isolated pawn, and automatic material/75-move draws receive no future positional plan.
- Expand the curated opening repertoire from seven to 21 legal study lines. Name an opening family only when the matching prefixes identify one; significant losses keep their error labels rather than becoming Book.
- Rebuild opening context when reviews are materialized from raw engine scores, including cached analysis.

# v3.0.0-rc.19

- Add Academy’s Patterns in reviewed games summary with concrete mating/checking/capturing-reply groups and flagged pawn moves. Counts use the selected side’s latest review for each game, without duplicate counts from reopening or reanalysis.
- Open the latest example directly at its reviewed move, then use Practice this mistake. Earlier saved cursors are replayed safely to the example; matching shorter reviews preserve fuller summaries.
- Exclude imports by default, ignore spectator reviews, and allow optional import inclusion. Derived summaries are bounded and can be cleared without deleting saved games/results/progress.
- Allow explicit review of paused saved history when live coaching is hidden; active native play remains hidden.

# v3.0.0-rc.18

- Reuse completed Stockfish reviews for matching moves, positions, engine and selected depth. Cached scores rebuild current classifications and teaching; earlier cursors can reuse a matching prefix.
- Analyze at selected depth always starts a fresh run. Saved analysis can be disabled or cleared without deleting games, results or Academy progress.
- Keep up to five completed reviews within a bounded local cache. Invalid data, failed saves, cancelled runs and mismatched branches/depths cannot substitute a cached review.
- Allow imported-game review when the live-coaching hide preference is enabled.

# v3.0.0-rc.17

- Add paste → preview → save PGN import under Saved games, with legal main-line validation before creating a separate saved record. Supports SAN, coordinate moves and older Chess Coach coordinate-arrow exports.
- Import standard-start games for replay/review, choose your review side, and preserve recorded players/results on complete re-export. Imported results never affect the bot-game record; replayed boards cannot start new moves or bots.
- Ignore comments/side lines while clearly describing the main-line scope. Reject malformed or ambiguous moves, contradictory results, unsupported variants/custom starts, stale previews and over-limit input. Storage failures leave existing records intact.
- Keep revisit feedback within the lesson’s responsive tools column.

# v3.0.0-rc.16

- Add two positional reply labs: compare an open-file exchange with seventh-rank entry, and handle a pawn challenge to a knight versus using a quiet reply to develop.
- Each branch asks for a plan before a board move. Knight/bishop branches accept multiple safe destinations; attacked squares name the actual attacker.
- Show Black’s legal recapture after the rook exchange so trading does not masquerade as winning material. Both branches are required for completion, and meaningful misses join Revisit concepts.

# v3.0.0-rc.15

- Correct insufficient-material detection when only kings and any number of bishops confined to the same square color remain, including promoted bishops. Previously the multi-bishop case only handled exactly two bishops.
- Add special-rule regressions for all four castling moves, attacked transit squares, lost castling rights, en passant expiry and discovered checks, all promotion types, repetition keys and draw thresholds.

# v3.0.0-rc.14

- Add Academy’s Revisit concepts list for meaningful misses in plan labs, reply labs and explanation checkpoints. Reopen due or upcoming concepts directly.
- Schedule a finished attempt with a miss for tomorrow; clean subsequent attempts move to 3, 7, 14 and 30 days. Unfinished missed attempts remain ready now, and completion checkmarks remain intact.
- Keep one miss per activity attempt, ignore selection/illegal-destination taps, preserve newer cross-tab schedules and show storage failures. Schedules stay local to this browser and do not alter teaching level or bot difficulty.

# v3.0.0-rc.13

- Add two Academy reply labs: predict a legal response to a knight fork or protected bishop skewer, then play the follow-up yourself.
- Each activity requires exploring two different opponent replies before completion. Wrong predictions and legal moves missing the exercise goal preserve the position for another attempt.
- Protect the bishop with an a4 pawn in the existing Skewers lesson, preventing the king from simply capturing the attacker.
- Make loading/worker regression fixtures follow the actual build version; record rc.12 live update and download verification.

# v3.0.0-rc.12

- Retry failed piece images once, then show accessible, readable backup pieces. Settings can retry images; changing themes also rebuilds them.
- Stage and validate offline downloads before replacing files; reject failed HTTP responses and mismatched HTML builds. Reuse the canonical offline page even with URL queries.
- Add visible offline readiness, download/repair and update controls. Updates wait for Load update instead of replacing an active game automatically.
- Add PNG home-screen icons and iPhone installation guidance while preserving charcoal/violet styling.

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
