import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '~/app/shared/api.service';
import {DataService, DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {MapView, Marker, Position, Polyline} from 'nativescript-google-maps-sdk';
import { Color } from 'tns-core-modules/color';
import {ImageSource} from "tns-core-modules/image-source";
import {Image} from "tns-core-modules/ui/image";
import {ScrollEventData, ScrollView} from "tns-core-modules/ui/scroll-view";
import {Page} from "tns-core-modules/ui/page";
import {isAndroid } from 'tns-core-modules/platform';
import {LoadEventData, WebView} from "tns-core-modules/ui/web-view";

@Component({
    selector: 'app-webcam',
    templateUrl: './webcam.component.html'
})
export class WebcamComponent implements OnInit {

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
    selectedIntervalId = 0;
    isLoading = false;
    initialized = true;

    latitude = -23.86;
    longitude = 151.20;
    minZoom = 0;
    maxZoom = 22;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;


    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    ngOnInit(): void {}

    onWebViewLoaded(webargs) {
    }

    onLoadStarted(args: LoadEventData) {
    }


    onLoadFinished(args: LoadEventData) {
        const webView = args.object as WebView;
        console.log('WEBVIEW Webcams onLoadFinished')

        if (!args.error) {
            // console.log('Load Finished');
            // console.log(`EventName: ${args.eventName}`);
            // console.log(`NavigationType: ${args.navigationType}`);
            // console.log(`Url: ${args.url}`);
            // console.log(webView.getActualSize().height);
            // console.log(webView.getActualSize().width);
            // console.log(webView.getMeasuredHeight());
            // console.log(webView.getMeasuredWidth());
            //webView.height = 240;
            //webView.width = 320;
            //webView.effectiveHeight = 240;
            //const nativeWebView = webView.nativeView; // equal to webView.android or webView.ios (depending on the platform)
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
                webView.ios.zoomScale = 1;
                //webView.ios.scrollView.minimumZoomScale = 10.0;
                //webView.ios.scrollView.maximumZoomScale = 10.0;
                webView.ios.scrollView.zoomScale = 1;

                //nativeWebView.scrollView.minimumZoomScale = 1.0;
                //nativeWebView.scrollView.maximumZoomScale = 1.0;
                //nativeWebView.scrollView.zoomScale = 1.0;
                //console.log(nativeWebView.width);
                //nativeWebView.scrollView.bounces = false;
                console.log('WEBVIEW Webcams IOS')
            }
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    setSelectedInterval(id: number) {
        this.selectedIntervalId = id;
    }
}
