import { Component, OnInit } from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {Subscription} from 'rxjs';
import {DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {ApiService} from '~/app/shared/api.service';
import {AlarmSettings, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {boatStatusMap} from "~/app/shared/interface/sensordata";

@Component({
    selector: 'app-boatsettings',
    templateUrl: './boatsettings.component.html'
})
export class BoatsettingsComponent implements OnInit {

    private devicedataSub: Subscription;
    deviceData: DeviceAlarmDataFormat[];
    private alarmSettingsSub: Subscription;
    alarmSettings: AlarmSettings;
    alarmSettingsMap = alarmSettingsMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);

    constructor(
        private apiService: ApiService,
        private routerExtensions: RouterExtensions
    ) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        this.devicedataSub = this.apiService.deviceData.subscribe(
            ddata => {
                if (ddata) {
                    this.deviceData = ddata;
                } else {
                    console.log('no Device');
                }
            }
        );

        this.alarmSettingsSub = this.apiService.alarmSettings.subscribe(
            asdata => {
                if (asdata) {
                    this.alarmSettings = asdata;
                } else {
                    console.log('no alarmSettings');
                }
            }
        );
        this.apiService.getDeviceData().subscribe(response => {
            console.log('DeviceData loading ...');
        }, error => {
            console.log(error);
        });

        this.apiService.getDeviceAlarmSettings().subscribe(response => {
            console.log('AlarmSettings loading ...');
        }, error => {
            console.log(error);
        });
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
