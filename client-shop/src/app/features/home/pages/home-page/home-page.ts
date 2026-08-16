import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../../../models/product.model';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { ProductService } from '../../../products/services/product';

const FEATURED_PRODUCTS_LIMIT = 4;

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly productService = inject(ProductService);

  private readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly featuredProducts = computed(() =>
    this.products()
      .filter((p) => p.isActive)
      .slice(0, FEATURED_PRODUCTS_LIMIT)
  );

  constructor() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
