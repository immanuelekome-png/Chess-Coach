@echo off
setlocal
cd /d "%~dp0"
echo.
echo Chess Coach - browser test runner
echo.
where node >nul 2>nul
if errorlevel 1 (
 echo ERROR: Node.js is required. Install the LTS version from https://nodejs.org/
 pause
 exit /b 1
)
if not exist "node_modules\playwright" (
 echo Installing Playwright (first run only)...
 call npm install
 if errorlevel 1 goto fail
)
echo Installing/checking Chromium browser (first run may download it)...
call npx playwright install chromium
if errorlevel 1 goto fail
echo Running tests...
call npm test
set RESULT=%errorlevel%
echo.
echo Reports and screenshots are in the test-results folder.
echo.
pause
exit /b %RESULT%
:fail
echo Test setup failed. Check the error messages above.
pause
exit /b 1
