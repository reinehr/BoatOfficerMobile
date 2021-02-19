import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {NativeScriptUIChartModule} from 'nativescript-ui-chart/angular';

import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {BoatRoutingModule} from './boat-routing.module';
import {BoatComponent} from './boat.component';
import {SensordetailsComponent} from './sensordetails.component';
import {GpsdetailsComponent} from './gpsdetails.component';
import {BoatsettingsComponent} from './boatsettings.component';
import {CommonModule} from '@angular/common';
import {TimeagoModule} from 'ngx-timeago';
import {UploadpictureComponent} from '~/app/boat/uploadpicture.component';
import {EditalarmsettingsComponent} from '~/app/boat/editalarmsettings.component';
import {EditdevicesettingsComponent} from '~/app/boat/editdevicesettings.component';
import {EditusersComponent} from '~/app/boat/editusers.component';
import {NativeScriptLocalizeModule} from 'nativescript-localize/localize.module';
import {MapdetailsComponent} from "~/app/boat/mapdetails.component";
import {BoatHeaderComponent} from "~/app/shared/ui/boat-header/boat-header.component";
import {BoatsettingssingleComponent} from "~/app/boat/boatsettingssingle.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BoatRoutingModule,
        NativeScriptUIChartModule,
        CommonModule,
        TimeagoModule,
        NativeScriptFormsModule,
        NativeScriptLocalizeModule
    ],
    declarations: [
        BoatComponent,
        SensordetailsComponent,
        GpsdetailsComponent,
        MapdetailsComponent,
        BoatsettingsComponent,
        BoatsettingssingleComponent,
        UploadpictureComponent,
        EditalarmsettingsComponent,
        EditdevicesettingsComponent,
        EditusersComponent,
        BoatHeaderComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BoatModule { }
