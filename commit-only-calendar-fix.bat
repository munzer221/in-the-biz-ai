@echo off
echo.
echo ========================================
echo   COMMIT ONLY CALENDAR FIX
echo   (Ignoring node_modules)
echo ========================================
echo.

cd /d "c:\Users\Brandon 2021\Desktop\In The Biz AI"

echo Step 1: Adding .gitignore (now includes node_modules)...
git add .gitignore

echo.
echo Step 2: Adding ONLY the calendar fix...
git add lib\screens\calendar_sync_screen.dart

echo.
echo Step 3: Showing what will be committed...
git status

echo.
echo Step 4: Committing...
git commit -m "Fix: Calendar import - show account names in release builds, re-enable web sync, fix container overflow"

echo.
echo ========================================
echo   DONE! Only calendar fix committed.
echo   Node_modules are now IGNORED forever.
echo ========================================
echo.
pause
