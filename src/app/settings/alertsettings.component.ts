import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router';
import {EventData} from 'tns-core-modules/data/observable';
import {Switch} from 'tns-core-modules/ui/switch';
import {ListPicker} from 'tns-core-modules/ui/list-picker';

@Component({
    selector: 'app-alertsettings',
    templateUrl: './alertsettings.component.html'
})
export class AlertsettingsComponent implements OnInit {
    isChecked = false;
    minTempList = [-20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    minTemp = 0;
    minTempIndex = 20;

    constructor(private router: RouterExtensions) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    onCheckedShockChange(args: EventData) {
        const sw = args.object as Switch;
        this.isChecked = sw.checked; // boolean
    }


    public onSelectedMinTempChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        this.minTemp = this.minTempList[picker.selectedIndex];
        this.minTempIndex = picker.selectedIndex;
        console.log(`index: ${picker.selectedIndex}; item" ${this.minTempList[picker.selectedIndex]}`);
    }
}
