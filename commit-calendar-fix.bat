@echo off
echo.
echo ========================================
echo   COMMITTING CALENDAR FIX
echo ========================================
echo.

echo Adding calendar_sync_screen.dart...
git add lib\screens\calendar_sync_screen.dart

echo.
echo Committing...
git commit -m "Fix: Calendar import - show account names in release builds, re-enable web sync, fix container overflow"

echo.
echo ========================================
echo   COMMITTED! Ready to deploy.
echo ========================================
echo.
pause
