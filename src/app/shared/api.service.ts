import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Sensordata} from '~/app/shared/interface/sensordata';
import {AuthService} from '~/app/shared/auth.service';
import {switchMap} from 'rxjs/internal/operators';

const FIREBASE_API_KEY = 'AIzaSyDqeKk0czvXBxuHu0Gqdyye34pSQNJK7Oo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // baseUrl = 'http://127.0.0.1:8000/';
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
    baseUrl = 'https://boat-officer-backend.herokuapp.com/';
    // baseUrl = 'https://6fa3c20a.ngrok.io/';
    baseSensorUrl = `${this.baseUrl}api/sensor_data/`;

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token 4ae96d1410ea4c37878121f13d9cb3e059d37eac' // herohu master sabine
        // Authorization: 'Token 57a7b700249ab523db88bff0c45a0456ac407f24'
    });
    result: Sensordata;
    temperatureHistory: { 'min': number, 'max': number, 'milliseconds': number }[];
    sensorHistory: { 'min': number, 'max': number, 'milliseconds': number }[];

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
    }

    getLatestSensorData() {
        this.httpClient.post(this.baseSensorUrl + 'get_latest/', {device: 1}
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
        this.httpClient.post(this.baseSensorUrl + 'get_sensor_history_by_field/', {
                field: 'IntTemperature',
                device: 1,
                days: 31
            }
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
        let currentUserToken = '';
        this.authService.user.pipe(switchMap(currentUser => {
            currentUserToken = currentUser.token;
            return currentUserToken;
        }));

        this.httpClient.post(this.baseSensorUrl + 'get_sensor_history_by_field/', {field: sensorField, device, days}
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Token ${currentUserToken}`
                })
            }
        ).subscribe((resData: []) => {
            // for (let inner in resData) {
            //     this.result[inner] = resData[inner];
            // }
            this.sensorHistory = resData;
        });
        return this.sensorHistory;
    }

}
