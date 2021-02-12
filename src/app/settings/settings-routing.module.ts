import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SettingsComponent } from './settings.component';
import {AuthComponent} from './auth.component';
import {ScanComponent} from './scan.component';
import {LogoutComponent} from './logout.component';
import {AlertsettingsComponent} from '~/app/settings/alertsettings.component';
import {ImpressumComponent} from "~/app/settings/impressum.component";
import {PurchaseComponent} from "~/app/settings/purchase.component";
import {SignonaboatComponent} from "~/app/settings/signonaboat.component";
import {EditpersonaldataComponent} from "~/app/settings/editpersonaldata.component";
import {TtnmapperviewComponent} from "~/app/settings/ttnmapperview.component";

const routes: Routes = [
    { path: 'default', component: SettingsComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'scan', component: ScanComponent },
    { path: 'signonaboat', component: SignonaboatComponent },
    { path: 'alertsettings', component: AlertsettingsComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'editpersonaldata', component: EditpersonaldataComponent },
    { path: 'ttnmapperview', component: TtnmapperviewComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
