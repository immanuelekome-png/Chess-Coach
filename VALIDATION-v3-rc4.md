# v3.0.0-rc.4 — position-specific teaching

Includes the unpublished rc.3 Academy promotion chooser.

## Behavior

Live coaching, full-move hints and Game Review now add position-based plans and tradeoffs for development, central pawn exchanges, exposed king diagonals, isolated/passed pawns, rook files, early queen moves and king activity. Suggestions identify White or Black explicitly. Stockfish supplies continuations and evaluations; board-derived plans are teaching suggestions, not assertions of the engine’s intent.

Continuations are replayed through the legal-move generator. Invalid moves terminate the displayed line. A mismatched principal variation is replaced with the legal best move only, and terminal positions never gain imaginary responses. Full hints avoid duplicating the same positional paragraph.

## Validation

26 core/content regressions pass, including the prior rc.3 promotion checks and six new teaching/continuation regressions.

Actual cloud Chrome interaction: played e4 and Nf3 with Stockfish responses; e4 coaching explained development and the cost of extra pawn moves. Played f3; live coaching identified the open h4–e1 diagonal, its king-cover tradeoff, an evaluated alternative and a legal engine continuation. A completed two-ply Game Review displayed the richer explanation and alternative. Full assistance produced an e4 recommendation and a three-ply engine line. The final wording identifies whose plan is being discussed and avoids duplicate hint paragraphs.

UI source refresh during preview reset one test game; that game was restarted before final checks. This is preview reload behavior, not saved-game recovery.

## Limits

No full-game spectator regression repeated for rc.4; full games through 63 plies were tested for rc.2. No iPhone Safari, audio, offline or comprehensive strategic-content audit in this pass. Opponent-Elo/learner-skill adaptation and multi-move mistake-practice continuations remain future work.

## Publication state

Prepared locally, not uploaded or published. An automatic approval review rejected the rc.3 upload because it required explicit authorization for that release and public repository. The live site remains rc.2 until publication succeeds.
