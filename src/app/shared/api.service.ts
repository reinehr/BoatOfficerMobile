import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
import {Sensordata, SensordataTime} from '~/app/shared/interface/sensordata';
import {AuthService} from '~/app/shared/auth.service';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {tap} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';
import {getString, hasKey} from 'tns-core-modules/application-settings';
import {AlarmComponent} from '~/app/alarm/alarm.component';
import {BehaviorSubject, observable, Subject, throwError} from 'rxjs';
import {getCurrentPushToken} from 'nativescript-plugin-firebase';
import {alert} from 'tns-core-modules/ui/dialogs';

const FIREBASE_API_KEY = 'AIzaSyDqeKk0czvXBxuHu0Gqdyye34pSQNJK7Oo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // temperatureHistory: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[];

    // sensorHistory = new Subject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>();

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
    }

    get currentSensorHistoryData() {
        return this.sensorHistory.asObservable();
    }

    get currentTemperatureHistoryData() {
        return this.temperatureHistory.asObservable();
    }

    get currentSensorLatestData() {
        return this.sensorLatestData.asObservable();
    }
    private sensorHistory =
        new BehaviorSubject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>(null);
    private temperatureHistory =
        new BehaviorSubject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>(null);
    private sensorLatestData = new BehaviorSubject<SensordataTime>(null);

    // baseUrl = 'http://127.0.0.1:8000/';
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
    baseUrl = 'https://boat-officer-backend.herokuapp.com/';
    // baseUrl = 'https://75ce23cf.ngrok.io/';
    baseSensorUrl = `${this.baseUrl}api/sensor_data/`;
    baseDeviceUrl = `${this.baseUrl}api/device/`;
    token = getString('token', '');

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        idToken: `${getString('token', '')}`
    });
    result: Sensordata;

    private static handleError(errorMessage: string) {
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

    getLatestSensorData() {
        return this.httpClient.post<SensordataTime>(this.baseSensorUrl + 'get_latest/', {device: 1},
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.sensorLatestData.next(resData);
            }
        }));
    }

    getIntTemperatureHistory(device: number, days: number) {
        return this.httpClient.post<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>
        (this.baseSensorUrl + 'get_sensor_history_by_field/', {
                field: 'IntTemperature',
                device,
                days,
                push_token: getString('push_token', '')
            }
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.temperatureHistory.next(resData);
            }
        }));
    }

    getSensorHistoryByField(sensorField: string, device: number, days: number) {

        console.log(`Token1: ${this.token}`);
        console.log(`PushToken1: ${getString('push_token', '')}`);
        return this.httpClient.post<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>
        (this.baseSensorUrl + 'get_sensor_history_by_field/', {
                field: sensorField,
                device,
                days,
                push_token: getString('push_token', '')
            }
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.sensorHistory.next(resData);
            }
        }));
    }

    registerDevice(serialNumber: string, registrationKey: string, deviceName: string) {
        return this.httpClient.post<string>(this.baseDeviceUrl + 'register_device/',
            {serialNumber, registrationKey, device_name: deviceName}, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }
        ).pipe(catchError(errorRes => {
                ApiService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }
}
