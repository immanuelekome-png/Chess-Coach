# v3.0.0-rc.16 — positional reply branches

Two new Academy Plan labs ask the learner to read an opponent’s reply, choose a plan, then play it. Open-file decisions compares Black’s ...Rad8 with ...Rac8. The contested-file branch includes White’s Rxd8 and Black’s validated ...Rxd8 recapture; it does not count the exchange as winning a rook. The other branch asks for Rd7 to use the entry square and explains that Black can defend or seek activity.

A knight under pressure compares ...f6 with ...a6 after Ne5. The pawn-challenge branch accepts several knight destinations outside Black’s current attacks. The quiet branch accepts several safe developments of the c1 bishop while retaining the supported knight. Neither branch claims e5 is a permanent outpost. Failed safe-square attempts name the actual attacking piece and square. These are curated objective exercises, not engine-best lines or claims of forced advantage.

Both example branches are required before completion. Wrong plans keep the board locked; legal moves missing the objective preserve the position. A bad configured recapture fails before any branch state is appended. Misses use the existing device-local revisit schedule. Live games/history remain unchanged.

## Automated

137 unique dependency-free checks passed across thirteen isolated suites. Eleven new positional-reply checks cover legal configurations, branch goals and recaptures, meaningful feedback, plan locking, alternative safe moves, unsafe-square rejection, either branch order, live-state isolation, stale/invalid handlers and failed-recapture atomicity. Existing tactical-lab regressions remain in the suite.

## Actual cloud Chrome

- Desktop: opened the rook lab through Plan labs, rejected Ra7 onto a friendly pawn, selected ...Rad8, rejected the claim that it wins a rook and observed 64 disabled squares until a correct plan. Played Rxd8 and observed Black’s recapture on d8 with both sides retaining one rook. Explored ...Rac8 and completed Rd7; credit waited for both branches.
- 390px frame: selected ...f6, rejected ignoring the pawn attack, attempted Nc6 and saw the unchanged position; played Nd3. Explored ...a6 and developed Bg5, completing both branches. Body client/scroll widths were 375px. After refining feedback, repeated Nc6 and observed the concrete message that Black’s b7 pawn attacks c6.

## Limits

No physical iPhone Safari, installed-PWA, disconnected-startup, hardware-audio or true simultaneous-tab check. Current-attack checks are exercise goals, not full tactical evaluations; a safe-looking destination can still require deeper calculation in real games. Example replies are curated and do not enumerate every defense. Long-term learning effectiveness remains unmeasured.
