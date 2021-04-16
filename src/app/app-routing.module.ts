import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NSEmptyOutletComponent } from 'nativescript-angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import {AlarmComponent} from "~/app/alarm/alarm.component";
import {AppComponent} from "~/app/app.component";
import {HomeComponent} from "~/app/home/home.component";
import {SettingsComponent} from "~/app/settings/settings.component";
import {BoatComponent} from "~/app/boat/boat.component";
import {AuthComponent} from "~/app/settings/auth.component";
import {ScanComponent} from "~/app/settings/scan.component";
import {SignonaboatComponent} from "~/app/settings/signonaboat.component";
import {AlertsettingsComponent} from "~/app/settings/alertsettings.component";
import {LogoutComponent} from "~/app/settings/logout.component";
import {ImpressumComponent} from "~/app/settings/impressum.component";
import {PurchaseComponent} from "~/app/settings/purchase.component";
import {EditpersonaldataComponent} from "~/app/settings/editpersonaldata.component";
import {TtnmapperviewComponent} from "~/app/settings/ttnmapperview.component";
import {BoatsettingssingleComponent} from "~/app/boat/boatsettingssingle.component";
import {UploadpictureComponent} from "~/app/boat/uploadpicture.component";
import {SensordetailsComponent} from "~/app/boat/sensordetails.component";
import {GpsdetailsComponent} from "~/app/boat/gpsdetails.component";
import {MapdetailsComponent} from "~/app/boat/mapdetails.component";
import {EditalarmsettingsComponent} from "~/app/boat/editalarmsettings.component";
import {EditdevicesettingsComponent} from "~/app/boat/editdevicesettings.component";
import {EditusersComponent} from "~/app/boat/editusers.component";
import {WebcamComponent} from "~/app/home/webcam.component";
import {EditinhibitsettingsComponent} from "~/app/boat/editinhibitsettings.component";
import {ManualComponent} from "~/app/manuals/manual.component";

const routes: Routes = [
    {path: '', redirectTo: '/(home:home//alarm:alarm//boat:boat//settings:settings)', pathMatch: 'full'},

    {path: 'home', component: HomeComponent, outlet: 'home'},
    {path: 'alarm', component: AlarmComponent, outlet: 'home'},
    { path: 'mapdetails/:idDevice', component: MapdetailsComponent, outlet: 'home'},
    { path: 'webcam/:idDevice', component: WebcamComponent, outlet: 'home'},

    {path: 'alarm', component: AlarmComponent, outlet: 'alarm'},

    {path: 'boat', component: BoatComponent, outlet: 'boat'},
    {path: 'settingssingle/:idDevice', component: BoatsettingssingleComponent, outlet: 'boat'},
    {path: 'uploadpicture/:idDevice', component: UploadpictureComponent, outlet: 'boat'},
    {path: 'sensordetails/:idDevice/:field', component: SensordetailsComponent, outlet: 'boat'},
    {path: 'gpsdetails/:idDevice/:field', component: GpsdetailsComponent, outlet: 'boat'},
    {path: 'mapdetails/:idDevice', component: MapdetailsComponent, outlet: 'boat'},
    {path: 'editalarmsettings/:idDevice/:field/:idAlarm', component: EditalarmsettingsComponent, outlet: 'boat'},
    {path: 'editinhibitsettings/:idDevice/:field/:idAlarm', component: EditinhibitsettingsComponent, outlet: 'boat'},
    {path: 'editdevicesettings/:idDevice/:field', component: EditdevicesettingsComponent, outlet: 'boat'},
    {path: 'editusers/:idDevice/:roleOrRequests', component: EditusersComponent, outlet: 'boat'},

    {path: 'settings', component: SettingsComponent, outlet: 'settings'},
    { path: 'auth', component: AuthComponent, outlet: 'settings' },
    { path: 'scan', component: ScanComponent, outlet: 'settings' },
    { path: 'signonaboat', component: SignonaboatComponent, outlet: 'settings' },
    { path: 'alertsettings', component: AlertsettingsComponent, outlet: 'settings' },
    { path: 'logout', component: LogoutComponent, outlet: 'settings' },
    { path: 'impressum', component: ImpressumComponent, outlet: 'settings' },
    { path: 'purchase', component: PurchaseComponent, outlet: 'settings' },
    { path: 'editpersonaldata', component: EditpersonaldataComponent, outlet: 'settings' },
    { path: 'ttnmapperview', component: TtnmapperviewComponent, outlet: 'settings'},
    { path: 'manuals/boatofficerblue', component: ManualComponent, outlet: 'settings'},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
