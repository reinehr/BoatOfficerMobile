import {Component, Input} from '@angular/core';
import {isAndroid } from '@nativescript/core/platform';
import {Page} from '@nativescript/core/ui/page';
import {RouterExtensions} from 'nativescript-angular/router';

@Component({
    selector: 'alarm-card-4segments-title',
    moduleId: module.id,
    templateUrl: './alarm-card-4segments-title.component.html',
})
export class AlarmCard4segmentsTitleComponent {
    @Input() title: string;
    @Input() subtitletop: string;
    @Input() subtitlebottom: string;
    @Input() updatedatetime: string;
    @Input() warning: string;

    constructor() {
    }


}
