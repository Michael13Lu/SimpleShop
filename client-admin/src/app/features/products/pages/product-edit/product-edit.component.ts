import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../models/product.model';
import { ProductFormComponent, ProductFormValue } from '../../components/product-form/product-form.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly productId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly product = signal<Product | null>(null);
  readonly loading = signal(true);
  readonly isSaving = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.productService.getById(this.productId).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load the product.');
        this.loading.set(false);
      }
    });
  }

  onSubmit(value: ProductFormValue): void {
    this.isSaving.set(true);
    this.error.set(null);

    this.productService.update(this.productId, value).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => {
        this.error.set('Failed to update the product. Please try again.');
        this.isSaving.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
