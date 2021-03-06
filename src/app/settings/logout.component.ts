import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {AuthService} from '~/app/shared/auth.service';
import {DataService} from "~/app/shared/data.service";
import { alert } from "@nativescript/core/ui/dialogs";
import {localize} from "nativescript-localize";
import {ApiService} from "~/app/shared/api.service";
import {hasKey, remove} from "@nativescript/core/application-settings";

// import {BarcodeScanner} from 'nativescript-barcodescanner';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    moduleId: module.id
})

export class LogoutComponent implements OnInit {

    isLoading = false;

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: RouterExtensions,
        private dataService: DataService,
    ) {
    }

    ngOnInit() {
    }

    saveForm() {
        this.isLoading = true;
        this.apiService.logout().subscribe(resData => {
            const options = {
                title: localize('Logout successful'),
                okButtonText: 'OK'
            };
            this.dataService.deviceData = [];
            this.isLoading = false;
            this.authService.logout();
            alert(options).then(() => {
                this.router.navigate([''], { clearHistory: true });
            });
        });
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
