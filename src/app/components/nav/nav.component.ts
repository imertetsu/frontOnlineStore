import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  showMenu = false;

  displayMenu(){
    this.showMenu = true;
    console.log("menu abierto "+this.showMenu);
  }
  closeMenu(){
    this.showMenu = false;
    console.log("menu cerrado "+this.showMenu);
  }

}
