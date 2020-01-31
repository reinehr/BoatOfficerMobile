import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { TextField } from 'tns-core-modules/ui/text-field';
import { RouterExtensions } from '@nativescript/angular';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})

export class AuthComponent implements OnInit {
  form: FormGroup;
  usernameControlIsValid = true;
  passwordControlIsValid = true;
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: RouterExtensions
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      // this.router.navigate(['/movies']);
    }
  }
  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        (result) => {
          this.loginUser();
        },
        (error) => console.log(error)
      );
    }
  }
  loginUser() {
    // const username = this.authForm.get('username').value;
    // const password = this.authForm.get('password').value;
    console.log(this.form.value);
  //   this.apiService.loginUser(this.authForm.value).subscribe(
  //     (result: TokenObj) => {
  //       this.cookieService.set('mr-token', result.token);
  //       // this.router.navigate(['/movies']);
  //     },
  //     (error) => console.log(error)
  //   );
  }
}
