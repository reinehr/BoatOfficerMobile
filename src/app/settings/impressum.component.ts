import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {AuthService} from '~/app/shared/auth.service';
import {DataService} from "~/app/shared/data.service";
import { alert } from "@nativescript/core/ui/dialogs";
import {localize} from "nativescript-localize";
import * as utils from "@nativescript/core/utils/utils";

// import {BarcodeScanner} from 'nativescript-barcodescanner';

@Component({
    selector: 'app-impressum',
    templateUrl: './impressum.component.html',
    moduleId: module.id
})

export class ImpressumComponent implements OnInit {

    isLoading = false;

    constructor(
        private router: RouterExtensions,
    ) {
    }

    ngOnInit() {
    }

    goBack() {
        this.router.backToPreviousPage();
    }

    tapTerms() {
        utils.openUrl("https://boatofficer.com/app/eula")
    }

    tapPrivacy() {
        utils.openUrl("https://boatofficer.com/privacy")
    }
}
