import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ProductFormComponent, ProductFormValue } from '../../components/product-form/product-form.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly isSaving = signal(false);
  readonly error = signal<string | null>(null);

  onSubmit(value: ProductFormValue): void {
    this.isSaving.set(true);
    this.error.set(null);

    this.productService
      .create({
        name: value.name,
        description: value.description,
        price: value.price,
        stockQuantity: value.stockQuantity
      })
      .subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => {
          this.error.set('Failed to create the product. Please try again.');
          this.isSaving.set(false);
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
