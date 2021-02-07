import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService, DeviceAlarmDataFormat, SensorDataHistory} from '~/app/shared/data.service';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subscription} from 'rxjs';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {BoatHistory, BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {TimeagoIntl} from 'ngx-timeago';
import {localize} from 'nativescript-localize';
import {ImageSource} from 'tns-core-modules/image-source';
import {Image} from 'tns-core-modules/ui/image';
import {Page} from 'tns-core-modules/ui/page';
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";


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
    mapView: MapView;
    private sensordataSub: Subscription;
    now = new Date();
    scrollLayout: ScrollView = null;
    contentContainer: StackLayout = null;
    scrollBase = null;
    allboatsvisible = false;

    lastCamera: string;
    private sensorHistoryLoaded: boolean;

    constructor(
        private page: Page,
        private apiService: ApiService,
        private dataService: DataService,
        intl: TimeagoIntl
        // private routerExtensions: RouterExtensions
    ) {
        // Use the constructor to inject services.

        if (localize('LOCALE') === 'de') {
            intl.strings = germanStrings;
        } else {
            intl.strings = englishStrings;
        }
        intl.changes.next();
        this.dataService.apiService.boatStatus.subscribe( ddata => {
            if (ddata) {
                setTimeout( () => {
                    for (const idDevice in this.dataService.deviceData) {
                        const level6 = this.page.getViewById('level_2').getViewById('level_3')
                            .getViewById('level_4')
                            .getViewById('level_5')
                            .getViewById('level_6_' + this.dataService.deviceData[idDevice].id);
                        const level7 = level6.getViewById('level_7_' + this.dataService.deviceData[idDevice].id);
                        if (level7) {
                            const level8 = level7.getViewById('level_8_' + this.dataService.deviceData[idDevice].id);
                            this.mapView = level8.getViewById<MapView>('mapview_' + this.dataService.deviceData[idDevice].id);
                            const marker = new Marker();
                            marker.position = Position.positionFromLatLng(this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].position_data.latitude, this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].position_data.longitude);
                            marker.title = this.dataService.deviceData[idDevice].name + (this.dataService.deviceData[idDevice].berth ? ' (Berth ' + this.dataService.deviceData[idDevice].berth + ')' : '');
                            marker.snippet = 'BoatOfficer';
                            marker.userData = {index: 1};
                            marker.zIndex = 10;
                            this.mapView.removeAllMarkers();
                            this.mapView.addMarker(marker);
                            this.mapView.mapAnimationsEnabled = true;
                        }
                    }
                    // TODO is this the right place for the following commands? ask Jakob.
                    this.scrollLayout = this.page.getViewById("level_4") as ScrollView;
                    this.contentContainer = this.page.getViewById("level_5") as StackLayout;
                    this.scrollBase = this.page.getViewById("level_5") as StackLayout;
                    this.applyDefaultBoatDetailsVisibility();
                }, 2000);
            }
        }
        );
        // const pageView = this.page.getViewById<MapView>('mapview_0');
        // console.log('AFTER INIT longitude: ' + pageView.minZoom);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {

    }


    // Map events
    onMapReady(event, idDevice: number) {
        console.log('Map Ready');

        this.mapView = event.object;


        console.log('Setting a marker...');

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].position_data.latitude, this.dataService.boatStatus[this.dataService.deviceData[idDevice].id].position_data.longitude);
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

    refreshList(args) {
        const pullRefresh = args.object;
        // this.dataService.refreshSensorDataHistory();
        this.dataService.refreshBoatStatus();
        pullRefresh.refreshing = false;
    }

    toggleBoatDetails(deviceId) {
        console.log("Boat Tapped No: "+deviceId);
        const boatDetailsView = <StackLayout> this.page.getViewById("boat-details"+deviceId);

        if (boatDetailsView.isCollapsed)
        {
            const scrollTarget = this.page.getViewById("level_6_"+deviceId) as StackLayout;

            boatDetailsView.opacity = 0;
            boatDetailsView.visibility = "visible";
            boatDetailsView.animate({
                opacity: 1,
                duration: 100
            }).then( () => {
                    this.scrollLayout.scrollToVerticalOffset(scrollTarget.getLocationRelativeTo(this.scrollBase).y, true);
                });
            // not exactly true, but collapse of all is desired at tap on Title Bar
            this.allboatsvisible = true;
        }
        else
        {
            boatDetailsView.animate({
                opacity: 0,
                duration: 100
            }).then(() => {
                boatDetailsView.visibility='collapse';
            }, (err) => {});
        }
        //boatDetailsView.visibility = boatDetailsView.isCollapsed ? "visible" : "collapse";
    }

    toggleAllBoatDetails(args) {
        console.log("Boat Status tapped");
        for (const idDevice in this.dataService.deviceData)
        {
            const boatDetailsView = <StackLayout> this.page.getViewById("boat-details"+this.dataService.deviceData[idDevice].id);
            boatDetailsView.visibility = this.allboatsvisible ? "collapse" : "visible";
            boatDetailsView.opacity = 1;
        }
        this.allboatsvisible = !this.allboatsvisible;
        this.scrollLayout.scrollToVerticalOffset(0, true);
    }

    applyDefaultBoatDetailsVisibility(){
        if (3 > this.dataService.deviceData.length)
        {
            for (const idDevice in this.dataService.deviceData)
            {
                const boatDetailsView = <StackLayout> this.page.getViewById("boat-details"+this.dataService.deviceData[idDevice].id);
                boatDetailsView.visibility = "visible";
                boatDetailsView.opacity = 1;
            }
            this.allboatsvisible = true;
        }
        else
        {
            let numberOfOfficerBoats = 0;
            for (const idDevice in this.dataService.deviceData)
            {
                if ('officer' == this.dataService.deviceData[idDevice].role)
                {
                    numberOfOfficerBoats++;
                }
            }
            if (3 > numberOfOfficerBoats)
            {
                for (const idDevice in this.dataService.deviceData)
                {
                    if ('officer' == this.dataService.deviceData[idDevice].role)
                    {
                        const boatDetailsView = <StackLayout> this.page.getViewById("boat-details"+this.dataService.deviceData[idDevice].id);
                        boatDetailsView.visibility = "visible";
                        boatDetailsView.opacity = 1;
                    }
                }
                // not exactly true, but collapse of all is desired at tap on Title Bar
                this.allboatsvisible = true;
            }
        }

    }

    click_gear() {

    }
}
