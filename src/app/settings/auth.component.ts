import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
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
    email: 'x';
    password: 'x';

    constructor(
        private apiService: ApiService,
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
        console.log('email: ', this.email, ' pw: ', this.password);
        // if (!this.registerMode) {
        //     this.apiService.login(this.form.get('email').value, this.form.get('password').value);
        // } else {
        //     this.apiService.signUp(this.form.get('email').value, this.form.get('password').value);
        // }
    }
}
