export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  /** Snapshot of available stock at the time the item was added, used to cap quantity changes. */
  maxStock: number;
}
