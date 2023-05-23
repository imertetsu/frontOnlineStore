import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  totalPrice = 0;
  myProductsInCart: Product[] = [];

  products: Product[] = [];
  /*products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
  ];*/

  constructor(private storeService: StoreService, private productsService:ProductsService){
    this.myProductsInCart = this.storeService.getProductsInCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      (data) => {
        // Manejar los datos obtenidos
        console.log("Mi lista de productos es: ", data);
        this.products = data;
      },
      (error) => {
        // Manejar cualquier error ocurrido durante la solicitud
        console.error(error);
      }
    )
  }
  /*Este metodo escucha lo que viene a ser el producto al presionar el boton "Add Cart"*/
  onListenProduct(product:Product){
    console.log("El producto es: ",product);
    this.onAddtoShoppingCart(product);
    console.log("precio total a pagar: $"+this.totalPrice);
    console.log("Los productos seleccionados son: ", this.myProductsInCart);
    //console.log("instancia storeService "+ JSON.stringify(this.storeService));

  }


  onAddtoShoppingCart(product:Product){
    this.storeService.addProductToCart(product);
    this.totalPrice = this.storeService.sumTotalPrice(product.price);
  }


}
