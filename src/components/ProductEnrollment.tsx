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
import { toast } from "sonner";

interface ProductEnrollmentProps {
  onProductAdded?: (product: Product) => void;
}

export const ProductEnrollment = ({ onProductAdded }: ProductEnrollmentProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    barcode: '',
    quantity: 0,
    unitOfMeasure: '',
    category: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setMessage(null);
  };

  const generateBarcode = () => {
    const newBarcode = storageUtils.generateBarcode();
    setFormData(prev => ({ ...prev, barcode: newBarcode }));
  };

  const handleManualSubmit = () => {
    if (!formData.name.trim() || !formData.barcode.trim()) {
      setMessage({ type: 'error', text: 'Name and barcode are required' });
      return;
    }

    // Check if barcode already exists
    const existingProduct = storageUtils.findProductByBarcode(formData.barcode);
    if (existingProduct) {
      setMessage({ type: 'error', text: 'A product with this barcode already exists' });
      return;
    }

    try {
      const newProduct = storageUtils.addProduct({
        name: formData.name,
        description: formData.description,
        barcode: formData.barcode,
        quantity: formData.quantity,
        unitOfMeasure: formData.unitOfMeasure,
        category: formData.category,
      });

      // Show success toast
      toast.success("Product added successfully!", {
        description: `${formData.name} has been added to inventory`,
        duration: 3000,
      });
      
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setFormData({
        name: '',
        description: '',
        barcode: '',
        quantity: 0,
        unitOfMeasure: '',
        category: '',
      });
      onProductAdded?.(newProduct);
    } catch {
      toast.error("Failed to add product", {
        description: "Please try again or check your input",
        duration: 4000,
      });
      setMessage({ type: 'error', text: 'Failed to add product' });
    }
  };

  const handleBarcodeSubmit = () => {
    if (!formData.barcode.trim()) {
      setMessage({ type: 'error', text: 'Please enter a barcode' });
      return;
    }

    const existingProduct = storageUtils.findProductByBarcode(formData.barcode);
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        description: existingProduct.description || '',
        barcode: existingProduct.barcode,
        quantity: existingProduct.quantity,
        unitOfMeasure: existingProduct.unitOfMeasure || '',
        category: existingProduct.category || '',
      });
      toast.success("Product found!", {
        description: `${existingProduct.name} loaded from inventory`,
        duration: 3000,
      });
      setMessage({ type: 'success', text: 'Product found and loaded!' });
    } else {
      toast.warning("Product not found", {
        description: "You can add it as a new product",
        duration: 4000,
      });
      setMessage({ type: 'error', text: 'Product not found. You can add it as a new product.' });
    }
  };

  const handleScanResult = (scannedCode: string) => {
    setFormData(prev => ({ ...prev, barcode: scannedCode }));
    setShowScanner(false);
    
    toast.info("Barcode scanned!", {
      description: `Code: ${scannedCode}`,
      duration: 2000,
    });
    
    setMessage({ type: 'success', text: `Scanned: ${scannedCode}` });
    
    // Automatically search for the product
    const existingProduct = storageUtils.findProductByBarcode(scannedCode);
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        description: existingProduct.description || '',
        barcode: existingProduct.barcode,
        quantity: existingProduct.quantity,
        unitOfMeasure: existingProduct.unitOfMeasure || '',
        category: existingProduct.category || '',
      });
      
      toast.success("Product found!", {
        description: `${existingProduct.name} loaded from inventory`,
        duration: 3000,
      });
      
      setMessage({ type: 'success', text: `Product found: ${existingProduct.name}` });
    } else {
      toast.warning("New product", {
        description: "Product not in inventory - ready to add",
        duration: 3000,
      });
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
          <CardTitle className="text-lg md:text-xl">Product Enrollment</CardTitle>
          <CardDescription className="text-sm">
            Add new products manually or by scanning barcodes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Barcode Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="barcode">Barcode</Label>
              <Badge variant="secondary">Scan or Enter</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="barcode"
                placeholder="Scan or enter barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange('barcode', e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button onClick={handleBarcodeSubmit} variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Search
                </Button>
                <Button onClick={() => setShowScanner(true)} variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Scan QR
                </Button>
                <Button onClick={generateBarcode} variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Generate
                </Button>
              </div>
            </div>
            
            {formData.barcode && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <Barcode value={formData.barcode} />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitOfMeasure">Unit of Measure</Label>
              <Input
                id="unitOfMeasure"
                placeholder="e.g., pieces, kg, liters, boxes"
                value={formData.unitOfMeasure}
                onChange={(e) => handleInputChange('unitOfMeasure', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <Button onClick={handleManualSubmit} className="w-full py-3 text-base">
            Add Product
          </Button>
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
