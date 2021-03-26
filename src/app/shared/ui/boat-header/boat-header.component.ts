import {Component, Input} from '@angular/core';
import {isAndroid } from '@nativescript/core/platform';
import {Page} from '@nativescript/core/ui/page';
import {RouterExtensions} from 'nativescript-angular/router';

@Component({
    selector: 'boat-header',
    moduleId: module.id,
    templateUrl: './boat-header.component.html',
    //styleUrls: ['./boat-header.component.css', ]
})
export class BoatHeaderComponent {
    @Input() boatname: string;
    @Input() boat_image_small: string;
    @Input() role: string;
    @Input() numberOfActiveAlarms: number;
    @Input() deviceType: string;

    constructor() {
    }


}
