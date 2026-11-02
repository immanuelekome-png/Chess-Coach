# Chess Coach 3.0.0-rc.24 validation

## Automated

`npm run test:regression`: all 253 unique checks across 21 isolated suites passed. Nineteen custom-start checks cover Black-first counters, SetUp/FEN metadata, malformed positions/counters/rights, kings and promotion budget, nonmoving-king safety, castling, en passant including legal preceding double pushes, promotion, persistence at every cursor, full/partial export, saved-source tampering, Book eligibility, move-list columns, pattern parity/numbering/source identity and empty-history turn text. Existing standard-start suites remain passing.

## Actual browser interaction

Desktop Chrome preview: imported the four-ply king/pawn ending beginning Black-to-move at move 37. Preview retained 37…/38./39. numbering. Saved and opened as Black with a flipped board; Undo removed exactly the last move and Redo restored it. Completed actual Stockfish depth-10 review, reopened cached analysis, forced a fresh review and confirmed all four numbered entries. Export included SetUp 1, the original FEN, players, and the full move line. No Book labels appeared. A preview source refresh reloaded the page during the first check; the saved game was reopened and the final checks completed afterward.

Phone-width Chrome preview: 375px iframe, 360px document viewport after scrollbar, matching client/scroll widths. Invalid kingless FEN kept Save disabled. Imported a three-ply Black-first mating line at move 9 with White selected for review. Move rows showed 9… e5 and 10.g4 Qh4#. Actual depth-10 review labeled 10.g4 a Blunder. Imports remained excluded from patterns until explicitly included. Its summary displayed 10.g4 and Review latest example selected that exact entry using saved analysis. Refresh/reopen, three Undo steps back to the supplied Black-to-move position, three Redo steps, and cached review passed. Desktop review screenshot saved as QA evidence.

## Limits

FEN checks enforce supported structural and turn constraints; they do not prove every position historically reachable. Imports require at least one move, remain replay/review-only, and exclude prior capture/repetition history. Physical iPhone Safari, hardware audio output and PWA offline installation/startup are not verified by these Chrome checks.
