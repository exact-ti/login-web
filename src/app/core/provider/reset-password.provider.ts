import { Observable } from 'rxjs';

export interface IResetPasswordProvider {

    solicitarResetPassword(correo: string): Observable<any>;
    validarResetToken(token: string): Observable<any>;
    resetPassword(token: string, nuevoPassword: string): Observable<any>;

}