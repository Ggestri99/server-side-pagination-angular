import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { ApiResponse, Product } from '../models/product.model';
import { Category } from '../models/category.model';

/**
 * Service for managing product-related operations.
 * 
 * This service provides methods to interact with the product API, including
 * fetching products (paginated and unpaginated), searching, managing categories,
 * and performing CRUD operations on products.
 * 
 * While not all methods may be used in the current implementation, they are included
 * as an example of how such functionality would be structured in a professional environment.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiBaseService: ApiBaseService) { }

  getAllProducts(limit: number = 10, skip: number = 0): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>('products', { limit, skip });
  }

  getAllProductsUnpaginated(): Observable<Product[]> {
    return this.apiBaseService.get<Product[]>('products');
  }

  getProductById(id: number): Observable<Product> {
    return this.apiBaseService.get<Product>(`products/${id}`);
  }

  searchProducts(query: string): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>('products/search', { q: query });
  }

  getAllCategories(): Observable<Category[]> {
    return this.apiBaseService.get<Category[]>('products/categories');
  }

  getProductsByCategory(category: string, limit: number = 10, skip: number = 0): Observable<ApiResponse<Product>> {
    const encodedCategory = encodeURIComponent(category);
    return this.apiBaseService.get<ApiResponse<Product>>(
      `products/category/${encodedCategory}`,
      { limit, skip }
    );
  }

  addProduct(productData: Partial<Product>): Observable<Product> {
    return this.apiBaseService.post<Product>('products/add', productData);
  }

  updateProduct(id: number, updatedData: Partial<Product>): Observable<Product> {
    return this.apiBaseService.put<Product>(`products/${id}`, updatedData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiBaseService.delete<void>(`products/${id}`);
  }
}