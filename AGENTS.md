# Chess Coach workflow preferences

The user authorized pushing code, creating and merging pull requests, and publishing tested updates to immanuelekome-png/Chess-Coach for this chat. Proceed through implementation, appropriate testing and publication, then continue to the next agreed priority without asking for routine confirmation. Report progress and material blockers. Treat a successful release as a progress milestone and continue to the next agreed work item while authorized work remains.

Open and interact with the app for user-facing changes; distinguish actual browser/device checks from unit fixtures and unverified areas. Do not call a build fully tested when iPhone Safari, sound output or other material areas were not actually verified. Preserve separate assistance level and learner skill/difficulty controls.

Design preference: preserve the mostly black/charcoal surfaces and current navigation/panel structure. Use distinct blue-violet accents; avoid closely copying Chess.com’s green branding. Board themes and semantic move-quality colors remain selectable/meaningful.

Coaching: keep manual learner teaching level, assistance permissions and bot difficulty independent. Teaching bands are not measured Elo; automatic skill estimation is future work. Continue agreed improvements after appropriate checks and publication without routine approval checkpoints.

Academy priority: make lessons interactive with recognition tasks, explain-why choices and playable plans. Four plan labs and nine checkpoints are implemented in rc.9. Two predict-and-play reply labs with two example branches each are implemented in rc.13. A device-local missed-concept revisit schedule is implemented in rc.14. Two positional reply labs with plan choices and multiple accepted safe moves are implemented in rc.16. A two-decision opposition endgame lab with two legal opponent branches is implemented in rc.23. Continue toward longer plans and evaluate learning outcomes; do not reduce Academy to static walkthroughs.

Mobile testing is required alongside desktop checks. The user confirmed the apparent header overlap in their screenshot was normal scrolling; do not redesign the navigation based on that image. Piece loading recovered after refresh; the intermittent cause is unconfirmed. Distinguish phone-width Chrome checks from physical iPhone Safari testing.

Custom-start PGN imports shipped in rc.24: source FEN lives in importedSource.startFen, decodeSavedGame validates it before replay, reviewOpeningPrefix excludes nonstandard starts from Book labels, and pattern summaries retain startFen for turn/numbering/source identity. Preserve old standard-start saves. FEN does not supply earlier captures or repetition history; do not infer them.

Mixed plan practice shipped in rc.25: four shuffled concept families, sixteen White/Black variants, spot/plan/play input, underlying-concept revisit integration and up to 30 independently keyed session records. Guided results count recorded misses and do not measure skill; do not automatically complete source lessons from a mixed exercise.

Results: rc.26 verifies the canonical saved terminal position/revision before counting, preserves an existing outcome and uses Web Locks when available. Two actual human-game tabs completed the same native game without double-counting; stale finishes retain their board/review and show a separate result notice beside Save a copy. Simulated lock races are distinct from browser/device evidence.

Bot play: rc.28 uses completed same-depth MultiPV candidate scores and per-tier selection bands, not clamped UCI Elo. Styles/personality mappings apply within the band. Keep forced mates separate from finite evaluations. The retained 72-search benchmark and a single spectator match do not establish calibrated Elo. Browser stale-response guards and separate full-strength review workers remain required.

Assistance context: rc.29 stores optional per-ply support metadata only on human native moves. Old/imported context is unknown; do not infer independence from current controls or equate a hint request with delivered/used help. Unknown history after reopen/navigation stays conservative. Raw engine caches do not own assistance metadata, and PGN exports omit it. This is descriptive provenance, not an automatic skill estimate.

Update diagnostics: rc.30 adds network-only status.html/build.json outside SW ASSETS. Keep index APP_VERSION, sw BUILD_VERSION/cache, package version and build.json synchronized. Do not cache the independent status route or clear saved data to repair updates. Exact browser errors are evidence; a successful server asset audit does not prove browser update or disconnected startup.

Offline setup: rc.31 exposes exact registration failures and retries initial registration through Check for updates. Keep downloads disabled until a registration exists; guard duplicate initialization. Do not call a no-registration update click a successful check.

Academy rc.32: a separate opposition-and-reassessment lab has three learner decisions in each of two routes, with per-decision questions after changed positions. Preserve the original two-decision lesson and progress key. Current-question guards prevent old answers unlocking later decisions; board input stays locked until the current plan is correct. Guided completion/opposition is not evidence of a forced win or learner mastery.
