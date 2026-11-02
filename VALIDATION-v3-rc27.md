# Chess Coach rc.27 validation

## Automated

All 290 unique checks across 24 isolated suites passed. Ten bishop-coaching checks cover exact first pawn blockers, conditional plan/tradeoff text, focused Foundations advice, Black-side mirroring, a pawn hidden behind a friendly or enemy piece, opposite-color versus same-color bishops, nonbishop inputs and terminal-position suppression.

## Actual browser interaction

Desktop Chrome preview imported a legal move-15 Be2/Kf7 custom-position line, ran actual Stockfish depth-10 review and showed White’s pawns on d3 and f3 as diagonal blockers. The plan compared a safe pawn break with another bishop route, retained the remaining c1 development observation and stated the protection/open-line tradeoff.

Phone-width Chrome preview selected Foundations, imported the Black-side Be7/Kf2 mirror and ran actual depth-10 review. Its recognition card named the pawns on d6 and f6 blocking the e7 bishop, followed by one focused plan and a protection tradeoff. Black’s board was flipped. Client/scroll widths both 360px inside the 375px iframe. Screenshot records the phone coaching cards. A final wording edit changed “that pawn” to “a blocking pawn” to suit either one or multiple blockers; regression checks were rerun afterward.

Public rc.26 was also opened during this cycle. Its mixed-practice entry opened correctly and an actual native Master game f3/e5/g4/Qh4# produced exactly one recorded loss on the published site.

## Remaining validation limits

Physical iPhone Safari, hardware audio and actual PWA/offline startup cannot be verified in this browser environment. Bot strength labels are still approximate; representative strength calibration and longitudinal learning-outcome validation are future evidence work. These limits prevent an honest claim of 100% verification even when available regression/browser checks pass.
