import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { CurrencyService } from '../../core/services/currency.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditProductModalComponent } from './edit/edit-product-modal.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    MatDialogModule
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private currencyService = inject(CurrencyService);
  private dialog = inject(MatDialog);
  
  product: Product | null = null;
  loading = true;
  error = false;
  activeImageIndex = 0;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.productService.getProductById(Number(productId)).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  openEditModal(): void {
    if (!this.product) {
      console.error('No hay producto para editar');
      return;
    }
  
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '500px',
      data: { product: this.product }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.product = result;
      }
    });
  }
  

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  getConvertedPrice(price: number): number {
    return this.currencyService.convertAmount(price);
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}