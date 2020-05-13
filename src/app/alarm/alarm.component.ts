import {Component, OnInit} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subject, Subscription} from 'rxjs';
import {DataService, DeviceAlarmDataFormat} from '../shared/data.service';
import * as TNSPhone from 'nativescript-phone';

registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);


@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    moduleId: module.id,
})
export class AlarmComponent implements OnInit {
    isLoading = false;
    private devicedataSub: Subscription;
    deviceData: DeviceAlarmDataFormat[];

    constructor(
        private apiService: ApiService
    ) {
    }

    onScroll(args: ScrollEventData) {
        const scrollView = args.object as ScrollView;

        console.log('scrollX: ' + args.scrollX);
        console.log('scrollY: ' + args.scrollY);
    }

    ngOnInit(): void {
        this.devicedataSub = this.apiService.deviceData.subscribe(
            ddata => {
                if (ddata) {
                    this.deviceData = ddata;
                } else {
                    console.log('no Device');
                }
            }
        );

        this.isLoading = true;
        this.apiService.getDeviceData().subscribe(response => {
            console.log('DeviceData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    click_gear() {
        console.log('Gear was pressed');
    }

    refreshList(args) {
        this.isLoading = true;
        const pullRefresh = args.object;
        this.apiService.getDeviceData().subscribe(response => {
            console.log('DeviceData loading ...');
            this.isLoading = false;
            pullRefresh.refreshing = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            pullRefresh.refreshing = false;
        });
    }

    onButtonTap() {
        console.log('Button was pressed');
    }

    onCallTap(idDevice: number) {
        console.log('Button was pressed' + this.deviceData[idDevice].harbour_contact);
        TNSPhone.dial(this.deviceData[idDevice].harbour_contact, true);
    }
}
