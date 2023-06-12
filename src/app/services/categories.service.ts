import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.API_URL}/categories`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCategories(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit', limit.toString());
      params = params.set('offset', offset.toString());
    }
    return this.httpClient.get<Category[]>(this.apiUrl, { params });
  }

  getCategory(id: number){
    return this.httpClient.get<Category>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status === HttpStatusCode.NotFound){
            return throwError(() => new Error ('Category not found'));
          }
          return throwError(() => new Error ('Ups algo salio mal'));
        })
      );
  }
}
