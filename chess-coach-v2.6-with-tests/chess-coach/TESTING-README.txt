CHESS COACH - ONE-CLICK WINDOWS BROWSER TESTS

1. Install Node.js LTS from https://nodejs.org/ if it is not installed.
2. Extract the ZIP to a normal folder (do not run it inside the ZIP).
3. Double-click RUN-TESTS.cmd inside the chess-coach folder.
4. On first use, allow npm and Playwright to download Chromium.
5. The app opens in a visible Chromium window. Do not click while tests run.
6. Open test-results/report.html after the test finishes.
7. Send report.json and screenshots from test-results back to ChatGPT.

The test runner automatically starts a local HTTP server and stops it afterwards.
It uses a random free localhost port, so it does not interfere with your usual port 8000.
It never uploads your data. Network is used only to install dependencies.

IMPORTANT: This is a smoke/regression suite, not exhaustive certification.
It tests actual UI interactions and checks Stockfish startup and a bot reply.
Some features need additional test cases. iPhone Safari must be tested separately.
A failing test may reveal a selector/timing issue in the test itself; inspect the report.

For manual use, the app itself is still the normal index.html served with
py -m http.server 8000, then http://localhost:8000.
