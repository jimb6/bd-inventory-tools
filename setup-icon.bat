@echo off
echo =======================================================
echo BD ^& Associates Inventory Manager - Icon Setup Guide
echo =======================================================
echo.
echo To set up your app icon with the BD ^& Associates logo:
echo.
echo OPTION 1 - Using Android Studio (Recommended):
echo 1. Open your Android project in Android Studio
echo 2. Right-click on 'app' folder in Project view
echo 3. Select 'New' -^> 'Image Asset'
echo 4. Choose 'Launcher Icons (Adaptive and Legacy)'
echo 5. Set Asset Type to 'Image'
echo 6. Click the folder icon next to 'Path'
echo 7. Browse and select your BD ^& Associates logo file
echo 8. Adjust the scaling and padding as needed
echo 9. Click 'Next' then 'Finish'
echo.
echo OPTION 2 - Online Icon Generator:
echo 1. Visit: https://appicon.co/
echo 2. Upload your BD ^& Associates logo (high resolution PNG/JPG)
echo 3. Select 'Android' platform
echo 4. Download the generated icon pack
echo 5. Extract and copy the mipmap folders to:
echo    android\app\src\main\res\
echo.
echo OPTION 3 - Manual Setup:
echo 1. Create PNG versions of your logo in these sizes:
echo    - 48x48 px (mdpi)
echo    - 72x72 px (hdpi)
echo    - 96x96 px (xhdpi)
echo    - 144x144 px (xxhdpi)
echo    - 192x192 px (xxxhdpi)
echo.
echo 2. Replace ic_launcher.png files in:
echo    android\app\src\main\res\mipmap-mdpi\ic_launcher.png
echo    android\app\src\main\res\mipmap-hdpi\ic_launcher.png
echo    android\app\src\main\res\mipmap-xhdpi\ic_launcher.png
echo    android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png
echo    android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png
echo.
echo After setting up icons:
echo 1. Run: npm run build:mobile
echo 2. Run: npx cap sync android
echo 3. Run: npm run android:open
echo 4. Build and test your app
echo.
echo Your BD ^& Associates Inventory Manager will now have a professional logo!
echo.
pause
