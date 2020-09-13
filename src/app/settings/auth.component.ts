import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {AuthService} from '~/app/shared/auth.service';
import {RouterExtensions} from 'nativescript-angular/router';
import {DataService} from '~/app/shared/data.service';
import {alert} from "tns-core-modules/ui/dialogs";
import {localize} from "nativescript-localize";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    moduleId: module.id
})

export class AuthComponent implements OnInit {

    registerMode = false;
    isLoading = false;
    email: '';
    password: '';

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private dataService: DataService,
        private router: RouterExtensions,
        private routerExtensions: RouterExtensions
    ) {
    }

    ngOnInit() {
    }

    saveForm() {
        this.isLoading = true;
        if (!this.registerMode) {
            this.authService.login(this.email, this.password).subscribe(resData => {
                this.dataService.refreshBoatStatus();
                const options = {
                    title: localize('Login successful'),
                    message: localize('You are now logged in'),
                    okButtonText: 'OK'
                };
                alert(options).then(() => {
                    this.router.navigate([''], { clearHistory: true });
                });
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        } else {
            this.authService.signUp(this.email, this.password).subscribe(resData => {
                this.dataService.refreshBoatStatus();
                const options = {
                    title: localize('Registration successful'),
                    message: localize('You are now logged in'),
                    okButtonText: 'OK'
                };
                alert(options).then(() => {
                    this.router.navigate([''], { clearHistory: true });
                });
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        }
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
