@echo off
echo.
echo ========================================
echo   RESETTING NODE_MODULES
echo ========================================
echo.

echo Restoring node_modules to clean state...
git restore node_modules
git restore package-lock.json
git restore package.json

echo.
echo ========================================
echo   DONE! Node modules reset.
echo ========================================
echo.
pause
