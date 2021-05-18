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
import {alert, confirm} from "@nativescript/core/ui/dialogs";
import * as Clipboard from "nativescript-clipboard";
import {ActivatedRoute} from "@angular/router";
import * as SocialShare from "@nativescript/social-share";

@Component({
    selector: 'app-boatsettings',
    templateUrl: './boatsettingssingle.component.html'
})
export class BoatsettingssingleComponent implements OnInit {

    alarmSettingsMap = alarmSettingsMap;
    alarmSettingsDatatypeMap = alarmSettingsDatatypeMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);
    dialogOpen = false;
    idDevice = 0;

    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        intl: TimeagoIntl
    ) {
        // Use the constructor to inject services.
        this.route.params.subscribe(params => {
            this.idDevice = params.idDevice;
        });

        if(localize('LOCALE') == 'de') {
            intl.strings = germanStrings;
        } else {
            intl.strings = englishStrings;
        }
        intl.changes.next();

    }

    ngOnInit(): void {
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
                this.apiService.leaveUserDevice(deviceid).subscribe(
                    () => {
                        this.dataService.refreshBoatStatus()
                    }
                );
            }
        });
    }

    editGetPush(deviceid, boatname, getPush)
    {
        let options = {
            title: localize("Activate push notifications for this boat (%s)?", boatname),
            okButtonText: localize("Yes, activate"),
            cancelButtonText: localize("Cancel"),
        };
        if (!getPush) {
            options = {
                title: localize("Do you really want to deactivate push notifications for this boat (%s)?", boatname),
                okButtonText: localize("Yes, deactivate"),
                cancelButtonText: localize("Cancel"),
            };
        }
        confirm(options).then( result => {
            if(result) {
                this.apiService.editGetPush(deviceid, getPush).subscribe(
                    () => {
                        this.dataService.refreshBoatStatus()
                    }
                );
            }
        });
    }

    invitePersonsOnBoard(deviceIndex) {
        let boatofficer_id = "";
        //SocialShare.shareText("BoatOfficer ID copied to clipboard.", "Was willst du tun?");
        boatofficer_id = this.dataService.deviceData[deviceIndex].serial_number_hex.substring(2).toUpperCase()+"-"+this.dataService.deviceData[deviceIndex].url_key.toUpperCase();
        Clipboard.setText(boatofficer_id);
        let messagetext = localize('Now, paste the BoatOfficer ID (%s) in an e-mail or messenger to send it to your friends.', boatofficer_id);
        if (!this.dataService.deviceData[deviceIndex].is_pro)
        {
            messagetext = messagetext+" "+localize("Note: Without PRO Upgrade, you can only hire one guard.");
        }
        const options = {
            title: localize('BoatOfficer ID copied'),
            message: messagetext,
            okButtonText: 'OK'
        };
        alert(options).then();

    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
