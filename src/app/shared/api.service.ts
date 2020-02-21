import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Sensordata} from "~/app/shared/interface/sensordata";

const FIREBASE_API_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'http://127.0.0.1:8000/';
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
  baseUrl = 'https://530094fe.ngrok.io/';
  baseSensorUrl = `${this.baseUrl}api/sensor_data/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 57a7b700249ab523db88bff0c45a0456ac407f24'
  });
  result: Sensordata;
  temperatureHistory: {'min_temp': number, 'max_temp': number, 'day': number, 'date': string, 'milliseconds': number}[];

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

  getLatestSensorData() {
      this.httpClient.post(this.baseSensorUrl + 'get_latest/', {device: 5}
      , {headers: this.headers}
      ).subscribe((resData: Sensordata) => {
          // for (let inner in resData) {
          //     this.result[inner] = resData[inner];
          // }
          this.result = resData;
      });
      return this.result;
  }

  getIntTemperatureHistory() {
      this.httpClient.post(this.baseSensorUrl + 'get_int_temperature_history/', {device: 5}
      , {headers: this.headers}
      ).subscribe((resData: []) => {
          // for (let inner in resData) {
          //     this.result[inner] = resData[inner];
          // }
          this.temperatureHistory = resData;
      });
      return this.temperatureHistory;
  }

}
