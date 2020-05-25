import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

export class AppConfig{

    public static API: string;
    public static CLIENT_ID: string;
    public static CLIENT_SECRET: string;
    public static REDIRECT_URL: string;

    public static readonly onInicialization: Subject<void> = new Subject<void>(); 

    public static Inicializar(api: string, clientId: string, clientSecret: string, redirectUrl: string) {
        this.API = api;
        this.CLIENT_ID = clientId;
        this.CLIENT_SECRET = clientSecret;
        this.REDIRECT_URL = redirectUrl;
        this.onInicialization.next();
    }

    

}