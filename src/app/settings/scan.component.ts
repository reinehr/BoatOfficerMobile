import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {RouterExtensions} from '@nativescript/angular';
import {localize} from "nativescript-localize";
import {Md5} from "ts-md5/dist/md5"
import { isAndroid } from '@nativescript/core/platform';

import {BarcodeScanner} from 'nativescript-barcodescanner';

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

    scanBarcode() {
        new BarcodeScanner().scan({
            formats: "QR_CODE, EAN_13",
            closeCallback: () => {
                console.log("Scanner closed")
            }, // invoked when the scanner was closed (success or abort)
            openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
        }).then((result) => {
                // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
                let productNumberScan = '';
                let webKeyScan = '';
                let serialNumberScan = '';
                [productNumberScan, serialNumberScan, webKeyScan] = result.text.replace(/.*\/d\//g, "").split('-');
                let md5 = Md5.hashStr(serialNumberScan).toString().substr(0,3);
                serialNumberScan = ("00000000000000000000000000000000" + (parseInt(serialNumberScan, 16)).toString(2)).substr(-32);
                const year = ("0000" + (parseInt(serialNumberScan.substr(0,7), 2).toString(10))).substr(-2);
                const week = ("0000" + (parseInt(serialNumberScan.substr(7,6), 2).toString(10))).substr(-2);
                const producer = ("0000" + (parseInt(serialNumberScan.substr(13,6), 2).toString(10))).substr(-2);
                const productNumber = ("0000" + (parseInt(serialNumberScan.substr(19,13), 2).toString(10))).substr(-4);
                this.serialNumber = year + '-' + week + '-' + producer + '-' + productNumber + '-' + md5;

            }, (errorMessage) => {
                console.log("No scan. " + errorMessage);
            }
        );
    }

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
