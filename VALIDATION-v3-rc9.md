# v3.0.0-rc.9 — interactive Academy and game library

## Interaction design

Implemented three learning actions: spot a square, choose a reasoned plan, and play a legal move meeting a concrete objective. Four labs cover development, outposts, open files and king activity. Open-file and development goals accept multiple moves. These are concept exercises, not engine claims of unique best moves. Nine existing lessons now have a final reasoning checkpoint before new completion credit is saved. Existing completion records are retained. The curriculum now contains 44 entries.

Next ideas remain on the roadmap: predict the opponent’s reply, play plans against multiple replies, mixed recognition tests and spaced revisits of missed concepts.

Saved games support separate name metadata and search. PGN uses legal replay and SAN with escaped tags, correct sides/results and moves only up to the saved cursor; it leaves the active game unchanged. A selectable preview provides a copy route alongside Download PGN.

## Automated checks

71 unique checks: 26 core/content, 10 practice, 8 saves, 7 audio/interface, 8 learner coaching, 7 Academy interactions and 5 game-library checks. New tests cover achievable lab goals, wrong spot/plan/move state, multiple solutions, completion gates, stale handlers/restart, metadata-only naming, search, PGN colors/escaping/cursor/results and invalid saves.

## Actual cloud Chrome interaction

- Completed the open-file lab with Rc1, including incorrect f-file spotting, a wrong plan and a legal move to the blocked b-file. Incorrect attempts kept the position intact; completion increased the saved curriculum total.
- Completed the outpost lab with Ne5 and the development lab with Nf3. Desktop shows the board beside the activity panel.
- Finished the Rook endings explanation. A wrong checkpoint answer did not grant credit; the correct answer did. Refresh preserved the completed total.
- Completed the king-activity lab with Kd3 in a 390px Chrome iframe. Page client width and scroll width both measured 375px: no horizontal overflow. This is a CSS check, not iPhone Safari emulation.
- Renamed a saved checkmate game to King safety practice, searched in uppercase, refreshed and observed the name. Opened PGN preview and verified Human as White, Master as Black, checkmate result and SAN: 1. f3 e5 2. g4 Qh4# 0-1.
- Download-event verification timed out (including an 8-second bounded retry), without an app console error. The PGN preview/text route passed; a completed file download was not verified.
- Fast category navigation initially clicked a moving target during smooth scrolling. Removed animated scrolling and repeated category navigation and lab completion successfully.

## Limits

Physical iPhone Safari, installed PWA, disconnected offline startup and sound output were not tested. Browser download completion and import into another chess app remain unverified. Activity progress records completion, not a calibrated measure of understanding. Names and game saves remain browser-local; names use last-write-wins metadata rather than an atomic cross-tab lock. Older standalone Playwright tests were not run; browser interaction used the supported cloud browser.
