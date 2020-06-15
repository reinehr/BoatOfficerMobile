import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService, DeviceAlarmDataFormat, SensorDataHistory} from '~/app/shared/data.service';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subscription} from 'rxjs';
// import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {BoatHistory, BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';

// Important - must register MapView plugin in order to use in Angular templates
// registerElement('MapView', () => MapView);
registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);

@Component({
    selector: 'app-boat',
    templateUrl: './boat.component.html',
    moduleId: module.id,
})
export class BoatComponent implements OnInit, AfterViewInit {
    isLoading = false;
    private sensorDataHistorySub: Subscription;
    sensorDataHistory: {
        'device_id': number,
        'device_name': string,
        'device_history': {
            [key: string]: { 'min': number | boolean, 'max': number | boolean, 'milliseconds': number, 'day': number, 'date': string }[]
        },
        'device_latest_data': {
            [key: string]: { 'data': number, 'time': string }
        },
        'device_history_interval'?: {
            [key: string]: { 'min': string, 'max': string }
        }
    }[];

    private devicedataSub: Subscription;
    deviceData: DeviceAlarmDataFormat[];
    private boatStatusSub: Subscription;
    boatStatus: BoatStatus;
    sensorFieldMap = boatStatusMap;
    sensorFieldKeys = Object.keys(boatStatusMap);
    activeAlarmByField: { [idDevice: number]: { [sensorFieldKey: string]: boolean } };
    private boatHistorySub: Subscription;
    boatHistory: BoatHistory;
    historyIntervalData = historyInterval;
    minMax: {[idDevice: number]: {[idInterval: number]: {[field: string]: {min: {time: string, value: number}, max: {time: string, value: number}}}}} = {};
    dataLoaded = false;

    latitude = -23.86;
    longitude = 151.20;
    zoom = 12;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    // mapView: MapView;
    private sensordataSub: Subscription;

    lastCamera: string;
    private sensorHistoryLoaded: boolean;

    constructor(
        private apiService: ApiService,
        // private dataService: DataService,
        // private routerExtensions: RouterExtensions
    ) {
        // Use the constructor to inject services.
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
                    console.log('Device loading');
                } else {
                    console.log('no Device');
                }
            }
        );

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

        // this.dataService.initSensorDataHistory();
        setTimeout(xyz => {
        }, 20);
        // Use the "ngOnInit" handler to initialize data for the view.
        this.sensordataSub = this.apiService.currentSensorLatestData.subscribe(
            latest => {
                if (latest) {
                    // console.log(`sensorDataLatest lat long: ${latest.longitude.value} ${latest.latitude.value}`);
                    this.latitude = latest.latitude.value;
                    this.longitude = latest.longitude.value;

                } else {
                    console.log('no History');
                }
            }
        );

        this.sensorDataHistorySub = this.apiService.currentSensorDataHistoryData.subscribe(
            history => {
                if (history) {
                    this.sensorDataHistory = history;
                    // console.log(`sensorDataHistory: ${JSON.stringify(this.sensorDataHistory, null, 2)}`);

                    // tslint:disable-next-line:forin
                    for (const deviceIndex in history) {
                        const deviceData = history[deviceIndex].device_history;
                        // console.log(`sensorDataHistory: ${JSON.stringify(this.sensorDataHistory[deviceIndex].device_history, null, 2)}`);
                        // tslint:disable-next-line:forin
                        if (!this.sensorDataHistory[deviceIndex].device_history_interval) {
                            this.sensorDataHistory[deviceIndex].device_history_interval = {};
                        }
                        for (const sensorType in deviceData) {
                            if (deviceData.hasOwnProperty(sensorType)) {
                                // console.log(`sensorDataHistory: ${JSON.stringify(sensorType, null, 2)}`);
                                if (!this.sensorDataHistory[deviceIndex].device_history_interval[sensorType]) {
                                    this.sensorDataHistory[deviceIndex].device_history_interval[sensorType] = {
                                        min: '',
                                        max: ''
                                    };
                                }
                                let minDate = new Date(Date.now());
                                let maxDate = new Date(Date.now());
                                let minDateStr = '';
                                let maxDateStr = `${maxDate.getDate()}/${maxDate.getMonth() + 1}/${maxDate.getFullYear()}`;
                                for (const day of deviceData[sensorType]) {
                                    const date = new Date(day.date);
                                    if (date < minDate) {
                                        minDate = date;
                                    }
                                }
                                minDateStr = `${minDate.getDate()}/${minDate.getMonth() + 1}/${minDate.getFullYear()}`;
                                this.sensorDataHistory[deviceIndex].device_history_interval[sensorType].min = minDateStr;
                                this.sensorDataHistory[deviceIndex].device_history_interval[sensorType].max = maxDateStr;
                            }
                        }
                        console.log(`sensorDataHistoryInterval: boat subscription triggered`);
                    }
                } else {
                    console.log('no History');
                }
            }
        );

        this.isLoading = true;
        this.apiService.getDeviceData().subscribe(resp1 => {
            console.log('DeviceData loading ...');
            this.apiService.getBoatStatus().subscribe(resp2 => {
                console.log('BoatStatus loading ...');
                this.isLoading = true;
                this.apiService.getSensorHistory('', 0, 31).subscribe(resp3 => {
                    console.log('SensorData loading ...');
                    this.isLoading = false;
                }, error => {
                    console.log(error);
                    this.isLoading = false;
                });
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
            this.isLoading = false;
        }, error => {
            console.log('DeviceData not loading');
            this.isLoading = false;
        });
    }

    ngAfterViewInit(): void {
        this.apiService.getBoatHistory(31).subscribe(resp3 => {
            console.log('BoatHistory loading ...');
            this.isLoading = false;
            this.sensorHistoryLoaded = true;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });

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
            console.log('DeviceData not loading');
            this.isLoading = false;
        });
    }


    // Map events
/*    onMapReady(event, idDevice: number) {
        console.log('Map Ready');

        this.mapView = event.object;


        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.mapView.latitude, this.mapView.longitude);
        marker.title = this.deviceData[idDevice].name + (this.deviceData[idDevice].berth ? ' (Berth ' + this.deviceData[idDevice].berth + ')' : '');
        marker.snippet = 'BoatOfficer';
        marker.userData = {index: 1};
        this.mapView.removeAllMarkers();
        this.mapView.addMarker(marker);
        this.mapView.mapAnimationsEnabled;
    }

    onCoordinateTapped(args) {
        // console.log('Coordinate Tapped, Lat: ' + args.position.latitude + ', Lon: ' + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        // console.log('Marker Event: \'' + args.eventName
        //     + '\' triggered on: ' + args.marker.title
        //     + ', Lat: ' + args.marker.position.latitude + ', Lon: ' + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        // console.log('Camera changed: ' + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);

        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        marker.title = 'Sabine II';
        marker.snippet = 'BoatOfficer';
        marker.userData = {index: 1};
        this.mapView.removeAllMarkers();
        this.mapView.addMarker(marker);
    }*/

    onCameraMove(args) {
        // console.log('Camera moving: ' + JSON.stringify(args.camera));
    }


    onScroll(args: ScrollEventData) {
        const scrollView = args.object as ScrollView;

        console.log('scrollX: ' + args.scrollX);
        console.log('scrollY: ' + args.scrollY);
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.apiService.getLatestSensorData().subscribe(response => {
            console.log('LatestSensorData loading ...');
        }, error => {
            console.log(error);
            pullRefresh.refreshing = false;
        });
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
            console.log('DeviceData loading ......');
            this.isLoading = false;
            pullRefresh.refreshing = false;
        }, error => {
            console.log('DeviceData not loading');
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

    click_gear() {

    }
}
