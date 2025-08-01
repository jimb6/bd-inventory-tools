'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductEnrollment } from "@/components/ProductEnrollment";
import { BarcodeGenerator } from "@/components/BarcodeGenerator";
import { InventoryCount } from "@/components/InventoryCount";
import { ProductList } from "@/components/ProductList";
import { loadDemoData } from "@/lib/demoData";
import { platformUtils } from "@/lib/platform";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [platform, setPlatform] = useState<string>('web');

  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleInventoryUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLoadDemoData = () => {
    const loaded = loadDemoData();
    if (loaded) {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPlatform(platformUtils.getPlatform());
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            {/* <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            /> */}
            <span className="text-xl md:text-2xl font-bold">BD & Associates Inventory System Tools</span>
          </div>
          <p className="text-gray-600 text-sm md:text-base px-4">
            Complete inventory management with barcode scanning and product enrollment
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Platform: {platform} {platformUtils.isNative() ? '(Mobile App)' : '(Web)'} • 
            Camera: {platformUtils.isCameraAvailable() ? 'Available' : 'Not Available'}
          </p>
          <div className="mt-3">
            <Button onClick={handleLoadDemoData} variant="outline" size="sm">
              Load Sample Data
            </Button>
          </div>
        </div>

        {/* Main Application */}
        <Tabs defaultValue="enrollment" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="enrollment" className="text-xs md:text-sm py-2 md:py-3">
              <span className="hidden sm:inline">Product Enrollment</span>
              <span className="sm:hidden">Enroll</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="text-xs md:text-sm py-2 md:py-3">
              <span className="hidden sm:inline">Barcode Generator</span>
              <span className="sm:hidden">Generate</span>
            </TabsTrigger>
            <TabsTrigger value="count" className="text-xs md:text-sm py-2 md:py-3">
              <span className="hidden sm:inline">Inventory Count</span>
              <span className="sm:hidden">Count</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="text-xs md:text-sm py-2 md:py-3">
              <span className="hidden sm:inline">Product List</span>
              <span className="sm:hidden">List</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrollment">
            <ProductEnrollment onProductAdded={handleProductAdded} />
          </TabsContent>

          <TabsContent value="generator">
            <BarcodeGenerator />
          </TabsContent>

          <TabsContent value="count">
            <InventoryCount onInventoryUpdated={handleInventoryUpdated} />
          </TabsContent>

          <TabsContent value="list">
            <ProductList refreshTrigger={refreshTrigger} />
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Product Enrollment</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-xs md:text-sm space-y-1 text-gray-600">
                <li>• Manual product entry</li>
                <li>• Barcode-based enrollment</li>
                <li>• QR/Barcode scanning (web & mobile)</li>
                <li>• Automatic barcode generation</li>
                <li>• Product categorization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Barcode Generation</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-xs md:text-sm space-y-1 text-gray-600">
                <li>• Generate unique barcodes</li>
                <li>• Custom barcode values</li>
                <li>• Print-ready barcodes</li>
                <li>• Copy to clipboard</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Inventory Management</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-xs md:text-sm space-y-1 text-gray-600">
                <li>• Native QR/Barcode scanning</li>
                <li>• Real-time quantity updates</li>
                <li>• Stock level tracking</li>
                <li>• Cross-platform (web & mobile)</li>
                <li>• Local storage persistence</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-8 md:mt-12 text-center text-xs md:text-sm text-gray-500 px-4">
          <p>Inventory System Demo - Data stored locally in browser</p>
        </footer>
      </div>
    </div>
  );
}
