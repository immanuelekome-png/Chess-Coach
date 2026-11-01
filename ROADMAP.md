# Chess Coach remaining work

Implemented through rc.9: genuine Stockfish coaching, corrected lesson positions, review/undo state fixes, one-ply navigation, automatic accuracy summaries, hidden-live-review preference, independent result records, terminal spectator controls explicit Academy promotion choice, a first pass of position-specific plans/tradeoffs with legal engine continuations, three-decision mistake-practice sessions with Stockfish replies, local saved-game recovery/history, sound controls with gesture startup, organized navigation, SAN move lists structured coaching cards, distinct violet accents, and manual learner teaching bands with opponent context, adjustable 1/3/5-decision practice position-specific recaps, four interactive Academy plan labs, nine reasoning checkpoints, and saved-game naming/search/PGN previews.

## Next priorities

1. Expand and audit positional coaching: broaden recognition cues and strategic coverage beyond the implemented rules. The first manual learner-band/difficulty-context pass is implemented; extend beyond rule-based prompts and evaluate usefulness. Automatic adaptation from demonstrated skill needs a representative, assistance-aware move history and remains future work.
2. Mistake practice refinements: evaluate learning outcomes beyond the implemented 1/3/5-decision sessions and position-specific recaps; develop recurring-mistake tracking.
3. Saved-game refinements: optional review caching and PGN import beyond the implemented naming/search/SAN export preview. Local recovery and reopening are implemented. Saves and progress do not sync between devices.
4. Review refinements: broader Book repertoire, deeper optional analysis, more validation of special labels, and clearer visual links from move classifications to tactical lines. Accuracy is an app-specific estimate.
5. Release testing: iPhone Safari/PWA install and updates, offline startup/playback, physical sound output, special-rule edge cases and true concurrent-tab human-result scenarios. Desktop browser results do not substitute for these.

## Longer term

- More interactive Academy: predict an opponent reply before revealing it; play a plan against several legal replies; mixed recognition quizzes; spaced review of missed concepts; expanded endgame labs. Four spot/choose/play labs and nine reasoning checkpoints are implemented.
- Bot strength calibration over enough games; displayed Elo remains approximate.
- Learner progress and recurring mistake patterns, and automatic skill estimates beyond the implemented manual teaching bands.
