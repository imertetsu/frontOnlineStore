import { Injectable } from '@angular/core';
//es un servicio que inyecta a este servicio actual
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts(){
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products');
  }
}
