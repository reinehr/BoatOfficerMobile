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
import {MapView, Marker, Position, Polyline} from 'nativescript-google-maps-sdk';
import { Color } from 'tns-core-modules/color';
import {ImageSource} from "tns-core-modules/image-source";
import {Image} from "tns-core-modules/ui/image";
import {ScrollEventData, ScrollView} from "tns-core-modules/ui/scroll-view";
import {Page} from "tns-core-modules/ui/page";
import {isAndroid } from 'tns-core-modules/platform';

@Component({
    selector: 'app-mapdetails',
    templateUrl: './mapdetails.component.html'
})
export class MapdetailsComponent implements OnInit {

    constructor(
        private page: Page,
        private apiService: ApiService,
        // private dataService: DataService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private dataService: DataService
    ) {
        this.route.params.subscribe(params => {
            this.idDevice = params.idDevice;
        });

    }

    public field = '---';
    public idDevice = 0;
    selectedIntervalId = 2;
    isLoading = false;
    initialized = true;

    latitude = -23.86;
    longitude = 151.20;
    zoom = 12;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;


    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    ngOnInit(): void {}
    // Map events
    onMapReady(event, idDevice: number) {
        console.log('Map Ready');

        this.mapView = event.object;

        // const imageSource = ImageSource.fromFileSync( '~/assets/icon.png');
        // const icon = new Image();
        // icon.imageSource = imageSource;

        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].position_data.latitude, this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].position_data.longitude);
        marker.title = this.dataService.deviceData[idDevice].name + (this.dataService.deviceData[idDevice].berth ? ' (Berth ' + this.dataService.deviceData[idDevice].berth + ')' : '');
        marker.snippet = 'BoatOfficer';
        marker.userData = {index: 1};
        // marker.icon = icon;
        // marker.color = '#356eb4';
        marker.zIndex = 10;
        this.mapView.removeAllMarkers();
        if (false && this.dataService.boatStatus && this.dataService.boatStatus[this.dataService.deviceData[idDevice].id] && this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].webcam && this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].webcam.latitude) {
            console.log('ready Setting a camera marker ...');

            const imageSource = ImageSource.fromFileSync( '~/assets/video-solid-small.png');
            const icon = new Image();
            icon.imageSource = imageSource;
            const markerWebcam = new Marker();
            markerWebcam.position = Position.positionFromLatLng(this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].webcam.latitude, this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].webcam.longitude);
            markerWebcam.title = this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].webcam.name + '';
            markerWebcam.snippet = 'Webcam';
            markerWebcam.userData = {index: 1};
            markerWebcam.zIndex = 9;
            markerWebcam.color = 'gray';
            markerWebcam.icon = icon;
            this.mapView.addMarker(markerWebcam);
            this.mapView.mapAnimationsEnabled = true;
        } else {
            console.log('ready Setting no camera marker ...');
        }
        this.mapView.addMarker(marker);
        if (this.dataService.boatHistory && this.dataService.boatHistory[this.dataService.deviceData[idDevice].id] && this.dataService.boatHistory[this.dataService.deviceData[idDevice].id].position_data) {
            let lastLatitude = 0;
            let lastLongitude = 0;
            const nowMilliseconds = new Date();
            let maxDays = 7;
            switch (this.selectedIntervalId) {
                case 0:
                    maxDays = 1;
                    break;
                case 1:
                    maxDays = 3;
                    break;
                case 2:
                    maxDays = 7;
                    break;
                case 3:
                    maxDays = 30;
                    break;
                case 4:
                    maxDays = 91;
                    break;
            }
            const halftime = maxDays / 3.0;
            const base = Math.pow(0.5, 1 / halftime);
            this.mapView.removeAllShapes();
            for (const position of this.dataService.boatHistory[this.dataService.deviceData[idDevice].id].position_data) {
                if (lastLatitude > 0) {
                    const eventmilliseconds = new Date(position.time);
                    const days = (nowMilliseconds.getTime() - eventmilliseconds.getTime()) / (1000 * 60 * 60 * 24);
                    // const density = Math.pow(0.933032991, days);
                    if (days <= maxDays) {
                        const density = Math.pow(base, days);
                        const polyline = new Polyline();
                        polyline.addPoint(Position.positionFromLatLng(lastLatitude, lastLongitude));
                        polyline.addPoint(Position.positionFromLatLng(position.latitude, position.longitude));
                        polyline.visible = true; // f4d7
                        if (isAndroid) {
                            polyline.width = 8;
                        } else {
                            polyline.width = 2;
                        }
                        polyline.geodesic = false;
                        polyline.color = new Color(255 * density, 0, 20, 50);
                        this.mapView.addPolyline(polyline);
                    }
                    // console.log(density);
                }
                lastLatitude = position.latitude;
                lastLongitude = position.longitude;

            }
        }
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
        this.dataService.refreshSensorDataHistory();
        pullRefresh.refreshing = false;
    }

    setSelectedInterval(id: number) {
        this.selectedIntervalId = id;
        // this.initialized = !this.initialized;
        // this.initialized = !this.initialized;
        const level6 = this.page
            .getViewById('level_3_' + this.dataService.deviceData[this.idDevice].id)
            .getViewById('level_4_' + this.dataService.deviceData[this.idDevice].id)
            .getViewById('level_5_' + this.dataService.deviceData[this.idDevice].id)
            .getViewById('level_6_' + this.dataService.deviceData[this.idDevice].id);
        const level7 = level6.getViewById('level_7_' + this.dataService.deviceData[this.idDevice].id);
        if (level7) {
            const level8 = level7.getViewById('level_8_' + this.dataService.deviceData[this.idDevice].id);
            this.mapView = level8.getViewById<MapView>('mapview_' + this.dataService.deviceData[this.idDevice].id);
            if (this.dataService.boatHistory && this.dataService.boatHistory[this.dataService.deviceData[this.idDevice].id] && this.dataService.boatHistory[this.dataService.deviceData[this.idDevice].id].position_data) {
                let lastLatitude = 0;
                let lastLongitude = 0;
                const nowMilliseconds = new Date();
                let maxDays = 7;
                switch (this.selectedIntervalId) {
                    case 0:
                        maxDays = 1;
                        break;
                    case 1:
                        maxDays = 3;
                        break;
                    case 2:
                        maxDays = 7;
                        break;
                    case 3:
                        maxDays = 30;
                        break;
                    case 4:
                        maxDays = 91;
                        break;
                }
                const halftime = maxDays / 3.0;
                const base = Math.pow(0.5, 1 / halftime);
                this.mapView.removeAllShapes();
                for (const position of this.dataService.boatHistory[this.dataService.deviceData[this.idDevice].id].position_data) {
                    if (lastLatitude > 0) {
                        const eventmilliseconds = new Date(position.time);
                        const days = (nowMilliseconds.getTime() - eventmilliseconds.getTime()) / (1000 * 60 * 60 * 24);
                        // const density = Math.pow(0.933032991, days);
                        const density = Math.pow(base, days);
                        if (days <= maxDays) {
                            const polyline = new Polyline();
                            polyline.addPoint(Position.positionFromLatLng(lastLatitude, lastLongitude));
                            polyline.addPoint(Position.positionFromLatLng(position.latitude, position.longitude));
                            polyline.visible = true;
                            if (isAndroid) {
                                polyline.width = 8;
                            } else {
                                polyline.width = 2;
                            }
                            polyline.geodesic = false;
                            polyline.color = new Color(255 * density, 0, 20, 50);
                            this.mapView.addPolyline(polyline);
                        }
                        // console.log(density);
                    }
                    lastLatitude = position.latitude;
                    lastLongitude = position.longitude;
                }
            }
        }
    }
}
