import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import { BoatComponent } from "./boat/boat.component";

import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {TimeagoModule} from 'ngx-timeago';

// GMSServices.MapView
import * as platform from 'tns-core-modules/platform';
// import * as GMSServices from 'nativescript-google-maps-sdk';
if (platform.isIOS) {
//     GMSServices.
    GMSServices.provideAPIKey('AIzaSyDLIIQBXTMyrO0y2ZHjgTM0uEcRliXy4eg');
}
// import { CookieService } from 'ngx-cookie-service';
declare var GMSServices: any;
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
        NativeScriptHttpClientModule,
        TimeagoModule.forRoot()
    ],
    declarations: [
        AppComponent,
        // BoatComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        // CookieService
    ]
})
export class AppModule {
}
