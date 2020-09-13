import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {stringify} from "@angular/compiler/src/util";


@Component({
    selector: 'app-editdevicesettings',
    templateUrl: './editdevicesettings.component.html'
})
export class EditdevicesettingsComponent implements OnInit {

    constructor(
        private router: RouterExtensions,
        private apiService: ApiService,
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.field = params.field;
            this.idDevice = params.idDevice;
        });
    }

    alarmSettingsMap = alarmSettingsMap;
    alarmSettingsDatatypeMap = alarmSettingsDatatypeMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);
    public idDevice = 0;
    public field = '';
    public name = '';
    description = '';
    value = '';
    public type = '';
    public icon = '';
    public iconfont = 's';
    private isLoading = false;
    // listPicker: {[ttnValue: number]: string} = {0: '0V', 1: '1V', 2: '2V'};
    listPicker: Array<string> = [];
    listPickerAlarmMap: Array<string> = [];
    originalAlarmSettingIndex = 0;
    selectedListPickerIndex = 0;
    selectedAlarmValue = 0;
    listPickerWidth = 50;


    ngOnInit(): void {
        console.log('Load index:' + this.idDevice + ' field: ' + this.field);
        const text = '';
        if (this.field == 'name') {
            this.name = 'Boat Name';
            this.description = 'Some name to identify this BoatOfficer-device';
            this.value = this.dataService.deviceData[this.idDevice].name;
            this.icon = 'O';
        } else if (this.field == 'berth') {
            this.name = 'Berth';
            this.description = 'Some name for the berth, where the boat is located';
            this.value = this.dataService.deviceData[this.idDevice].berth;
            this.iconfont = 'fas';
            this.icon = '';
        } else if (this.field == 'contact') {
            this.name = 'Contact number';
            this.description = 'The contact number you want to call in case of a critical alarm';
            this.value = this.dataService.deviceData[this.idDevice].harbour_contact;
            this.type = 'phone';
            this.icon = 'T';
        }


    }

    saveDeviceSetting() {
        console.log('Save index:' + this.type + ' value: ' + this.value);
        if (this.field == 'name') {
            this.dataService.deviceData[this.idDevice].name = this.value;
        } else if (this.field == 'berth') {
            this.dataService.deviceData[this.idDevice].berth = this.value;
        } else if (this.field == 'contact') {
            this.dataService.deviceData[this.idDevice].harbour_contact = this.value;
        }
        this.apiService.saveDeviceSettings(
            this.dataService.deviceData[this.idDevice].id,
            this.dataService.deviceData[this.idDevice].name,
            this.dataService.deviceData[this.idDevice].berth,
            this.dataService.deviceData[this.idDevice].harbour_contact
            );
        this.dataService.refreshBoatStatus();
        this.goBack();
    }


    goBack() {
        this.router.backToPreviousPage();
    }
}
