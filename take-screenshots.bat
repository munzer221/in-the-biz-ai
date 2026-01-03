@echo off
echo ========================================
echo Taking Screenshots for Google Play Store
echo ========================================
echo.

echo Connecting to your Android device...
flutter devices

echo.
echo Starting screenshot capture...
echo This will take about 2 minutes...
echo.

REM Run integration test to take screenshots
flutter test integration_test/take_screenshots_test.dart --device-id=10.0.0.65:5555

echo.
echo ========================================
echo Screenshots saved to: screenshots/
echo ========================================
echo.
echo Files created:
dir /b screenshots\*.png

echo.
echo Next steps:
echo 1. Screenshots are in the screenshots/ folder
echo 2. Upload them to Google Play Console
echo 3. Feature graphic is in: store-assets/feature-graphic.png
echo 4. App icon is in: store-assets/app-icon-512.png
echo.
pause
