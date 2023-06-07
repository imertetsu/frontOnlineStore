import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;
  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string){
    return this.httpClient.post<string>(`${this.apiUrl}/login`, {email, password});
  }

  profile(token: string){
    return this.httpClient.get(`${environment.API_URL}/profile`);
  }
}
