import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/product.model';
import { Currency, CurrencyService } from '../../../core/services/currency.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})
export class EditProductModalComponent implements OnInit {
  productForm!: FormGroup;
  loading = signal(false);
  currentCurrency = signal<Currency>('USD');

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    private snackBar: MatSnackBar,
    private currencyService: CurrencyService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) { }

  ngOnInit(): void {
    this.loadCurrentCurrency();
    this.createForm();
  }

  loadCurrentCurrency(): void {
    const storedCurrency = this.storageService.getItem<Currency>('currency');
    if (storedCurrency) {
      this.currentCurrency.set(storedCurrency);
    }
  }

  createForm(): void {
    const convertedPrice = this.currencyService.convertAmount(this.data.product.price);
    this.productForm = this.fb.group({
      title: [this.data.product.title, [Validators.required, Validators.minLength(3)]],
      price: [convertedPrice, [Validators.required, Validators.min(0)]],
      stock: [this.data.product.stock, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      description: [this.data.product.description, [Validators.required, Validators.minLength(10)]]
    });
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.loading.set(true);

    const formValues = { ...this.productForm.value };
    if (this.currentCurrency() === 'EUR') {
      formValues.price = this.currencyService.convertToUSD(formValues.price);
    }

    setTimeout(() => {
      const isSuccess = Math.random() < 0.5; // Simulate a 50% success rate for the update
      if (isSuccess) {
        const updatedProduct: Product = {
          ...this.data.product,
          ...formValues
        };
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(updatedProduct);
      } else {
        this.snackBar.open('Simulation: Error updating product. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
        this.loading.set(false);
      }
    }, 1500);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}