# Chess Coach remaining work

Implemented through rc.7: genuine Stockfish coaching, corrected lesson positions, review/undo state fixes, one-ply navigation, automatic accuracy summaries, hidden-live-review preference, independent result records, terminal spectator controls explicit Academy promotion choice, a first pass of position-specific plans/tradeoffs with legal engine continuations, three-decision mistake-practice sessions with Stockfish replies, local saved-game recovery/history, sound controls with gesture startup, organized navigation, SAN move lists and structured coaching cards.

## Next priorities

1. Expand and audit positional coaching: broaden recognition cues and strategic coverage beyond the implemented rules. Add difficulty/learner adaptation while keeping assistance level independent.
2. Mistake practice refinements: adjustable session length and more targeted learning summaries beyond the implemented three-decision flow.
3. Saved-game refinements: names/search/export and optional review caching. Local recovery and reopening are implemented. Saves and progress do not sync between devices.
4. Review refinements: broader Book repertoire, deeper optional analysis, more validation of special labels, and clearer visual links from move classifications to tactical lines. Accuracy is an app-specific estimate.
5. Release testing: iPhone Safari/PWA install and updates, offline startup/playback, physical sound output, special-rule edge cases and true concurrent-tab human-result scenarios. Desktop browser results do not substitute for these.

## Longer term

- More multi-move Academy exercises, recognition tasks, endgames and adaptive curriculum.
- Bot strength calibration over enough games; displayed Elo remains approximate.
- Learner progress and recurring mistake patterns, with manual skill control.
