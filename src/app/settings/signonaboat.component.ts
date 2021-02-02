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
        const boatofficerIdString = this.boatofficerId.replace(/[^(0-9a-gA-G)]/g, "");
        console.log('Hire on a Boat ... ', boatofficerIdString);
        const serialNumberString = boatofficerIdString.substr(0, 10).replace(/\D/g, "");
        console.log('Hire on a Boat ... ', serialNumberString);
        const year = parseInt(serialNumberString.substr(0,2));
        const week = parseInt(serialNumberString.substr(2,2));
        const producer = parseInt(serialNumberString.substr(4,2));
        const productNumber = parseInt(serialNumberString.substr(6,4));
        const apiKey = boatofficerIdString.substr(10,5);
        const serialNumberDec = ((year * Math.pow(2, 6) + week) * Math.pow(2, 6) + producer) * Math.pow(2, 13) + productNumber;
        console.log('registering Device ... ', serialNumberDec);
        const serialNumberHex = '0x' + serialNumberDec.toString(16);
        console.log('registering Device ... ', serialNumberHex);


        this.isLoading = true;
        this.apiService.addDeviceCandidate(serialNumberHex, apiKey).subscribe(response => {
            console.log('sign up as candidate... ', response);
            if (response === 'SUCCESS') {
                this.router.navigate(['']);
            } else {
                const options = {
                    title: localize(response),
                    okButtonText: 'OK'
                };
                alert(options);
            }
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
        });

    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
