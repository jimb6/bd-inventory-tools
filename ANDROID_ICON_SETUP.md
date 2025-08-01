# Android Icon Generation Guide

## Creating App Icons from BD & Associates Logo

Since we have the BD & Associates logo, we need to create Android app icons in various sizes. Android requires multiple icon sizes for different screen densities.

### Required Icon Sizes for Android:

- **mdpi**: 48x48 px
- **hdpi**: 72x72 px  
- **xhdpi**: 96x96 px
- **xxhdpi**: 144x144 px
- **xxxhdpi**: 192x192 px

### Method 1: Using Android Studio (Recommended)

1. **Open Android Studio**
2. **Right-click on `app` folder** in Android project
3. **Select "New" → "Image Asset"**
4. **Choose "Launcher Icons (Adaptive and Legacy)"**
5. **Select "Image" as Asset Type**
6. **Browse and select your BD & Associates logo**
7. **Adjust scaling and padding as needed**
8. **Click "Next" and "Finish"**

### Method 2: Manual Creation

If you have the BD & Associates logo as a high-resolution image (512x512 or larger):

1. **Create icons folder structure**:
   ```
   android/app/src/main/res/
   ├── mipmap-mdpi/ic_launcher.png (48x48)
   ├── mipmap-hdpi/ic_launcher.png (72x72)
   ├── mipmap-xhdpi/ic_launcher.png (96x96)
   ├── mipmap-xxhdpi/ic_launcher.png (144x144)
   └── mipmap-xxxhdpi/ic_launcher.png (192x192)
   ```

2. **Resize the logo** to each required size
3. **Save as PNG files** with name `ic_launcher.png`
4. **Place in corresponding folders**

### Method 3: Online Icon Generator

1. **Visit**: https://appicon.co/ or https://icon.kitchen/
2. **Upload your BD & Associates logo**
3. **Download the Android icon pack**
4. **Extract and copy to your Android project**

### Logo Guidelines

For best results, ensure your BD & Associates logo:
- **Square format** (1:1 aspect ratio)
- **High resolution** (at least 512x512)
- **Clear background** or transparent
- **Good contrast** for visibility on different backgrounds

### After Setting Icons

1. **Clean and rebuild** your Android project
2. **Test on device/emulator** to verify icons appear correctly
3. **Check both app drawer and settings** for icon visibility

---

**Note**: The icon will represent your BD & Associates Inventory Manager app on users' devices.
