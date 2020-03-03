import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SettingsComponent } from './settings.component';
import {AuthComponent} from '~/app/settings/auth.component';

const routes: Routes = [
    { path: 'default', component: SettingsComponent },
    { path: 'auth', component: AuthComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
