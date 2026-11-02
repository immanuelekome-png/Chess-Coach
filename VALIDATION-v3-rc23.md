# Chess Coach 3.0.0-rc.23 validation

## Automated checks

`npm run test:regression`: all 234 unique checks across 20 isolated suites passed. Eight new checks cover legal opposition routes and opponent replies, incorrect predictions/plans/moves, two-decision completion, cursor reset and atomic failure for a malformed continuation. The existing positional suite now exercises every decision before advancing branches, in either branch order, without changing the live game.

## Browser interaction

Actual desktop Chrome on the preview: opened Academy → Endgames → Read the reply: keep the opposition. The illegal ...Ke5 prediction reported the attacking e4 king; a wrong plan kept the board locked. Played Kd4, observed ...Kc6, then Kc4. The first decision kept the branch open. Explored ...Kf6, played Kf4, observed ...Kg6, then Kg4. Completion required both branches.

Actual phone-width Chrome: 375px iframe (360px content viewport after scrollbar), no horizontal overflow (root client and scroll widths both 360px), 306px board. Persisted desktop completion was visible. Reopened and completed both branches in reverse order. The opponent reply and second decision appeared correctly. Captured a screenshot of the completed lesson.

## Publication and limits

rc.22 merge and successful Pages workflow were verified before starting this release; a fresh public tab displayed rc.22 and its file-picker import controls. This confirms the release was reachable, not a full post-publication rc.22 feature retest.

Physical iPhone Safari, PWA installation/offline startup and hardware sound output are not verified by these Chrome checks. No learning-outcome study or calibrated strength estimate is claimed.
