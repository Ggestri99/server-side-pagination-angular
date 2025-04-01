import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { CurrencyService, Currency } from '../../core/services/currency.service';
import { CategorySidebarComponent } from '../../shared/components/category-sidebar/category-sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonToggleModule,
    CurrencyPipe,
    CategorySidebarComponent,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productService = inject(ProductService);
  currencyService = inject(CurrencyService);
  router = inject(Router);

  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['image', 'name', 'brand', 'price', 'stock', 'rating', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private pageChanges = new BehaviorSubject<{ pageIndex: number; pageSize: number }>({ pageIndex: 0, pageSize: 10 });
  private currencyChanges = new BehaviorSubject<Currency>('USD');

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  selectedCurrency: Currency = 'USD';
  currencies: Currency[] = ['USD', 'EUR'];

  ngOnInit(): void {
    combineLatest([this.pageChanges, this.currencyChanges]).pipe(
      switchMap(([{ pageIndex, pageSize }, currency]) =>
        this.productService.getAllProducts(pageSize, pageIndex * pageSize)
      )
    ).subscribe(response => {
      this.dataSource.data = response.products;
      this.totalItems = response.total;
    });

    this.currencyService.currency$.subscribe(currency => {
      this.selectedCurrency = currency;
      this.currencyChanges.next(currency);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageChanges.next({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }

  changeCurrency(currency: Currency): void {
    this.currencyService.setCurrency(currency);
  }

  getConvertedPrice(price: number): number {
    return this.currencyService.convertAmount(price);
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }

  filterByCategory(category: string): void {

    // Reiniciar la paginación cuando se cambia de categoría
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    if (category === 'all') {
      this.productService.getAllProducts(this.pageSize, this.currentPage * this.pageSize)
        .subscribe(response => {
          this.dataSource.data = response.products;
          this.totalItems = response.total;
        });
    } else {
      this.productService.getProductsByCategory(category, this.pageSize, this.currentPage * this.pageSize)
        .subscribe(response => {
          this.dataSource.data = response.products;
          this.totalItems = response.total;
        });
    }

    // Actualizar el estado de la paginación
    this.pageChanges.next({ pageIndex: this.currentPage, pageSize: this.pageSize });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewProduct(productId: any) {
    console.log('Ver producto:', productId);
    this.router.navigate(['features/product-details', productId]);
  }
    
}
