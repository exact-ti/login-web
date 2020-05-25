import { Observable, of } from 'rxjs';
import { UserDetails } from 'src/app/core/model/userdetails.model';
import { ILoginProvider } from 'src/app/core/provider/login.provider';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginProvider implements ILoginProvider<Observable<UserDetails>> {
    
    constructor(public http: HttpClient){}

    login(usuario: string, password: string): Observable<UserDetails> {

        const params = new HttpParams({
            fromObject: {
              grant_type: 'password',
              username: usuario,
              password: password,
            }
          });

        return this.http.post<Response>(AppConfig.API + "/servicio-oauth/oauth/token", params).pipe(
            map((response: any) => {
                    return new UserDetails(response.access_token, response.refresh_token);
                }
            )
        );
    }
    
}