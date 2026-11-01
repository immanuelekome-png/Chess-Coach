# v3.0.0-rc.12 — loading, offline files and app updates

Failed piece PNGs retry once, then become labeled Unicode backup pieces with distinct light/dark colors. Failed sources are remembered for the session to prevent repeated requests on every board render. Retry piece images and theme changes rebuild hosts; detached callbacks cannot replace a newer render. This is defensive recovery: the intermittent failure in the user's iPhone screenshot was not reproduced or diagnosed.

Offline downloads stage all 45 assets and validate both HTML entry points against the worker build before promotion. HTTP failures, mismatched builds and failed downloads do not replace the cached page. Navigation queries use the canonical cached page; missing assets can be recovered online and reused without their retry query. Cache-write errors do not prevent a valid online response. A newly downloaded worker waits for explicit Load update. Settings reports readiness, offers update checks and offline download/repair, and explains device-local saves and iPhone installation.

## Automated

93 unique dependency-free regression checks passed: core 26, practice 10, saved games 8, audio/interface 7, learner coaching 8, Academy 7, library 5, review 8, offline worker 8, loading reliability 6. The latter two use mocked network/cache/DOM environments. Their offline scenarios are simulated network failures, not browser airplane-mode tests.

## Actual cloud Chrome before publication

- Intentional image-failure fixture: all 32 pieces became accessible backups. Played e4 and observed the bot reply; Retry piece images and a theme change retained readable pieces. Desktop and 390px frame visually checked.
- Normal 390px frame: all 32 PNGs loaded, played e4, received a bot reply, and Undo paused history with single-ply navigation. Settings was usable; body client and scroll widths both 375px (no horizontal overflow).
- HTTP preview correctly reported that offline setup is available on the published HTTPS site instead of claiming readiness.

## Actual live HTTPS after publication

Cloud Chrome loaded rc.12 and reported all 45/45 offline files ready with a waiting update. Load update activated the downloaded worker and reloaded rc.12. Settings then reported 45/45 ready without a pending update. Download offline files and Check for updates completed with readiness preserved. This verifies the online download/update path, not disconnected startup.

## Limits

No physical iPhone Safari, installed-PWA, disconnected browser startup or audible hardware-output test. The browser API does not expose network disabling. Live HTTPS readiness/update/download checks are recorded separately after deployment. Unicode fallback appearance depends on available device fonts. Deeper-review performance on long games and bot Elo calibration remain separate work.
