import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product } from '../../../../models/product.model';
import { CartService } from '../../../cart/services/cart';
import { ProductService } from '../../services/product';

type LoadState = 'loading' | 'success' | 'not-found' | 'error';

@Component({
  selector: 'app-product-detail-page',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss',
})
export class ProductDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly state = signal<LoadState>('loading');
  readonly product = signal<Product | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.state.set('not-found');
      return;
    }
    this.loadProduct(id);
  }

  get outOfStock(): boolean {
    return (this.product()?.stockQuantity ?? 0) <= 0;
  }

  addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.add(product);
    }
  }

  private loadProduct(id: string): void {
    this.state.set('loading');

    this.productService.getById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.state.set('success');
      },
      error: (err) => {
        this.state.set(err?.status === 404 ? 'not-found' : 'error');
      },
    });
  }
}
