# Chess Coach rc.31 validation

All 346 unique dependency-free checks across 28 isolated suites passed. Three new loading-reliability checks cover exact registration errors and unchanged game position, successful retry through Check for updates, disabled controls during setup and a single in-flight registration under concurrent calls. Failure/retry conditions are VM fixtures, distinct from live browser evidence.

Public rc.30 installed all 45 offline files and its explicit update check succeeded. The independent status route verified matching published, served and installed versions. Physical iPhone Safari, hardware audio and disconnected startup remain unverified. An installed rc.30-to-rc.31 update is checked after deployment.

Actual Chrome preview checks: desktop and 375px phone Settings show the insecure-preview explanation and disabled update control. Phone dialog client/scroll widths both measured 305px; its App status link opened the independent page and displayed rc.31. No horizontal dialog overflow was observed. These checks do not simulate a real network registration failure.

## Actual public update

The rc.31 Pages workflow succeeded. With rc.30 installed, Refresh status showed published rc.31 versus served/installed rc.30. Check for an app update downloaded a waiting worker. Load downloaded update activated rc.31; published, served and installed fields then matched with 45/45 files downloaded. Open Chess Coach displayed rc.31 and retained the existing three-ply Black-versus-Guardian saved game. No cache or saved data was cleared. Screenshot evidence is retained outside the repository.
