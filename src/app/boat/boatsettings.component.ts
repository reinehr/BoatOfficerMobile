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
import {alert, confirm} from "tns-core-modules/ui/dialogs";
import * as Clipboard from "nativescript-clipboard";
//import * as SocialShare from "nativescript-social-share";

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
            title: localize("Do you really want to leave this boat (%s)?", boatname),
            okButtonText: localize("Yes, Leave"),
            cancelButtonText: localize("Cancel"),
        };
        confirm(options).then( result => {
            if(result) {
                this.apiService.leaveUserDevice(deviceid);
            }
        });
    }

    invitePersonsOnBoard() {
        let boatofficer_id = "TODO_12345_ABCDE";
        console.log("Start sharing of BoatOfficer ID");
        //SocialShare.shareText("BoatOfficer ID copied to clipboard.", "Was willst du tun?");
        Clipboard.setText(boatofficer_id);
        const options = {
            title: localize('BoatOfficer ID copied'),
            message: localize('Now, paste the BoatOfficer ID (%s) in an e-mail or messenger to send it to your friends.', boatofficer_id),
            okButtonText: 'OK'
        };
        alert(options).then();

    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
