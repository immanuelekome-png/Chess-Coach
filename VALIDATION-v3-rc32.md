# Chess Coach rc.32 validation

## Automated

All 352 unique dependency-free checks across 28 isolated suites passed. Six new endgame checks verify all six learner moves and opponent continuations are legal with direct opposition at endpoints; wrong answers and board locks; stale earlier-decision answers; legal off-objective moves preserving position; third-decision/both-route completion; bounded recap claims and isolation from the shorter lesson. Existing positional traversal now covers all routes in both orders with intermediate questions and verifies the live game is unchanged.

## Actual Chrome interaction

Desktop preview: opened Academy → Endgames → Read the reply: opposition and reassessment. Chose the d6 route, played Kd4, deliberately chose the illegal-adjacency explanation and verified all board squares stayed disabled with the king still on d4. Corrected the explanation, played Kc4, answered the no-guaranteed-win question and played Kb4. Only one route was marked explored. Completed the f6 route through Kf4/Kg4/Kh4 and both checkpoints. Completion recap named the unchanged e3 pawn and the need for separate calculation; the miss scheduled a revisit tomorrow.

375px phone iframe: completed both full routes in reverse order, including all changed-board questions and six board moves. Only both routes together completed the activity. The finished board, recap and revisit message fit the screen; document client/scroll widths both measured 360px. Existing progress is browser-local; this guided check does not establish independent learning or physical Safari behavior.

## Limits

This is one additional guided king-coordination activity. It does not prove that opposition wins the displayed pawn ending, replace analysis of other defenses or measure mastery. Physical iPhone Safari, hardware sound, disconnected startup and longitudinal learning/strength calibration remain unverified. rc.31 public update activation and saved-game retention are recorded in its validation file.
