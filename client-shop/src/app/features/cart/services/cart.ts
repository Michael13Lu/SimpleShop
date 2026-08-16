import { Injectable, computed, effect, signal } from '@angular/core';

import { CartItem } from '../../../models/cart-item.model';
import { Product } from '../../../models/product.model';

const CART_STORAGE_KEY = 'simpleshop.cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(this.loadFromStorage());

  readonly items = this.itemsSignal.asReadonly();
  readonly totalItemCount = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  constructor() {
    effect(() => this.persist(this.itemsSignal()));
  }

  add(product: Product, quantity = 1): void {
    const maxStock = product.stockQuantity;
    if (maxStock <= 0) {
      return;
    }

    this.itemsSignal.update((items) => {
      const existing = items.find((item) => item.productId === product.id);
      if (existing) {
        return items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, maxStock), maxStock }
            : item
        );
      }

      const newItem: CartItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: Math.min(quantity, maxStock),
        maxStock,
      };
      return [...items, newItem];
    });
  }

  remove(productId: string): void {
    this.itemsSignal.update((items) => items.filter((item) => item.productId !== productId));
  }

  increase(productId: string): void {
    this.itemsSignal.update((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.maxStock) }
          : item
      )
    );
  }

  decrease(productId: string): void {
    this.itemsSignal.update((items) =>
      items
        .map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable (e.g. private browsing quota) — cart stays in-memory only.
    }
  }
}
