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
    temperatureHistory: {'min': number, 'max': number, 'milliseconds': number}[];
    intBattVolt: {'min': number, 'max': number, 'milliseconds': number}[];

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
        this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.intBattVolt = this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31);
        this.sensorData = this.apiService.getLatestSensorData();
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    click_gear() {
        this.sensorData = this.apiService.getLatestSensorData();
        // this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.temperatureHistory = this.apiService.getIntTemperatureHistory();
        this.intBattVolt = this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31);
        // console.log(this.temperatureHistory);
    }

}
