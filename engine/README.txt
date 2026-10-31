To activate a real offline UCI engine, install a browser Worker-compatible Stockfish build here.
Required: stockfish.js and its matching .wasm / NNUE files, as required by that exact build.
Do not rename files referenced by the engine JavaScript.
Chess Coach detects the worker via UCI handshake. If unavailable, it explicitly uses the experimental fallback.
No engine binary is included in this release.
Stockfish source and licensing: https://github.com/official-stockfish/Stockfish
Note: some Stockfish JS distributions export a factory instead of a self-starting Worker. Use a Worker-compatible distribution.
