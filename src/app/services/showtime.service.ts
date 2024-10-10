import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShowtimeDTO } from '../models/ShowtimeDTO';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
    private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  addShowtime(showtime: ShowtimeDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/Showtimes/AddShowtime`, showtime)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateShowtime(id: number, showtime: ShowtimeDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/Showtimes/UpdateShowtimeById/${id}`, showtime)
      .pipe(catchError(this.errorHandler.handleError));
  }

  deleteShowtime(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Showtimes/DeleteShowtimeById/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getAllShowtimes(): Observable<ShowtimeDTO[]> {
    return this.http.get<ShowtimeDTO[]>(`${this.apiUrl}/Showtimes/GetAllShowtimes`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getShowtimesByMovieAndCinema(movieId: number, cinemaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Showtimes/GetShowtimessByMovies/${movieId}/Cinemas/${cinemaId}/Showtimes`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getShowtimeDetails(showtimeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Showtimes/GetShowtimeDetailsByShowtimeId/${showtimeId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
