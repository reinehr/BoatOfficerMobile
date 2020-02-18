import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const FIREBASE_API_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'http://127.0.0.1:8000/';
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
  baseUrl = 'https://9d8bd1df.ngrok.io/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  signUp(email: string, password: string) {
      this.httpClient.post(this.signInUrl,
          {email, password, returnSecureToken: true}
          ).subscribe(resData => {
              console.log(resData);
      });
  }

  login(email: string, password: string) { }

}
