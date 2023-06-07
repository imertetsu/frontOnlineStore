import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  showMenu = false;
  counter = 0;
  email = '';
  token = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService){

  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      console.log("OnInit", products);
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

  login(){
    this.authService.login('201508415@est.umss.edu', '654321')
      .subscribe(data => {
        console.log(data);
        this.token = data.token;
        console.log('token: ',this.token);
        this.getProfile();
      });
  }

  getProfile(){
    this.authService.profile(this.token).subscribe(data=>{
      console.log(data);
      this.email = data.email;
      console.log(this.email);
    });
  }
}
