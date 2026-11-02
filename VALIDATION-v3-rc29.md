# Chess Coach rc.29 validation

## Automated

All 328 unique checks across 27 isolated suites passed. Sixteen new checks cover independent/enabled/hidden/requested context, position scoping, bounded requests, conservative unknown context, malformed fields and controls, saved timelines and bot exclusion, opponent/import/spectator ownership rejection, read-only legacy loading, Undo/Redo/refresh, selected-side summaries, cached review reconstruction, PGN omission, mismatched arrays and capture before hint reset in the player move path.

## Actual browser interaction

Desktop Chrome preview: started native Beginner play with strategic assistance and interruptions off. Requested and received an actual Stockfish hint before e4. After ...Nc6, enabled Hide live review; the live Review control disabled. Played Nf3, received ...d5, then undid one bot move to pause history and opened actual depth-10 review. Its summary showed one independent-setting move, one hint-requested move, no invented unknown context. The e4 chip read Hint requested; the Nf3 chip read Independent setting.

Phone-width Chrome preview: refreshed and reopened that three-ply saved game, then opened cached review. Both recorded contexts survived, and client/scroll widths matched at 360px inside the 375px iframe. Opened the older six-ply Beginner game created before this feature: its three player moves remained unknown, and its per-move chip did not claim independence. Screenshot records the legacy summary. A final copy edit removes a redundant repeated “Context” label in that chip.

Public rc.28 was opened during this cycle and displayed the correct version. Playing Black against Guardian produced legal White e3/d4 replies to Black e5 with the flipped board, exercising the published difficulty/style path.

## Limits

Recorded settings are not proof of independent cognition, delivered/used hints, learning improvement or Elo. Earlier feedback and outside assistance are not measured. Pending hints before a reload are not invented afterward; subsequent unknown history is conservative. Metadata is browser-local and omitted from PGN. Physical iPhone Safari, hardware sound and PWA/offline startup remain unverified; longitudinal learning validation requires future data.
