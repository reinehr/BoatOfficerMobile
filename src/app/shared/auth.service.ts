import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
import {catchError, tap} from 'rxjs/internal/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {alert} from 'tns-core-modules/ui/dialogs';
// import {User} from '~/app/auth/user.model';

const FIREBASE_API_KEY = 'AIzaSyAJ-aGPt9y4MPIdBpdCEBGhRTlzZp695M0';
const appSettings = require('application-settings');

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localID: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    logInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;


    constructor(
        private httpClient: HttpClient
    ) {
    }

    signUp(email: string, password: string) {
        console.log(`EMAIL: ${email}`);
        return this.httpClient.post<AuthResponseData>(this.signInUrl,
            {email, password, returnSecureToken: true}
        ).pipe(catchError(errorRes => {
                this.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            tap(resData => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localID, parseInt(resData.expiresIn, 10));
                }
            })
        );
    }

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(this.logInUrl,
            {email, password, returnSecureToken: true}
        ).pipe(catchError(errorRes => {
                this.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            tap(resData => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localID, parseInt(resData.expiresIn, 10));
                }
            })
        );
    }

    private handleLogin(email: string, token: string, userId: string, expiresIn: number) {
        const expirationtime = new Date(new Date().getTime() + expiresIn * 1000);
        appSettings.setString('token', token);
        // appSettings.setString('email', email);
        // appSettings.setString('userId', userId);
        // appSettings.setString('expirationtime', expirationtime);
        console.log(`current token0: ${token}`);
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('This email address exists already');
                break;
            case 'INVALID_PASSWORD':
                alert('Invalid password');
                break;
            case 'INVALID_EMAIL':
                alert('Invalid email address');
                break;
            default:
                alert('Authentication failed');
                break;
        }
    }
}
