import {AfterViewInit, Component, OnInit} from '@angular/core';
import {registerElement} from '@nativescript/angular';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from '@nativescript/core/ui/scroll-view';
import {Subject, Subscription} from 'rxjs';
import {DataService, DeviceAlarmDataFormat} from '../shared/data.service';
//import * as TNSPhone from 'nativescript-phone';
import { EventData } from '@nativescript/core/data/observable';
import { Switch } from '@nativescript/core/ui/switch';
import { alarmByTypeMap } from '~/app/shared/interface/alarm';
import { LocalNotifications } from '@nativescript/local-notifications';
import {StackLayout} from "@nativescript/core/ui/layouts/stack-layout";
import {Page} from "@nativescript/core/ui/page";
import {Utils} from "@nativescript/core";

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

    scrollLayout: ScrollView = null;
    scrollBase = null;
    allboatsvisible = true;

    constructor(
        private page: Page,
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
        this.scrollLayout = this.page.getViewById("level_4") as ScrollView;
        this.scrollBase = this.page.getViewById("level_5") as StackLayout;
        //this.applyDefaultBoatDetailsVisibility(); // TODO needs "Data available" or loading finished trigger
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
        console.log('Call Harbour')
        Utils.openUrl('tel://' + this.dataService.deviceData[idDevice].harbour_contact)
        //TNSPhone.dial(this.dataService.deviceData[idDevice].harbour_contact, true);
    }

    onCheckedChange(args: EventData) {
        const sw = args.object as Switch;
        this.showOnlyOpen = sw.checked;
    }

    onToggleHistoricAlarms(){
        this.showOnlyOpen = ! this.showOnlyOpen;
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

    toggleAllBoatDetails(args) {
        console.log("Boat Alarms tapped");
        for (const idDevice in this.dataService.deviceData)
        {
            const boatDetailsView = <StackLayout> this.page.getViewById("boat-details"+this.dataService.deviceData[idDevice].id);
            boatDetailsView.visibility = this.allboatsvisible ? "collapse" : "visible";
            boatDetailsView.opacity = 1;
        }
        this.allboatsvisible = !this.allboatsvisible;
        this.scrollLayout.scrollToVerticalOffset(0, true);
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

    applyDefaultBoatDetailsVisibility(){
        console.log("Number of boats: "+this.dataService.deviceData.length);
        if (3 > this.dataService.deviceData.length)
        {
            console.log("less than 3 boats")
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

}
