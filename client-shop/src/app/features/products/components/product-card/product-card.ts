import { DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../../../models/product.model';
import { CartService } from '../../../cart/services/cart';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private readonly cartService = inject(CartService);

  readonly product = input.required<Product>();

  get outOfStock(): boolean {
    return this.product().stockQuantity <= 0;
  }

  addToCart(): void {
    this.cartService.add(this.product());
  }
}
