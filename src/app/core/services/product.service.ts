import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { ApiResponse, Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiBaseService: ApiBaseService) { }

  // Get all products with pagination
  getAllProducts(limit: number = 10, skip: number = 0): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>('products', { limit, skip });
  }
  // Get all products without pagination
  getAllProductsUnpaginated(): Observable<Product[]> {
    return this.apiBaseService.get<Product[]>('products');
  }

  // Get a product by ID
  getProductById(id: number): Observable<Product> {
    return this.apiBaseService.get<Product>(`products/${id}`);
  }

  // Search products by name or keyword
  searchProducts(query: string): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>('products/search', { q: query });
  }

  // Get all product categories
  getAllCategories(): Observable<Category[]> {
    return this.apiBaseService.get<Category[]>('products/categories');
  }

  // Get products by category
// Get products by category
getProductsByCategory(category: string, limit: number = 10, skip: number = 0): Observable<ApiResponse<Product>> {
  const encodedCategory = encodeURIComponent(category);
  return this.apiBaseService.get<ApiResponse<Product>>(
    `products/category/${encodedCategory}`, 
    { limit, skip }
  );
}

  // Add a new product
  addProduct(productData: Partial<Product>): Observable<Product> {
    return this.apiBaseService.post<Product>('products/add', productData);
  }

  // Update an existing product
  updateProduct(id: number, updatedData: Partial<Product>): Observable<Product> {
    return this.apiBaseService.put<Product>(`products/${id}`, updatedData);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.apiBaseService.delete<void>(`products/${id}`);
  }
}