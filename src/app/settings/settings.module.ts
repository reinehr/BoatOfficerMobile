import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {AuthComponent} from '~/app/auth/auth.component';
import {ScanComponent} from '~/app/auth/scan.component';
import {LogoutComponent} from '~/app/auth/logout.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {AlertsettingsComponent} from '~/app/settings/alertsettings.component';
import {UploadpictureComponent} from '~/app/settings/uploadpicture.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SettingsComponent, AuthComponent, ScanComponent, LogoutComponent, AlertsettingsComponent, UploadpictureComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
