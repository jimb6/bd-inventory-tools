'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Barcode } from '@/components/Barcode';
import { storageUtils } from '@/lib/storage';
import { toast } from "sonner";

export const BarcodeGenerator = () => {
  const [customBarcode, setCustomBarcode] = useState('');
  const [generatedBarcode, setGeneratedBarcode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const generateRandomBarcode = () => {
    const newBarcode = storageUtils.generateBarcode();
    setGeneratedBarcode(newBarcode);
    
    toast.success("Barcode generated!", {
      description: `New unique barcode: ${newBarcode}`,
      duration: 3000,
    });
    
    setMessage({ type: 'success', text: 'New barcode generated!' });
  };

  const handleCustomBarcode = () => {
    if (!customBarcode.trim()) {
      toast.warning("Missing barcode value", {
        description: "Please enter a barcode value",
        duration: 3000,
      });
      setMessage({ type: 'error', text: 'Please enter a barcode value' });
      return;
    }

    // Basic validation for barcode format
    if (customBarcode.length < 4) {
      toast.error("Invalid barcode", {
        description: "Barcode must be at least 4 characters long",
        duration: 3000,
      });
      setMessage({ type: 'error', text: 'Barcode must be at least 4 characters long' });
      return;
    }

    // Check if barcode already exists
    const existingProduct = storageUtils.findProductByBarcode(customBarcode);
    if (existingProduct) {
      toast.error("Barcode already in use", {
        description: `This barcode is already used by: ${existingProduct.name}`,
        duration: 4000,
      });
      setMessage({ 
        type: 'error', 
        text: `This barcode is already used by: ${existingProduct.name}` 
      });
      return;
    }

    setGeneratedBarcode(customBarcode);
    
    toast.success("Custom barcode created!", {
      description: `Barcode ${customBarcode} is ready to use`,
      duration: 3000,
    });
    
    setMessage({ type: 'success', text: 'Custom barcode created!' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      
      toast.success("Copied to clipboard!", {
        description: `Barcode ${text} copied`,
        duration: 2000,
      });
      
      setMessage({ type: 'success', text: 'Barcode copied to clipboard!' });
    } catch {
      toast.error("Copy failed", {
        description: "Unable to copy to clipboard",
        duration: 3000,
      });
      setMessage({ type: 'error', text: 'Failed to copy to clipboard' });
    }
  };

  const printBarcode = () => {
    if (!generatedBarcode) {
      toast.warning("No barcode to print", {
        description: "Please generate a barcode first",
        duration: 3000,
      });
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow && generatedBarcode) {
      toast.success("Print dialog opened", {
        description: "Barcode ready for printing",
        duration: 2000,
      });

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Barcode - ${generatedBarcode}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              margin: 0;
              flex-direction: column;
            }
            .barcode-container {
              text-align: center;
              padding: 20px;
              border: 1px solid #ccc;
              margin: 20px;
            }
            h1 { margin-bottom: 20px; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="barcode-container">
            <h1>Product Barcode</h1>
            <canvas id="barcode"></canvas>
            <p style="margin-top: 10px; font-weight: bold;">${generatedBarcode}</p>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
          <script>
            JsBarcode("#barcode", "${generatedBarcode}", {
              format: "CODE128",
              width: 2,
              height: 60,
              displayValue: false
            });
            window.print();
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Barcode Generator</CardTitle>
          <CardDescription className="text-sm">
            Generate barcodes for your products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Generate Random Barcode */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <h3 className="font-medium mb-2 text-sm md:text-base">Generate Random Barcode</h3>
              <Button onClick={generateRandomBarcode} className="w-full py-3 text-base">
                Generate New Barcode
              </Button>
            </div>
          </div>

          {/* Custom Barcode */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <h3 className="font-medium mb-2 text-sm md:text-base">Create Custom Barcode</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter custom barcode value"
                  value={customBarcode}
                  onChange={(e) => {
                    setCustomBarcode(e.target.value);
                    setMessage(null);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCustomBarcode();
                    }
                  }}
                  className="flex-1 text-base"
                />
                <Button onClick={handleCustomBarcode} variant="outline" className="w-full sm:w-auto">
                  Create
                </Button>
              </div>
            </div>
          </div>

          {/* Generated Barcode Display */}
          {generatedBarcode && (
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium mb-3 md:mb-4 text-sm md:text-base">Generated Barcode</h3>
                    <div className="bg-white p-3 md:p-4 rounded-lg inline-block overflow-x-auto">
                      <Barcode value={generatedBarcode} width={1.5} height={40} />
                    </div>
                    <p className="mt-2 font-mono text-xs md:text-sm break-all">{generatedBarcode}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button 
                      onClick={() => copyToClipboard(generatedBarcode)} 
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      Copy Code
                    </Button>
                    <Button 
                      onClick={printBarcode} 
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      Print
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Instructions:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Use &quot;Generate New Barcode&quot; for automatic unique codes</li>
                <li>• Create custom barcodes with your own numbering system</li>
                <li>• Barcodes must be unique across all products</li>
                <li>• You can print barcodes for physical labels</li>
                <li>• Copy the barcode code to use in product enrollment</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
