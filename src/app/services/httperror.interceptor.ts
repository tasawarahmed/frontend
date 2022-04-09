import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, retry, retryWhen } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { ErrorCode } from '../Enums/enums';

@Injectable({
  providedIn: 'root',
})
export class HttperrorInterceptor implements HttpInterceptor {
  constructor(private alertify: AlertifyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('HTTP Request Started');
    return next.handle(request).pipe(
      retryWhen((error) => this.retryRequest(error, 5)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(error);
        this.alertify.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  retryRequest(
    error: Observable<unknown>,
    retryCount: number
  ): Observable<unknown> {
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        if (count <= retryCount) {

          switch(checkErr.status)
          {
            case ErrorCode.serverDown: return of (checkErr);
            case ErrorCode.unauthorized: return of (checkErr);
          }
        }
        return throwError(checkErr);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = error.error.message;
    } else {
      if(error.status === 401 ){
        return error.statusText;
      }
      if (error.error.errorMessage && error.status != 0) {
        errorMessage = error.error.errorMessage;
      }
      //Server side error
    }
    return errorMessage;
  }
}
