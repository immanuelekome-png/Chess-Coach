# v3.0.0-rc.14 — revisit missed Academy concepts

Revisit concepts tracks meaningful errors in four plan labs, two reply labs and nine explanation checkpoints. Repeated errors in the same activity attempt count once. Selection and illegal-destination taps do not count; a legal move missing an explicit objective does. Leaving after a miss keeps that concept ready now. Finishing with a recorded miss schedules tomorrow; clean later completions schedule 3, 7, 14 and capped 30-day intervals. Early practice is available and a clean early completion also advances the interval. Existing curriculum credit remains intact. These are app practice reminders, not a measured skill estimate or push notification system.

Each concept has its own local-storage record, validated on reading. Completion checks its revision against the activity’s starting/latest-miss revision before rescheduling, preserving newer changes from another tab. Stale activity callbacks are ignored. The Academy home view refreshes for relevant storage events and when the page becomes visible. No cross-device sync is added. Simultaneous writes to the same concept are not a transactional event log.

## Automated

115 unique dependency-free regressions passed, including 13 new concept-review checks. Coverage includes one miss per attempt, persistence, clean first attempts producing no invented weaknesses, 1/3/7/14/30-day scheduling, partial completion, checkpoint/reply completion gates, illegal taps, stale callbacks, newer revisions, independent concept keys, malformed records and storage errors.

## Actual cloud Chrome before publication

- Desktop: missed an outpost recognition task, left it unfinished and observed one ready-now item. Practice next due concept reopened it. Completed a clean attempt and observed a three-day schedule, with the original lesson checkmark retained.
- 390px frame: missed an open-file recognition square, answered the plan and played Rd1. Observed Revisit tomorrow. Returned to Academy and refreshed the page: both the tomorrow item and the earlier three-day outpost item persisted. Body client/scroll widths were both 375px.
- Phone visual layout and reopening upcoming concepts checked through the rendered UI. Calendar intervals beyond the immediate session are simulated in unit fixtures rather than elapsed-day browser tests.

## Actual live HTTPS after publication

Applied the waiting update from rc.13 through Load update and observed rc.14. Opened the published outpost lab, missed a recognition square, completed the plan and Ne5, and observed Revisit tomorrow in both lesson status and Academy’s revisit list.

## Limits

No physical iPhone Safari, installed-PWA, disconnected-startup or hardware-audio test. The schedule has not been evaluated for learning effectiveness. It currently covers the interactive concepts above, rather than every puzzle or analyzed-game error. Concurrent-tab revision protection is fixture-tested; true simultaneous browser writes remain unverified.
