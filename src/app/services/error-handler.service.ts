import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {}
  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.status === 400) {
      errorMessage = `Bad Request: ${error.error}`;
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized: Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Forbidden: You do not have the required permissions.';
    } else if (error.status === 404) {
      errorMessage = `Not Found: ${error.error}`;
    } else {
      errorMessage = `Server-side error: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
