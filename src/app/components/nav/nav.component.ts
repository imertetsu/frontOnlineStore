import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  showMenu = false;
  counter = 0;

  constructor(private storeService: StoreService){

  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      console.log("OnInit",products);
      this.counter = products.length;
    });
  }

  displayMenu(){
    this.showMenu = true;
    console.log("menu abierto "+this.showMenu);
  }
  closeMenu(){
    this.showMenu = false;
    console.log("menu cerrado "+this.showMenu);
  }

}
