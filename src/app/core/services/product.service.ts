import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { ApiResponse, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiBaseService: ApiBaseService) {}

  // Obtener todos los productos con paginación
  getAllProducts(limit: number = 30, skip: number = 0): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>('products', { limit, skip });
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.apiBaseService.get<Product>(`products/${id}`);
  }

  // Buscar productos por nombre o palabra clave
  searchProducts(query: string): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>('products/search', { q: query });
  }

  // Obtener categorías de productos
  getAllCategories(): Observable<string[]> {
    return this.apiBaseService.get<string[]>('products/categories');
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<ApiResponse<Product>> {
    return this.apiBaseService.get<ApiResponse<Product>>(`products/category/${category}`);
  }

  // Agregar un nuevo producto
  addProduct(productData: Partial<Product>): Observable<Product> {
    return this.apiBaseService.post<Product>('products/add', productData);
  }

  // Actualizar un producto
  updateProduct(id: number, updatedData: Partial<Product>): Observable<Product> {
    return this.apiBaseService.put<Product>(`products/${id}`, updatedData);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<void> {
    return this.apiBaseService.delete<void>(`products/${id}`);
  }
}
