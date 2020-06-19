import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService, DeviceAlarmDataFormat, SensorDataHistory} from '~/app/shared/data.service';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subscription} from 'rxjs';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {BoatHistory, BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);
registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);

@Component({
    selector: 'app-boat',
    templateUrl: './boat.component.html',
    moduleId: module.id,
})
export class BoatComponent implements OnInit, AfterViewInit {
    isLoading = false;

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
    private sensorHistoryLoaded: boolean;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        // private routerExtensions: RouterExtensions
    ) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // this.dataService.refreshSensorDataHistory();
        this.dataService.refreshBoatStatus();
    }

    ngAfterViewInit(): void {
    }


    // Map events
    onMapReady(event, idDevice: number) {
        console.log('Map Ready');

        this.mapView = event.object;


        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.mapView.latitude, this.mapView.longitude);
        marker.title = this.dataService.deviceData[idDevice].name + (this.dataService.deviceData[idDevice].berth ? ' (Berth ' + this.dataService.deviceData[idDevice].berth + ')' : '');
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
        // this.lastCamera = JSON.stringify(args.camera);
        //
        // console.log('Setting a marker...');
        //
        // const marker = new Marker();
        // marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        // marker.title = 'Sabine II';
        // marker.snippet = 'BoatOfficer';
        // marker.userData = {index: 1};
        // this.mapView.removeAllMarkers();
        // this.mapView.addMarker(marker);
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
        // this.dataService.refreshSensorDataHistory();
        this.dataService.refreshBoatStatus();
        pullRefresh.refreshing = false;
    }

    click_gear() {

    }
}
