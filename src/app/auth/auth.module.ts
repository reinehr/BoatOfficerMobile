import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from '~/app/auth/auth-routing.module';

const routes: Routes = [
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    NativeScriptCommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: [
    AuthRoutingModule
  ],
  providers: [
    CookieService
  ]
})
export class AuthModule { }
