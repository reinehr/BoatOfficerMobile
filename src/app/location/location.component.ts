import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '~/app/shared/data.service';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from '@nativescript/core/ui/scroll-view';
import {Subscription} from 'rxjs';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {TimeagoIntl} from 'ngx-timeago';
import {localize} from 'nativescript-localize';
import {Page} from '@nativescript/core/ui/page';
import {StackLayout} from "@nativescript/core/ui/layouts/stack-layout";
import {HttpClient} from "@angular/common/http";
import {LoadEventData, WebView} from "@nativescript/core/ui/web-view";
import {isAndroid} from "@nativescript/core/platform";
import {hasKey, getString} from '@nativescript/core/application-settings';



// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);
registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    moduleId: module.id,
})
export class LocationComponent implements OnInit, AfterViewInit {
    isLoading = false;

    latitude = -23.86;
    longitude = 151.20;
    zoom = 13;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    mapView: MapView;
    maxWeather = {0: 3};
    beaufortAlarmLevel = 7;
    hasKey = hasKey('token');
    webcamHeight = {}; //240;
    webcamWidth = {}; //295;
    webcamScale = {}; //1.0;
    webcamScaled = {}; //false;

    webViewSrc = this.page;
    private sensordataSub: Subscription;
    now = new Date();
    scrollLayout: ScrollView = null;
    scrollBase = null;
    allboatsvisible = false;

    lastCamera: string;
    private sensorHistoryLoaded: boolean;

    constructor(
        private page: Page,
        private apiService: ApiService,
        private dataService: DataService,
        intl: TimeagoIntl,
        private httpClient: HttpClient
        // private routerExtensions: RouterExtensions
    ) {
        // Use the constructor to inject services.

        if (localize('LOCALE') === 'de') {
            intl.strings = germanStrings;
        } else {
            intl.strings = englishStrings;
        }
        intl.changes.next();
        dataService.loadedLatestSensorData.subscribe(loaded => {
            if(loaded && loaded.valueOf()) {
                this.applyDefaultBoatDetailsVisibility();
                console.log('applyDefaultBoatDetailsVisibility');
            }
        })
        // const pageView = this.page.getViewById<MapView>('mapview_0');
        // console.log('AFTER INIT longitude: ' + pageView.minZoom);
    }

    ngOnInit(): void {
        console.log('opened location');
    }

    ngAfterViewInit(): void {
        this.scrollLayout = this.page.getViewById("level_4") as ScrollView;
        this.scrollBase = this.page.getViewById("level_5") as StackLayout;
    }

    // Map events
    onMapReady(event, idDevice: number) {
        //console.log('Map Ready');

        this.mapView = event.object;


        //console.log('Setting a marker...');

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
        if (this.dataService && this.dataService.deviceData && 3 > this.dataService.deviceData.length)
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
                            console.log('effective height: ' + webView.parent.effectiveHeight);
                            console.log('webview height: ' + webView.height);
                            if (!this.webcamWidth[id]) {
                                this.webcamWidth[id] = 295;
                                this.webcamHeight[id] = 240;
                                this.webcamScale[id] = 1;
                                this.webcamScaled[id] = false;
                                // console.log('result width: ' + result)
                                this.webcamScale[id] = (this.scrollLayout.getActualSize().width - 40) / result;
                                let height = 240 / this.webcamScale[id];
                                // console.log('scroll width ' + this.scrollLayout.getActualSize().width);
                                // console.log('actual width: ' + webView.getActualSize().width);
                                // console.log('actual height: ' + webView.getActualSize().height);
                                // console.log('webcam scale: ' + this.webcamScale[id]);
                                // console.log('new height: ' + height);
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
