import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {NativeScriptUIChartModule} from 'nativescript-ui-chart/angular';

import {BoatRoutingModule} from './boat-routing.module';
import {BoatComponent} from './boat.component';
import {SensordetailsComponent} from './sensordetails.component';
import {GpsdetailsComponent} from './gpsdetails.component';
import {BoatsettingsComponent} from './boatsettings.component';
import {CommonModule} from '@angular/common';
import {TimeagoModule} from 'ngx-timeago';
import {UploadpictureComponent} from '~/app/boat/uploadpicture.component';
import {EditalarmsettingsComponent} from '~/app/boat/editalarmsettings.component';

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
        SensordetailsComponent,
        GpsdetailsComponent,
        BoatsettingsComponent,
        UploadpictureComponent,
        EditalarmsettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BoatModule { }
