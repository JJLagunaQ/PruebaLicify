import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Login, isLoggedIn } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  Login(user: Login): Observable<isLoggedIn>{
    return this.http.post<isLoggedIn>(`${this.BASE_URL}/auth/login`, user);
  }
}
