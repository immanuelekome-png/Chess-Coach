# v3.0.0-rc.21 — local PGN file selection

Saved games → Import a PGN accepts one .pgn or .txt file through the native file chooser. File.text reads it locally and the existing main-line validator previews it before Save becomes available. Choosing a file never automatically saves or replaces the current game. Extension checks use the full name rather than its shortened display label. Input resets allow selecting the same file again.

File size is limited to 200,000 bytes and existing text to 100,000 characters/600 half-moves. Oversized files are rejected before reading; failed reads leave existing text intact and disable Save. A request token stops an earlier read from overwriting newer files, manual edits or explicit previews. Review-side changes keep the pending file and use the latest side.

## Automated

214 unique dependency-free checks across eighteen isolated suites. Twelve file checks cover legal preview without storage, selected-file and .txt paths, cancelled/no selection, pre-read byte limits, extensions, unsupported readers, read errors, invalid content, manual-edit/new-file races, text-size limits, long filenames and review-side changes during loading.

## Actual cloud Chrome

- Desktop: opened the real file chooser, selected a generated four-ply PGN and observed canonical SAN preview plus Loaded status. Saved/opened it and observed the recorded-result replay/review notice.
- 390px frame: selected the same real file through the chooser and observed the valid preview; body client/scroll widths were 375px. Selected a generated 200,001-byte .pgn file and observed size rejection, disabled Save and the previous valid PGN text still present.
- Generated files contain dummy chess data and remain QA inputs, not app assets. No server upload endpoint is used by the file-import implementation.

## Limits

No physical iPhone Safari/Files picker, installed-PWA, disconnected-startup or hardware-audio check. File-provider availability/permissions can differ on a real phone. UTF-8 text is expected. Import still supports one standard-start main line, not custom-FEN games or multi-game databases. Asynchronous race cases were fixture-tested rather than induced through slow physical storage.
