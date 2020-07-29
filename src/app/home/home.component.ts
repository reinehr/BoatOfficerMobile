import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Page} from 'tns-core-modules/ui/page/page';
import {DataService, DeviceAlarmDataFormat} from '../shared/data.service';
import {Subscription} from "rxjs";
import {ApiService} from "~/app/shared/api.service";

@Component({
    selector: 'Home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor(// private _itemService: DataService,
        private page: Page,
        private apiService: ApiService,
        private dataService: DataService
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void {
        // this.items = this._itemService.getItems();
        this.page.actionBarHidden = true;
    }

    ngAfterViewInit(): void {
    }

    onButtonTap(): void {
        console.log('Button was pressed');
    }

    refreshList(args) {
        const pullRefresh = args.object;
        // this.dataService.refreshSensorDataHistory();
        this.dataService.refreshBoatStatus();
        pullRefresh.refreshing = false;
    }
}
