import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {RouterExtensions} from 'nativescript-angular/router';
import {localize} from "nativescript-localize";

// import {BarcodeScanner} from 'nativescript-barcodescanner';

@Component({
    selector: 'app-scan',
    templateUrl: './scan.component.html',
    moduleId: module.id
})

export class ScanComponent implements OnInit {

    isLoading = false;
    serialNumber = '';
    registrationKey = '';
    deviceName = '';

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
        console.log('registering Device ... ', this.serialNumber);
        const serialNumberString = this.serialNumber.replace(/\D/g, "");
        const year = parseInt(serialNumberString.substr(0,2));
        const week = parseInt(serialNumberString.substr(2,2));
        const producer = parseInt(serialNumberString.substr(4,2));
        const productNumber = parseInt(serialNumberString.substr(6,4));
        const serialNumberDec = ((year * Math.pow(2, 6) + week) * Math.pow(2, 6) + producer) * Math.pow(2, 13) + productNumber;
        console.log('registering Device ... ', serialNumberDec);
        const serialNumberHex = '0x' + serialNumberDec.toString(16);
        console.log('registering Device ... ', serialNumberHex);


        this.isLoading = true;
        this.apiService.registerDevice(serialNumberHex, this.registrationKey, this.deviceName).subscribe(response => {
            console.log('registering Device ... ', response);
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
