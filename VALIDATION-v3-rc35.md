# Chess Coach rc.35 validation

## Automated

All 395 unique dependency-free checks across 31 isolated suites passed. Ten new checks cover pawn distances/direction/turn, empty origins, blockers/sliding pieces, captures/en passant/promotion endpoints, pins/check/castling, every knight jump in both orientations, long-leg/short-leg SVG geometry, legal-destination cues, invalid touch/keyboard starts, right-drag and phone-style drag rejection, independent live/review/trial positions, legacy saved arrows without storage mutation, engine knight suggestions and unrestricted square highlights.

## Actual browser interaction

Desktop Chrome preview: in Arrow mode, selecting e2 showed exactly the e3/e4 destinations. e2-e5 produced no arrow; e2-e4 produced one. g1-f3 rendered a three-point L path, and X flipped it to the mirrored coordinates. An actual mouse drag from e2 to e5 in Arrow mode was rejected and left the two legal destination cues visible. The live move list remained empty. Try moves rendered b1-c3 with an L path on the copied flipped board.

Played e4 and received a legal bot response, then completed actual depth-10 review. Its selected position had Black on move: g1 was rejected as an arrow origin, while g8-f6 rendered the correct L path using that review position rather than the live turn.

375px Chrome iframe: played as Black after a bot opening. e7 showed two legal pawn destinations; e7-e3 was rejected and e7-e5 accepted. g8-f6 bent correctly from Black’s orientation. In Try moves, a g8-f6 L arrow remained visible while selecting b8 showed its two legal knight destinations. Main document client/scroll widths both measured 360px. Phone screenshot retains this L path and destination cues.

## Limits

Right-button dragging is covered by pointer fixtures; actual browser checks used a left-button drag in Arrow mode and endpoint taps. Phone-width Chrome/mouse interaction does not verify physical iPhone Safari touch delivery. Existing hardware audio and disconnected PWA startup limits remain. Old freeform saved arrows can remain in storage but are not displayed when illegal; no record is silently overwritten. Square highlights remain available on any square.
