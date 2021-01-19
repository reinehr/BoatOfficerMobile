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

    timestamp = + new Date();
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
                        if (!this.webcamWidth[order]) {
                            this.webcamWidth[order] = 295;
                            this.webcamHeight[order] = 240;
                            this.webcamScale[order] = 1;
                            this.webcamScaled[order] = false;
                            //console.log('result widht: ' + result)
                            this.webcamScale[order] = webView.getActualSize().width / result;
                            let height = webView.getActualSize().height / this.webcamScale[order];
                            //console.log('new height: ' + height)
                            this.webcamHeight[order] = height;
                            this.webcamWidth[order] = result;
                            webView.reload();
                        } else if (!this.webcamScaled[order]) {
                            webView.scaleX = this.webcamScale[order];
                            webView.scaleY = this.webcamScale[order];
                            webView.translateY = -(this.webcamHeight[order] / 2 - this.webcamHeight[order] * this.webcamScale[order] / 2);
                            webView.translateX = -(this.webcamWidth[order] / 2 - this.webcamWidth[order] * this.webcamScale[order] / 2);
                            this.webcamScaled[order] = true;
                            // this.changeDetectorRef.detectChanges();
                        }
                    }
                });
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
