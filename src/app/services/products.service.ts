import { Injectable } from '@angular/core';
//es un servicio que inyecta a este servicio actual
import { HttpClient } from '@angular/common/http';
import { CreateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private httpClient:HttpClient) { }

  getAllProducts(){
    //aca hacemos un request para obtener un array de tipo productos
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
  getProduct(id: number){
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
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
