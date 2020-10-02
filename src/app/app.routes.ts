import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'recuperar-password', component: RecuperarPasswordComponent },
    { path: '**', component: LoginComponent },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);