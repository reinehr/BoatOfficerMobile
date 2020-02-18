import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NSEmptyOutletComponent } from 'nativescript-angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/(homeTab:home/default//alarmTab:alarm/default//boatTab:boat/default//settingsTab:settings/default)',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
        outlet: 'homeTab'
    },
    {
        path: 'alarm',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/alarm/alarm.module').then((m) => m.AlarmModule),
        outlet: 'alarmTab'
    },
    {
        path: 'boat',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/boat/boat.module').then((m) => m.BoatModule),
        outlet: 'boatTab'
    },
    {
        path: 'settings',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/settings/settings.module').then((m) => m.SettingsModule),
        outlet: 'settingsTab'
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
