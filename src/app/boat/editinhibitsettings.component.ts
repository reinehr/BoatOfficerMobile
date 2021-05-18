import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {alarmSettingsDatatypeMap, alarmSettingsDatatypeMapOrderedByIndex, alarmSettingsMap} from '~/app/shared/interface/alarm';
import { DatePicker } from "@nativescript/core/ui/date-picker";
import { TimePicker } from "@nativescript/core/ui/time-picker";
import {isAndroid, isIOS} from "@nativescript/core/platform";


@Component({
    selector: 'app-editinhibitsettings',
    templateUrl: './editinhibitsettings.component.html'
})
export class EditinhibitsettingsComponent implements OnInit {

    constructor(
        private router: RouterExtensions,
        public apiService: ApiService,
        public dataService: DataService,
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

    selectedDate: Date = new Date();
    minDate: Date = new Date();
    twoYears = 720 * 60 * 60 * 24 * 1000;
    maxDate: Date = new Date(this.minDate.getTime() + this.twoYears);

    ngOnInit(): void {
        const alarm = alarmSettingsMap[this.field][this.idAlarm];
    }

    onTimeChanged(args) {
        const time = args.value;
        let timeDate = new Date(time);
        this.selectedDate.setHours(timeDate.getHours());
        this.selectedDate.setMinutes(timeDate.getMinutes());
        console.log(`Chosen time: ${this.selectedDate}`);
    }

    onDateChanged(args) {
        const date = args.value;
        let timeDate = new Date(date);
        this.selectedDate.setFullYear(timeDate.getFullYear());
        this.selectedDate.setMonth(timeDate.getMonth());
        this.selectedDate.setDate(timeDate.getDate());
        console.log("Date New value: " + this.selectedDate);
    }


    goBack() {
        this.router.backToPreviousPage();
    }

    saveAlarmSetting() {
        this.dataService.isLoading = true
        this.apiService.saveAlarmInhibitSettings(this.idDevice, alarmSettingsMap[this.field][this.idAlarm].key, this.selectedDate).subscribe(
            () => {
                this.dataService.refreshBoatStatus();
                this.goBack();
            }
        );
    }

}
