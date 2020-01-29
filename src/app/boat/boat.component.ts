import {Component, OnInit, ViewChild} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {ApiService} from '~/app/shared/api.service';
import {Subscription} from 'rxjs';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: 'app-boat',
    templateUrl: './boat.component.html'
})
export class BoatComponent implements OnInit {
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
    isLoading = false;

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

        this.isLoading = true;
        this.apiService.getLatestSensorData().subscribe(response => {
            console.log('LatestSensorData loading ...');
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

        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        marker.title = 'Sabine II';
        marker.snippet = 'BoatOfficer';
        marker.userData = {index: 1};
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
    }

    onCameraMove(args) {
        // console.log('Camera moving: ' + JSON.stringify(args.camera));
    }

}
