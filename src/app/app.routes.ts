import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { VerifyComponent } from './components/verify/verify.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'recuperar-password', component: RecuperarPasswordComponent },
    { path: 'verify/:token', component: VerifyComponent },
    { path: '**', redirectTo: 'login' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);