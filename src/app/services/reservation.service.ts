import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
    private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  addReservationWithSeats(reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Reservations/AddReservationWithSeats`, reservation)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
