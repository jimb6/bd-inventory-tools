'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Barcode } from '@/components/Barcode';
import { storageUtils } from '@/lib/storage';
import { Product } from '@/types/inventory';

interface ProductListProps {
  refreshTrigger?: number;
}

export const ProductList = ({ refreshTrigger }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [refreshTrigger]);

  const loadProducts = () => {
    const allProducts = storageUtils.getProducts();
    setProducts(allProducts);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      storageUtils.deleteProduct(id);
      loadProducts();
    }
  };

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Product Inventory</CardTitle>
          <CardDescription className="text-sm">
            View and manage all products in your inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <Input
            placeholder="Search products by name, barcode, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-xs md:text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-green-600">
                {products.reduce((sum, p) => sum + p.quantity, 0)}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Total Items</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-orange-50 rounded-lg">
              <div className="text-lg md:text-2xl font-bold text-orange-600">
                {products.filter(p => p.quantity < 10).length}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Low Stock</div>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No products found matching your search.' : 'No products in inventory. Add some products to get started!'}
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1">
                          <h3 className="font-semibold text-sm md:text-base truncate">{product.name}</h3>
                          {product.category && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {product.category}
                            </Badge>
                          )}
                          {product.quantity < 10 && (
                            <Badge variant="destructive" className="text-xs flex-shrink-0">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                        
                        {product.description && (
                          <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2">{product.description}</p>
                        )}
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-500">
                          <span className="truncate">Barcode: {product.barcode}</span>
                          {product.price && <span>Price: ${product.price.toFixed(2)}</span>}
                          <span>Updated: {product.updatedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-2 sm:ml-4">
                        <div className="text-center sm:text-right">
                          <div className="text-lg md:text-xl font-bold">{product.quantity}</div>
                          <div className="text-xs text-gray-500">in stock</div>
                        </div>
                        
                        <div className="flex gap-1 md:gap-2">
                          <Button
                            onClick={() => toggleExpanded(product.id)}
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 md:px-3"
                          >
                            {expandedProduct === product.id ? 'Hide' : 'View'}
                          </Button>
                          <Button
                            onClick={() => deleteProduct(product.id)}
                            variant="destructive"
                            size="sm"
                            className="text-xs px-2 md:px-3"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Details */}
                    {expandedProduct === product.id && (
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div>
                            <h4 className="font-medium mb-2 text-sm md:text-base">Product Details</h4>
                            <div className="space-y-1 text-xs md:text-sm">
                              <div>ID: {product.id}</div>
                              <div>Created: {product.createdAt.toLocaleString()}</div>
                              <div>Last Updated: {product.updatedAt.toLocaleString()}</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2 text-sm md:text-base">Barcode</h4>
                            <div className="bg-white p-2 border rounded overflow-x-auto">
                              <Barcode value={product.barcode} height={30} width={1.5} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
