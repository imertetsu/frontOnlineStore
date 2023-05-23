import { Injectable, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private productsInCart: Product[] = [];
  private totalPrice = 0;

  getProductsInCart(){
    return this.productsInCart;
  }
  getTotalPrice(){
    return this.totalPrice;
  }

  addProductToCart(product:Product){
    this.productsInCart.push(product);
  }
  sumTotalPrice(price:number){
    return this.totalPrice += price;
  }
}
