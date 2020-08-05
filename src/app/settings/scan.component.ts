import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {RouterExtensions} from 'nativescript-angular/router';

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
        this.isLoading = true;
        this.apiService.registerDevice(this.serialNumber, this.registrationKey, this.deviceName).subscribe(response => {
            console.log('registring Device ... ', response);
            if (response === 'SUCCESS') {
                this.router.navigate(['']);
            } else {
                const options = {
                    title: response,
                    // message: 'Race chosen: Unicorn',
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
