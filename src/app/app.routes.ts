import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);