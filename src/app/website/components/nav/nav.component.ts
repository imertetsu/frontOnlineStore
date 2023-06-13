import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  showMenu = false;
  counter = 0;
  email = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
    ){

  }
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      console.log("OnInit", products);
      this.counter = products.length;
    });
    this.authService.myUserProfile$
      .subscribe(data => {
        this.profile = data;
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
    this.authService.loginAndGet('tetsu@gmail.com', '123456')
      .subscribe(() => {
        this.router.navigate(['/profile']);
        console.log(this.profile);
      });
  }

  getCategories(){
    this.categoriesService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
    });
  }

  logoutUser(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
