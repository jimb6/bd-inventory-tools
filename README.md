# BD & Associates Inventory Manager

A comprehensive inventory management system with QR/Barcode scanning capabilities for both web and mobile platforms.

## Features

### 🚀 Core Functions
1. **Product Enrollment**
   - Manual product entry
   - QR/Barcode-based enrollment
   - Automatic barcode generation

2. **Barcode Generation**
   - Generate unique barcodes
   - Custom barcode values
   - Print-ready barcodes

3. **Inventory Count**
   - QR/Barcode scanning for quantity updates
   - Real-time stock tracking
   - Multiple update modes (add, subtract, set)

### 📱 **Android-Specific Features**
- **Native Camera Access**: High-performance barcode/QR scanning using MLKit
- **Custom App Bar**: BD & Associates branded navigation bar with menu options
- **Professional Branding**: Navy blue theme matching company colors
- **Dark Mode Support**: Automatic dark/light theme switching
- **Offline Storage**: Data persists on device using local storage
- **Mobile-Optimized UI**: Touch-friendly interface with responsive design
- **Multiple Barcode Formats**: QR codes, Code 128, EAN-13, UPC, and more
- **Menu Actions**: Refresh, settings, and about options in app bar

## Getting Started

### Web Development
```bash
npm install
npm run dev
```

### Mobile Development

#### Prerequisites
- **Android**: Android Studio with Android SDK
- **iOS**: Xcode (macOS only)

#### Setup
```bash
# Build for mobile
npm run build:mobile

# Add platforms
npx cap add android
npx cap add ios
```

#### Android Development

##### Method 1: Using Android Studio (Recommended)
```bash
# Open project in Android Studio
npm run android:open
```
Then use Android Studio to:
- Build and run the app
- Debug on device/emulator
- Generate signed APK for distribution

##### Method 2: Command Line
```bash
# Run on connected device/emulator
npm run android

# Build APK (requires Android SDK in PATH)
npm run android:build
```

##### Android Requirements
- **Android Studio 2021.3.1 or later**
- **Java Development Kit (JDK) 17 or later**
- Android SDK Platform-Tools
- Android SDK Build-Tools 33.0.0+
- Target SDK: API Level 33 (Android 13)
- Minimum SDK: API Level 22 (Android 5.1)

##### Setup Environment Variables (Windows)
```bash
# Set JAVA_HOME (adjust path to your JDK installation)
set JAVA_HOME=C:\Program Files\Java\jdk-17

# Add to PATH
set PATH=%JAVA_HOME%\bin;%PATH%

# Set ANDROID_HOME (adjust path to your Android SDK)
set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;%PATH%
```

##### Build Instructions
1. **Install Android Studio** and configure SDK
2. **Set environment variables** (JAVA_HOME, ANDROID_HOME)
3. **Set up app icon** (optional):
   - Run `setup-icon.bat` for detailed instructions
   - Use Android Studio's Image Asset wizard
   - Or visit https://appicon.co/ to generate icons from your logo
4. **Build the app**:
   ```bash
   npm run android:build
   ```
5. **Or use Android Studio**:
   ```bash
   npm run android:open
   ```

##### Troubleshooting
- **JAVA_HOME not set**: Install JDK 17+ and set JAVA_HOME
- **Android SDK not found**: Install Android Studio and set ANDROID_HOME
- **Build tools missing**: Use Android Studio SDK Manager to install build tools

##### Android Permissions
The app requires:
- `CAMERA` - For barcode/QR code scanning
- `INTERNET` - For web functionality

#### iOS
```bash
npm run ios
```

## QR/Barcode Scanning

### Web Browsers
- Uses device camera through web APIs
- Works on mobile browsers and desktop with webcam
- No installation required

### Native Mobile Apps
- Uses device's native camera
- Better performance and scanning accuracy
- Access to device-specific features

### Supported Formats
- QR Codes
- Code 128 barcodes
- EAN-13/EAN-8
- UPC codes

## Usage

1. **Load Sample Data**: Click "Load Sample Data" to populate with demo products
2. **Scan Products**: Use "Scan QR" buttons in Product Enrollment or Inventory Count
3. **Update Inventory**: Scan items and update quantities in real-time
4. **Generate Barcodes**: Create printable barcodes for new products

## Platform Detection

The app automatically detects:
- Platform type (web/android/ios)
- Camera availability
- Native vs web environment

## Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **Mobile**: Capacitor.js
- **QR Scanning**: 
  - Web: html5-qrcode
  - Mobile: @capacitor-community/barcode-scanner
- **Storage**: Local Storage (browser/device)

## Development

### Project Structure
```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── QRScanner.tsx   # Universal QR scanner
│   └── ...
├── lib/                # Utilities
│   ├── platform.ts    # Platform detection
│   ├── storage.ts     # Local storage utils
│   └── ...
└── types/              # TypeScript types
```

### Key Features
- **Responsive Design**: Mobile-first approach
- **Platform Agnostic**: Same codebase for web and mobile
- **Real-time Updates**: Live inventory tracking
- **Offline Capable**: Local storage persistence

## Browser Compatibility

### Web QR Scanning Requirements
- HTTPS (required for camera access)
- Modern browser with camera support
- User permission for camera access

### Supported Browsers
- Chrome/Edge 70+
- Firefox 65+
- Safari 14+
- Mobile browsers with camera support

## Deployment

### Web
Deploy to any static hosting service (Vercel, Netlify, etc.)

### Mobile
Build and distribute through app stores or as PWA

---

**Platform Detection**: The app shows current platform and camera status in the header.
**Demo Mode**: Uses local storage for temporary demonstration.
