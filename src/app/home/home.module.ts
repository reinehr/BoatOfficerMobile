import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {TimeagoModule} from 'ngx-timeago';
import {CommonModule} from '@angular/common';
import {NativeScriptLocalizeModule} from 'nativescript-localize/angular';
import {MapdetailsComponent} from "~/app/home/mapdetails.component";
import {WebcamComponent} from "~/app/home/webcam.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        CommonModule,
        TimeagoModule,
        NativeScriptLocalizeModule
    ],
    declarations: [
        HomeComponent,
        ItemDetailComponent,
        MapdetailsComponent,
        WebcamComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
