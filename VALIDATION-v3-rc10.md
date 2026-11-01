# v3.0.0-rc.10 — Academy board visibility

Phone-width inspection of deployed rc.9 showed that the global disabled-button opacity faded the whole Academy board during a plan question. The CSS override keeps disabled board squares at full opacity; their native disabled state still prevents moves.

Actual 390px Chrome iframe check: entered the open-file lab’s choice phase, verified all 64 squares were disabled and their computed opacity was 1. Before this fix, rc.9 phone-width checks also verified gameplay, one-ply Undo/Redo, two-ply review, all 32 images loading in each of Classic/Alpha/Heritage, saved-game rename/search and PGN preview with 375px client/scroll width. Physical iPhone Safari remains unverified. The user confirmed the apparent header overlap was ordinary scrolling; no navigation redesign was made. Missing pieces recovered after refresh on their device; the intermittent cause was not reproduced or identified.

26 core/content checks pass after the CSS/version change. rc.9’s 71-check feature validation remains documented in VALIDATION-v3-rc9.md. Browser file-download completion, iPhone/PWA/offline and physical sound limits remain unchanged.
