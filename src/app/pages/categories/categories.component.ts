import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  categories: Category[]= [];

  constructor(
    private categoriesService: CategoriesService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoriesService.getAllCategories()
      .subscribe(data => {
        console.log(data);
        this.categories = data;
      });
  }
  getCategoryId(id: number){
    console.log("Categoryid: ", id);
  }
}
