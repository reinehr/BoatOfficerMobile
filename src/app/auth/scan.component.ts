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
}
