export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  createdAtUtc: string;
}
