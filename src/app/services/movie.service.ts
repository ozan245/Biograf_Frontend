import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieDTO } from '../models/MovieDTO';  
import { environment } from '../../environments/environment'; 
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getMovies(): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(`${this.apiUrl}/Movies/GetAllMovies`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getMovieById(movieId: number): Observable<MovieDTO> {
    return this.http.get<MovieDTO>(`${this.apiUrl}/${movieId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  addMovie(movieData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post(`${this.apiUrl}/Movies/AddMovie`, movieData, { headers })
    .pipe(catchError(this.errorHandler.handleError));
  }

  updateMovieByName(title: string, movieData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/Movies/UpdateMovieByTitle/${title}`, movieData, { headers })
    .pipe(catchError(this.errorHandler.handleError));
  }

  deleteMovieByTitle(title: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Movies/DeleteMovieByTitle/${title}`)
    .pipe(catchError(this.errorHandler.handleError));
  }
 
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Movies/DeleteMovieById/${movieId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  searchMoviesByTitle(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Movies/SearchMovieByTitle/${title}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getActiveMovies(): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(`${this.apiUrl}/Movies/GetActiveMovies`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Genres/GetAllGenres`)
    .pipe(catchError(this.errorHandler.handleError));
  }
  
  getMoviesWithGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Movies/GetMoviesWithGenres`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getActiveMoviesByGenre(genreId: number): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(`${this.apiUrl}/Movies/GetActiveMoviesByGenre/${genreId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
