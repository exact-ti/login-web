import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
    HttpResponse, HttpUserEvent, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { take, catchError, filter, map, retry } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

    headers: HttpHeaders;

    constructor(
    ) {
        let subscription = AppConfig.onInicialization.pipe(take(1)).subscribe(() => {
            this.headers = new HttpHeaders({
                "Authorization": "Basic " + btoa(AppConfig.CLIENT_ID + ':' + AppConfig.CLIENT_SECRET),
                'Content-Type': 'application/x-www-form-urlencoded',
            });
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        let authReq = req;

        authReq = req.clone({
            headers: this.headers
        });

        return next.handle(authReq).pipe(
            catchError((err, caught) => {
                return throwError(err.error);
            })
        );
    }



}
