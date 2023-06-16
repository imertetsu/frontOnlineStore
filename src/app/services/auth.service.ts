import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //si el usuario recarga la pagina esto vuelve a ser null
  private myUserProfile = new BehaviorSubject<User | null>(null);

  //nombreVariable$ es lo que caracteriza a un observable, buena practica
  myUserProfile$ = this.myUserProfile.asObservable();

  private apiUrl = `${environment.API_URL}/auth`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.httpClient.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response)=> this.tokenService.saveToken(response.token))
      );
  }

  getProfile(){
    return this.httpClient.get<User>(`${environment.API_URL}/profile`, {
      //en esta peticion realizamos el interceptor checkTime
      context: checkTime()
      /*headers: {
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      }*/
    })
      .pipe(
        tap((data) => {
          this.myUserProfile.next(data);
        })
      );
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile())
      )
      .pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status === HttpStatusCode.Unauthorized){
            return throwError(() => new Error ('Unauthorized, wrong email or password'));
          }
          return throwError(() => new Error ('Ups algo salio mal'));
        })
      );
  }

  logout(){
    this.tokenService.removeToken();
    //this.myUserProfile.next(null);
  }
}
