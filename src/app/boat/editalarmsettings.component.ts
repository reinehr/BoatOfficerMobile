import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsDatatypeMapOrderedByIndex, alarmSettingsMap} from '~/app/shared/interface/alarm';
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
    listPickerWidth = 400;
    selectedIndexAtOpen = 0;


    ngOnInit(): void {
        const alarm = alarmSettingsMap[this.field][this.idAlarm];
        const isPro = this.dataService.boatStatus[this.idDevice].purchases.is_pro;
        if (!alarmSettingsDatatypeMap[alarm.datatype]) {
            if (!alarm.alarm_edit_decimals)
            {
                for (let i = alarm.min; i <= (isPro ? alarm.max_pro : alarm.max); i++) {
                    if (parseInt(this.dataService.alarmSettings[this.idDevice][alarm.key].value_device, 10) === i) {
                        this.originalAlarmSettingIndex = this.listPicker.length;
                        this.selectedListPickerIndex = this.originalAlarmSettingIndex;
                    }
                    const listPickerString = stringify(i) + ' ' + alarm.unit;
                    this.listPicker.push(listPickerString);
                    if (listPickerString.length * 15 > this.listPickerWidth) {
                        this.listPickerWidth = listPickerString.length * 15;
                    }
                }
            }
            else
            {
                for (let i = (alarm.min * 10); i <= 10 * (isPro ? alarm.max_pro : alarm.max); i++) {
                    if (Math.round((parseFloat((this.dataService.alarmSettings[this.idDevice][alarm.key].value_device)) * 10)) === i) {
                        this.originalAlarmSettingIndex = this.listPicker.length;
                        this.selectedListPickerIndex = this.originalAlarmSettingIndex;
                    }
                    const listPickerString = stringify((i/10)) + ' ' + alarm.unit;
                    this.listPicker.push(listPickerString);
                    if (listPickerString.length * 15 > this.listPickerWidth) {
                        this.listPickerWidth = listPickerString.length * 15;
                    }
                }
            }
        } else {
            for (let i = alarm.min; i <= (isPro ? alarm.max_pro : alarm.max); i++) {
                if (parseInt(this.dataService.alarmSettings[this.idDevice][alarm.key].value_device, 10) === alarmSettingsDatatypeMapOrderedByIndex[alarm.datatype][i].value) {
                    this.originalAlarmSettingIndex = this.listPicker.length;
                    this.selectedListPickerIndex = this.originalAlarmSettingIndex;
                    console.log('value_device: ' + i + ' originalSettingIndex: ' + this.originalAlarmSettingIndex);
                }
                const listPickerString = stringify(alarmSettingsDatatypeMapOrderedByIndex[alarm.datatype][i].name) + ' ' + alarmSettingsDatatypeMapOrderedByIndex[alarm.datatype][i].unit;
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
        if (-1 != picker.selectedIndex)
        {
            this.selectedListPickerIndex = picker.selectedIndex;
            if (!alarmSettingsDatatypeMap[alarm.datatype]) {
                if (!alarm.alarm_edit_decimals) {
                    this.selectedAlarmValue = picker.selectedIndex + alarm.min;
                }
                else
                {
                    this.selectedAlarmValue = (picker.selectedIndex/10) + alarm.min;
                }
            } else {
                this.selectedAlarmValue = alarmSettingsDatatypeMapOrderedByIndex[alarm.datatype][picker.selectedIndex].value;
            }
            console.log('selected alarm value: ' + this.selectedAlarmValue);
        }
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
