import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Sensordata} from '~/app/shared/interface/sensordata';
import {process} from "@angular/compiler-cli/ngcc";

const FIREBASE_API_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'http://127.0.0.1:8000/';
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
  baseUrl = 'https://466d47dd.ngrok.io/';
  baseSensorUrl = `${this.baseUrl}api/sensor_data/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 57a7b700249ab523db88bff0c45a0456ac407f24'
  });
  result: Sensordata;
  temperatureHistory: {'min': number, 'max': number, 'day': number, 'date': string, 'milliseconds': number}[];
  sensorHistory: {'min': number, 'max': number, 'day': number, 'date': string, 'milliseconds': number}[];

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
      this.httpClient.post(this.baseSensorUrl + 'get_sensor_history_by_field/', {field: 'IntTemperature', device: 5, days: 31}
      , {headers: this.headers}
      ).subscribe((resData: []) => {
          // for (let inner in resData) {
          //     this.result[inner] = resData[inner];
          // }
          this.temperatureHistory = resData;
      });
      return this.temperatureHistory;
  }

  getSensorHistoryByField(sensorField: string, device: number, days: number) {
      this.httpClient.post(this.baseSensorUrl + 'get_sensor_history_by_field/', {field: sensorField, device, days}
      , {headers: this.headers}
      ).subscribe((resData: []) => {
          // for (let inner in resData) {
          //     this.result[inner] = resData[inner];
          // }
          this.sensorHistory = resData;
      });
      return this.sensorHistory;
  }

}
