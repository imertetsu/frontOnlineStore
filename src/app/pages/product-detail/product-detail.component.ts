import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId!: number;
  productChosen!: Product;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private location: Location
  ){}

  ngOnInit(): void {

    //con este metodo lo que hacemos es obtener el id de params
    this.route.paramMap.subscribe(params =>{
      //este nombre 'id' debe coincidir con el que pusiste en routing
      this.productId = Number(params.get('id'));
      console.log(this.productId);
      this.getProduct(this.productId);
    });
  }

  getProduct(id: number){
    this.productsService.getProduct(id)
      .subscribe(product => {
        this.productChosen = product;
      });
  }
  addtoShoppingCart(){
    this.storeService.addProductToCart(this.productChosen);
  }

  goToBack(){
    this.location.back();
  }
}
