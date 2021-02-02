import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {RouterExtensions} from 'nativescript-angular/router';
import {localize} from "nativescript-localize";

// import {BarcodeScanner} from 'nativescript-barcodescanner';

@Component({
    selector: 'app-scan',
    templateUrl: './signonaboat.component.html',
    moduleId: module.id
})

export class SignonaboatComponent implements OnInit {

    isLoading = false;
    boatofficerId = '';

    constructor(
        private apiService: ApiService,
        private router: RouterExtensions,
    ) {
    }

    ngOnInit() {
    }

    // scanBarcode() {
    //     new BarcodeScanner().scan({});
    // }
    saveForm() {
        console.log('Hire on a Boat ... ', this.boatofficerId);

        this.isLoading = true;

    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
