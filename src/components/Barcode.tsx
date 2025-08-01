'use client';

import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  format?: 'CODE128' | 'EAN13' | 'EAN8' | 'UPC';
  displayValue?: boolean;
  className?: string;
}

export const Barcode = ({ 
  value, 
  width = 2, 
  height = 50, 
  format = 'CODE128',
  displayValue = true,
  className 
}: BarcodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      try {
        JsBarcode(canvasRef.current, value, {
          format,
          width,
          height,
          displayValue,
          fontSize: 14,
          textMargin: 5,
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  }, [value, width, height, format, displayValue]);

  if (!value) {
    return (
      <div className="flex items-center justify-center h-16 bg-gray-100 text-gray-500">
        No barcode value
      </div>
    );
  }

  return <canvas ref={canvasRef} className={className} />;
};
