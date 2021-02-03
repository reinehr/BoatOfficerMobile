import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {BoatHistory, BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';
import {ApiService} from '~/app/shared/api.service';
import {DataService, DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {AlarmSettings, alarmSettingsMap} from "~/app/shared/interface/alarm";
import {timeout} from "rxjs/internal/operators";

@Component({
    selector: 'app-sensordetails',
    templateUrl: './sensordetails.component.html'
})
export class SensordetailsComponent implements OnInit {

    constructor(
        private apiService: ApiService,
        // private dataService: DataService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private dataService: DataService
    ) {
        this.route.params.subscribe(params => {
            this.field = params.field;
            this.idDevice = params.idDevice;
        });
    }

    public field = '---';
    public idDevice = 0;
    public alarmLineHigh = [];
    public alarmLineLow = [];
    selectedIntervalId = 2;
    isPro = false;
    majorStepY = 5;
    minorStepY = 1;
    maxY = 20;
    minY = 0;
    height = 0;
    initialized = true;

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    ngOnInit(): void {
        console.log("Called alarm field: "+this.field);
        if (alarmSettingsMap[this.field])
        {
            this.alarmLineHigh.push({'date':this.dataService.historyIntervalData[5].dateInterval.start, 'alarmValue': this.dataService.alarmSettings[this.dataService.deviceData[this.idDevice].id][alarmSettingsMap[this.field][0].key].value_device});
            this.alarmLineHigh.push({'date':this.dataService.historyIntervalData[0].dateInterval.stop, 'alarmValue': this.dataService.alarmSettings[this.dataService.deviceData[this.idDevice].id][alarmSettingsMap[this.field][0].key].value_device});
            this.alarmLineLow.push({'date':this.dataService.historyIntervalData[5].dateInterval.start, 'alarmValue': this.dataService.alarmSettings[this.dataService.deviceData[this.idDevice].id][alarmSettingsMap[this.field][1].key].value_device});
            this.alarmLineLow.push({'date':this.dataService.historyIntervalData[0].dateInterval.stop, 'alarmValue': this.dataService.alarmSettings[this.dataService.deviceData[this.idDevice].id][alarmSettingsMap[this.field][1].key].value_device});
        }

        if (this.field == 'IntBattVolt')
        {
            this.alarmLineHigh.push({'date':this.dataService.historyIntervalData[5].dateInterval.start, 'alarmValue': 4.2});
            this.alarmLineHigh.push({'date':this.dataService.historyIntervalData[0].dateInterval.stop, 'alarmValue': 4.2});
            this.alarmLineLow.push({'date':this.dataService.historyIntervalData[5].dateInterval.start, 'alarmValue': 3.1});
            this.alarmLineLow.push({'date':this.dataService.historyIntervalData[0].dateInterval.stop, 'alarmValue': 3.1});
        }
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.dataService.refreshSensorDataHistory();
        pullRefresh.refreshing = false;
    }

    setSelectedInterval(id: number) {
        this.selectedIntervalId = id;
        // this.initialized = !this.initialized;
        // this.initialized = !this.initialized;
    }
}
