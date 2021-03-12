import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router';
import {hasKey, getString} from '@nativescript/core/application-settings';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    constructor(private router: RouterExtensions) {
        // Use the constructor to inject services.
    }

    hasKey = hasKey('token');
    hasEmail = hasKey('email');
    email = getString('email');

    ngOnInit(): void {
        this.hasKey = hasKey('token');
        this.hasEmail = hasKey('email');
        if (this.hasEmail) {
            this.email = getString('email');
        } else {
            this.email = '';
        }
    }
}
