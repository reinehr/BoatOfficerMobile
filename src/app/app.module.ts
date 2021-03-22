import {Injectable, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import {NativeScriptModule} from '@nativescript/angular';
import {NativeScriptFormsModule} from '@nativescript/angular';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { AlarmComponent } from "./alarm/alarm.component";

import {NativeScriptHttpClientModule} from '@nativescript/angular';
import {TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter} from 'ngx-timeago';

// GMSServices.MapView
import * as platform from '@nativescript/core/platform';
import {BoatComponent} from "~/app/boat/boat.component";
import {HomeComponent} from "~/app/home/home.component";
import {SettingsComponent} from "~/app/settings/settings.component";
import {AuthComponent} from "~/app/settings/auth.component";
import {ScanComponent} from "~/app/settings/scan.component";
import {SignonaboatComponent} from "~/app/settings/signonaboat.component";
import {LogoutComponent} from "~/app/settings/logout.component";
import {AlertsettingsComponent} from "~/app/settings/alertsettings.component";
import {ImpressumComponent} from "~/app/settings/impressum.component";
import {PurchaseComponent} from "~/app/settings/purchase.component";
import {EditpersonaldataComponent} from "~/app/settings/editpersonaldata.component";
import {TtnmapperviewComponent} from "~/app/settings/ttnmapperview.component";
import {NativeScriptUIChartModule} from "nativescript-ui-chart/angular";
import {CommonModule} from "@angular/common";
import {SensordetailsComponent} from "~/app/boat/sensordetails.component";
import {GpsdetailsComponent} from "~/app/boat/gpsdetails.component";
import {MapdetailsComponent} from "~/app/boat/mapdetails.component";
import {BoatsettingssingleComponent} from "~/app/boat/boatsettingssingle.component";
import {UploadpictureComponent} from "~/app/boat/uploadpicture.component";
import {EditalarmsettingsComponent} from "~/app/boat/editalarmsettings.component";
import {EditdevicesettingsComponent} from "~/app/boat/editdevicesettings.component";
import {EditusersComponent} from "~/app/boat/editusers.component";
import {BoatHeaderComponent} from "~/app/shared/ui/boat-header/boat-header.component";
import {AlarmCard4segmentsTitleComponent} from "~/app/shared/ui/alarm-card-4segments-title/alarm-card-4segments-title.component";
import {WebcamComponent} from "~/app/home/webcam.component";
import {EditinhibitsettingsComponent} from "~/app/boat/editinhibitsettings.component";
// import * as GMSServices from 'nativescript-google-maps-sdk';
if (platform.isIOS) {
//     GMSServices.
    GMSServices.provideAPIKey('AIzaSyDLIIQBXTMyrO0y2ZHjgTM0uEcRliXy4eg');
}
// import { CookieService } from 'ngx-cookie-service';
declare var GMSServices: any;
/*
import firebase = require('@nativescript/firebase');

firebase
    .init()
    .then(() => console.log('Firebase initialized!'))
    .catch(error => console.error(`Error: ${error}`));
*/

@Injectable()
export class MyIntl extends TimeagoIntl {
// do extra stuff here...
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptLocalizeModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUIChartModule,
        CommonModule,
        NativeScriptFormsModule,
        TimeagoModule.forRoot({
            intl: { provide: TimeagoIntl, useClass: MyIntl },
            formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
        })
    ],
    declarations: [
        AppComponent,
        AlarmComponent,
        BoatComponent, SensordetailsComponent, GpsdetailsComponent, MapdetailsComponent, BoatsettingssingleComponent, UploadpictureComponent, EditalarmsettingsComponent, EditinhibitsettingsComponent, EditdevicesettingsComponent, EditusersComponent, BoatHeaderComponent, AlarmCard4segmentsTitleComponent,
        HomeComponent, WebcamComponent,
        SettingsComponent, AuthComponent, ScanComponent, SignonaboatComponent, LogoutComponent, AlertsettingsComponent, ImpressumComponent, PurchaseComponent, EditpersonaldataComponent, TtnmapperviewComponent
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

// Work around incompatibility with getUIView() function in AccessibilityHelper.ios.js
// in nativescript-accessibility-ext module which *always* uses `.ios`, triggering a crash.
Object.defineProperty(
    require("nativescript-google-maps-sdk").MapView.prototype,
    "ios",
    {
        get() {
            return this.nativeView;
            // throw new Error('Now use instance.nativeView instead of instance.ios');
        },
        enumerable: true,
        configurable: true,
    }
);
