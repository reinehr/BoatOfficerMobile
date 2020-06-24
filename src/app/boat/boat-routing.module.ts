import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from 'nativescript-angular/router';

import {BoatComponent} from './boat.component';
import {BoatsettingsComponent} from '~/app/boat/boatsettings.component';
import {HomeComponent} from '~/app/home/home.component';
import {SensordetailsComponent} from '~/app/boat/sensordetails.component';
import {UploadpictureComponent} from '~/app/boat/uploadpicture.component';
import {EditalarmsettingsComponent} from '~/app/boat/editalarmsettings.component';

const routes: Routes = [
    {path: 'default', component: BoatComponent},
    {path: 'settings', component: BoatsettingsComponent},
    {path: 'uploadpicture/:idDevice', component: UploadpictureComponent},
    {path: 'sensordetails/:idDevice/:field', component: SensordetailsComponent},
    {path: 'editalarmsettings/:idDevice/:field/:idAlarm', component: EditalarmsettingsComponent},
    // {path: 'home', component: HomeComponent, outlet: 'homeTab'}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BoatRoutingModule {

}
