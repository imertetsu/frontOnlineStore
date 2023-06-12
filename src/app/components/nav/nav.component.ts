import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  showMenu = false;
  counter = 0;
  email = '';
  profile!: User;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService){

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
    this.authService.loginAndGet('201508415@est.umss.edu', '654321')
      .subscribe(data => {
        console.log(data);
        this.profile = data;
      });
  }

  getCategories(){
    this.categoriesService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
    });
  }
}
