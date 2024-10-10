import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SeatDTO } from '../models/SeatDTO';
import { environment } from '../../environments/environment'; 
import { ErrorHandlerService } from './error-handler.service';
import { ReservationSeat } from '../models/ReservationSeat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  addSeat(seat: SeatDTO): Observable<any> {
    seat.isReserved = false;
    return this.http.post(`${this.apiUrl}/Seats/AddSeat`, seat)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateSeatById(id: number, seat: SeatDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/Seats/UpdateSeatById/${id}`, seat)
      .pipe(catchError(this.errorHandler.handleError));
  }

  deleteSeat(row: string, number: number): Observable<any> {
    const params = new HttpParams()
      .set('row', row)
      .set('number', number.toString());
  
    return this.http.delete(`${this.apiUrl}/Seats/DeleteSeatByRowByNumber`, { params, responseType: 'text' })
      .pipe(catchError(this.errorHandler.handleError));
  }

  getSeats(): Observable<SeatDTO[]> {
    return this.http.get<SeatDTO[]>(`${this.apiUrl}/Seats/GetAllSeats`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getSeatsByHall(hallId: number): Observable<SeatDTO[]> {
    return this.http.get<SeatDTO[]>(`${this.apiUrl}/Seats/GetSeatsByHallId/${hallId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getAvailableSeats(showtimeId: number): Observable<SeatDTO[]> {
    return this.http.get<SeatDTO[]>(`${this.apiUrl}/Seats/GetAvailableSeatsByShowtimeId/${showtimeId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getSeatsByHallAndShowtime(hallId: number, showtimeId: number): Observable<SeatDTO[]> {
    return this.http.get<SeatDTO[]>(`${this.apiUrl}/Seats/GetSeatsByHall/${hallId}/Showtime/${showtimeId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  reserveSeats(reservationSeats: ReservationSeat[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Seats/ReserveSeats`, reservationSeats)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
