import {Component, OnInit} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import {ScrollView, ScrollEventData} from 'tns-core-modules/ui/scroll-view';
import {Subject, Subscription} from 'rxjs';

registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);




@Component({
    selector: 'app-alarm',
    templateUrl: './alarm.component.html',
    moduleId: module.id,
})
export class AlarmComponent implements OnInit {
    isLoading = false;
    private intBattVoltSub: Subscription;
    private temperatureSub: Subscription;
    intBattVolt: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[] = [];
    intBattVoltMin = new Date(Date.now());
    intBattVoltMax = new Date(Date.now());
    intBattVoltMinStr = '';
    intBattVoltMaxStr = `${this.intBattVoltMax.getDate()}/${this.intBattVoltMax.getMonth() + 1}/${this.intBattVoltMax.getFullYear()}`;
    intTemp: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[] = [];
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
        this.intBattVoltSub = this.apiService.currentSensorHistoryData.subscribe(
            history => {
                if (history) {
                    console.log(`sensorDataHostory: ${history}`);

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
        this.temperatureSub = this.apiService.currentTemperatureHistoryData.subscribe(
            history => {
                if (history) {
                    console.log(`temperatureHostory: ${history}`);
                    this.intTemp = history;

                    for (const intSens of history) {
                        const date = new Date(intSens.date);
                        if (date < this.intTempMin) {
                            this.intTempMin = date;
                            this.intTempMinStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
        this.isLoading = true;
        this.apiService.getIntTemperatureHistory(1, 31).subscribe(response => {
            console.log('SensorData loading ...');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    click_gear() {
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
        if (this.intBattVoltSub) {
            this.intBattVoltSub.unsubscribe();
        }
    }
}
