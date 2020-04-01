import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {NativeScriptUIChartModule} from 'nativescript-ui-chart/angular';

import {BoatRoutingModule} from './boat-routing.module';
import {BoatComponent} from './boat.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BoatRoutingModule,
        NativeScriptUIChartModule,
        CommonModule
    ],
    declarations: [
        BoatComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BoatModule { }
