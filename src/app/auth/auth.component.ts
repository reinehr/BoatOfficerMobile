import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {AuthService} from '~/app/shared/auth.service';
import {RouterExtensions} from 'nativescript-angular/router';
import {DataService} from '~/app/shared/data.service';

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
                this.isLoading = false;
                this.router.navigate(['']);
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        } else {
            this.authService.signUp(this.email, this.password).subscribe(resData => {
                this.dataService.refreshBoatStatus();
                this.isLoading = false;
                this.router.navigate(['']);
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
