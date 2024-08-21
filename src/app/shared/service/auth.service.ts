import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string, role: string): Observable<any> {
    const data = { email, password, role };
    return this.http.post<any>(`${this.url}/user/login/`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('admin');
  }
}