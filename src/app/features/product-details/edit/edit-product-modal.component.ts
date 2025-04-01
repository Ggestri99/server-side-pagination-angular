import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/product.model';

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
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.productForm = this.fb.group({
      title: [this.data.product.title, [Validators.required, Validators.minLength(3)]],
      price: [this.data.product.price, [Validators.required, Validators.min(0)]],
      stock: [this.data.product.stock, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      description: [this.data.product.description, [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulamos una llamada al servidor con un retraso
    setTimeout(() => {
      // Simulamos una actualización exitosa (90% de las veces)
      const isSuccess = Math.random() < 0.9;

      if (isSuccess) {
        const updatedProduct: Product = {
          ...this.data.product,
          ...this.productForm.value
        };
        this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(updatedProduct);
      } else {
        this.snackBar.open('Error al actualizar el producto. Inténtalo de nuevo.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    }, 1500);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}