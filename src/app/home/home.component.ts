import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Page} from 'tns-core-modules/ui/page/page';
import {DataService, DeviceAlarmDataFormat} from '../shared/data.service';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {Subscription} from 'rxjs';
import {ApiService} from '~/app/shared/api.service';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {TimeagoIntl} from 'ngx-timeago';
import {localize} from 'nativescript-localize';
import {registerElement} from 'nativescript-angular/element-registry';
import {ScrollEventData, ScrollView} from 'tns-core-modules/ui/scroll-view';
import { alarmByTypeMap } from '~/app/shared/interface/alarm';

registerElement('MapView', () => MapView);
registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);

@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['../../css/weather-icons.css', '../../css/weather-icons-wind.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
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
    alarmByTypeMap = alarmByTypeMap;

    constructor(// private _itemService: DataService,
        private page: Page,
        private apiService: ApiService,
        private dataService: DataService,
        intl: TimeagoIntl
    ) {
        page.actionBarHidden = true;

        if (localize('LOCALE') === 'de') {
            intl.strings = germanStrings;
        } else {
            intl.strings = englishStrings;
        }
        intl.changes.next();
    }

    ngOnInit(): void {
        // this.items = this._itemService.getItems();
        this.page.actionBarHidden = true;
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
        this.mapView.mapAnimationsEnabled = true;
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


    onButtonTap(): void {
        console.log('Button was pressed');
    }

    refreshList(args) {
        const pullRefresh = args.object;
        // this.dataService.refreshSensorDataHistory();
        this.dataService.refreshBoatStatus();
        pullRefresh.refreshing = false;
    }
}
