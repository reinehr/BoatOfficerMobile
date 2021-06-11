import {
    Component,
    OnInit,
    AfterViewInit
} from '@angular/core';
import {Page} from '@nativescript/core/ui/page/page';
import {DataService, DeviceAlarmDataFormat} from '../shared/data.service';
import {MapView, Marker, Position, Polyline} from 'nativescript-google-maps-sdk';
import {ApiService} from '~/app/shared/api.service';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {TimeagoIntl} from 'ngx-timeago';
import {localize} from 'nativescript-localize';
import {registerElement} from 'nativescript-angular/element-registry';
import {ScrollEventData, ScrollView} from '@nativescript/core/ui/scroll-view';
import { alarmByTypeMap } from '~/app/shared/interface/alarm';
import {isAndroid } from '@nativescript/core/platform';
import { Image } from '@nativescript/core/ui/image';
import { ImageSource } from '@nativescript/core/image-source';
import {hasKey, getString} from '@nativescript/core/application-settings';
import {BottomNavigation} from "@nativescript/core/ui/bottom-navigation";

import {HttpClient} from '@angular/common/http';
import { WebView, LoadEventData } from '@nativescript/core/ui/web-view';
import {RouterExtensions} from "nativescript-angular/router";
import {Application} from "@nativescript/core";
declare let android: any; // or even better - use tns-platform-declarations for intelliSense for the native APis

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
    zoom = 13;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    mapView: MapView;
    alarmByTypeMap = alarmByTypeMap;
    maxWeather = {0: 3};
    beaufortAlarmLevel = 7;
    hasKey = hasKey('token');
    webcamHeight = {}; //240;
    webcamWidth = {}; //295;
    webcamScale = {}; //1.0;
    webcamScaled = {}; //false;

    webViewSrc = this.page;

    constructor(// private _itemService: DataService,
        private page: Page,
        public apiService: ApiService,
        public dataService: DataService,
        intl: TimeagoIntl,
        private router: RouterExtensions,
        private httpClient: HttpClient
    ) {
        this.isLoading = true;
        page.actionBarHidden = true;

        if (localize('LOCALE') === 'de') {
            intl.strings = germanStrings;
        } else {
            intl.strings = englishStrings;
        }
        intl.changes.next();
        // const pageView = this.page.getViewById<MapView>('mapview_0');
        // console.log('AFTER INIT longitude: ' + pageView.minZoom);
    }

    ngOnInit(): void {
        // this.items = this._itemService.getItems();
        this.page.actionBarHidden = true;
        this.hasKey = hasKey('token');
    }

    ngAfterViewInit(): void {
    }


    // Map events
    onMapReady(event, idDevice: number) {
        //console.log('Map Ready');

        this.mapView = event.object;

        // const imageSource = ImageSource.fromFileSync( '~/assets/icon.png');
        // const icon = new Image();
        // icon.imageSource = imageSource;

        //console.log('Setting a marker...');

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
            //console.log('ready Setting no camera marker ...');
        }
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

    onLoadStarted(args: LoadEventData) {
    }

    onLoadFinishedWebView(args: LoadEventData) {
        const webView = args.object as WebView;
        //console.log('WEBVIEW Webcams onLoadFinished')

        if (!args.error) {
            //console.log(`Url: ${args.url}`);

            let jsStr = `var body = document.body;
                var html = document.documentElement;
                Math.max( body.scrollWidth, body.offsetWidth,
                html.clientWidth, html.scrollWidth, html.offsetWidth);`;
            if (webView.ios) {
                //webView.ios.scrollView.scrollEnabled = false;
                webView.ios.evaluateJavaScriptCompletionHandler(jsStr,
                    (
                        result,
                        error
                    ) => {
                        if (error) {
                            console.log("error...");
                        } else if (result) {
                            //webView.parent.effectiveHeight = result;
                            let id = webView.id;
                            //console.log(webView.parent.effectiveHeight);
                            //console.log(webView.height);
                            if (!this.webcamWidth[id]) {
                                this.webcamWidth[id] = 295;
                                this.webcamHeight[id] = 240;
                                this.webcamScale[id] = 1;
                                this.webcamScaled[id] = false;
                                console.log('home result width: ' + result)
                                this.webcamScale[id] = webView.getActualSize().width / result;
                                let height = webView.getActualSize().height / this.webcamScale[id];
                                console.log('home new height: ' + height)
                                this.webcamHeight[id] = height;
                                this.webcamWidth[id] = result;
                                webView.reload();
                            } else if (!this.webcamScaled[id]) {
                                webView.scaleX = this.webcamScale[id];
                                webView.scaleY = this.webcamScale[id];
                                webView.translateY = -(this.webcamHeight[id] / 2 - this.webcamHeight[id] * this.webcamScale[id] / 2);
                                webView.translateX = -(this.webcamWidth[id] / 2 - this.webcamWidth[id] * this.webcamScale[id] / 2);
                                this.webcamScaled[id] = true;
                                // this.changeDetectorRef.detectChanges();
                            }
                        }
                    });
            } else if (webView.android) {
                this.webcamScaled[webView.id] = true;
                // Works only on Android 19 and above
                // webView.android.evaluateJavascript(
                //     jsStr,
                //     new android.webkit.ValueCallback({
                //         onReceiveValue: (height) => {
                //             // this.height = layout.toDeviceIndependentPixels(height);
                //             // this.changeDetectorRef.detectChanges();
                //         }
                //     })
                // );
            }
            // console.log(webView.getActualSize().height);
            // console.log(webView.getActualSize().width);
            // console.log(webView.getMeasuredHeight());
            // console.log(webView.getMeasuredWidth());

            if (isAndroid && webView) {
                // console.log('isAndroid');
                webView.android.getSettings().setUseWideViewPort(true);
                webView.android.getSettings().setLoadWithOverviewMode(true);
                webView.android.setInitialScale(1);
                webView.android.getSettings().setBuiltInZoomControls(true);
                webView.android.getSettings().setDisplayZoomControls(false);
                //nativeWebView.getSettings().setAppCacheEnabled(false);
                //nativeWebView.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_NO_CACHE);
            } else if (webView && webView.ios) {
                // webView.ios.zoomScale = 0.5;
                // webView.ios.scale = 0.5;
                // webView.ios.width = 120;
                // webView.ios.height = 160;
                // webView.ios.scrollView.minimumZoomScale = 0.5;
                // webView.ios.scrollView.maximumZoomScale = 0.5;
                // webView.ios.scrollView.zoomScale = 0.5;
                // webView.ios.scalePageToFit = false;
                // webView.ios.scrollView.zoom = 0.5;
                //console.log('WEBVIEW WIDTH ' + webView.ios.scrollView.width);
                //nativeWebView.scrollView.minimumZoomScale = 1.0;
                //nativeWebView.scrollView.maximumZoomScale = 1.0;
                //nativeWebView.scrollView.zoomScale = 1.0;
                //console.log(nativeWebView.width);
                //nativeWebView.scrollView.bounces = false;
                //console.log('WEBVIEW Webcams IOS')
            }
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    onBoatImageTap(idDevice: number) {
        let bottomNav = <BottomNavigation>Application.getRootView().getViewById('bottomNav');
        bottomNav.selectedIndex = 1;
    }

    onWeatherTap(idDevice: number) {
        // const grid = args.object;
        // const idDevice = grid.get('id');
        if (!this.maxWeather[idDevice] || this.maxWeather[idDevice] <= 3) {
            this.maxWeather[idDevice]  = 40;
        } else {
            this.maxWeather[idDevice] = 3;
        }

        // grid.animate({
        //     height: 400,
        //     duration: 1000,
        //     curve: AnimationCurve.easeIn
        // });
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.webcamWidth = {};
        this.webcamScaled = {};
        // this.dataService.refreshSensorDataHistory();
        this.dataService.refreshBoatStatus();
        this.hasKey = hasKey('token');
        pullRefresh.refreshing = false;
    }
}
