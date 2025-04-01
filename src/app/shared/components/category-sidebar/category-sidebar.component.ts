import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
export class CategorySidebarComponent implements OnInit {
  productService = inject(ProductService);

  @Output() categorySelected = new EventEmitter<string>();
  
  categories: Category[] = []; 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;      
    })
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }
}
