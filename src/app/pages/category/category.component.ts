import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categoryId!: number;
  category!: Category;
  categoryProducts: Product[] = [];
  @Output() showCategoryId = new EventEmitter<number>();
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      this.productId = Number(params.get('product'));
      console.log(this.productId);
    });
    //con este metodo lo que hacemos es obtener el id de params
    this.route.paramMap.subscribe(params =>{
      //este nombre 'id' debe coincidir con el que pusiste en routing
      this.categoryId = Number(params.get('id'));
      console.log(this.categoryId);
      this.getCategory(this.categoryId);
    });
  }

  getCategory(id:number){
    this.categoriesService.getCategory(id)
    .subscribe(data =>{
      console.log(data);
      this.category = data;
      if(data.products){
        this.categoryProducts = data.products;
      }
    },(error) => {
      console.log(error);
    });
  }

  onShowCategoryDetais(){
    this.showCategoryId.emit(this.categoryId);
  }
  goToBack(){
    this.location.back();
  }

}
