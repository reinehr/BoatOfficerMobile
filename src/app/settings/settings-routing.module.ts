import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SettingsComponent } from './settings.component';
import {AuthComponent} from '~/app/auth/auth.component';
import {ScanComponent} from '~/app/auth/scan.component';

const routes: Routes = [
    { path: 'default', component: SettingsComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'scan', component: ScanComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
