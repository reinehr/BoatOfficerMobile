import {Component, OnInit} from '@angular/core';
import {ApiService} from '~/app/shared/api.service';
import {Sensordata} from '~/app/shared/interface/sensordata';

@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
})
export class AlarmComponent implements OnInit {
    sensorData: Sensordata;
    temperatureHistory: {'min': number, 'max': number, 'day': number, 'date': string, 'milliseconds': number}[];
    intBattVolt: {'min': number, 'max': number, 'day': number, 'date': string, 'milliseconds': number}[];

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.intBattVolt = this.apiService.getSensorHistoryByField('IntBattVolt', 5, 31);
        this.sensorData = this.apiService.getLatestSensorData();
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    click_gear() {
        this.sensorData = this.apiService.getLatestSensorData();
        // this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.intBattVolt = this.apiService.getSensorHistoryByField('IntBattVolt', 5, 31);
        console.log(this.temperatureHistory);
    }

}
