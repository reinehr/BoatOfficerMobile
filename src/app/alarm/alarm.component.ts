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
import { LocalNotifications } from 'nativescript-local-notifications';

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
        //this.updateAlarmBadge();
    }

    onAlarmResponsibleTap(idDevice: number, idAlarm: number) {
        this.dataService.deviceData[idDevice].alarm[idAlarm].loading = true;
        this.apiService.setAlarmData([this.dataService.deviceData[idDevice].alarm[idAlarm].id], true, null);
    }

    onAlarmTypeResponsibleTap(idDevice: number, alarmType: string) {
        let idAlarm = [];
        for (let alarm of this.dataService.deviceData[idDevice].alarm_summarized[alarmType].alarm) {
            if(alarm.status == 'open' || (alarm.status == 'open_someone_responsible' && alarm.i_am_responsible)) {
                idAlarm.push(alarm.id);
            }
        }
        this.apiService.setAlarmData(idAlarm, true, null);
    }

    onAlarmNotResponsibleTap(idDevice: number, idAlarm: number) {
        this.dataService.deviceData[idDevice].alarm[idAlarm].loading = true;
        this.apiService.setAlarmData([this.dataService.deviceData[idDevice].alarm[idAlarm].id], false, null);
    }

    onAlarmTypeNotResponsibleTap(idDevice: number, alarmType: string) {
        let idAlarm = [];
        for (let alarm of this.dataService.deviceData[idDevice].alarm_summarized[alarmType].alarm) {
            if(alarm.status == 'open' || (alarm.status == 'open_someone_responsible' && alarm.i_am_responsible)) {
                idAlarm.push(alarm.id);
            }
        }
        this.apiService.setAlarmData(idAlarm, false, null);
    }

    onAlarmOkTap(idDevice: number, idAlarm: number) {
        this.dataService.deviceData[idDevice].alarm[idAlarm].loading = true;
        this.apiService.setAlarmData([this.dataService.deviceData[idDevice].alarm[idAlarm].id], true, true);
    }

    onAlarmTypeOkTap(idDevice: number, alarmType: string) {
        let idAlarm = [];
        for (let alarm of this.dataService.deviceData[idDevice].alarm_summarized[alarmType].alarm) {
            if(alarm.status == 'open' || (alarm.status == 'open_someone_responsible' && alarm.i_am_responsible)) {
                idAlarm.push(alarm.id);
            }
        }
        this.apiService.setAlarmData(idAlarm, true, true);
    }

    onCallTap(idDevice: number) {
        TNSPhone.dial(this.dataService.deviceData[idDevice].harbour_contact, true);
    }

    onCheckedChange(args: EventData) {
        const sw = args.object as Switch;
        this.showOnlyOpen = sw.checked;
    }

    updateAlarmBadge(){
        console.log("Update Alarm Number Badge");
        LocalNotifications.requestPermission().then(
            function(granted) {
                console.log("Permission granted? "+ granted);
            }
        )
        let numberOfActiveAlarms = 0;
        for (let device of this.dataService.deviceData)
        {
            if ((device.role == 'officer') || (device.role == 'guard'))
            {
                for (let alarm of device.alarm)
                {
                    if (alarm.status == 'open')
                    {
                        numberOfActiveAlarms++;
                    }
                }
            }
            if (device.lifeguard){
                for (let alarm of device.alarm)
                {
                    if ((alarm.type == 'SOS Activated') && (alarm.status == 'open'))
                    {
                        numberOfActiveAlarms++;
                        console.log("SOS Alarm active.");
                    }
                }
            }
        }
        console.log("Number of active alarms: "+numberOfActiveAlarms);
        if (numberOfActiveAlarms){
            LocalNotifications.schedule([{badge: numberOfActiveAlarms, sound: null}]);
        }
    }

    hideAlarm(idDevice: number, alarmType: string, idAlarm: number) {
        console.log('hide');
        this.dataService.deviceData[idDevice].alarm_summarized[alarmType].alarm[idAlarm].hidden =
            !this.dataService.deviceData[idDevice].alarm_summarized[alarmType].alarm[idAlarm].hidden;
    }
}
