import { Observable, of, throwError } from 'rxjs';
import { UserDetails } from 'src/app/core/model/userdetails.model';
import { ILoginProvider } from 'src/app/core/provider/login.provider';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginProvider implements ILoginProvider<Observable<UserDetails>> {

    constructor(public http: HttpClient) { }

    login(usuario: string, password: string): Observable<any> {

        let ldap = AppConfig.LDAP ? "/ldap" : ""

        return this.http.post<Response>(AppConfig.API + "/servicio-auth/auth" + ldap, null, {
            headers: { "Authorization": "Basic " + btoa(usuario + ':' + password) }
        }).pipe(
            map((response: any) => {
                try {
                    return new UserDetails(response.data.access_token, response.data.refresh_token);
                } catch (error) {
                    throw new Error(response.message);
                }

            })
        );
    }

}