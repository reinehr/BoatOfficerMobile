import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {Subscription} from 'rxjs';
import {DataService, DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {ApiService} from '~/app/shared/api.service';
import {AlarmSettings, alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';

@Component({
    selector: 'app-boatsettings',
    templateUrl: './boatsettings.component.html'
})
export class BoatsettingsComponent implements OnInit {

    alarmSettingsMap = alarmSettingsMap;
    alarmSettingsDatatypeMap = alarmSettingsDatatypeMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);
    dialogOpen = false;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        private routerExtensions: RouterExtensions
    ) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
    }

    showDialog() {
        this.dialogOpen = true;
    }

    closeDialog() {
        this.dialogOpen = false;
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
