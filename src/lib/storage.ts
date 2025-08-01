import { Product } from '@/types/inventory';

const STORAGE_KEY = 'inventory_products';

export const storageUtils = {
  getProducts: (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored).map((product: Omit<Product, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string }) => ({
        ...product,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
      }));
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveProducts: (products: Product[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const products = storageUtils.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(newProduct);
    storageUtils.saveProducts(products);
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const products = storageUtils.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date(),
    };
    storageUtils.saveProducts(products);
    return products[index];
  },

  findProductByBarcode: (barcode: string): Product | null => {
    const products = storageUtils.getProducts();
    return products.find(p => p.barcode === barcode) || null;
  },

  deleteProduct: (id: string): boolean => {
    const products = storageUtils.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    storageUtils.saveProducts(filtered);
    return true;
  },

  generateBarcode: (): string => {
    // Generate a simple barcode (you can enhance this logic)
    return '7' + Date.now().toString().slice(-11);
  }
};
