# Chess Coach rc.25 validation

## Automated

All 268 unique dependency-free checks across 22 isolated suites passed. Fifteen new mixed-practice checks cover every variant’s legal source and achievable goals; reversible board/text mirroring; shuffled coverage; isolation from the live game; missed-concept recording; source-lesson checkmark isolation; stale handlers; full-session completion; every variant’s spot/plan/play flow; incorrect plans and moves; abandonment; malformed history; 30-session retention; storage failure; and mirrored lowercase color wording.

## Browser interaction

Actual desktop Chrome preview: completed a four-position session (White open-file rook from h1, Black development, Black king activity and White supported knight). A deliberately wrong rook plan stayed open, recorded a missed concept, and yielded 3/4 objectives without a recorded miss after completing all four tasks. The normal source lesson was not granted a checkmark merely by mixed practice.

Phone-width Chrome preview: 375px iframe, 360px document viewport after scrollbar. A first partial session exposed incorrect lowercase color wording in a mirrored alternate outpost choice. Fixed the text mirroring, added a regression, and reran all checks. A fresh phone session then completed White king activity, Black development, Black open-file rook from h8 and Black outpost on e4. Black’s board remained flipped after completion. Client/scroll widths both 360px. The complete session reported 4/4 objectives without a recorded miss. Refresh showed two completed sessions (desktop and phone) and retained the latest result; the abandoned partial session was not counted. A screenshot records the completed phone layout.

## Limits

These are guided objectives with visible prompts and feedback, not a validated learning-outcome measure or a skill/Elo rating. Physical iPhone Safari, hardware audio and PWA/offline-startup tests remain unverified. Existing Chrome checks are not substitutes for those device checks.
