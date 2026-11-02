Chess Coach bundles Stockfish.js 19 Lite and its matching stockfish.wasm.
The bundled JavaScript supports a browser Worker and a Node UCI command-line entry point.
Bot play uses full-strength MultiPV candidate scores from a completed iteration, then applies app-specific difficulty limits and small style preferences. Target strength labels are approximate, not calibrated Elo. Review uses a separate full-strength analysis worker.
If the engine is unavailable, play pauses with a recovery message; no heuristic fallback move or review score is substituted.
Stockfish source and licensing: https://github.com/official-stockfish/Stockfish
Stockfish.js source and licensing: https://github.com/nmrugg/stockfish.js
See repository licensing/notices for the bundled build.
