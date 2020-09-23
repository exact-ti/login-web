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

        return this.http.post<Response>(AppConfig.API + "/servicio-auth/auth", null, {
            headers: {"Authorization": "Basic " + btoa(usuario + ':' + password)}
        }).pipe(
            map((response: any) => {
                    return new UserDetails(response.data.access_token, response.data.refresh_token);
                }
            )
        );
    }
    
}