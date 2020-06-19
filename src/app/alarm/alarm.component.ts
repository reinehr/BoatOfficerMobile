import {AfterViewInit, Component, OnInit} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subject, Subscription} from 'rxjs';
import {DataService, DeviceAlarmDataFormat} from '../shared/data.service';
import * as TNSPhone from 'nativescript-phone';
import { EventData } from 'tns-core-modules/data/observable';
import { Switch } from 'tns-core-modules/ui/switch';
import { alarmByTypeMap } from '~/app/shared/interface/alarm';

registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);


@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    moduleId: module.id,
})
export class AlarmComponent implements OnInit, AfterViewInit {
    isLoading = false;
    showOnlyOpen = true;
    alarmByTypeMap = alarmByTypeMap;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
    ) {
    }

    onScroll(args: ScrollEventData) {
        const scrollView = args.object as ScrollView;

        console.log('scrollX: ' + args.scrollX);
        console.log('scrollY: ' + args.scrollY);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.dataService.refreshBoatStatus();
        pullRefresh.refreshing = false;
    }

    onButtonTap() {
        console.log('Button was pressed');
    }

    onAlarmResponsibleTap(idDevice: number, idAlarm: number) {
        this.dataService.deviceData[idDevice].alarm[idAlarm].loading = true;
        this.apiService.setAlarmData(idAlarm = this.dataService.deviceData[idDevice].alarm[idAlarm].id, true, null);
    }

    onAlarmNotResponsibleTap(idDevice: number, idAlarm: number) {
        this.dataService.deviceData[idDevice].alarm[idAlarm].loading = true;
        this.apiService.setAlarmData(idAlarm = this.dataService.deviceData[idDevice].alarm[idAlarm].id, false, null);
    }

    onAlarmOkTap(idDevice: number, idAlarm: number) {
        this.dataService.deviceData[idDevice].alarm[idAlarm].loading = true;
        this.apiService.setAlarmData(idAlarm = this.dataService.deviceData[idDevice].alarm[idAlarm].id, true, true);
    }

    onCallTap(idDevice: number) {
        TNSPhone.dial(this.dataService.deviceData[idDevice].harbour_contact, true);
    }

    onCheckedChange(args: EventData) {
        const sw = args.object as Switch;
        this.showOnlyOpen = sw.checked;
    }
}
