import { Injectable } from '@angular/core';
//es un servicio que inyecta a este servicio actual
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private httpClient:HttpClient) { }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit', limit.toString());
      params = params.set('offset', offset.toString());
    }
    //aca hacemos un request para obtener un array de tipo productos
    return this.httpClient.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3),
      //el primer map es para hacer transformaciones el 2do es de js para hacer transformaciones de js
      map(products => products.map(product => {
        return {
          ...product,
          taxes: 0.19* product.price
        }
      }))
    );
  }
  getProduct(id: number){
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      //de esta forma se manejann los errores en angular
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.NotFound){
          return throwError(() => new Error ('Product not found'));
        }
        return throwError(() => new Error ('Ups algo salio mal'));
      })
    );
  }
  getProductByPage(limit: number, offset: number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }
  createProduct(product:CreateProductDTO){
    //product de 2do parametro es lo que enviamos en el body
    return this.httpClient.post<Product>(this.apiUrl, product);
  }
  //data transfer object
  updateProduct(id: number, dto: any){
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
  patchProduct(product: Product){
    return this.httpClient.patch<Product>(this.apiUrl, product);
  }
  deleteProduct(id: number){
    return this.httpClient.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
