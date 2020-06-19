import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {AuthService} from '~/app/shared/auth.service';

// import {BarcodeScanner} from 'nativescript-barcodescanner';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    moduleId: module.id
})

export class LogoutComponent implements OnInit {

    isLoading = false;

    constructor(
        private authService: AuthService,
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
        this.authService.logout();
        const options = {
            title: 'Logout successfull',
            // message: 'Race chosen: Unicorn',
            okButtonText: 'OK'
        };
        alert(options);
        this.isLoading = false;
        this.router.navigate(['']);
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
