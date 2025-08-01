# BD & Associates Inventory System Tools

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

### 📱 Platform Support
- **Web Browser**: Uses HTML5 camera API for QR scanning
- **Mobile Apps**: Native camera scanning via Capacitor
- **Cross-platform**: Same codebase, optimized experience

## Getting Started

### Web Development
```bash
npm install
npm run dev
```

### Mobile Development

#### Setup
```bash
# Build for mobile
npm run build:mobile

# Add platforms
npx cap add android
npx cap add ios
```

#### Android
```bash
npm run android
```

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
