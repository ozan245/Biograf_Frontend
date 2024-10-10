import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { CinemaDTO } from '../../app/models/CinemaDTO'; 
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
    private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getCinemas(): Observable<CinemaDTO[]> {
    return this.http.get<CinemaDTO[]>(`${this.apiUrl}/Cinemas/GetAllCinemas`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getCinemasByMovie(movieId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Cinemas/GetCinemasByMovieId/${movieId}`)
    .pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  addCinema(cinema: CinemaDTO): Observable<CinemaDTO> {
    return this.http.post<CinemaDTO>(`${this.apiUrl}/Cinemas/AddCinema`, cinema)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateCinemaByName(name: string, cinema: CinemaDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Cinemas/UpdateCinemaByName/${name}`, cinema)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  deleteCinemaByName(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Cinemas/DeleteCinemaByName/${name}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}
