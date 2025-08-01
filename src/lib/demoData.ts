import { storageUtils } from '@/lib/storage';

export const demoData = [
  {
    name: 'Smartphone',
    description: 'Latest Android smartphone with 5G connectivity',
    barcode: '7123456789012',
    quantity: 25,
    unitOfMeasure: 'units',
    category: 'Electronics'
  },
  {
    name: 'Coffee Beans',
    description: 'Premium Arabica coffee beans from Colombia',
    barcode: '7234567890123',
    quantity: 8,
    unitOfMeasure: 'kg',
    category: 'Food & Beverage'
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling Bluetooth headphones',
    barcode: '7345678901234',
    quantity: 15,
    unitOfMeasure: 'pairs',
    category: 'Electronics'
  },
  {
    name: 'Notebook',
    description: 'A5 lined notebook with hardcover',
    barcode: '7456789012345',
    quantity: 50,
    unitOfMeasure: 'pieces',
    category: 'Stationery'
  },
  {
    name: 'T-shirt',
    description: 'Cotton crew neck t-shirt in various sizes',
    barcode: '7567890123456',
    quantity: 3,
    unitOfMeasure: 'pieces',
    category: 'Clothing'
  }
];

export const loadDemoData = () => {
  // Check if there's already data
  const existingProducts = storageUtils.getProducts();
  if (existingProducts.length > 0) {
    return false; // Don't load demo data if products already exist
  }

  // Add demo products
  demoData.forEach(productData => {
    storageUtils.addProduct(productData);
  });
  
  return true;
};
