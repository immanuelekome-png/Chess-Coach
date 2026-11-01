# v3.0.0-rc.8 — distinct accents and learner coaching

Charcoal surfaces, panel layout and board presets are retained. Brand accents, selection highlights, control accents and the app icon use violet/blue instead of the former green. Move-quality colors still distinguish categories.

The learner selects Foundations, Developing, Advanced or Expert in Settings (also linked from setup). This browser-local preference changes teaching tasks and legal continuation length. Opponent difficulty adds practice context, without changing the learner band, assistance permissions or engine strength/depth. These are manually chosen teaching bands, not an automatic skill estimate or calibrated Elo.

Mistake practice has remembered 1/3/5-decision lengths. Each session snapshots its target. Recaps name the original move and its tactical or board-derived positional issue; they do not claim longitudinal diagnosis of recurring weaknesses.

## Automated

59 unique checks: 26 core/content, 10 asynchronous practice, 8 saves, 7 audio/interface, and 8 learner coaching. New checks cover skill/difficulty independence, preference persistence and invalid values, beginner/expert content, Black orientation, terminal positions, assistance ceilings, staged hints and continuation limits, structured headings, quick completion and five-decision target stability. Existing cancellation, retry and legal-reply checks pass.

## Actual cloud Chrome

- Selected Foundations against the Master bot, played e4 and received a real reply. Feedback named the four undeveloped minor pieces and gave one development task; opponent context remained separate.
- Reviewed those two plies, changed to Expert in Settings, and verified the same move retained its score while its plan gained recognition/calculation tasks and a three-ply legal continuation.
- Played with Expert skill and warning-only assistance. The second hint explicitly stopped before naming a piece or move. Refresh preserved Expert selection.
- Checked Settings at 390px width in a Chrome iframe. The layout and controls remained accessible. This does not emulate iPhone Safari.
- Played f3/e5/g4/Qh4# against the Master bot, completed the real four-ply Stockfish review and opened the f3 inaccuracy for Quick practice. e4 and a real Stockfish reply completed 1/1 decisions. After refresh/reopening, Quick remained selected.

- Completed Extended practice with five accepted decisions (e4, Nf3, Nc3, e5, d4), five real Stockfish replies, and a 5/5 recap naming the original f3 king-diagonal weakness. Accepted move losses were 0, 4, 0, 0 and 2 cp.

## Limits

No physical iPhone/Safari, installed-PWA or disconnected-offline verification in this release. Physical sound output remains unverified; rc.7 verified generated browser audio signal. Strategic teaching remains a rule-based first pass at Stockfish depth 10, not grandmaster analysis or an automatic rating system. The older standalone Playwright smoke suite was not run; UI checks used the supported cloud browser.
