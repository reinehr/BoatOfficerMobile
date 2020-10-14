import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsMap} from '~/app/shared/interface/alarm';
import {stringify} from "@angular/compiler/src/util";


@Component({
    selector: 'app-editalarmsettings',
    templateUrl: './editalarmsettings.component.html'
})
export class EditalarmsettingsComponent implements OnInit {

    constructor(
        private router: RouterExtensions,
        private apiService: ApiService,
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.field = params.field;
            this.idDevice = params.idDevice;
            this.idAlarm = params.idAlarm;
        });
    }

    alarmSettingsMap = alarmSettingsMap;
    alarmSettingsDatatypeMap = alarmSettingsDatatypeMap;
    sensorFieldKeys = Object.keys(alarmSettingsMap);
    public idDevice = 0;
    public idAlarm = 0;
    public field = '';
    private isLoading = false;
    // listPicker: {[ttnValue: number]: string} = {0: '0V', 1: '1V', 2: '2V'};
    listPicker: Array<string> = [];
    listPickerAlarmMap: Array<string> = [];
    originalAlarmSettingIndex = 0;
    selectedListPickerIndex = 0;
    selectedAlarmValue = 0;
    listPickerWidth = 50;


    ngOnInit(): void {
        const alarm = alarmSettingsMap[this.field][this.idAlarm];
        if (!alarmSettingsDatatypeMap[alarm.datatype]) {
            for (let i = alarm.min; i <= alarm.max; i++) {
                if (parseInt(this.dataService.alarmSettings[this.idDevice][alarm.key].value_device, 10) === i) {
                    this.originalAlarmSettingIndex = this.listPicker.length;
                    this.selectedListPickerIndex = this.originalAlarmSettingIndex;
                }
                const listPickerString = stringify(i) + alarm.unit;
                this.listPicker.push(listPickerString);
                if (listPickerString.length * 15 > this.listPickerWidth) {
                    this.listPickerWidth = listPickerString.length * 15;
                }
            }
        } else {
            for (let i = alarm.min; i <= alarm.max; i++) {
                if (parseInt(this.dataService.alarmSettings[this.idDevice][alarm.key].value_device, 10) === i) {
                    this.originalAlarmSettingIndex = this.listPicker.length;
                    this.selectedListPickerIndex = this.originalAlarmSettingIndex;
                }
                const listPickerString = stringify(alarmSettingsDatatypeMap[alarm.datatype][i].name) + ' ' + alarmSettingsDatatypeMap[alarm.datatype][i].unit;
                this.listPicker.push(listPickerString);
                if (listPickerString.length * 15 > this.listPickerWidth) {
                    this.listPickerWidth = listPickerString.length * 15;
                }
            }
        }


    }

    saveAlarmSetting() {
        console.log('Save index:' + this.selectedListPickerIndex + ' value: ' + this.selectedAlarmValue);
        this.apiService.saveAlarmSettings(this.idDevice, alarmSettingsMap[this.field][this.idAlarm].key, this.selectedAlarmValue);
        // this.dataService.refreshBoatStatus();
        this.goBack();
    }

    selectedIndexChanged(picker) {
        const alarm = alarmSettingsMap[this.field][this.idAlarm];
        console.log('picker selection: ' + picker.selectedIndex);
        this.selectedListPickerIndex = picker.selectedIndex;
        this.selectedAlarmValue = picker.selectedIndex + alarm.min;
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
