import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {Subscription} from 'rxjs';
import {DataService, DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {ApiService} from '~/app/shared/api.service';
import {alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {TimeagoIntl} from "ngx-timeago";
import {localize} from "nativescript-localize";
import {confirm} from "tns-core-modules/ui/dialogs";

@Component({
    selector: 'app-boatsettings',
    templateUrl: './boatsettings.component.html'
})
export class BoatsettingsComponent implements OnInit {

    alarmSettingsMap = alarmSettingsMap;
    alarmSettingsDatatypeMap = alarmSettingsDatatypeMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);
    dialogOpen = false;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        private routerExtensions: RouterExtensions,
        intl: TimeagoIntl
    ) {
        // Use the constructor to inject services.

        if(localize('LOCALE') == 'de') {
            intl.strings = germanStrings;
        } else {
            intl.strings = englishStrings;
        }
        intl.changes.next();
    }

    ngOnInit(): void {
        for (const idDevice in this.dataService.deviceData) {
            for (let user of this.dataService.deviceData[idDevice].device_users) {
                if (user.role == 'officer')
                {
                    this.dataService.deviceData[idDevice]['officermail'] = user.email;
                    break;
                }
            }
        }
    }

    showDialog() {
        this.dialogOpen = true;
    }

    closeDialog() {
        this.dialogOpen = false;
    }

    changed2ndBatteryOption() {

    }

    leaveThisBoat(deviceid, boatname)
    {
        const options = {
            title: "Do you really want to leave this boat ("+boatname+")? (TODO not supported yet)",
            okButtonText: "Yes, Leave",
            cancelButtonText: "Cancel",
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.leaveUserDevice(deviceid);
            }
        });
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
