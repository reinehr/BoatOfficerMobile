import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ApiService} from '~/app/shared/api.service';
import {
    boatGpsMap,
    BoatHistory,
    BoatStatus,
    boatStatusMap,
    historyInterval,
    WEATHER_ICONS, windSpeedToBeaufort
} from '~/app/shared/interface/sensordata';
import {alarmByTypeMap, AlarmInhibitSettings, AlarmSettings} from '~/app/shared/interface/alarm';
import {isNull} from "@angular/compiler/src/output/output_ast";
import {hasKey, getString} from '@nativescript/core/application-settings';

export interface DataItem {
    id: number;
    name: string;
    description: string;
}

export interface DeviceAlarmDataFormat {
    'id': number;
    // 'boat_image': string;
    'boat_image_large': string;
    'boat_image_medium': string;
    'boat_image_small': string;
    // 'boat_image_tag': string;
    'name': string;
    'harbour_contact': string;
    'berth': string;
    'url_key': string;
    'type': string;
    'external_voltage_cable': string;
    'multisensor_cable': string;
    'role': string;
    'lifeguard': boolean;
    'getPush': boolean;
    'num_candidate': number;
    'num_sailor': number;
    'num_guard': number;
    'num_officer': number;
    'num_lifeguard': number;
    'num_total': number;
    'mode': string;
    'time_mode_changed': string;
    'bad_gps_signal': boolean;
    'time_bad_gps_signal': string;
    'serial_number_dec': string;
    'serial_number_hex': string;
    'serial_number_str': string;
    'firmware_version_dec': string;
    'firmware_version_hex': string;
    'firmware_version_str': string;
    'product_number_dec': string;
    'product_number_hex': string;
    'product_number_str': string;
    'is_pro': boolean;
    'is_recurrent': boolean;
    'date_pro': string;
    'date_pro_end': string;
    'period_pro': number;
    'sum_active_alarm'?: number;
    'device_officer': {
        'id': number,
        'role': string,
        'user_id': number,
        'fb_id': string,
        'email': string,
        'firstname': string,
        'name': string,
        'phone': string,
        'lifeguard': boolean,
        'getPush': boolean,
    };
    'device_users': {
        'id': number,
        'role': string,
        'user_id': number,
        'fb_id': string,
        'email': string,
        'firstname': string,
        'name': string,
        'phone': string,
        'lifeguard': boolean,
        'getPush': boolean,
    }[];
    'alarm': {
        'id': number;
        'type': string,
        'time': string,
        'column_sensor_data': string,
        'value': string,
        'marked_as_ok_username': string,
        'responsible_username': string,
        'clear_by_device_time': string,
        'marked_as_ok_time': string,
        'status': string,
        'i_am_responsible': boolean,
        'loading': boolean,
        'index_type_active'?: number,
        'hidden'?: boolean,
        'sum_type_active'?: number
    }[];
    'alarm_summarized'?: {[type: string]: {
        'count_open'?: number;
        'count_closed'?: number;
        'type'?: string,
        'name'?: string,
        'value'?: string,
        'unit'?: string,
        'connected'?: boolean,
        'status'?: string,
        'loading'?: boolean,
        'active'?: boolean,
        'index_type_active'?: number,
        'sum_type_active'?: number,
        'alarm_newest'?: {
            'id': number;
            'type': string,
            'time': string,
            'column_sensor_data': string,
            'value': string,
            'marked_as_ok_username': string,
            'responsible_username': string,
            'clear_by_device_time': string,
            'marked_as_ok_time': string,
            'status': string,
            'i_am_responsible': boolean,
        },
        'alarm'?: {
            'id': number;
            'type': string,
            'time': string,
            'column_sensor_data': string,
            'value': string,
            'marked_as_ok_username': string,
            'responsible_username': string,
            'clear_by_device_time': string,
            'marked_as_ok_time': string,
            'status': string,
            'i_am_responsible': boolean,
            'hidden'?: boolean,
        }[]
    };
    }[];
    'keyTypeActive'?: string[];
}

export interface SensorDataHistory {
    'device_id': number;
    'device_name': string;
    'device_history': {
        [key: string]: { 'min': number | boolean, 'max': number | boolean, 'milliseconds': number, 'day': number, 'date': string }[]
    };
    'device_latest_data': {
        [key: string]: { 'data': number, 'time': string }
    };
    'device_history_interval'?: {
        [key: string]: { 'min': string, 'max': string }
    };
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    sensorFieldMap = boatStatusMap;
    sensorFieldKeys = Object.keys(boatStatusMap);
    gpsFieldMap = boatGpsMap;
    gpsFieldKeys = Object.keys(boatGpsMap);
    public boatStatusSub: Subscription;
    public boatStatus: BoatStatus;
    public devicedataSub: Subscription;
    public deviceData: DeviceAlarmDataFormat[];
    activeAlarmByField: { [idDevice: number]: { [sensorFieldKey: string]: boolean } };
    private alarmSettingsSub: Subscription;
    private alarmInhibitSettingsSub: Subscription;
    alarmSettings: AlarmSettings;
    alarmInhibitSettings: AlarmInhibitSettings;
    private boatHistorySub: Subscription;
    public boatHistory: BoatHistory;
    historyIntervalData = historyInterval;
    public isLoading = false;
    public noBoat = false;
    public loggedIn = true;
    dataLoaded = false;
    public loadedAlarmData = new BehaviorSubject<boolean>(false);

    constructor(
        public apiService: ApiService
    ) {
        console.log('data.service.construct')
        this.refreshBoatStatus();
    }

    getDeviceAlarm(): void {

        this.loadedAlarmData.next(false);
        const indexTypeActive = [];
        this.isLoading = true;
        this.apiService.getDeviceAlarmObservable().subscribe(resData => {
            console.log('... in getDeviceAlarm ' + resData.length)

            if (resData) {
                this.noBoat = true;
                for (const idDevice in resData) {
                    this.noBoat = false
                    let device = resData[idDevice];
                    if (!indexTypeActive[idDevice]) {
                        indexTypeActive[idDevice] = [];
                        resData[idDevice].sum_active_alarm = 0;
                    }
                    for (const idAlarm in device.alarm) {
                        let alarm = device.alarm[idAlarm];
                        let type = alarm.type;
                        let cableConnected = alarmByTypeMap[type] && (alarmByTypeMap[type].cable.length == 0 ||
                            alarmByTypeMap[type].cable.indexOf(device.multisensor_cable) >= 0 ||
                            alarmByTypeMap[type].cable.indexOf(device.external_voltage_cable) >= 0) &&
                            (alarmByTypeMap[type].dev_type.length == 0 ||
                                alarmByTypeMap[type].dev_type.indexOf(device.type) >= 0);

                        if (cableConnected) {
                            let name = (alarmByTypeMap[type].name_by_cable.length > 0 ? (alarmByTypeMap[type].cable.indexOf(device.external_voltage_cable) >= 0 ? alarmByTypeMap[type].name_by_cable[alarmByTypeMap[type].cable.indexOf(device.external_voltage_cable)] : alarmByTypeMap[type].name_by_cable[alarmByTypeMap[type].cable.indexOf(device.multisensor_cable)]) : alarmByTypeMap[type].name)
                            if (!indexTypeActive[idDevice][type]) {
                                indexTypeActive[idDevice][type] = 0;
                            }
                            if (!resData[idDevice].alarm_summarized) {
                                resData[idDevice].keyTypeActive = [];
                                resData[idDevice].alarm_summarized = [];
                            }
                            if (!resData[idDevice].alarm_summarized[type]) {
                                resData[idDevice].keyTypeActive.push(type);
                                resData[idDevice].alarm_summarized[type] = {};
                                resData[idDevice].alarm_summarized[type].type = type;
                                resData[idDevice].alarm_summarized[type].name = name;
                                resData[idDevice].alarm_summarized[type].unit = alarmByTypeMap[type].unit;
                                resData[idDevice].alarm_summarized[type].connected = cableConnected;
                                resData[idDevice].alarm_summarized[type].alarm_newest = alarm;
                                resData[idDevice].alarm_summarized[type].value = alarm.value;
                                resData[idDevice].alarm_summarized[type].active = false;
                                resData[idDevice].alarm_summarized[type].status = alarm.status;
                                resData[idDevice].alarm_summarized[type].alarm = [];
                                resData[idDevice].alarm_summarized[type].count_open = 0;
                                resData[idDevice].alarm_summarized[type].count_closed = 0;
                                //console.log('.')
                            }
                            if (alarm.status === 'open' || (alarm.status === 'open_someone_responsible' && alarm.i_am_responsible)) {
                                indexTypeActive[idDevice][type] = indexTypeActive[idDevice][type] + 1;
                                resData[idDevice].alarm[idAlarm].index_type_active = indexTypeActive[idDevice][type];
                                resData[idDevice].sum_active_alarm = resData[idDevice].sum_active_alarm + 1;
                                resData[idDevice].alarm_summarized[type].count_open = resData[idDevice].alarm_summarized[type].count_open + 1;
                                resData[idDevice].alarm[idAlarm].hidden = true;
                                resData[idDevice].alarm_summarized[type].alarm.push(resData[idDevice].alarm[idAlarm]);
                                if (!resData[idDevice].alarm_summarized[type].active) {
                                    resData[idDevice].alarm_summarized[type].active = true;
                                    resData[idDevice].alarm_summarized[type].alarm_newest = resData[idDevice].alarm[idAlarm];
                                    resData[idDevice].alarm_summarized[type].value = resData[idDevice].alarm[idAlarm].value;
                                    resData[idDevice].alarm_summarized[type].status = resData[idDevice].alarm[idAlarm].status;
                                }
                            } else {
                                resData[idDevice].alarm_summarized[type].count_closed = resData[idDevice].alarm_summarized[type].count_closed + 1;
                                resData[idDevice].alarm[idAlarm].hidden = true;
                                resData[idDevice].alarm_summarized[type].alarm.push(resData[idDevice].alarm[idAlarm]);
                            }
                        }
                    }
                    for (const idAlarm in resData[idDevice].alarm) {
                        if (resData[idDevice].alarm[idAlarm].status === 'open' || (resData[idDevice].alarm[idAlarm].status === 'open_someone_responsible' && resData[idDevice].alarm[idAlarm].i_am_responsible)) {
                            resData[idDevice].alarm[idAlarm].sum_type_active = indexTypeActive[idDevice][resData[idDevice].alarm[idAlarm].type];
                        }
                    }
                }
                this.deviceData = resData;


                //this.deviceData = ddata;
                this.activeAlarmByField = {};
                for (const device of resData) {
                    this.activeAlarmByField[device.id] = {};
                    for (const mapKey of this.sensorFieldKeys) {
                        for (const alarmType of this.sensorFieldMap[mapKey].alarm) {
                            this.activeAlarmByField[device.id][alarmType] = false;
                        }
                    }
                    for (const alarm of device.alarm) {
                        if (alarm.status === 'open' || alarm.status === 'open_someone_responsible') {
                            this.activeAlarmByField[device.id][alarm.type] = true;
                        }
                    }
                }
                console.log('... finished getDeviceAlarm');
                this.getSensorDataLatest();
                this.getAlarmSettings();
                this.getAlarmInhibitSettings();
                this.getSensorDataHistory();
            }
            this.loadedAlarmData.next(true);
        })

    }

    getSensorDataLatest(): void {
        this.apiService.getSensorDataLatestObservable().subscribe(bsdata => {
            console.log('... in getSensorDataLatest')
            if (bsdata) {
                try {
                    this.boatStatus = bsdata;
                    for (const idDevice of Object.keys(this.activeAlarmByField)) {
                        if (this.boatStatus && this.boatStatus[idDevice]) {
                            let timestamp = + new Date();
                            try {
                                this.boatStatus[idDevice].nearest_webcam.url = (this.boatStatus[idDevice].nearest_webcam.url + (this.boatStatus[idDevice].nearest_webcam.url.indexOf('?')>-1 ? '&' : '?') + timestamp)
                                this.boatStatus[idDevice].nearest_webcam1.url = (this.boatStatus[idDevice].nearest_webcam1.url + (this.boatStatus[idDevice].nearest_webcam1.url.indexOf('?')>-1 ? '&' : '?') + timestamp)
                                this.boatStatus[idDevice].nearest_webcam2.url = (this.boatStatus[idDevice].nearest_webcam2.url + (this.boatStatus[idDevice].nearest_webcam2.url.indexOf('?')>-1 ? '&' : '?') + timestamp)
                                this.boatStatus[idDevice].nearest_webcam3.url = (this.boatStatus[idDevice].nearest_webcam3.url + (this.boatStatus[idDevice].nearest_webcam3.url.indexOf('?')>-1 ? '&' : '?') + timestamp)
                                this.boatStatus[idDevice].nearest_webcam4.url = (this.boatStatus[idDevice].nearest_webcam4.url + (this.boatStatus[idDevice].nearest_webcam4.url.indexOf('?')>-1 ? '&' : '?') + timestamp)
                                this.boatStatus[idDevice].nearest_webcam5.url = (this.boatStatus[idDevice].nearest_webcam5.url + (this.boatStatus[idDevice].nearest_webcam5.url.indexOf('?')>-1 ? '&' : '?') + timestamp)
                            } catch (e) {
                                console.log('Error: no Webcam URL for device ' + idDevice + ' ' + e);
                            }
                            this.boatStatus[idDevice].alarm_active = {};
                            for (const mapKey of this.sensorFieldKeys) {
                                // if (mapKey in this.boatStatus[idDevice].alarm_active) {
                                this.boatStatus[idDevice].alarm_active[mapKey] = false;
                                for (const alarmType of this.sensorFieldMap[mapKey].alarm) {
                                    if (this.activeAlarmByField[idDevice][alarmType]) {
                                        this.boatStatus[idDevice].alarm_active[mapKey] = true;
                                    }
                                }
                                // }
                            }
                            if (this.boatStatus[idDevice].position_data.latitude) {
                                const weatherForecast = this.apiService.getWeatherForecastData(this.boatStatus[idDevice].position_data.latitude, this.boatStatus[idDevice].position_data.longitude);
                                weatherForecast.subscribe(wdata => {
                                    const dateSunset = new Date(wdata.city.sunset * 1000);
                                    const timeSunset = (dateSunset.getHours() * 60 + dateSunset.getMinutes()) * 60 + dateSunset.getSeconds();
                                    const dateSunrise = new Date(wdata.city.sunrise * 1000);
                                    const timeSunrise = (dateSunrise.getHours() * 60 + dateSunrise.getMinutes()) * 60 + dateSunrise.getSeconds();
                                    wdata.city.icon_sunrise = String.fromCharCode(0xf051);
                                    wdata.city.icon_sunset = String.fromCharCode(0xf052);
                                    for (const listKey in wdata.list) {
                                        wdata.list[listKey].weather[0].icon = String.fromCharCode(WEATHER_ICONS.owmneutral[wdata.list[listKey].weather[0].id]);
                                        const dateWeather = new Date((wdata.list[listKey].dt - wdata.city.timezone) * 1000);
                                        const timeWeather = (dateWeather.getHours() * 60 + dateWeather.getMinutes()) * 60 + dateWeather.getSeconds();
                                        if (timeWeather < timeSunrise || timeWeather > timeSunset) {
                                            wdata.list[listKey].is_night = true;
                                            wdata.list[listKey].weather[0].icon = String.fromCharCode(WEATHER_ICONS.owmnight[wdata.list[listKey].weather[0].id]);
                                        } else {
                                            wdata.list[listKey].is_night = false;
                                            wdata.list[listKey].weather[0].icon = String.fromCharCode(WEATHER_ICONS.owmday[wdata.list[listKey].weather[0].id]);
                                        }
                                        const beaufort = windSpeedToBeaufort(wdata.list[listKey].wind.speed);
                                        wdata.list[listKey].wind.beaufort_icon = String.fromCharCode(WEATHER_ICONS.beaufort[beaufort]);
                                        wdata.list[listKey].wind.direction_icon = String.fromCharCode(0xf0b1);
                                        wdata.list[listKey].wind.beaufort = beaufort;
                                        this.boatStatus[idDevice].weather_forecast = wdata;
                                    }
                                });
                            }
                        }
                    }

                    console.log('... finished getSensorDataLatest');
                } catch (e) {
                    console.log('Error: no boatStatus: ' + e);
                }
            } else {
                console.log('no boatStatus');
            }
        });
    }

    getAlarmSettings(): void {
        console.log('... in getAlarmSettings');
        this.apiService.getAlarmSettingsObservable().subscribe(
            asdata => {
                if (asdata) {
                    this.alarmSettings = asdata;
                    console.log('... finished getAlarmSettings');
                } else {
                    console.log('no alarmSettings');
                }
            }
        );
    }

    getAlarmInhibitSettings(): void {
        console.log('... in getAlarmInhibitSettings');
        this.apiService.getAlarmInhibitSettingsObservable().subscribe(
            asdata => {
                if (asdata) {
                    let now = Date.now();
                    this.alarmInhibitSettings = asdata;
                    for (let idDevice in this.alarmInhibitSettings) {
                        for (let alarmKey in this.alarmInhibitSettings[idDevice]) {
                            if (this.alarmInhibitSettings[idDevice][alarmKey].inhibitDatetime) {
                                let inhibitDatetime = new Date(this.alarmInhibitSettings[idDevice][alarmKey].inhibitDatetime).getTime();
                                if(inhibitDatetime > now) {
                                    this.alarmInhibitSettings[idDevice][alarmKey].isInhibitNow = true;
                                }
                            }
                        }
                    }
                    console.log('... finished getAlarmInhibitSettings');
                } else {
                    console.log('no alarmSettings');
                }
            }
        );
    }

    getSensorDataHistory(): void {
        console.log('... in getSensorDataHistory');
        this.isLoading = true;
        this.apiService.getSensorDataHistoryObservable().subscribe(
            bhdata => {
                if (bhdata) {
                    this.boatHistory = bhdata;
                    for (const idDevice of Object.keys(this.boatHistory)) {
                        if (!this.boatHistory[idDevice].sensor_data) {
                            this.boatHistory[idDevice].sensor_data = [];
                        }
                        if (!this.boatHistory[idDevice].position_data) {
                            this.boatHistory[idDevice].position_data = [];
                        }
                        this.boatHistory[idDevice].sensor_data_length = this.boatHistory[idDevice].sensor_data.length;
                        this.boatHistory[idDevice].position_data_length = this.boatHistory[idDevice].position_data.length;

                        for (const idEvent in this.boatHistory[idDevice].sensor_data) {
                            const eventTime = new Date(this.boatHistory[idDevice].sensor_data[idEvent].time);
                            this.boatHistory[idDevice].sensor_data[idEvent].date = eventTime;
                            // eventTime.setMinutes(0);
                            // eventTime.setHours(0);
                            // eventTime.setSeconds(0);
                            // eventTime.setMilliseconds(0);
                            this.boatHistory[idDevice].sensor_data[idEvent].timestring = `${('0' + eventTime.getDate()).slice(-2)}/${('0' + (eventTime.getMonth() + 1)).slice(-2)}/${eventTime.getFullYear()} ${('0' + eventTime.getHours()).slice(-2)}:${('0' + eventTime.getMinutes()).slice(-2)}:00`;
                            for (const idInterval in this.historyIntervalData) {
                                if (this.historyIntervalData[idInterval].dateInterval.start.getTime() > (eventTime.getTime())) {
                                    this.historyIntervalData[idInterval].sensorData.sliceStart = +idEvent;
                                }
                                this.historyIntervalData[idInterval].sensorData.sliceStop = +idEvent;
                            }
                        }
                        for (const idEvent in this.boatHistory[idDevice].position_data) {
                            const eventTime = new Date(this.boatHistory[idDevice].position_data[idEvent].time);
                            this.boatHistory[idDevice].position_data[idEvent].date = eventTime;
                            // eventTime.setMinutes(0);
                            // eventTime.setHours(0);
                            // eventTime.setSeconds(0);
                            // eventTime.setMilliseconds(0);
                            this.boatHistory[idDevice].position_data[idEvent].timestring = `${('0' + eventTime.getDate()).slice(-2)}/${('0' + (eventTime.getMonth() + 1)).slice(-2)}/${eventTime.getFullYear()} ${('0' + eventTime.getHours()).slice(-2)}:${('0' + eventTime.getMinutes()).slice(-2)}:00`;
                            for (const idInterval in this.historyIntervalData) {
                                if (this.historyIntervalData[idInterval].dateInterval.start.getTime() > (eventTime.getTime())) {
                                    this.historyIntervalData[idInterval].positionData.sliceStart = +idEvent;
                                }
                                this.historyIntervalData[idInterval].positionData.sliceStop = +idEvent;
                            }
                        }
                        //const time = new Date(this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].time);
                        // this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].timestring = `${('0' + (time.getDate() + 1)).slice(-2)}/${('0' + (time.getMonth() + 1)).slice(-2)}/${time.getFullYear()}`;
                        // this.boatHistory[idDevice].sensor_data[this.boatHistory[idDevice].sensor_data.length - 1].date = new Date(time.getFullYear(), (time.getMonth() + 1), (time.getDate() + 1), time.getHours(), time.getMinutes(), time.getSeconds())
                    }
                    console.log('... finished getSensorDataHistory');
                    this.isLoading = false;
                } else {
                    console.log('no boatHistory');
                }
            }
        );
    }


    refreshSensorDataHistory(): void {
        if(hasKey('token')) {
            this.isLoading = true;
            this.loggedIn = true;
            this.getSensorDataHistory();
        } else {
            this.loggedIn = false;
        }
    }

    refreshBoatStatus(): void {
        if(hasKey('token')) {
            this.isLoading = true;
            this.loggedIn = true;
            this.getDeviceAlarm();
        } else {
            this.loggedIn = false;
        }
    }

}
