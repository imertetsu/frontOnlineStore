import { Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    //con el signo de exclamación le decimos a Angular (o Typescript) que esa propiedad si va a existir, que no puede ser nula
    @Input() product!: Product;
    @Output() productToEmit = new EventEmitter<Product>();



    onLoaded(img:string){
      console.log('esta llegando al padre', img);
    }

    emitProduct(product: Product){
      this.productToEmit.emit(product);
    }
}
