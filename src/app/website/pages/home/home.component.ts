import { Component,OnInit  } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  limit = 4;
  offset = 0;
  products: Product[] = [];
  productId!: number;

  constructor(
    private productsService:ProductsService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.loadMore();
    this.route.queryParamMap.subscribe(params =>{
      this.productId = Number(params.get('product'));
      console.log(this.productId);
    });
  }
  //este metodo es para el limit y offset
  loadMore(){
    this.productsService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        //concat no es mutable, es inmutable por lo que se debe asignar al array

        const dataLength = data.length;
        console.log(data);
        if(dataLength !== 0){
          this.products = this.products.concat(data);
          this.offset += this.limit;
        }else{
          alert('there is no more products');
        }
      });
  }
  goBack(){
    if(this.offset > this.limit){
      this.products.length = this.products.length - this.limit;
      this.offset = this.offset - this.limit;
    }
  }

}
