# v3.0.0-rc.13 — predict and play opponent replies

Two new Plan labs begin after a checking knight fork or protected bishop skewer. The learner chooses a legal king response from two valid examples and a check-ignoring distractor, then captures the forked queen or exposed rook. Completion requires both example branches. Wrong answers preserve the position; seen branches cannot be counted twice. Restart resets the activity; completion is device-local. These are objective exercises, not engine-selected best-defense variations or claims that every legal reply is included.

The existing Skewers lesson now includes an a4 pawn protecting the bishop on b5. Without that protection, ...Kxb5 was a legal response that removed the attacker. The new position forbids it and explains why.

## Automated

102 unique regressions passed, including 16 Academy checks (nine new). New coverage verifies legal starts/checks/replies, illegal check-ignoring choices, achievable follow-ups, bishop protection, rejection without board changes, two-branch completion, either branch order, unchanged live game, restart isolation and stale handler guards. Worker/loading fixtures derive the current build version rather than hardcoding rc.12.

## Actual cloud Chrome

- Desktop: opened the fork lab through Academy → Plan labs. Rejected Qe4 with check-specific feedback, explored Kf1 then Kd1, and played ...Nxe3 after each. Completion appeared only after both branches.
- 390px frame: opened the protected-skewer lab, rejected Rd8, explored Kb6 then Kd6 and played Bxd7 after each. Confirmed 2/2 explored, bishop on d7, completion feedback, and restart returning to 0/2 with locked prediction board. Readable pieces remained visible while locked.
- Phone body client width and scroll width were both 375px. Screenshot inspected for the board, question and stacked answer controls.

## Limits

Phone-width Chrome is not physical iPhone Safari. These two labs use curated replies rather than live engine opposition. Long-term retention, spaced review, positional reply branches and expanded endgame coverage remain future work. rc.12 live HTTPS download/update readiness checks are recorded in its validation document; disconnected browser startup and physical audio remain unverified.
