# Chess Coach rc.30 validation

## Automated

All 343 unique dependency-free checks across 28 isolated suites passed. Fifteen new checks cover release-marker consistency, matching and stale builds, exact update exceptions, retry and waiting updates, explicit activation, absent/denied registration, independently failed build fetches, invalid worker replies, postMessage failure, stale response ordering, bounded error text, unavailable service workers and actual Settings error retention. Offline-worker checks explicitly leave status.html/build.json unintercepted.

## Actual browser interaction

Desktop Chrome preview: followed Settings → App status and update details, verified published and served rc.30, unavailable service worker in the insecure preview context, disabled update control and expanded selectable diagnostic report. The normal published HTTPS context is checked separately after deployment.

Phone-width Chrome preview: opened the status route inside a 375px iframe. The stacked labels/actions were legible; document client and scroll width both measured 360px (375px minus the scrollbar), with no horizontal overflow. This is phone-width Chrome, not physical iPhone Safari.

## Server audit and limits

Before this release, direct HTTP inspection found deployed index.html/sw.js at rc.29 and all 45 offline asset paths returned HTTP 200. This establishes server availability, not successful browser installation. The existing browser had kept rc.28 and failed update checks without a useful error; rc.30 exposes the exact exception for follow-up diagnosis. Its independent status route needs network access; it does not certify disconnected startup, PWA installation or sound output. Physical iPhone Safari remains unverified. No game data is cleared by these controls.
