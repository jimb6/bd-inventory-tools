import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bdassociates.inventory',
  appName: 'BD Associates Inventory Manager',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    BarcodeScanning: {
      // Enable all barcode formats
      enableQuietZone: true,
      enabledFormats: [
        'QR_CODE',
        'CODE_128',
        'CODE_39', 
        'CODE_93',
        'CODABAR',
        'EAN_13',
        'EAN_8',
        'UPC_A',
        'UPC_E',
        'PDF_417',
        'DATA_MATRIX'
      ]
    }
  }
};

export default config;
