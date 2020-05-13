import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        CommonModule
    ],
    declarations: [
        HomeComponent,
        ItemDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
