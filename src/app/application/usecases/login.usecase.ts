import { ILoginProvider } from 'src/app/core/provider/login.provider';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/core/model/userdetails.model';
import { HttpErrorResponse } from '@angular/common/http';

export class LoginUseCase {

    constructor(private loginProvider: ILoginProvider<Observable<UserDetails>>){}

    login(usuario: string, password: string): Observable<UserDetails> {
        return this.loginProvider.login(usuario, password);
    }

}