'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Barcode } from '@/components/Barcode';
import { QRScanner } from '@/components/QRScanner';
import { storageUtils } from '@/lib/storage';
import { Product } from '@/types/inventory';

interface InventoryCountProps {
  onInventoryUpdated?: () => void;
}

export const InventoryCount = ({ onInventoryUpdated }: InventoryCountProps) => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [quantityUpdate, setQuantityUpdate] = useState<number>(0);
  const [updateType, setUpdateType] = useState<'add' | 'subtract' | 'set'>('add');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [recentUpdates, setRecentUpdates] = useState<Array<{ product: Product; oldQuantity: number; newQuantity: number; timestamp: Date }>>([]);
  const [showScanner, setShowScanner] = useState(false);

  const handleBarcodeSubmit = () => {
    if (!scannedBarcode.trim()) {
      setMessage({ type: 'error', text: 'Please enter a barcode' });
      return;
    }

    const product = storageUtils.findProductByBarcode(scannedBarcode);
    if (product) {
      setCurrentProduct(product);
      setQuantityUpdate(0);
      setMessage({ type: 'success', text: `Product found: ${product.name}` });
    } else {
      setCurrentProduct(null);
      setMessage({ type: 'error', text: 'Product not found. Please enroll this product first.' });
    }
  };

  const handleQuantityUpdate = () => {
    if (!currentProduct) return;

    const oldQuantity = currentProduct.quantity;
    let newQuantity: number;

    switch (updateType) {
      case 'add':
        newQuantity = oldQuantity + quantityUpdate;
        break;
      case 'subtract':
        newQuantity = Math.max(0, oldQuantity - quantityUpdate);
        break;
      case 'set':
        newQuantity = Math.max(0, quantityUpdate);
        break;
    }

    const updatedProduct = storageUtils.updateProduct(currentProduct.id, { quantity: newQuantity });
    
    if (updatedProduct) {
      setCurrentProduct(updatedProduct);
      setRecentUpdates(prev => [{
        product: updatedProduct,
        oldQuantity,
        newQuantity,
        timestamp: new Date()
      }, ...prev.slice(0, 4)]); // Keep last 5 updates

      setMessage({ 
        type: 'success', 
        text: `Quantity updated: ${oldQuantity} → ${newQuantity}` 
      });
      setQuantityUpdate(0);
      onInventoryUpdated?.();
    } else {
      setMessage({ type: 'error', text: 'Failed to update quantity' });
    }
  };

  const clearForm = () => {
    setScannedBarcode('');
    setCurrentProduct(null);
    setQuantityUpdate(0);
    setMessage(null);
  };

  const handleScanResult = (scannedCode: string) => {
    setScannedBarcode(scannedCode);
    setShowScanner(false);
    
    const product = storageUtils.findProductByBarcode(scannedCode);
    if (product) {
      setCurrentProduct(product);
      setQuantityUpdate(0);
      setMessage({ type: 'success', text: `Product found: ${product.name}` });
    } else {
      setCurrentProduct(null);
      setMessage({ type: 'error', text: 'Product not found. Please enroll this product first.' });
    }
  };

  const handleScanError = (error: string) => {
    setMessage({ type: 'error', text: `Scan failed: ${error}` });
    setShowScanner(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Inventory Count</CardTitle>
          <CardDescription className="text-sm">
            Scan product barcodes to update inventory quantities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Barcode Scanner */}
          <div className="space-y-4">
            <Label htmlFor="scanner">Scan or Enter Barcode</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="scanner"
                placeholder="Scan barcode here"
                value={scannedBarcode}
                onChange={(e) => {
                  setScannedBarcode(e.target.value);
                  setMessage(null);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleBarcodeSubmit();
                  }
                }}
                className="flex-1 text-base"
              />
              <div className="flex gap-2">
                <Button onClick={handleBarcodeSubmit} className="flex-1 sm:flex-none">Search</Button>
                <Button onClick={() => setShowScanner(true)} variant="outline" className="flex-1 sm:flex-none">Scan QR</Button>
                <Button onClick={clearForm} variant="outline" className="flex-1 sm:flex-none">Clear</Button>
              </div>
            </div>
          </div>

          {/* Current Product */}
          {currentProduct && (
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base md:text-lg">{currentProduct.name}</h3>
                      {currentProduct.description && (
                        <p className="text-gray-600 text-sm">{currentProduct.description}</p>
                      )}
                      {currentProduct.category && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {currentProduct.category}
                        </Badge>
                      )}
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">
                        {currentProduct.quantity}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">Current Stock</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded">
                    <Barcode value={currentProduct.barcode} height={40} />
                  </div>

                  {/* Quantity Update Controls */}
                  <div className="space-y-3 md:space-y-4 border-t pt-4">
                    <div className="flex gap-1 md:gap-2">
                      <Button
                        variant={updateType === 'add' ? 'default' : 'outline'}
                        onClick={() => setUpdateType('add')}
                        size="sm"
                        className="flex-1 text-xs md:text-sm"
                      >
                        Add (+)
                      </Button>
                      <Button
                        variant={updateType === 'subtract' ? 'default' : 'outline'}
                        onClick={() => setUpdateType('subtract')}
                        size="sm"
                        className="flex-1 text-xs md:text-sm"
                      >
                        Remove (-)
                      </Button>
                      <Button
                        variant={updateType === 'set' ? 'default' : 'outline'}
                        onClick={() => setUpdateType('set')}
                        size="sm"
                        className="flex-1 text-xs md:text-sm"
                      >
                        Set (=)
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantityUpdate}
                        onChange={(e) => setQuantityUpdate(parseInt(e.target.value) || 0)}
                        min="0"
                        className="flex-1 text-base"
                      />
                      <Button 
                        onClick={handleQuantityUpdate} 
                        disabled={quantityUpdate === 0}
                        className="w-full sm:w-auto py-2 md:py-3"
                      >
                        Update Stock
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Updates */}
          {recentUpdates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentUpdates.map((update, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                      <span className="font-medium">{update.product.name}</span>
                      <span>
                        {update.oldQuantity} → {update.newQuantity}
                      </span>
                      <span className="text-gray-500">
                        {update.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* QR Scanner Modal */}
      <QRScanner
        isActive={showScanner}
        onScan={handleScanResult}
        onError={handleScanError}
        onClose={() => setShowScanner(false)}
      />
    </div>
  );
};
