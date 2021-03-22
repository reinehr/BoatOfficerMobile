import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '~/app/shared/api.service';
import {DataService, DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {MapView, Marker, Position, Polyline} from 'nativescript-google-maps-sdk';
import { Color } from '@nativescript/core/color';
import {ImageSource} from "@nativescript/core/image-source";
import {Image} from "@nativescript/core/ui/image";
import {ScrollEventData, ScrollView} from "@nativescript/core/ui/scroll-view";
import {Page} from "@nativescript/core/ui/page";
import {isAndroid } from '@nativescript/core/platform';
import {LoadEventData, WebView} from "@nativescript/core/ui/web-view";

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

    webcamHeight = {}; //240;
    webcamWidth = {}; //295;
    webcamScale = {}; //1.0;
    webcamScaled = {}; //false;

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

    onLoadStarted(args: LoadEventData) {
    }


    onLoadFinished(args: LoadEventData, order: number) {
        const webView = args.object as WebView;
        console.log('WEBVIEW Webcam onLoadFinished')

        let jsStr = `var body = document.body;
                var html = document.documentElement;
                Math.max( body.scrollWidth, body.offsetWidth,
                html.clientWidth, html.scrollWidth, html.offsetWidth);`;
        if (webView.ios) {
            //webView.ios.scrollView.scrollEnabled = false;
        } else if (webView.android) {
            this.webcamScaled[order] = true;
        }
        if (!args.error) {
            if (isAndroid && webView) {
                webView.android.getSettings().setUseWideViewPort(true);
                webView.android.getSettings().setLoadWithOverviewMode(true);
                webView.android.setInitialScale(1);
                webView.android.getSettings().setBuiltInZoomControls(true);
                webView.android.getSettings().setDisplayZoomControls(false);
            } else if (webView && webView.ios) {
            }
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    setSelectedInterval(id: number) {
        this.selectedIntervalId = id;
        this.webcamWidth = {};
        this.webcamHeight = {};
        this.webcamScaled = {};
    }
}
