import { Component, Input } from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  //con el signo de exclamación le decimos a Angular (o Typescript) que esa propiedad si va a existir, que no puede ser nula
  @Input() product!: Product;
  /*@Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    image: ''
  }*/


}
