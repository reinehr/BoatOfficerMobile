import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {AuthComponent} from '~/app/settings/auth.component';
import {ActionBarComponent} from '~/app/shared/ui/action-bar/action-bar.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SettingsComponent, AuthComponent, ActionBarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
