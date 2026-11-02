# Paired bot-match baseline (rc.29)

Actual bundled Stockfish Node UCI searches using the app’s scored-candidate selection. Balanced styles, one shared four-ply opening, color-reversed pairs, recorded selection seeds, and an 80-ply cap.

| White setting | Black setting | Result | Ending | Total plies |
|---|---|---|---|---|
| 400 | 2200 | 0-1 | Checkmate | 78 |
| 2200 | 400 | 1-0 | Checkmate | 57 |
| 700 | 1500 | 0-1 | Checkmate | 66 |
| 1500 | 700 | 1-0 | Checkmate | 47 |
| 1000 | 2100 | 0-1 | Checkmate | 74 |
| 2100 | 1000 | * | Unresolved at move cap | 80 |
| 1500 | 2200 | * | Unresolved at move cap | 80 |
| 2200 | 1500 | * | Unresolved at move cap | 80 |

The higher setting won five games. Three games were unresolved at the move cap; they are not counted as draws or wins. There were no lower-setting wins in this small run. All 530 searched moves were legal and used complete candidate sets (the 32 prescribed opening moves are separate).

Raw traces: `paired-bot-matches-rc29.json`. Its `columns` array defines each move row: UCI move, completed depth, candidate width, selected cp/mate, best cp/mate and elapsed milliseconds. The initial opening is stored separately.

Reproduce with `npm run bench:matches`. It runs the bundled engine without installing dependencies and checkpoints its output during play. Timing and search results can vary by machine.

This is relative implementation evidence from eight games and one opening. It is not calibrated human Elo, a broad opening/endgame tournament, proof that a higher setting always wins, or a device-performance test. More openings, repetitions, reference opponents and rated data are still needed.
