import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {AuthComponent} from './auth.component';
import {ScanComponent} from './scan.component';
import {LogoutComponent} from './logout.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {AlertsettingsComponent} from '~/app/settings/alertsettings.component';
import {NativeScriptLocalizeModule} from "nativescript-localize/localize.module";
import {ImpressumComponent} from "~/app/settings/impressum.component";
import {PurchaseComponent} from "~/app/settings/purchase.component";
import {SignonaboatComponent} from "~/app/settings/signonaboat.component";
import {EditpersonaldataComponent} from "~/app/settings/editpersonaldata.component";
import {TtnmapperviewComponent} from "~/app/settings/ttnmapperview.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptLocalizeModule
    ],
    declarations: [
        SettingsComponent, AuthComponent, ScanComponent, SignonaboatComponent, LogoutComponent, AlertsettingsComponent, ImpressumComponent, PurchaseComponent, EditpersonaldataComponent, TtnmapperviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
