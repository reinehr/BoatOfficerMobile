import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
// import { CookieService } from 'ngx-cookie-service';
/*
import firebase = require('nativescript-plugin-firebase');

firebase
    .init()
    .then(() => console.log('Firebase initialized!'))
    .catch(error => console.error(`Error: ${error}`));
*/
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        // CookieService
    ]
})
export class AppModule { }
