export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateProduct {
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
}

export interface UpdateProduct {
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
}
