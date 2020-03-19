import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';

import {AlarmRoutingModule} from './alarm-routing.module';
import {AlarmComponent} from './alarm.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AlarmRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIChartModule
    ],
    declarations: [
        AlarmComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AlarmModule {
}
