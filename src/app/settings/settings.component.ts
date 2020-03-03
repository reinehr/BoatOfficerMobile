import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    constructor(private router: RouterExtensions) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
