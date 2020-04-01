import {Component, OnInit, ViewChild} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subscription} from 'rxjs';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';

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
    intBattVolt: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[] = [];
    intBattVoltMin = new Date(Date.now());
    intBattVoltMax = new Date(Date.now());
    intBattVoltMinStr = '';
    intBattVoltMaxStr = `${this.intBattVoltMax.getDate()}/${this.intBattVoltMax.getMonth() + 1}/${this.intBattVoltMax.getFullYear()}`;
    intTemp: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[] = [];
    intTempMin = new Date(Date.now());
    intTempMax = new Date(Date.now());
    intTempMinStr = '';
    intTempMaxStr = `${this.intTempMax.getDate()}/${this.intTempMax.getMonth() + 1}/${this.intTempMax.getFullYear()}`;

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
        private apiService: ApiService
    ) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.sensordataSub = this.apiService.currentSensorLatestData.subscribe(
            latest => {
                if (latest) {
                    console.log(`sensorDataLatest lat long: ${latest.longitude.value} ${latest.latitude.value}`);
                    this.latitude = latest.latitude.value;
                    this.longitude = latest.longitude.value;

                } else {
                    console.log('no History');
                }
            }
        );

        this.intBattVoltSub = this.apiService.currentSensorHistoryData.subscribe(
            history => {
                if (history) {
                    console.log(`sensorDataHostory: ${history}`);

                    this.intBattVolt = history;
                    for (const intSens of history) {
                        const date = new Date(intSens.date);
                        if (date < this.intBattVoltMin) {
                            this.intBattVoltMin = date;
                            this.intBattVoltMinStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                        }
                    }
                } else {
                    console.log('no History');
                }
            }
        );
        this.temperatureSub = this.apiService.currentTemperatureHistoryData.subscribe(
            history => {
                if (history) {
                    console.log(`temperatureHostory: ${history}`);
                    this.intTemp = history;

                    for (const intSens of history) {
                        const date = new Date(intSens.date);
                        if (date < this.intTempMin) {
                            this.intTempMin = date;
                            this.intTempMinStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                        }
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
        this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
        this.isLoading = true;
        this.apiService.getIntTemperatureHistory(1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }


    // Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;
        this.mapView;

        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        marker.title = 'Sabine II';
        marker.snippet = 'BoatOfficer';
        marker.userData = {index: 1};
        this.mapView.removeAllMarkers();
        this.mapView.addMarker(marker);
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
        this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31).subscribe(response => {
            console.log('SensorData loading ...');
        }, error => {
            console.log(error);
            pullRefresh.refreshing = false;
        });
        this.apiService.getIntTemperatureHistory(1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            pullRefresh.refreshing = false;
        }, error => {
            console.log(error);
            pullRefresh.refreshing = false;
        });
    }
}
