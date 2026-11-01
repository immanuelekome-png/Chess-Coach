# v3.0.0-rc.7 — sound and interface

## Automated checks

49 unique regressions pass: 26 core/content, 8 asynchronous practice, 8 saved-game and 7 audio/interface checks. Audio fixtures verify waiting for AudioContext.resume, mute/zero volume, pending-sound cancellation, coaching preference, distinct cues and visible startup failures. Interface fixtures verify SAN (including disambiguation, castling, captures, promotion and checkmate) and teaching-card parsing.

## Actual cloud Chrome interaction

- Enabled sound, pressed Test sound and observed a nonzero analyser signal. Muted audio, verified the test refused playback, refreshed and verified mute persisted. Zero volume produced a specific message; volume 80% and board theme persisted.
- Started a game, played e4 and received a real Stockfish reply. The Moves panel showed SAN. Undo removed only the reply, and reopening the saved game preserved Redo; Redo restored that reply.
- Completed the two-ply review at Stockfish depth 10. Accuracy cards, categories, move details and separate teaching cards rendered. Hidden live review disabled Review and hid hints.
- Navigated through Saved games and Academy, opened Opening principles and advanced its first move. Audio status recorded a move cue.
- Tested a 390px-wide, 844px-high iframe in Chrome. The page had no horizontal overflow (375px client width and scroll width, with the scrollbar); played e4 and received ...e5, then switched to the SAN move list. This checks CSS layout, not iPhone Safari.

## Limits

Browser audio signal generation was verified; speaker output cannot be heard through this browser interface. Physical iPhone sound, Safari/PWA installation and disconnected offline startup remain unverified. Accuracy labels remain app-specific engine estimates. Existing desktop Playwright smoke tests were not run; browser interaction used the supported cloud browser.
