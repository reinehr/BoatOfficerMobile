import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router';
import {hasKey} from 'tns-core-modules/application-settings';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    constructor(private router: RouterExtensions) {
        // Use the constructor to inject services.
    }

    hasKey = hasKey('token');

    ngOnInit(): void {
        this.hasKey = hasKey('token');
    }
}
