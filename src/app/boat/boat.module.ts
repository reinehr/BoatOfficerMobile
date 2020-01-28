import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { BoatRoutingModule } from './boat-routing.module';
import { BoatComponent } from './boat.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BoatRoutingModule
    ],
    declarations: [
        BoatComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BoatModule { }
