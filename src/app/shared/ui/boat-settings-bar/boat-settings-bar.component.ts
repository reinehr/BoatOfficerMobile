import {Component, Input} from '@angular/core';
import {isAndroid } from '@nativescript/core/platform';
import {Page} from '@nativescript/core/ui/page';
import {RouterExtensions} from 'nativescript-angular/router';

@Component({
    selector: 'boat-settings-bar',
    moduleId: module.id,
    templateUrl: './boat-settings-bar.component.html',
    //styleUrls: ['./boat-header.component.css', ]
})
export class BoatSettingsBarComponent {
    @Input() role: string;
    @Input() deviceType: string;
    @Input() idDevice: number;
    @Input() numCandidates: number;

    constructor() {
    }


}
