import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {BoatHistory, BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';
import {ApiService} from '~/app/shared/api.service';
import {DataService, DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {AlarmSettings, alarmSettingsMap} from "~/app/shared/interface/alarm";
import {timeout} from "rxjs/internal/operators";

@Component({
    selector: 'app-gpsdetails',
    templateUrl: './gpsdetails.component.html'
})
export class GpsdetailsComponent implements OnInit {

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
    selectedIntervalId = 2;
    majorStepY = 5;
    minorStepY = 1;
    maxY = 20;
    minY = 0;
    height = 0;
    initialized = true;


    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    ngOnInit(): void {}

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
