import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string, role: string): Observable<any> {
    const data = { email, password, role };
    // return this.http.post<any>(`${this.url}/user/login/`, data);
    return this.http.post<any>(`${this.url}/user/login/`, data).pipe(
      tap((response: any) => {
        // Assuming the response contains the token and role
        if (response && response.token) {
          localStorage.setItem('jwt', response.token); // Store the JWT
          localStorage.setItem('role', response.role); // Store the user's role
        }
      })
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('jwt');
  }


  // Get the name of the logged-in user
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('jwt');

    if (!token) {
      throw new Error('JWT token is missing');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    return this.http.get<any>(`${this.url}/user/user/`, { headers })
  }


  // Get the user's role (assumed to be stored in localStorage after login)
  getUserRole(): string | null {
    return localStorage.getItem('role'); // Retrieve the user role from localStorage
  }


}