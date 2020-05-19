import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from 'nativescript-angular/router';

import {BoatComponent} from './boat.component';
import {BoatsettingsComponent} from '~/app/boat/boatsettings.component';
import {HomeComponent} from "~/app/home/home.component";
import {InttemperatureComponent} from "~/app/boat/inttemperature.component";

const routes: Routes = [
    {path: 'default', component: BoatComponent},
    {path: 'settings', component: BoatsettingsComponent},
    {path: 'inttemperature', component: InttemperatureComponent},
    {path: 'details/:idDevice/:field', component: InttemperatureComponent},
    // {path: 'home', component: HomeComponent, outlet: 'homeTab'}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BoatRoutingModule {

}
