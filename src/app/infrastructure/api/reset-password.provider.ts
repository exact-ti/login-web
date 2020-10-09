import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { IResetPasswordProvider } from 'src/app/core/provider/reset-password.provider';

@Injectable()
export class ResetPasswordProvider implements IResetPasswordProvider {

    constructor(public http: HttpClient) { }

    solicitarResetPassword(correo: string): Observable<any> {
        return this.http.post(AppConfig.API + "/servicio-usuario/login/reset/solicitud", null, {
            params: new HttpParams().set("correo", correo),
        });
    }
    validarResetToken(token: string): Observable<any> {
        return this.http.get(AppConfig.API + "/servicio-usuario/login/reset/validar", {
            params: new HttpParams().set("token", token),
        });
    }
    resetPassword(token: string, passwordNuevo: string): Observable<any> {
        return this.http.put(AppConfig.API + "/servicio-usuario/login/reset/cambiar", {
            token,
            passwordNuevo
        });
    }

} 
