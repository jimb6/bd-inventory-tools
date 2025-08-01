'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { platformUtils } from '@/lib/platform';

// Import Capacitor scanner for native platforms
let BarcodeScanner: typeof import('@capacitor-community/barcode-scanner').BarcodeScanner | null = null;
if (typeof window !== 'undefined') {
  import('@capacitor-community/barcode-scanner').then(module => {
    BarcodeScanner = module.BarcodeScanner;
  });
}

// Import HTML5 QR Code scanner for web
let Html5QrcodeScanner: typeof import('html5-qrcode').Html5QrcodeScanner | null = null;
if (typeof window !== 'undefined') {
  import('html5-qrcode').then(module => {
    Html5QrcodeScanner = module.Html5QrcodeScanner;
  });
}

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
  onClose: () => void;
}

export const QRScanner = ({ onScan, onError, isActive, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string>('web');
  const scannerRef = useRef<InstanceType<typeof import('html5-qrcode').Html5QrcodeScanner> | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlatform(platformUtils.getPlatform());
  }, []);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError(null);

      if (platformUtils.isNative() && BarcodeScanner) {
        await startNativeScanning();
      } else {
        await startWebScanning();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start scanner';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsScanning(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const handleScanningState = async () => {
      if (!mounted) return;
      
      if (isActive && !isScanning) {
        await startScanning();
      } else if (!isActive && isScanning) {
        stopScanning();
      }
    };

    handleScanningState();
    
    return () => {
      mounted = false;
      stopScanning();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const startNativeScanning = async () => {
    if (!BarcodeScanner) {
      throw new Error('Barcode scanner not available');
    }

    // Check permission
    const status = await BarcodeScanner.checkPermission({ force: true });
    
    if (status.granted) {
      // Make background transparent
      BarcodeScanner.hideBackground();
      
      // Start scanning
      const result = await BarcodeScanner.startScan();
      
      if (result.hasContent) {
        onScan(result.content);
        stopScanning();
      }
    } else {
      throw new Error('Camera permission denied');
    }
  };

  const startWebScanning = async () => {
    if (!Html5QrcodeScanner || !videoRef.current) {
      throw new Error('Web scanner not available');
    }

    const config = {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250,
      },
      aspectRatio: 1.0,
    };

    scannerRef.current = new Html5QrcodeScanner(
      'qr-reader',
      config,
      false
    );

    scannerRef.current.render(
      (decodedText: string) => {
        onScan(decodedText);
        stopScanning();
      },
      (error: Error | string) => {
        // Ignore frame processing errors, only log actual errors
        if (error.toString().includes('NotFoundException')) {
          return; // This is normal when no QR code is detected
        }
        console.warn('QR scan error:', error);
      }
    );
  };

  const stopScanning = async () => {
    setIsScanning(false);
    
    try {
      if (platformUtils.isNative() && BarcodeScanner) {
        await BarcodeScanner.stopScan();
        BarcodeScanner.showBackground();
      } else if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (err) {
      console.warn('Error stopping scanner:', err);
    }
  };

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              {platformUtils.isNative() ? 'Scan QR/Barcode' : 'QR/Barcode Scanner'}
            </CardTitle>
            <Button onClick={handleClose} variant="outline" size="sm">
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {platformUtils.isNative() ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Position the QR code or barcode within the camera view
              </p>
              <p className="text-xs text-gray-500">
                Platform: {platform} (Native)
              </p>
              {isScanning && (
                <div className="animate-pulse">
                  <div className="w-32 h-32 border-2 border-blue-500 border-dashed rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-sm text-blue-500">Scanning...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Position the QR code or barcode within the camera view
              </p>
              <p className="text-xs text-gray-500 text-center">
                Platform: {platform} (Web)
              </p>
              <div 
                id="qr-reader" 
                ref={videoRef}
                className="w-full"
                style={{ minHeight: '300px' }}
              />
            </div>
          )}

          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500 text-center">
              Camera access required • {platformUtils.isCameraAvailable() ? 'Camera available' : 'Camera not detected'}
            </p>
            {!isScanning && !error && (
              <Button onClick={startScanning} className="w-full">
                Start Scanning
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
