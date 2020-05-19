import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {BoatStatus, boatStatusMap} from "~/app/shared/interface/sensordata";
import {ApiService} from "~/app/shared/api.service";
import {DataService, DeviceAlarmDataFormat} from "~/app/shared/data.service";

@Component({
    selector: 'app-inttemperature',
    templateUrl: './inttemperature.component.html'
})
export class InttemperatureComponent implements OnInit {

    public field = '---';
    public idDevice = 0;
    private boatStatusSub: Subscription;
    boatStatus: BoatStatus;
    sensorFieldMap = boatStatusMap;
    sensorFieldKeys = Object.keys(boatStatusMap);
    private devicedataSub: Subscription;
    deviceData: DeviceAlarmDataFormat[];
    activeAlarmByField: {[idDevice: number]: {[sensorFieldKey: string]: boolean}};
    private isLoading = false;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.field = params.field;
            this.idDevice = params.idDevice;
        });
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    ngOnInit(): void {
        this.devicedataSub = this.apiService.deviceData.subscribe(
            ddata => {
                if (ddata) {
                    this.deviceData = ddata;
                    this.activeAlarmByField = {};
                    for (const device of ddata) {
                        this.activeAlarmByField[device.id] = {};
                        for (const mapKey of this.sensorFieldKeys) {
                            for (const alarmType of this.sensorFieldMap[mapKey].alarm) {
                                this.activeAlarmByField[device.id][alarmType] = false;
                            }
                        }
                        for (const alarm of device.alarm) {
                            if (alarm.status === 'open' || alarm.status === 'open_someone_responsible') {
                                this.activeAlarmByField[device.id][alarm.type] = true;
                            }
                        }
                    }
                    console.log(this.activeAlarmByField);
                } else {
                    console.log('no Device');
                }
            }
        );
        this.boatStatusSub = this.apiService.boatStatus.subscribe(
            bsdata => {
                if (bsdata) {
                    this.boatStatus = bsdata;
                    console.log('boatStatus id' + 0 + ' num ' + this.sensorFieldKeys.length);
                } else {
                    console.log('no boatStatus');
                }
            }
        );
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.apiService.getSensorHistory('', 0, 31).subscribe(response => {
            console.log('SensorData loading ...');
            pullRefresh.refreshing = false;
            this.isLoading = false;
        }, error => {
            console.log(error);
            pullRefresh.refreshing = false;
            this.isLoading = false;
        });
        this.apiService.getDeviceData().subscribe(response => {
            console.log('DeviceData loading ...');
            this.isLoading = false;
            pullRefresh.refreshing = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            pullRefresh.refreshing = false;
        });

        this.apiService.getBoatStatus().subscribe(response => {
            console.log('BoatStatus loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }
}
