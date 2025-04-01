import { Component, EventEmitter, Output, inject, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductService } from '../../../core/services/product.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatToolbarModule],
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent {
  private productService = inject(ProductService);

  @Output() categorySelected = new EventEmitter<string>();

  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  constructor() {
    this.getCategories();
  }

  private getCategories(): void {
    this.productService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories.set(categories); 
    });
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }
}
