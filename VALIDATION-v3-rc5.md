# v3.0.0-rc.5 — multi-move mistake practice

Practice from a reviewed mistake now continues for three learner decisions with a legal Stockfish reply after each accepted move. The first move can be sound or materially better than the original error; subsequent decisions must stay within 60 cp of the engine’s preferred evaluation. Rejected moves leave the current board intact. A terminal position ends the session early. Summary reports accepted decisions, attempts and evaluation losses, without changing curriculum progress or the main game’s result.

Failure/cancellation: restarting, exiting or changing lessons invalidates analysis. An error after an accepted move exposes Retry Stockfish reply, preserving the accepted move without recounting it. Session draw detection uses its own history.

## Automated

26 core/content checks and 8 asynchronous practice regressions pass. Added coverage: wrong first alternative, three decisions and replies, retry/idempotency, rejection during continuation, cancellation, session history isolation, Black-side ownership, early checkmate. Worker/evaluation fixtures are used for the asynchronous tests.

## Actual cloud Chrome interaction

Played f3 in a human game and reviewed it. In practice: e4 accepted, ...e6; Nf3 accepted, ...d5; g4 rejected with ...dxe4 explained, original position preserved; Nc3 accepted, ...Nf6. Summary showed 3/3 decisions in 4 attempts, accepted losses 0/4/0 cp. Curriculum remained 0/40. Restart reset the session to 0/3 and the original position.

## Limits

Black-side multi-move flow and engine failure/retry were regression-tested with fixtures, not repeated through the browser in this pass. No new iPhone Safari, audio, offline or full spectator-game verification.
