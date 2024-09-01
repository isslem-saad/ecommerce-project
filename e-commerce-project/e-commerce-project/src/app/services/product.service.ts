import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CategoryName } from '../models/category-name.enum';
import { TypeMakeup } from '../models/type-makeup.enum';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiServerUrl='http://localhost:8082/api';
private baseUrl = 'http://localhost:8082/api/product';
  constructor(private http:HttpClient) {  
  }
  getPaginatedProducts(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/paginated?page=${page}&size=${size}`);
  }

  filterPaginatedProducts(categoryName: CategoryName, typeMakeup: TypeMakeup | null, page: number, size: number): Observable<any> {
    let url = `${this.baseUrl}/filter?categoryName=${categoryName}&page=${page}&size=${size}`;
    if (typeMakeup) {
      url += `&typeMakeup=${typeMakeup}`;
    }
    return this.http.get<any>(url);
  }
  public getProducts():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/product/all`);
  }

  filterProducts(categoryName: CategoryName, typeMakeup?: TypeMakeup): Observable<Product[]> {
    const url = `${this.baseUrl}/filter?categoryName=${categoryName}` +
                (typeMakeup ? `&typeMakeup=${typeMakeup}` : '');
    return this.http.get<Product[]>(url);
  }
  public addProduct(product:Product):Observable<Product>
  {
    return this.http.post<Product>(`${this.apiServerUrl}/product/add`,product);
  }
 
  
  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/all`);
  }
  public UpdateProduct(product:Product):Observable<Product>
  {
    return this.http.put<Product>(`${this.apiServerUrl}/product/update`,product);
  }
  public deleteProduct(productId:Number):Observable<void>
{
  return this.http.delete<void>(`${this.apiServerUrl}/product/delete/${productId}`);
}
}
