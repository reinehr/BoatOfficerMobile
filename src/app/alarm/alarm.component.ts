import {Component, OnInit} from '@angular/core';
import {ApiService} from '~/app/shared/api.service';
import {Sensordata} from '~/app/shared/interface/sensordata';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subject, Subscription} from 'rxjs';
import {registerElement} from 'nativescript-angular/element-registry';

registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);


@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    moduleId: module.id,
})
export class AlarmComponent implements OnInit {
    isLoading = false;
    sensorData: Sensordata;
    sensorDataHistory: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[];
    private sensordataSub: Subscription;
    intBattVolt: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[] = [];
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
        // this.apiService.sensorHistory = [];
        this.sensordataSub = this.apiService.currentSensorHistoryData.subscribe(
            history => {
                if (history) {
                    console.log(`sensorDataHostory: ${history}`);
                    this.sensorDataHistory = history;

                    this.intBattVolt = history;
                    for (const intSens of history) {
                        const date = new Date(intSens.date);
                        if (date < this.intBattVoltMin) {
                            this.intBattVoltMin = date;
                            this.intBattVoltMinStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                        }
                    }
                } else {
                    console.log('no History');
                }
            }
        );

        this.isLoading = true;
        this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    click_gear() {
        this.isLoading = true;
        this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    refreshList(args) {
        const pullRefresh = args.object;
        this.isLoading = false;
        this.apiService.getSensorHistoryByField('IntBattVolt', 1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
            pullRefresh.refreshing = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            pullRefresh.refreshing = false;
        });
    }

    ngOnDestroy() {
        if (this.sensordataSub) {
            this.sensordataSub.unsubscribe();
        }
    }
}
