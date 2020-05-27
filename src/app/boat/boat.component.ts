import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService, DeviceAlarmDataFormat, SensorDataHistory} from '~/app/shared/data.service';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subscription} from 'rxjs';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';
import { RouterExtensions } from 'nativescript-angular/router';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);
registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);

@Component({
    selector: 'app-boat',
    templateUrl: './boat.component.html',
    moduleId: module.id,
})
export class BoatComponent implements OnInit {
    isLoading = false;
    private intBattVoltSub: Subscription;
    private temperatureSub: Subscription;
    private sensorDataHistorySub: Subscription;
    sensorDataHistory2: SensorDataHistory[];
    sensorDataHistory: {
        'device_id': number,
        'device_name': string,
        'device_history': {
            [key: string]: { 'min': number|boolean, 'max': number|boolean, 'milliseconds': number, 'day': number, 'date': string }[]
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
    activeAlarmByField: {[idDevice: number]: {[sensorFieldKey: string]: boolean}};

    latitude = -23.86;
    longitude = 151.20;
    zoom = 12;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    private sensordataSub: Subscription;

    lastCamera: string;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
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
                    this.boatStatus = bsdata;
                    console.log('boatStatus loading');
                } else {
                    console.log('no boatStatus');
                }
            }
        );

        this.dataService.initSensorDataHistory();
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
        this.apiService.getLatestSensorData().subscribe(response => {
            console.log('LatestSensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
        this.isLoading = true;
        this.apiService.getSensorHistory('', 0, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
        this.isLoading = true;
        this.apiService.getBoatStatus().subscribe(response => {
            console.log('BoatStatus loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }


    // Map events
    onMapReady(event, idDevice: number) {
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
    }

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

    click_gear() {

    }
}
