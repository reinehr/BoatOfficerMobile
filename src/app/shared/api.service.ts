import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
import {Sensordata} from '~/app/shared/interface/sensordata';
import {AuthService} from '~/app/shared/auth.service';
import {switchMap} from 'rxjs/internal/operators';
import {tap} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';
import {getString, hasKey} from 'tns-core-modules/application-settings';
import {AlarmComponent} from '~/app/alarm/alarm.component';
import {BehaviorSubject, observable, Subject} from 'rxjs';
import {Sensordatahistory} from '~/app/alarm/sensordatahistory.model';

const FIREBASE_API_KEY = 'AIzaSyDqeKk0czvXBxuHu0Gqdyye34pSQNJK7Oo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private sensorHistory = new BehaviorSubject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>
    (null);

    // baseUrl = 'http://127.0.0.1:8000/';
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
    baseUrl = 'https://boat-officer-backend.herokuapp.com/';
    // baseUrl = 'https://6fa3c20a.ngrok.io/';
    baseSensorUrl = `${this.baseUrl}api/sensor_data/`;
    token = getString('token', '');

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        idToken: `${getString('token', '')}`
    });
    result: Sensordata;
    temperatureHistory: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[];

    // sensorHistory = new Subject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>();

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
    }

    get currentSensorHistoryData() {
        return this.sensorHistory.asObservable();
    }

    getLatestSensorData() {
        this.httpClient.post(this.baseSensorUrl + 'get_latest/', {device: 1},
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
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
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
        ).subscribe((resData: []) => {
            // for (let inner in resData) {
            //     this.result[inner] = resData[inner];
            // }
            this.temperatureHistory = resData;
        });
        return this.temperatureHistory;
    }

    getSensorHistoryByField(sensorField: string, device: number, days: number) {

        console.log(`Token1: ${this.token}`);
        return this.httpClient.post<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>
        (this.baseSensorUrl + 'get_sensor_history_by_field/', {
                field: sensorField,
                device,
                days
            }
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
        ).pipe(tap(resData => {
            if (resData) {
                const loadedSensorData = new Sensordatahistory(resData);
                this.sensorHistory.next(resData);
            }
        }));
    }

}
