import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {RouterExtensions} from 'nativescript-angular/router';
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
    }


    saveForm() {
        console.log('Saving personal data ... ');

        this.isLoading = true;


    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
