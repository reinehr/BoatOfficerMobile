import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {RouterExtensions} from '@nativescript/angular';
import {localize} from "nativescript-localize";


@Component({
    selector: 'app-scan',
    templateUrl: './editpersonaldata.component.html',
    moduleId: module.id
})

export class EditpersonaldataComponent implements OnInit {

    isLoading = false;
    firstname = '';
    name = '';
    phonenumber = '';

    constructor(
        private apiService: ApiService,
        private router: RouterExtensions,
    ) {
    }

    ngOnInit() {
        this.apiService.getUserData().subscribe(resData => {
            this.firstname = resData.firstname;
            this.name = resData.name
            this.phonenumber = resData.phone
        })
    }


    saveForm() {
        console.log('Saving personal data ... ');

        this.isLoading = true;
        this.apiService.editUserData(this.firstname, this.name, this.phonenumber).subscribe(
            resData => {
                this.isLoading = false;
                this.router.backToPreviousPage();
            }
        );


    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
