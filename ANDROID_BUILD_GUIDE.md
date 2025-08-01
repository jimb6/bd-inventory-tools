# Android App Build Guide

## Complete Setup Instructions for Building BD & Associates Inventory Manager Android App

### Prerequisites

1. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Install with default settings
   - Open Android Studio and complete initial setup

2. **Install Java Development Kit (JDK)**
   - Download JDK 17 or later from: https://adoptium.net/
   - Install and note the installation path (e.g., `C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot\`)

### Environment Setup

#### Windows
1. **Set JAVA_HOME**:
   ```cmd
   setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot"
   ```

2. **Set ANDROID_HOME**:
   ```cmd
   setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"
   ```

3. **Update PATH**:
   ```cmd
   setx PATH "%PATH%;%JAVA_HOME%\bin;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools"
   ```

4. **Restart your command prompt/PowerShell**

#### Verify Setup
```bash
java -version
echo $ANDROID_HOME  # (or echo %ANDROID_HOME% on Windows)
```

### Building the Android App

#### Method 1: Using Android Studio (Recommended)

1. **Build the web assets**:
   ```bash
   npm run build:mobile
   ```

2. **Open in Android Studio**:
   ```bash
   npm run android:open
   ```

3. **In Android Studio**:
   - Wait for Gradle sync to complete
   - Click "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"
   - APK will be generated in `android/app/build/outputs/apk/`

#### Method 2: Command Line (Advanced)

1. **Ensure environment variables are set correctly**

2. **Build the app**:
   ```bash
   npm run android:build
   ```

3. **Find your APK**:
   - Location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Running on Device

#### Via Android Studio
1. Connect your Android device via USB
2. Enable "Developer Options" and "USB Debugging" on your device
3. In Android Studio, click the "Run" button (green triangle)
4. Select your device from the list

#### Via Command Line
```bash
npm run android
```

### App Features

Your Android app will have:
- ✅ **Professional App Bar** with BD & Associates branding
- ✅ **Custom Menu Options** (Refresh, Settings, About)
- ✅ **Dark Mode Support** that follows system settings
- ✅ **Native camera access** for barcode/QR scanning
- ✅ **Offline storage** using device storage
- ✅ **Full inventory management** functionality
- ✅ **Mobile-optimized UI** with touch gestures
- ✅ **Cross-platform compatibility** (same codebase as web)

### Signing for Production

To create a production-ready APK:

1. **Generate a keystore**:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in Android Studio**:
   - Build → Generate Signed Bundle / APK
   - Follow the wizard to sign your APK

### Troubleshooting

#### Common Issues

**"JAVA_HOME is not set"**
- Solution: Install JDK and set JAVA_HOME environment variable

**"Android SDK not found"**
- Solution: Install Android Studio and set ANDROID_HOME

**"Build tools not found"**
- Solution: Open Android Studio → SDK Manager → Install latest build tools

**"Device not detected"**
- Solution: Enable Developer Options and USB Debugging on your Android device

#### Getting Help
- Check the main README.md for additional information
- Capacitor docs: https://capacitorjs.com/docs
- Android Studio docs: https://developer.android.com/studio/intro

### Next Steps

Once you have the APK:
1. **Test thoroughly** on different devices
2. **Optimize performance** using Android Studio profiler
3. **Publish to Google Play Store** (requires developer account)
4. **Set up CI/CD** for automated builds

---

**Note**: This guide assumes Windows environment. For macOS/Linux, adjust paths and commands accordingly.
