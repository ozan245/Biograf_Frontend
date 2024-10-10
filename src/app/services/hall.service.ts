import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { HallDTO } from '../models/HallDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallService {
    private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getHalls(): Observable<HallDTO[]> {
    return this.http.get<HallDTO[]>(`${this.apiUrl}/Halls/GetAllHalls`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getHallIdByShowtimeId(showtimeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Halls/GetHallIdByShowtimeId/${showtimeId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  addHall(hall: HallDTO): Observable<HallDTO> {
    return this.http.post<HallDTO>(`${this.apiUrl}/Halls/AddHall`, hall)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateHallByName(name: string, hall: HallDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Halls/UpdateHallByName/${name}`, hall)
      .pipe(catchError(this.errorHandler.handleError));
  }

  deleteHallByName(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Halls/DeleteHallByName/${name}`)
      .pipe(catchError(this.errorHandler.handleError));
  }
}
