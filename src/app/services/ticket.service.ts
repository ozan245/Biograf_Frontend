import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';
import { TicketDetailsDTO } from '../models/TicketDetailsDTO';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,private errorHandler: ErrorHandlerService) {}

  addTicket(ticketData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Tickets/AddTicketsRepo`, ticketData)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getTicketDetailsByPaymentId(paymentId: number): Observable<TicketDetailsDTO> {
    return this.http.get<TicketDetailsDTO>(`${this.apiUrl}/Tickets/GetTicketDetailsByPaymentId/${paymentId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

 
}
