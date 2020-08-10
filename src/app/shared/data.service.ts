import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {ApiService} from '~/app/shared/api.service';
import {boatGpsMap, BoatHistory, BoatStatus, boatStatusMap, historyInterval} from "~/app/shared/interface/sensordata";
import {AlarmSettings} from "~/app/shared/interface/alarm";

export interface DataItem {
    id: number;
    name: string;
    description: string;
}

export interface DeviceAlarmDataFormat {
    'id': number;
    // 'boat_image': string;
    'boat_image_large': string;
    'boat_image_medium': string;
    'boat_image_small': string;
    // 'boat_image_tag': string;
    'name': string;
    'harbour_contact': string;
    'berth': string;
    'role': string;
    'num_sailor': number;
    'num_guard': number;
    'num_officer': number;
    'num_total': number;
    'alarm': {
        'id': number;
        'type': string,
        'time': string,
        'column_sensor_data': string,
        'value': string,
        'marked_as_ok_username': string,
        'responsible_username': string,
        'clear_by_device_time': string,
        'marked_as_ok_time': string,
        'status': string,
        'i_am_responsible': boolean,
        'loading': boolean
    }[];
}

export interface SensorDataHistory {
    'device_id': number;
    'device_name': string;
    'device_history': {
        [key: string]: { 'min': number | boolean, 'max': number | boolean, 'milliseconds': number, 'day': number, 'date': string }[]
    };
    'device_latest_data': {
        [key: string]: { 'data': number, 'time': string }
    };
    'device_history_interval'?: {
        [key: string]: { 'min': string, 'max': string }
    };
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    sensorFieldMap = boatStatusMap;
    sensorFieldKeys = Object.keys(boatStatusMap);
    gpsFieldMap = boatGpsMap;
    gpsFieldKeys = Object.keys(boatGpsMap);
    private boatStatusSub: Subscription;
    boatStatus: BoatStatus;
    private devicedataSub: Subscription;
    public deviceData: DeviceAlarmDataFormat[];
    activeAlarmByField: { [idDevice: number]: { [sensorFieldKey: string]: boolean } };
    private alarmSettingsSub: Subscription;
    alarmSettings: AlarmSettings;
    private boatHistorySub: Subscription;
    public boatHistory: BoatHistory;
    historyIntervalData = historyInterval;
    minMax: { [idDevice: number]: { [idInterval: number]: { [field: string]: { min: { time: string, value: number }, max: { time: string, value: number } } } } } = {};
    minMaxGps: { [idDevice: number]: { [idInterval: number]: { [field: string]: { min: { time: string, value: number }, max: { time: string, value: number } } } } } = {};
    private isLoading = false;
    dataLoaded = false;

    constructor(
        private apiService: ApiService
    ) {
        this.initBoatStatus();
        this.initSensorDataHistory();
        this.initAlarmSettings();
        this.refreshBoatStatus();
    }

    initBoatStatus(): void {
        this.boatStatusSub = this.apiService.boatStatus.subscribe(
            bsdata => {
                if (bsdata) {
                    try {
                        this.boatStatus = bsdata;
                        console.log('boatStatus loading');
                        for (const idDevice of Object.keys(this.activeAlarmByField)) {
                            if (this.boatStatus && this.boatStatus[idDevice]) {
                                this.boatStatus[idDevice].alarm_active = {};
                                for (const mapKey of this.sensorFieldKeys) {
                                    // if (mapKey in this.boatStatus[idDevice].alarm_active) {
                                    this.boatStatus[idDevice].alarm_active[mapKey] = false;
                                    for (const alarmType of this.sensorFieldMap[mapKey].alarm) {
                                        if (this.activeAlarmByField[idDevice][alarmType]) {
                                            this.boatStatus[idDevice].alarm_active[mapKey] = true;
                                        }
                                    }
                                    // }
                                }
                            }
                        }
                    } catch (e) {
                        console.log('Error: no boatStatus');
                    }
                } else {
                    console.log('no boatStatus');
                }
            }
        );
    }

    initAlarmSettings(): void {
        this.alarmSettingsSub = this.apiService.alarmSettings.subscribe(
            asdata => {
                if (asdata) {
                    this.alarmSettings = asdata;
                    this.dataLoaded = true;
                } else {
                    console.log('no alarmSettings');
                }
            }
        );
    }

    initSensorDataHistory(): void {
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
                    this.apiService.getBoatHistory(92).subscribe(resp3 => {
                        console.log('initSensorDataHistory - getBoatHistory');
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
                        if (!this.minMaxGps[idDevice]) {
                            this.minMaxGps[idDevice] = {};
                            for (const idInterval in this.historyIntervalData) {
                                this.minMaxGps[idDevice][idInterval] = {};
                                for (const field of this.gpsFieldKeys) {
                                    if (this.gpsFieldMap[field].datatype === 'float') {
                                        this.minMaxGps[idDevice][idInterval][field] = {};
                                        // this.minMaxGps[idDevice][interval.id][field] = {min: {}, max: {}};
                                    }
                                }
                            }
                        }
                        this.boatHistory[idDevice].sensor_data_length = this.boatHistory[idDevice].sensor_data.length;
                        this.boatHistory[idDevice].position_data_length = this.boatHistory[idDevice].position_data.length;
                        millisecondsNow = this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].milliseconds;
                        for (const idEvent in this.boatHistory[idDevice].sensor_data) {
                            const eventTime = new Date(this.boatHistory[idDevice].sensor_data[idEvent].time);
                            this.boatHistory[idDevice].sensor_data[idEvent].date = eventTime;
                            // eventTime.setMinutes(0);
                            // eventTime.setHours(0);
                            // eventTime.setSeconds(0);
                            // eventTime.setMilliseconds(0);
                            this.boatHistory[idDevice].sensor_data[idEvent].timestring = `${('0' + eventTime.getDate()).slice(-2)}/${('0' + (eventTime.getMonth() + 1)).slice(-2)}/${eventTime.getFullYear()} ${('0' + eventTime.getHours()).slice(-2)}:${('0' + eventTime.getMinutes()).slice(-2)}:00`;
                            const daysPast = (millisecondsNow - eventTime.getTime()) / (1000.0 * 60.0 * 60.0 * 24.0);
                            for (const idInterval in this.historyIntervalData) {
                                if (this.historyIntervalData[idInterval].dateInterval.start.getTime() > (eventTime.getTime())) {
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
                        for (const idEvent in this.boatHistory[idDevice].position_data) {
                            const eventTime = new Date(this.boatHistory[idDevice].position_data[idEvent].time);
                            this.boatHistory[idDevice].position_data[idEvent].date = eventTime;
                            // eventTime.setMinutes(0);
                            // eventTime.setHours(0);
                            // eventTime.setSeconds(0);
                            // eventTime.setMilliseconds(0);
                            this.boatHistory[idDevice].position_data[idEvent].timestring = `${('0' + eventTime.getDate()).slice(-2)}/${('0' + (eventTime.getMonth() + 1)).slice(-2)}/${eventTime.getFullYear()} ${('0' + eventTime.getHours()).slice(-2)}:${('0' + eventTime.getMinutes()).slice(-2)}:00`;
                            const daysPast = (millisecondsNow - eventTime.getTime()) / (1000.0 * 60.0 * 60.0 * 24.0);
                            for (const idInterval in this.historyIntervalData) {
                                if (this.historyIntervalData[idInterval].dateInterval.start.getTime() > (eventTime.getTime())) {
                                    this.historyIntervalData[idInterval].positionData.sliceStart = +idEvent;
                                } else {
                                    for (const field of this.gpsFieldKeys) {
                                        if (!this.minMaxGps[idDevice]) {
                                            this.minMaxGps[idDevice] = {};
                                        }
                                        if (!this.minMaxGps[idDevice][idInterval]) {
                                            this.minMaxGps[idDevice][idInterval] = {};
                                        }
                                        if (!this.minMaxGps[idDevice][idInterval][field]) {
                                            this.minMaxGps[idDevice][idInterval][field] = {};
                                        }
                                        if (!this.minMaxGps[idDevice][idInterval][field].min) {
                                            this.minMaxGps[idDevice][idInterval][field] = {
                                                min: {
                                                    time: this.boatHistory[idDevice].position_data[idEvent].time,
                                                    value: this.boatHistory[idDevice].position_data[idEvent][field]
                                                },
                                                max: {
                                                    time: this.boatHistory[idDevice].position_data[idEvent].time,
                                                    value: this.boatHistory[idDevice].position_data[idEvent][field]
                                                }
                                            };
                                        }
                                        if (this.boatHistory[idDevice].position_data[idEvent][field] < this.minMaxGps[idDevice][idInterval][field].min.value) {
                                            this.minMaxGps[idDevice][idInterval][field].min = {
                                                time: this.boatHistory[idDevice].position_data[idEvent].time,
                                                value: this.boatHistory[idDevice].position_data[idEvent][field]
                                            };
                                        }
                                        if (this.boatHistory[idDevice].position_data[idEvent][field] > this.minMaxGps[idDevice][idInterval][field].max.value) {
                                            this.minMaxGps[idDevice][idInterval][field].max = {
                                                time: this.boatHistory[idDevice].position_data[idEvent].time,
                                                value: this.boatHistory[idDevice].position_data[idEvent][field]
                                            };
                                        }
                                    }
                                }
                                this.historyIntervalData[idInterval].positionData.sliceStop = +idEvent;
                            }
                        }
                        const time = new Date(this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].time);
                        // this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].timestring = `${('0' + (time.getDate() + 1)).slice(-2)}/${('0' + (time.getMonth() + 1)).slice(-2)}/${time.getFullYear()}`;
                        // this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].date = new Date(time.getFullYear(), (time.getMonth() + 1), (time.getDate() + 1), time.getHours(), time.getMinutes(), time.getSeconds())
                    }
                    console.log('BoatHistory complete');
                } else {
                    console.log('no boatHistory');
                }
            }
        );

        // this.refreshSensorDataHistory();
    }

    refreshSensorDataHistory(): void {
        this.isLoading = true;
        this.apiService.getDeviceData().subscribe(resp1 => {
            console.log('refreshSensorDataHistory - getDeviceData ' + resp1);
        }, error => {
            console.log('DeviceData not loading');
            this.isLoading = false;
        });
    }

    refreshBoatStatus(): void {
        this.isLoading = true;
        this.apiService.getDeviceData().subscribe(resp1 => {
            console.log('refreshBoatStatus - getDeviceData');
            this.apiService.getBoatStatus().subscribe(resp2 => {
                console.log('refreshBoatStatus - getBoatStatus');
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
            this.apiService.getDeviceAlarmSettings().subscribe(response => {
                console.log('refreshBoatStatus - getDeviceAlarmSettings');
            }, error => {
                console.log('AlarmSettings not loading');
            });
            this.isLoading = false;
        }, error => {
            console.log('DeviceData not loading');
            this.isLoading = false;
        });
    }

}
