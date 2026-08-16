import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ProductFormValue {
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface ProductFormInitialValue {
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  isActive: boolean;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() initialValue: ProductFormInitialValue | null = null;
  @Input() showIsActive = false;
  @Input() submitLabel = 'Save';
  @Input() isSaving = false;

  @Output() readonly formSubmit = new EventEmitter<ProductFormValue>();
  @Output() readonly cancel = new EventEmitter<void>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    isActive: [true]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && this.initialValue) {
      this.form.patchValue({
        name: this.initialValue.name,
        description: this.initialValue.description ?? '',
        price: this.initialValue.price,
        stockQuantity: this.initialValue.stockQuantity,
        isActive: this.initialValue.isActive
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.formSubmit.emit({
      name: value.name.trim(),
      description: value.description.trim() ? value.description.trim() : null,
      price: value.price,
      stockQuantity: value.stockQuantity,
      isActive: value.isActive
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
