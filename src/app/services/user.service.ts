import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/UserDTO';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  
export class UserService {
    private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  addUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/AddUser`, user)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/GetUserById/${id}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/GetAllUsers`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  updateUser(id: number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/UpdateUserById/${id}`, user)
    .pipe(catchError(this.errorHandler.handleError));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteUserById/${id}`)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
