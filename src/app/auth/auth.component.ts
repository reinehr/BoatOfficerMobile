import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthService} from '~/app/shared/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    moduleId: module.id
})

export class AuthComponent implements OnInit {

    emailControlIsValid = true;
    passwordControlIsValid = true;
    // @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
    registerMode = false;
    isLoading = false;
    email: 'x';
    password: 'x';

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: RouterExtensions
    ) { }

    ngOnInit() {
        const boToken = this.cookieService.get('bo-token');
        if (boToken) {
          // this.router.navigate(['/movies']);
        }
    }

    saveForm() {
        this.isLoading = true;
        if (!this.registerMode) {
            this.authService.login(this.email, this.password).subscribe(resData => {
                this.isLoading = false;
                this.router.navigate(['']);
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        } else {
            this.authService.signUp(this.email, this.password).subscribe(resData => {
                this.isLoading = false;
                this.router.navigate(['']);
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        }
    }
}
