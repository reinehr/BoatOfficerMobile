import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SettingsComponent } from './settings.component';
import {AuthComponent} from './auth.component';
import {ScanComponent} from './scan.component';
import {LogoutComponent} from './logout.component';
import {AlertsettingsComponent} from '~/app/settings/alertsettings.component';

const routes: Routes = [
    { path: 'default', component: SettingsComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'scan', component: ScanComponent },
    { path: 'alertsettings', component: AlertsettingsComponent },
    { path: 'logout', component: LogoutComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
