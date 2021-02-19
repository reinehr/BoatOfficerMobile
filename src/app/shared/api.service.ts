import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
import {
    BoatStatus,
    BoatHistory,
    Sensordata,
    SensordataTime,
    WeatherData,
    WeatherForecastData,
    UserData
} from '~/app/shared/interface/sensordata';
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
import { localize } from 'nativescript-localize';
import {device} from 'tns-core-modules/platform';


const bghttpModule = require('nativescript-background-http');
const session = bghttpModule.session('image-upload');
import {Folder, path, knownFolders} from 'tns-core-modules/file-system';
// const fs = require('file-system');

const FIREBASE_API_KEY = 'AIzaSyDqeKk0czvXBxuHu0Gqdyye34pSQNJK7Oo';
const OPENWEATHER_API_KEY = 'a9e6d387e0a8e6e2bfbb42a80ff743d2';

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
    // private weatherData = new BehaviorSubject<WeatherData>(null);
    // private weatherForecastData = new BehaviorSubject<WeatherForecastData>(null);
    private device = new BehaviorSubject<DeviceAlarmDataFormat[]>(null);
    private boatStatusData = new BehaviorSubject<BoatStatus>(null);
    private boatHistoryData = new BehaviorSubject<BoatHistory>(null);
    private alarmSettingsData = new BehaviorSubject<AlarmSettings>(null);

    // baseUrl = 'http://127.0.0.1:8000/';
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API_KEY}`;
    baseUrl = 'https://boat-officer-backend.herokuapp.com/';
    baseUrlWeather = 'https://api.openweathermap.org/data/2.5/';
    //baseUrl = 'https://02dd1ec92366.ngrok.io/';
    baseSensorUrl = `${this.baseUrl}api/sensor_data/`;
    baseDeviceUrl = `${this.baseUrl}api/device/`;
    baseUserUrl = `${this.baseUrl}api/users/`;
    baseDeviceAlarmUrl = `${this.baseUrl}api/device_alarm/`;
    baseDeviceUserUrl = `${this.baseUrl}api/device_user/`;
    baseDeviceAlarmSettingsUrl = `${this.baseUrl}api/device_alarm_settings/`;
    token = getString('token', '');
    uuid = device.uuid
    language = device.language
    keyTypeActive = []
    standardHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        idToken: `${getString('token', '')}`,
        uuid: this.uuid,
        language: this.language,
        logout: 'false'
        });
    logoutHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        idToken: `${getString('token', '')}`,
        uuid: this.uuid,
        language: this.language,
        logout: 'true'
        });

    result: Sensordata;

    private getHeader<HttpHeaders>(logout = false) {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            idToken: `${getString('token', '')}`,
            uuid: this.uuid,
            language: this.language,
            logout: (logout ? 'true' : 'false')
        });
    }

    private static handleError(errorMessage: string) {
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

    getWeatherData(lat: number, lon: number) {
        const param: any = {units: 'metric', lat, lon, APPID: OPENWEATHER_API_KEY};
        return this.httpClient.get<WeatherData>(this.baseUrlWeather + 'weather',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
            params: param
            }
        );
    }

    getWeatherForecastData(lat: number, lon: number) {
        const param: any = {units: 'metric', lat, lon, APPID: OPENWEATHER_API_KEY, cnt: 16};
        return this.httpClient.get<WeatherForecastData>(this.baseUrlWeather + 'forecast',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
            params: param
            }
        );
    }

    getLatestSensorData() {
        return this.httpClient.post<SensordataTime>(this.baseSensorUrl + 'get_latest_depricated/', {device: 1},
            {
                headers: this.getHeader()
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.sensorLatestData.next(resData);
            }
        }));
    }

    getUserData() {
        return this.httpClient.get<UserData>(this.baseUserUrl + 'get_userdata/',
            {
                headers: this.getHeader()
            }
        );
    }

    logout() {
        return this.httpClient.get<UserData>(this.baseUserUrl + 'get_userdata/',
            {
                headers: this.getHeader(true)
            }
        );
    }

    getDeviceData() {
        // let params = new HttpParams();
        // params = params.append('limit', '5');
        // params = params.append('only_active', 'true');
        const param: any = {limit: 99, only_active: 'false'};
        const indexTypeActive = [];
        this.keyTypeActive = [];
        return this.httpClient.get<DeviceAlarmDataFormat[]>(this.baseDeviceUrl + 'get_alarm/',
            {
                headers: this.getHeader(),
                params: param
            }
        ).pipe(tap(resData => {
            if (resData) {
                for (const idDevice in resData) {
                    if (!indexTypeActive[idDevice]) {
                        indexTypeActive[idDevice] = [];
                        resData[idDevice].sum_active_alarm = 0;
                    }
                    for (const idAlarm in resData[idDevice].alarm) {
                        if (!indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type]) {
                            indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type] = 0;
                        }
                        if (!resData[idDevice].alarm_summarized) {
                            resData[idDevice].keyTypeActive = [];
                            resData[idDevice].alarm_summarized = [];
                        }
                        if (!resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type]) {
                            resData[idDevice].keyTypeActive.push(resData[idDevice].alarm[idAlarm].type);
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type] = {};
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].type = resData[idDevice].alarm[idAlarm].type;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].alarm_newest = resData[idDevice].alarm[idAlarm];
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].active = false;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].status = resData[idDevice].alarm[idAlarm].status;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].alarm = [];
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].count_open = 0;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].count_closed = 0;
                            //console.log('.')
                        }
                        if (resData[idDevice].alarm[idAlarm].status === 'open' || (resData[idDevice].alarm[idAlarm].status === 'open_someone_responsible' && resData[idDevice].alarm[idAlarm].i_am_responsible)) {
                            indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type] = indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type] + 1;
                            resData[idDevice].alarm[idAlarm].index_type_active = indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type];
                            resData[idDevice].sum_active_alarm = resData[idDevice].sum_active_alarm + 1;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].count_open = resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].count_open + 1;
                            resData[idDevice].alarm[idAlarm].hidden = true;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].alarm.push(resData[idDevice].alarm[idAlarm]);
                            if (!resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].active) {
                                resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].active = true;
                                resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].alarm_newest = resData[idDevice].alarm[idAlarm];
                                resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].status = resData[idDevice].alarm[idAlarm].status;
                            }
                        } else {
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].count_closed = resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].count_open + 1;
                            resData[idDevice].alarm[idAlarm].hidden = true;
                            resData[idDevice].alarm_summarized[resData[idDevice].alarm[idAlarm].type].alarm.push(resData[idDevice].alarm[idAlarm]);
                        }
                    }
                    for (const idAlarm in resData[idDevice].alarm) {
                        if (resData[idDevice].alarm[idAlarm].status === 'open' || (resData[idDevice].alarm[idAlarm].status === 'open_someone_responsible' && resData[idDevice].alarm[idAlarm].i_am_responsible)) {
                            resData[idDevice].alarm[idAlarm].sum_type_active = indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type];
                        }
                    }
                }
                this.device.next(resData);
            }
        }));
    }

    getBoatStatus() {
        console.log('push_token: ' + getString('push_token', ''));
        const param: any = {
            push_token: getString('push_token', '')
        };
        return this.httpClient.get<BoatStatus>(this.baseSensorUrl + 'get_latest/',
            {
                headers: this.getHeader(),
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
                headers: this.getHeader(),
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
                headers: this.getHeader(),
                params: param
            }
        ).pipe(tap(resData => {
            if (resData) {
                this.boatHistoryData.next(resData);
            }
        }));
    }

    setAlarmData(idAlarms: number[], markedAsResponsible: boolean = null, markedAsOk: boolean = null) {
        let numSuccess = 0
        for (let idAlarm of idAlarms) {
            this.httpClient.post<any>(this.baseDeviceAlarmUrl + 'ack_by_user/', {
                    id: idAlarm,
                    marked_as_ok: markedAsOk,
                    marked_as_responsible: markedAsResponsible
                }
                , {
                    headers: this.getHeader()
                }).subscribe(() => {
                    numSuccess = numSuccess+1;
                    if(numSuccess==idAlarms.length) {
                        this.getDeviceData().subscribe();
                    }
            });
        }
    }

    setDeviceUserData(idDevice: number, idUser: number, lifeguard: boolean, role: string) {
        this.httpClient.post<any>(this.baseDeviceUserUrl + 'update_user/', {
                device_id: idDevice,
                user_id: idUser,
                role: role,
                lifeguard: lifeguard
            }
            , {
                headers: this.getHeader()
            }).subscribe(() => {
            this.getDeviceData().subscribe();
        });
    }

    leaveUserDevice(idDevice: number) {
        console.log('Leave Device ' + idDevice);
        let response = this.httpClient.post<any>(this.baseDeviceUserUrl + 'leave_device/', {
                device_id: idDevice
            }
            , {
                headers: this.getHeader()
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
                headers: this.getHeader()
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
                headers: this.getHeader()
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
                headers: this.getHeader()
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
                headers: this.getHeader()
            }
        ).pipe(catchError(errorRes => {
                ApiService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }

    addDeviceCandidate(serialNumber: string, urlKey: string) {
        return this.httpClient.post<string>(this.baseDeviceUserUrl + 'add_candidate/',
            {serialNumber, urlKey}, {
                headers: this.getHeader()
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
                headers: this.getHeader()
            }).subscribe(() => {
            this.getDeviceAlarmSettings().subscribe();
        });
    }

    saveDeviceSettings(deviceId: number, deviceName: string, deviceBerth: string, deviceContact: string) {
        console.log('saveDeviceSettings (Device:' + deviceId + ', device_name:' + deviceName, ', harbour_contact:' + deviceContact);
        this.httpClient.post<any>(this.baseDeviceUrl + 'update_device/', {
                device_name: deviceName,
                berth: deviceBerth,
                harbour_contact: deviceContact,
                id: deviceId
            }
            , {
                headers: this.getHeader()
            }).subscribe(() => {
            this.getDeviceData().subscribe();
        });
    }

    savePurchase(identifier: string, transactionDate: Date, period: number, recurring: boolean) {
        console.log('savePurchase ' + identifier);
        let dateEnd = (transactionDate.getTime() + (period * 24 * 60 * 60 * 1000));
        this.httpClient.post<any>(this.baseUserUrl + 'save_purchase/', {
                is_pro: true,
                date_pro: transactionDate.getTime(),
                date_pro_end: dateEnd,
                period_pro: period,
                is_recurrent: recurring
            }
            , {
                headers: this.getHeader()
            }).subscribe(() => {
            this.getDeviceData().subscribe();
        });
    }

    saveBoatImage(imageAssets: any, imageSrc: any, deviceId: number) {
        console.log('Selection done: ' + JSON.stringify(imageSrc._android));
        console.log('Selection done: ' + JSON.stringify(imageAssets));

        // const folder = this.fs.knownFolders.documents();
        // const pathOfImage = fs.path.join(imageSrc._android, '');
        // const saved = image.saveToFile(pathOfImage, ".png");

        const folderPath: string = knownFolders.temp().path;
        const fileName = "temp.jpg";
        const filePath = path.join(folderPath, fileName);
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
                filename: filePath,
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

    editUserData(firstname: string, lastname :string, phone) {

        return this.httpClient.post<any>(this.baseUserUrl + 'update_user/', {
                firstname: firstname,
                name: lastname,
                phone: phone
            }
            , {
                headers: this.getHeader()
            });
    }
}
