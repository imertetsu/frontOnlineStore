import { Injectable, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //constructor() { }

  private productsInCart: Product[] = [];
  private totalPrice = 0;
  private myCart = new BehaviorSubject<Product[]>([]);

  //nombreVariable$ es lo que caracteriza a un observable, buena practica
  myCart$ = this.myCart.asObservable();

  getProductsInCart(){
    return this.productsInCart;
  }
  getTotalPrice(){
    return this.totalPrice;
  }

  addProductToCart(product:Product){
    this.productsInCart.push(product);
    //lo que hace es notificar a los suscritos la lista de productos en el carro
    this.myCart.next(this.productsInCart);
  }
  sumTotalPrice(price:number){
    return this.totalPrice += price;
  }
}
