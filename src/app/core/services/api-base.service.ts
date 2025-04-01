import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../enviroment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {
  // Base API URL from environment configuration
  public readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params: any = {}): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}