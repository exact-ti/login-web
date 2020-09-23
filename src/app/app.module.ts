import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotifierModule } from "angular-notifier";

// Rutas
import { APP_ROUTING } from './app.routes';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Interceptor } from './infrastructure/api/core/interceptor';
import { AppConfig } from './app.config';
import { LoginProvider } from './infrastructure/api/login.provider';


export function cargarConfiguracion(httpClient: HttpClient) {
  return () => httpClient.get('/assets/config.json').pipe(
      map((x: any) => {
        let modo: string = x.mode;
        let objeto: any = x[modo];
        AppConfig.Inicializar(objeto.api, objeto.client_id, objeto.client_secret, objeto.redirect_url);
      })
  ).subscribe();
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule
  ],
  providers: [     
    {
      provide: APP_INITIALIZER,
      useFactory: cargarConfiguracion,
      multi: true,
      deps: [HttpClient]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    LoginProvider, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
