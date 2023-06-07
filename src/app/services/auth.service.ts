import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;
  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string){
    return this.httpClient.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }

  profile(token: string){
    return this.httpClient.get<User>(`${environment.API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      }
    });
  }
}
