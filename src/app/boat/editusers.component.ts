import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {stringify} from "@angular/compiler/src/util";
import {localize} from "nativescript-localize";
import {alert, confirm, action} from "tns-core-modules/ui/dialogs";


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

    changeSailorToGuard(userid, useremail, deviceid, lifeguard) {
        const options = {
            title: localize("Change role"),
            message: localize("Change role of ")+useremail+localize(" from Sailor to Guard")+"?",
        okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, lifeguard, 'guard');
            }
        });
    }

    changeGuardToSailor(userid, useremail, deviceid, lifeguard) {
        const options = {
            title: localize("Change role"),
            message: localize("Change role of ")+useremail+localize(" from Guard to Sailor")+"?",
            okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, lifeguard, 'sailor');
            }
        });
    }

    changeUserRole(userid, useremail, deviceid, lifeguard) {
        const options = {
            title: localize("Change role of ")+useremail+"?",
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
                    this.apiService.setDeviceUserData(deviceid, userid, false, newrole);
                }
                else if (result==localize("Guard")){
                    newrole = "guard";
                    this.apiService.setDeviceUserData(deviceid, userid, false, newrole);
                }
            }
        });
    }

    offboardUser(userid, useremail, deviceid)
    {
        const options = {
            title: localize("Send aboard"),
            message: localize("Send ")+useremail+localize(" aboard?"),
            okButtonText: localize("Yes"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, false, 'aboard');
            }
        });
    }

    revokeLifeguardStatus(userid, useremail, deviceid, role)
    {
        const options = {
            title: "Discharge lifeguard",
            message: "Discharge "+useremail+" as first aid contact?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, false, role);
            }
        });
    }

    grantLifeguardStatus(userid, useremail, deviceid, role)
    {
        const options = {
            title: "Add lifeguard",
            message: "List "+useremail+" as first aid contact?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, true, role);
            }
        });
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
