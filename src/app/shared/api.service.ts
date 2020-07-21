import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
import {BoatStatus, BoatHistory, Sensordata, SensordataTime} from '~/app/shared/interface/sensordata';
import {AuthService} from '~/app/shared/auth.service';
import {DeviceAlarmDataFormat} from '~/app/shared/data.service';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {tap} from 'rxjs/operators';
import {logger} from 'codelyzer/util/logger';
import {getString, hasKey} from 'tns-core-modules/application-settings';
import {AlarmComponent} from '~/app/alarm/alarm.component';
import {BehaviorSubject, observable, Subject, throwError} from 'rxjs';
// import {getCurrentPushToken} from 'nativescript-plugin-firebase';
import {alert} from 'tns-core-modules/ui/dialogs';
import {AlarmSettings} from '~/app/shared/interface/alarm';


const bghttpModule = require('nativescript-background-http');
const session = bghttpModule.session('image-upload');
// const fs = require('file-system');

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

    get currentSensorDataHistoryData() {
        return this.sensorDataHistory.asObservable();
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

    get deviceData() {
        return this.device.asObservable();
    }

    get boatStatus() {
        return this.boatStatusData.asObservable();
    }

    get boatHistory() {
        return this.boatHistoryData.asObservable();
    }

    get alarmSettings() {
        return this.alarmSettingsData.asObservable();
    }

    private sensorDataHistory =
        new BehaviorSubject<{
            'device_id': number,
            'device_name': string,
            'device_history': {
                [others: string]: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]
            },
            'device_latest_data': {
                [others: string]: { 'data': number, 'time': string }
            }
        }[]>(null);
    private sensorHistory =
        new BehaviorSubject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>(null);
    private temperatureHistory =
        new BehaviorSubject<{ 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]>(null);
    private sensorLatestData = new BehaviorSubject<SensordataTime>(null);
    private device = new BehaviorSubject<DeviceAlarmDataFormat[]>(null);
    private boatStatusData = new BehaviorSubject<BoatStatus>(null);
    private boatHistoryData = new BehaviorSubject<BoatHistory>(null);
    private alarmSettingsData = new BehaviorSubject<AlarmSettings>(null);

    // baseUrl = 'http://127.0.0.1:8000/';
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
    baseUrl = 'https://boat-officer-backend.herokuapp.com/';
    // baseUrl = 'https://ab1a72951193.ngrok.io/';
    baseSensorUrl = `${this.baseUrl}api/sensor_data/`;
    baseDeviceUrl = `${this.baseUrl}api/device/`;
    baseDeviceAlarmUrl = `${this.baseUrl}api/device_alarm/`;
    baseDeviceAlarmSettingsUrl = `${this.baseUrl}api/device_alarm_settings/`;
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
        return this.httpClient.post<SensordataTime>(this.baseSensorUrl + 'get_latest_depricated/', {device: 1},
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

    getDeviceData() {
        // let params = new HttpParams();
        // params = params.append('limit', '5');
        // params = params.append('only_active', 'true');
        const param: any = {limit: 60, only_active: 'false'};
        return this.httpClient.get<DeviceAlarmDataFormat[]>(this.baseDeviceUrl + 'get_alarm/',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                }),
                params: param
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.device.next(resData);
            }
        }));
    }

    getBoatStatus() {
        console.log('push_token: ' + getString('push_token', ''));
        const param: any = {
                push_token: getString('push_token', '')};
        return this.httpClient.get<BoatStatus>(this.baseSensorUrl + 'get_latest/',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                }),
                params: param
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.boatStatusData.next(resData);
            }
        }));
    }

    getDeviceAlarmSettings() {
        const param: any = {};
        return this.httpClient.get<AlarmSettings>(this.baseDeviceAlarmSettingsUrl + '',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                }),
                params: param
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.alarmSettingsData.next(resData);
            }
        }));
    }

    getBoatHistory(days: number) {
        const param: any = {days};
        return this.httpClient.get<BoatHistory>(this.baseSensorUrl + 'get_history/',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                }),
                params: param
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.boatHistoryData.next(resData);
            }
        }));
    }

    setAlarmData(idAlarm: number, markedAsResponsible: boolean = null, markedAsOk: boolean = null) {
        this.httpClient.post<any>(this.baseDeviceAlarmUrl + 'ack_by_user/', {
                id: idAlarm,
                marked_as_ok: markedAsOk,
                marked_as_responsible: markedAsResponsible
            }
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }).subscribe(() => {
                this.getDeviceData().subscribe();
        });
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
        console.log(`Url: ${this.baseSensorUrl + 'get_sensor_history_by_field/'}`);
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

    getSensorHistory(sensorField: string, device: number, days: number) {

        console.log(`Token1: ${this.token}`);
        console.log(`PushToken1: ${getString('push_token', '')}`);
        console.log(`Url: ${this.baseSensorUrl + 'get_sensor_data/'}`);
        return this.httpClient.post<{
            'device_id': number,
            'device_name': string,
            'device_history': {
                [others: string]: { 'min': number, 'max': number, 'milliseconds': number, 'day': number, 'date': string }[]
            },
            'device_latest_data': {
                [others: string]: { 'data': number, 'time': string }
            }
        }[]>
        (this.baseSensorUrl + 'get_sensor_data/', {
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
                this.sensorDataHistory.next(resData);
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

    saveAlarmSettings(deviceId: number, alarmKey: string, alarmValue: number) {
        console.log('saveAlarmSettings (Device:' + deviceId + ', alarmKey:' + alarmKey, ', alarmValue:' + alarmValue);
        this.httpClient.post<any>(this.baseDeviceAlarmSettingsUrl + 'update_field/', {
                type: alarmKey,
                value_user: alarmValue,
                deviceId
            }
            , {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    idToken: `${getString('token', '')}`
                })
            }).subscribe(() => {
                this.getDeviceAlarmSettings().subscribe();
        });
    }

    saveBoatImage(imageAssets: any, imageSrc: any, deviceId: number) {
        console.log('Selection done: ' + JSON.stringify(imageSrc._android));
        console.log('Selection done: ' + JSON.stringify(imageAssets));

        // const folder = this.fs.knownFolders.documents();
        // const pathOfImage = fs.path.join(imageSrc._android, '');
        // const saved = image.saveToFile(pathOfImage, ".png");
        const request = {
            url: this.baseDeviceUrl + 'upload_image/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                // 'Content-Type': 'multipart/form',
                // 'File-Name': 'Test.jpg',
                idToken: `${getString('token', '')}`
            }
        };


        // const task = session.uploadFile(imageSrc._android, request);
        const params = [
            {name: 'deviceId', value: deviceId},
            {
                name: 'boatImage',
                filename: imageSrc._android,
                mimeType: 'image/jpeg',
                content_type_extra: '{id_device: ' + deviceId + '}'
            }
        ];
        const task = session.multipartUpload(params, request);
        task.on('progress', logEvent);
        task.on('error', logEvent);
        task.on('complete', logEvent);

        function logEvent(e) {
            console.log(e.eventName + ' currentBytes: ' + e.currentBytes);
            console.log(e.eventName + ' totalBytes: ' + e.totalBytes);
            console.log(e.eventName + ' message: ' + e.response);
        }

        return task;
        /*
                return this.httpClient.post<string>(this.baseDeviceUrl + 'upload_image/',
                    {imageName: imageSrc._android}, {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            idToken: `${getString('token', '')}`
                        })
                    }
                ).pipe(catchError(errorRes => {
                        // ApiService.handleError(errorRes.error.error.message);
                        return throwError(errorRes);
                    })
                );*/
    }
}
