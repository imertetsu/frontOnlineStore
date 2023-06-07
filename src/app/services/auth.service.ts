import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.httpClient.post<Auth>(`${this.apiUrl}/login`, {email, password})
      .pipe(
        tap((response)=> this.tokenService.saveToken(response.token))
      );
  }

  profile(){
    return this.httpClient.get<User>(`${environment.API_URL}/profile`, {
      //en esta peticion realizamos el interceptor checkTime
      context: checkTime()
      /*headers: {
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      }*/
    });
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
      .pipe(
        switchMap(() => this.profile())
      )
  }
}
