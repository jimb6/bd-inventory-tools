export interface Product {
  id: string;
  name: string;
  description?: string;
  barcode: string;
  quantity: number;
  price?: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem extends Product {
  lastScanned?: Date;
}
