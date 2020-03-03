import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from "rxjs/internal/operators";
import {throwError} from "rxjs";
import {alert} from 'tns-core-modules/ui/dialogs';

const FIREBASE_API_KEY = 'AIzaSyAJ-aGPt9y4MPIdBpdCEBGhRTlzZp695M0';

@Injectable({providedIn: 'root'})
export class AuthService {
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    logInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService
    ) {
    }

    signUp(email: string, password: string) {
        return this.httpClient.post(this.signInUrl,
            {email, password, returnSecureToken: true}
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }));
    }

    login(email: string, password: string) {
        return this.httpClient.post(this.logInUrl,
            {email, password, returnSecureToken: true}
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }));
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
