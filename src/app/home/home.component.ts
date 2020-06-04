import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Page} from 'tns-core-modules/ui/page/page';
import {DataService, DataItem, DeviceAlarmDataFormat} from '../shared/data.service';
import {Subscription} from "rxjs";
import {ApiService} from "~/app/shared/api.service";

@Component({
    selector: 'Home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
    // items: Array<DataItem>;
    private devicedataSub: Subscription;
    deviceData: DeviceAlarmDataFormat[];
    private isLoading: boolean;

    constructor(// private _itemService: DataService,
                private page: Page,
                private apiService: ApiService) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void {
        // this.items = this._itemService.getItems();
        this.page.actionBarHidden = true;

        this.devicedataSub = this.apiService.deviceData.subscribe(
            ddata => {
                if (ddata) {
                    this.deviceData = ddata;
                } else {
                    console.log('no Device');
                }
            }
        );
    }

    ngAfterViewInit(): void {
        this.isLoading = true;
        this.apiService.getDeviceData().subscribe(response => {
            console.log('DeviceData loading ........+');
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    onButtonTap(): void {
        console.log('Button was pressed');
    }
}
