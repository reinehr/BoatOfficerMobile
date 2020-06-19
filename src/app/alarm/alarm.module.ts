import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {NativeScriptUIChartModule} from 'nativescript-ui-chart/angular';

import {AlarmRoutingModule} from './alarm-routing.module';
import {AlarmComponent} from './alarm.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AlarmRoutingModule,
        NativeScriptUIChartModule,
        CommonModule
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
