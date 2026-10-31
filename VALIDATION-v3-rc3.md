# v3.0.0-rc.3 — Academy promotion choice

The Academy no longer chooses the answer or defaults a promotion for the learner. A Queen/Rook/Bishop/Knight chooser appears before moving the pawn, with Cancel. All choices pass through the existing legal-move/objective evaluator, including personal review practice. Wrong challenge choices preserve the original board. Completed puzzles ignore extra moves.

Cloud Chrome preview: selected g7–g8; chooser appeared with pawn still on g7; Queen was rejected with a position-specific explanation; Knight was accepted and curriculum completion saved. Regular queen-promotion challenge, cancellation and restart checked separately.

Automated: 20 core/content checks pass, including all four Academy promotion choices, original-board preservation on wrong choices, correct completion, and prevention of moves after puzzle completion.

No new iPhone Safari, audio or disconnected-offline verification. Existing rc.2 live deployment smoke check confirmed version, Stockfish response, hidden coaching/review and one-ply Undo/Redo.
