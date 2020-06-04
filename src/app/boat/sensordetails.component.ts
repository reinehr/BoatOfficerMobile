import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ActivatedRoute} from '@angular/router';
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

    public field = '---';
    public idDevice = 0;
    private boatStatusSub: Subscription;
    boatStatus: BoatStatus;
    sensorFieldMap = boatStatusMap;
    sensorFieldKeys = Object.keys(boatStatusMap);
    private devicedataSub: Subscription;
    deviceData: DeviceAlarmDataFormat[];
    activeAlarmByField: {[idDevice: number]: {[sensorFieldKey: string]: boolean}};
    private boatHistorySub: Subscription;
    boatHistory: BoatHistory;
    private alarmSettingsSub: Subscription;
    alarmSettings: AlarmSettings;
    alarmSettingsMap = alarmSettingsMap;
    historyIntervalData = historyInterval;
    selectedIntervalId = 3;
    minMax: {[idDevice: number]: {[idInterval: number]: {[field: string]: {min: {time: string, value: number}, max: {time: string, value: number}}}}} = {};
    private isLoading = false;
    dataLoaded = false;

    constructor(
        private apiService: ApiService,
        // private dataService: DataService,
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
                    // console.log(this.activeAlarmByField);
                    this.apiService.getBoatHistory(31).subscribe(resp3 => {
                        console.log('BoatHistory loading ...');
                        this.isLoading = false;
                        this.dataLoaded = true;
                    }, error => {
                        console.log(error);
                        this.isLoading = false;
                    });
                } else {
                    console.log('no Device');
                }
            }
        );
        // this.alarmSettingsSub = this.apiService.alarmSettings.subscribe(
        //     asdata => {
        //         if (asdata) {
        //             this.alarmSettings = asdata;
        //         } else {
        //             console.log('no alarmSettings');
        //         }
        //     }
        // );
        this.boatHistorySub = this.apiService.boatHistory.subscribe(
            bhdata => {
                let millisecondsNow = new Date().getTime();
                if (bhdata) {
                    this.boatHistory = bhdata;
                    for (const idDevice of Object.keys(this.boatHistory)) {
                        if (!this.minMax[idDevice]) {
                            this.minMax[idDevice] = {};
                            for (const idInterval in this.historyIntervalData) {
                                this.minMax[idDevice][idInterval] = {};
                                for (const field of this.sensorFieldKeys) {
                                    if (this.sensorFieldMap[field].datatype === 'float') {
                                        this.minMax[idDevice][idInterval][field] = {};
                                        // this.minMax[idDevice][interval.id][field] = {min: {}, max: {}};
                                    }
                                }
                            }
                        }
                        this.boatHistory[idDevice].sensor_data_length = this.boatHistory[idDevice].sensor_data.length;
                        this.boatHistory[idDevice].position_data_length = this.boatHistory[idDevice].position_data.length;
                        millisecondsNow = this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].milliseconds;
                        for (const idEvent in this.boatHistory[idDevice].sensor_data) {
                            const eventTime = new Date(this.boatHistory[idDevice].sensor_data[idEvent].time);
                            eventTime.setMinutes(0);
                            eventTime.setHours(0);
                            eventTime.setSeconds(0);
                            eventTime.setMilliseconds(0);
                            this.boatHistory[idDevice].sensor_data[idEvent].timestring = `${('0' + eventTime.getDate()).slice(-2)}/${('0' + (eventTime.getMonth() + 1)).slice(-2)}/${eventTime.getFullYear()} ${('0' + eventTime.getHours()).slice(-2)}:${('0' + eventTime.getMinutes()).slice(-2)}:00`;
                            const daysPast = (millisecondsNow - eventTime.getTime()) / (1000 * 60 * 60 * 24);
                            for (const idInterval in this.historyIntervalData) {
                                if (this.historyIntervalData[idInterval].days < daysPast) {
                                    this.historyIntervalData[idInterval].sensorData.sliceStart = +idEvent;
                                } else {
                                    for (const field of this.sensorFieldKeys) {
                                        if (!this.minMax[idDevice]) {
                                            this.minMax[idDevice] = {};
                                        }
                                        if (!this.minMax[idDevice][idInterval]) {
                                            this.minMax[idDevice][idInterval] = {};
                                        }
                                        if (!this.minMax[idDevice][idInterval][field]) {
                                            this.minMax[idDevice][idInterval][field] = {};
                                        }
                                        if (!this.minMax[idDevice][idInterval][field].min) {
                                            this.minMax[idDevice][idInterval][field] = {
                                                min: {
                                                    time: this.boatHistory[idDevice].sensor_data[idEvent].time,
                                                    value: this.boatHistory[idDevice].sensor_data[idEvent][field]
                                                },
                                                max: {
                                                    time: this.boatHistory[idDevice].sensor_data[idEvent].time,
                                                    value: this.boatHistory[idDevice].sensor_data[idEvent][field]
                                                }
                                            };
                                        }
                                        if (this.boatHistory[idDevice].sensor_data[idEvent][field] < this.minMax[idDevice][idInterval][field].min.value) {
                                            this.minMax[idDevice][idInterval][field].min = {
                                                time: this.boatHistory[idDevice].sensor_data[idEvent].time,
                                                value: this.boatHistory[idDevice].sensor_data[idEvent][field]
                                            };
                                        }
                                        if (this.boatHistory[idDevice].sensor_data[idEvent][field] > this.minMax[idDevice][idInterval][field].max.value) {
                                            this.minMax[idDevice][idInterval][field].max = {
                                                time: this.boatHistory[idDevice].sensor_data[idEvent].time,
                                                value: this.boatHistory[idDevice].sensor_data[idEvent][field]
                                            };
                                        }
                                    }
                                }
                                this.historyIntervalData[idInterval].sensorData.sliceStop = +idEvent;
                            }
                        }
                        const time = new Date(this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].time);
                        this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].timestring = `${('0' + (time.getDate() + 1)).slice(-2)}/${('0' + (time.getMonth() + 1)).slice(-2)}/${time.getFullYear()} ${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}:00`;
                    }
                    console.log('BoatHistory complete');
                } else {
                    console.log('no boatHistory');
                }
            }
        );

        this.isLoading = true;
        this.apiService.getDeviceData().subscribe(resp1 => {
            console.log('DeviceData loading ........');
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.apiService.getDeviceData().subscribe(response => {
            console.log('DeviceData loading ........');
            this.isLoading = false;
            pullRefresh.refreshing = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            pullRefresh.refreshing = false;
        });
        // this.apiService.getDeviceAlarmSettings().subscribe(response => {
        //     console.log('AlarmSettings loading ...');
        //     this.isLoading = false;
        // }, error => {
        //     console.log(error);
        //     this.isLoading = false;
        // });
        // this.apiService.getBoatHistory(31).subscribe(response => {
        //     console.log('BoatHistory loading ...');
        //     this.isLoading = false;
        // }, error => {
        //     console.log(error);
        //     this.isLoading = false;
        // });
    }

    setSelectedInterval(id: number) {
        this.selectedIntervalId = id;
    }
}
