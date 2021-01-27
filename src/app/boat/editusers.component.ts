import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {stringify} from "@angular/compiler/src/util";
import {localize} from "nativescript-localize";
import {alert, confirm} from "tns-core-modules/ui/dialogs";


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

    changeUserRole(userid, useremail) {
        const options = {
            title: "Change role of "+useremail+"? (TODO not supported yet)",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            // TODO
        });
    }

    offboardUser(userid, useremail)
    {
        const options = {
            title: "Send "+useremail+" aboard? (TODO not supported yet)",
            okButtonText: "Yes",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
                // TODO
        });
    }

    revokeLifeguardStatus(userid, useremail)
    {
        const options = {
            title: "Discharge "+useremail+" as first aid contact? (TODO not supported yet)",
            okButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            // TODO
        });
    }



    goBack() {
        this.router.backToPreviousPage();
    }
}
