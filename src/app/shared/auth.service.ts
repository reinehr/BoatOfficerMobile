import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
import {catchError, tap, timeout} from 'rxjs/internal/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {alert} from '@nativescript/core/ui/dialogs';
// import {User} from '~/app/auth/user.model';
import {getString, setString, hasKey, remove} from '@nativescript/core/application-settings';
import {localize} from 'nativescript-localize';
import {firebase} from 'nativescript-plugin-firebase/firebase-common';
require('nativescript-plugin-firebase/firebase-common');
const FIREBASE_API_KEY = 'AIzaSyAJ-aGPt9y4MPIdBpdCEBGhRTlzZp695M0';

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
                    firebase.login(
                        {
                            type: firebase.LoginType.PASSWORD,
                            passwordOptions: {
                                email,
                                password
                            }
                        }).then( () => {
                            setTimeout( () => {

                                firebase.sendEmailVerification().then(
                                    () => {
                                        console.log('Email verification sent');
                                    },
                                    (error) => {
                                        console.log('Error sending email verification: ' + error);
                                    }
                                );
                            }, 5000);
                        })
                        .catch(error => console.log(error));
                }
            })
        ).pipe();
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
                    firebase.login(
                        {
                            type: firebase.LoginType.PASSWORD,
                            passwordOptions: {
                                email: email,
                                password: password
                            }
                        })
                        .then(result => JSON.stringify(result))
                        .catch(error => console.log(error));
                }
            })
        );
    }

    resetPassword(email: string) {
        firebase.sendPasswordResetEmail(email).then(() => {
            console.log('Sent email for password reset.');
        }).catch((error) => {
            console.log('Error sending email for password reset: ' + error);
        });
    }

    logout() {
        if (hasKey('token')) {
            remove('token');
        }
        if (hasKey('email')) {
            remove('email');
        }
    }

    private handleLogin(email: string, token: string, userId: string, expiresIn: number) {
        const expirationtime = new Date(new Date().getTime() + expiresIn * 1000);
        if (hasKey('token')) {
            remove('token');
        }
        if (hasKey('email')) {
            remove('email');
        }
        setString('token', token);
        setString('email', email);
        // appSettings.setString('email', email);
        // appSettings.setString('userId', userId);
        // appSettings.setString('expirationtime', expirationtime);
        console.log(`current token0a: ${token}`);
        console.log(`current token0b: ${getString('token', '')}`);
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert({okButtonText: 'OK', title: localize('This email address exists already')});
                break;
            case 'INVALID_PASSWORD':
                alert({okButtonText: 'OK', title: localize('Invalid password')});
                break;
            case 'INVALID_EMAIL':
                alert({okButtonText: 'OK', title: localize('Invalid email address')});
                break;
            case 'EMAIL_NOT_FOUND':
                alert({okButtonText: 'OK', title: localize('E-Mail not found')});
                break;
            default:
                alert({okButtonText: 'OK', title: localize('Authentication failed')});
                break;
        }
    }
}
