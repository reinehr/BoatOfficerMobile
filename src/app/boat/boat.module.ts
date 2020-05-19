import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {NativeScriptUIChartModule} from 'nativescript-ui-chart/angular';

import {BoatRoutingModule} from './boat-routing.module';
import {BoatComponent} from './boat.component';
import {InttemperatureComponent} from './inttemperature.component';
import {BoatsettingsComponent} from './boatsettings.component';
import {CommonModule} from '@angular/common';
import {TimeagoModule} from 'ngx-timeago';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BoatRoutingModule,
        NativeScriptUIChartModule,
        CommonModule,
        TimeagoModule
    ],
    declarations: [
        BoatComponent,
        InttemperatureComponent,
        BoatsettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BoatModule { }
