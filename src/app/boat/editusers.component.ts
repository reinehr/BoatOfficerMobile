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
            title: "Change role",
            message: "Change role of "+useremail+" from Sailor to Guard?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, lifeguard, 'guard');
            }
        });
    }

    changeGuardToSailor(userid, useremail, deviceid, lifeguard) {
        const options = {
            title: "Change role",
            message: "Change role of "+useremail+" from Guard to Sailor?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.setDeviceUserData(deviceid, userid, lifeguard, 'sailor');
            }
        });
    }

    changeUserRole(userid, useremail, deviceid, lifeguard) {
        const options = {
            title: "Change role of "+useremail+"?",
            message: "",
            cancelButtonText: "Cancel",
            actions: ["guard", "sailor"]
        };
        action(options).then( result => {
            if(result=='guard' || result=='sailor' || result=='aboard') {
                this.apiService.setDeviceUserData(deviceid, userid, false, result);
            }
        });
    }

    offboardUser(userid, useremail, deviceid)
    {
        const options = {
            title: "Send aboard",
            message: "Send "+useremail+" aboard?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
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
