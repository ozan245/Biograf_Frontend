import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { parseJwt } from './parsejwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7076/api/Auth/login'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
    const decodedToken = parseJwt(token);

    if (decodedToken) {
      localStorage.setItem('user_id', decodedToken.nameid);
      localStorage.setItem('role', decodedToken.role);
    }
  }

  saveEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  //getUserId(): string | null {
  //  return localStorage.getItem('user_id');
  //}
  
  getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId, 10) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('email');
    this.router.navigate(['/admin/login']);
  }
}
