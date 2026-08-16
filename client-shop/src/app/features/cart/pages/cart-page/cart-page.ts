import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-page',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly totalItemCount = this.cartService.totalItemCount;
  readonly totalPrice = this.cartService.totalPrice;

  increase(productId: string): void {
    this.cartService.increase(productId);
  }

  decrease(productId: string): void {
    this.cartService.decrease(productId);
  }

  remove(productId: string): void {
    this.cartService.remove(productId);
  }

  clear(): void {
    this.cartService.clear();
  }
}
