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
    }

    click_gear() {
    }

    refreshList(args) {
    }
}
