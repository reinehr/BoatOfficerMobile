import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {AuthService} from '~/app/shared/auth.service';
import {RouterExtensions} from 'nativescript-angular/router';
import {DataService} from '~/app/shared/data.service';
import {alert} from 'tns-core-modules/ui/dialogs';
import {localize} from 'nativescript-localize';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    moduleId: module.id
})

export class AuthComponent implements OnInit {

    registerMode = false;
    resetMode = false;
    isLoading = false;
    email: '';
    password: '';
    passwordRepeat: '';

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
        if (!this.registerMode && !this.resetMode && !(this.email === '') && !(this.password === '')) {
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
        } else if (this.resetMode && !(this.email === '')) {
            this.authService.resetPassword(this.email);
            const options = {
                title: localize('Password reset successful'),
                message: localize('We sent you a reset link to your E-Mail address'),
                okButtonText: 'OK'
            };
            alert(options).then(() => {
                this.router.navigate([''], { clearHistory: true });
            });
            this.isLoading = false;
        } else if (!(this.email === '') && !(this.password === '')) {
            if (this.password === this.passwordRepeat) {
                this.authService.signUp(this.email, this.password).subscribe(resData => {
                    this.dataService.refreshBoatStatus();
                    const options = {
                        title: localize('Registration successful'),
                        message: localize('You are now logged in'),
                        okButtonText: 'OK'
                    };
                    alert(options).then(() => {
                        this.router.navigate([''], {clearHistory: true});
                    });
                    this.isLoading = false;
                }, error => {
                    console.log(error);
                    this.isLoading = false;
                });
            } else {
                this.isLoading = false;
                const options = {
                    title: localize('Passwords not identical'),
                    message: localize('Please re-enter the password'),
                    okButtonText: 'OK'
                };
                alert(options);
            }
        }
    }

    goBack() {
        if (!this.registerMode && !this.resetMode) {
            this.routerExtensions.backToPreviousPage();
        }
        this.resetMode = false;
        this.registerMode = false;
    }
}
