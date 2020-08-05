import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {AuthComponent} from './auth.component';
import {ScanComponent} from './scan.component';
import {LogoutComponent} from './logout.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {AlertsettingsComponent} from '~/app/settings/alertsettings.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SettingsComponent, AuthComponent, ScanComponent, LogoutComponent, AlertsettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
