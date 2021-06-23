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
import {LocationComponent} from "~/app/location/location.component";

const routes: Routes = [
    {path: '', redirectTo: '/(homeoutlet:home//boatoutlet:boat//locationoutlet:location//alarmoutlet:alarm//settingsoutlet:settings)', pathMatch: 'full'},

    {path: 'home', component: HomeComponent, outlet: 'homeoutlet'},
    {path: 'mapdetails/:idDevice', component: MapdetailsComponent, outlet: 'homeoutlet'},
    {path: 'webcam/:idDevice', component: WebcamComponent, outlet: 'homeoutlet'},


    {path: 'alarm', component: AlarmComponent, outlet: 'alarmoutlet'},
    {path: 'settingssingle/:idDevice', component: BoatsettingssingleComponent, outlet: 'alarmoutlet'},
    {path: 'editalarmsettings/:idDevice/:field/:idAlarm', component: EditalarmsettingsComponent, outlet: 'alarmoutlet'},
    {path: 'editinhibitsettings/:idDevice/:field/:idAlarm', component: EditinhibitsettingsComponent, outlet: 'alarmoutlet'},
    {path: 'editdevicesettings/:idDevice/:field', component: EditdevicesettingsComponent, outlet: 'alarmoutlet'},
    {path: 'editusers/:idDevice/:roleOrRequests', component: EditusersComponent, outlet: 'alarmoutlet'},

    {path: 'boat', component: BoatComponent, outlet: 'boatoutlet'},
    {path: 'settingssingle/:idDevice', component: BoatsettingssingleComponent, outlet: 'boatoutlet'},
    {path: 'uploadpicture/:idDevice', component: UploadpictureComponent, outlet: 'boatoutlet'},
    {path: 'sensordetails/:idDevice/:field', component: SensordetailsComponent, outlet: 'boatoutlet'},
    {path: 'gpsdetails/:idDevice/:field', component: GpsdetailsComponent, outlet: 'boatoutlet'},
    {path: 'mapdetails/:idDevice', component: MapdetailsComponent, outlet: 'boatoutlet'},
    {path: 'editalarmsettings/:idDevice/:field/:idAlarm', component: EditalarmsettingsComponent, outlet: 'boatoutlet'},
    {path: 'editinhibitsettings/:idDevice/:field/:idAlarm', component: EditinhibitsettingsComponent, outlet: 'boatoutlet'},
    {path: 'editdevicesettings/:idDevice/:field', component: EditdevicesettingsComponent, outlet: 'boatoutlet'},
    {path: 'editusers/:idDevice/:roleOrRequests', component: EditusersComponent, outlet: 'boatoutlet'},

    {path: 'location', component: LocationComponent, outlet: 'locationoutlet'},
    {path: 'mapdetails/:idDevice', component: MapdetailsComponent, outlet: 'locationoutlet'},
    {path: 'webcam/:idDevice', component: WebcamComponent, outlet: 'locationoutlet'},

    {path: 'settings', component: SettingsComponent, outlet: 'settingsoutlet'},
    { path: 'auth', component: AuthComponent, outlet: 'settingsoutlet' },
    { path: 'scan', component: ScanComponent, outlet: 'settingsoutlet' },
    { path: 'signonaboat', component: SignonaboatComponent, outlet: 'settingsoutlet' },
    { path: 'alertsettings', component: AlertsettingsComponent, outlet: 'settingsoutlet' },
    { path: 'logout', component: LogoutComponent, outlet: 'settingsoutlet' },
    { path: 'impressum', component: ImpressumComponent, outlet: 'settingsoutlet' },
    { path: 'purchase', component: PurchaseComponent, outlet: 'settingsoutlet' },
    { path: 'editpersonaldata', component: EditpersonaldataComponent, outlet: 'settingsoutlet' },
    { path: 'ttnmapperview', component: TtnmapperviewComponent, outlet: 'settingsoutlet'},
    { path: 'manuals/boatofficerblue', component: ManualComponent, outlet: 'settingsoutlet'},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
