import { Component, computed, inject, signal } from '@angular/core';

import { Product } from '../../../../models/product.model';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductCard],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
})
export class ProductListPage {
  private readonly productService = inject(ProductService);

  private readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly activeProducts = computed(() => this.products().filter((p) => p.isActive));

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.error.set(false);

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
