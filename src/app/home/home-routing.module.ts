import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { HomeComponent } from './home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MapdetailsComponent } from '~/app/home/mapdetails.component';
import { WebcamComponent } from '~/app/home/webcam.component';

const routes: Routes = [
    { path: 'default', component: HomeComponent },
    { path: 'item/:id', component: ItemDetailComponent },
    { path: 'mapdetails/:idDevice', component: MapdetailsComponent},
    { path: 'webcam/:idDevice', component: WebcamComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
