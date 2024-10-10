import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class GenreService {
    private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Genres/GetAllGenres`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  addGenre(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Genres/AddGenre`, { name })
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateGenreByName(name: string, updatedName: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Genres/UpdateGenreByName/${name}`, { name: updatedName })
      .pipe(catchError(this.errorHandler.handleError));
  }

  deleteGenreByName(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Genres/DeleteGenreByName/${name}`)
      .pipe(catchError(this.errorHandler.handleError));
  }
}
