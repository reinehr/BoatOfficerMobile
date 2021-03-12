import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {stringify} from "@angular/compiler/src/util";
import {localize} from "nativescript-localize";
import {alert, confirm, action} from "@nativescript/core/ui/dialogs";


@Component({
    selector: 'app-editusers',
    templateUrl: './editusers.component.html'
})
export class EditusersComponent implements OnInit {

    constructor(
        private router: RouterExtensions,
        private apiService: ApiService,
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.roleOrRequests = params.roleOrRequests;
            this.idDevice = params.idDevice;
        });
    }

    alarmSettingsMap = alarmSettingsMap;
    alarmSettingsDatatypeMap = alarmSettingsDatatypeMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);
    public idDevice = 0;
    public roleOrRequests = '';
    private isLoading = false;
    // listPicker: {[ttnValue: number]: string} = {0: '0V', 1: '1V', 2: '2V'};
    listPicker: Array<string> = [];
    listPickerAlarmMap: Array<string> = [];
    originalAlarmSettingIndex = 0;
    selectedListPickerIndex = 0;
    selectedAlarmValue = 0;
    listPickerWidth = 50;


    ngOnInit(): void {

    }

    changeSailorToGuard(userid, username, deviceid, lifeguard, getPush) {
        const options = {
            title: localize("Change role"),
            message: localize("Change role of %s from Sailor to Guard?", username),
        okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, lifeguard, 'guard', getPush);
            }
        });
    }

    changeGuardToSailor(userid, username, deviceid, lifeguard, getPush) {
        const options = {
            title: localize("Change role"),
            message: localize("Change role of %s from Guard to Sailor?", username),
            okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, lifeguard, 'sailor', getPush);
            }
        });
    }

    changeUserRole(userid, username, deviceid, lifeguard, getPush) {
        const options = {
            title: localize("Change role of %s?",username),
            message: "",
            cancelButtonText: localize("Cancel"),
            actions: [localize('Guard'), localize('Sailor')]
        };
        action(options).then( result => {
            console.log(localize(result));
            let newrole = "";
            if(result==localize('Guard') || result == localize('Sailor')) {
                console.log("Set user to new role: " + result);
                if (result==localize("Sailor")) {
                    newrole = "sailor";
                    this.apiService.setDeviceUserData(deviceid, userid, lifeguard, newrole, getPush);
                }
                else if (result==localize("Guard")){
                    newrole = "guard";
                    this.apiService.setDeviceUserData(deviceid, userid, lifeguard, newrole, getPush);
                }
            }
        });
    }

    offboardUser(userid, username, deviceid, getPush)
    {
        const options = {
            title: localize("Send aboard"),
            message: localize("Send %s aboard?", username),
            okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, false, 'aboard', getPush);
            }
        });
    }

    revokeLifeguardStatus(userid, username, deviceid, role, getPush)
    {
        const options = {
            title: localize("Discharge Emergency Contact"),
            message: localize("Discharge %s as emergency contact?", username),
            okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, false, role, getPush);
            }
        });
    }

    grantLifeguardStatus(userid, username, deviceid, role, getPush)
    {
        const options = {
            title: localize("Add Emergency Contact"),
            message: localize("List %s as emergency contact?",username),
            okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, true, role, getPush);
            }
        });
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
