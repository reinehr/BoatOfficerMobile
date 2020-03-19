import {Component, OnInit} from '@angular/core';
import {ApiService} from '~/app/shared/api.service';
import {Sensordata} from '~/app/shared/interface/sensordata';
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';

@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    moduleId: module.id,
})
export class AlarmComponent implements OnInit {
    sensorData: Sensordata;
    temperatureHistory: {'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string}[];
    intBattVolt: {'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string}[];
    intBattVoltMin = new Date(Date.now());
    intBattVoltMax = new Date(Date.now());
    intBattVoltMinStr = '';
    intBattVoltMaxStr = `${this.intBattVoltMax.getDate()}/${this.intBattVoltMax.getMonth() + 1}/${this.intBattVoltMax.getFullYear()}`;
    intTempMin = new Date(Date.now());
    intTempMax = new Date(Date.now());
    intTempMinStr = '';
    intTempMaxStr = `${this.intTempMax.getDate()}/${this.intTempMax.getMonth() + 1}/${this.intTempMax.getFullYear()}`;

    constructor(
        private apiService: ApiService
    ) {
    }
    onScroll(args: ScrollEventData) {
        const scrollView = args.object as ScrollView;

        console.log('scrollX: ' + args.scrollX);
        console.log('scrollY: ' + args.scrollY);
    }
    ngOnInit(): void {
        // this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        // this.intBattVolt = this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31);
        // this.sensorData = this.apiService.getLatestSensorData();
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    click_gear() {
        // this.sensorData = this.apiService.getLatestSensorData();
        // this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.intBattVolt = this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31);
        for (const intSens of this.intBattVolt) {
            const date = new Date(intSens.date);
            if (date < this.intBattVoltMin) {
                this.intBattVoltMin = date;
                this.intBattVoltMinStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }
        }
        for (const intSens of this.temperatureHistory) {
            const date = new Date(intSens.date);
            if (date < this.intTempMin) {
                this.intTempMin = date;
                this.intTempMinStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }
        }
    }

}
