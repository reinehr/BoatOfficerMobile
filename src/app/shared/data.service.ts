import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {ApiService} from '~/app/shared/api.service';

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
    'boat_image_tag': string;
    'name': string;
    'harbour_contact': string;
    'berth': string;
    'role': string;
    'num_sailor': number;
    'num_guard': number;
    'num_officer': number;
    'num_total': number;
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
        'loading': boolean
    }[];
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

    private sensorDataHistory: SensorDataHistory[];
    private sensorDataHistorySub: Subscription;

    private items = new Array<DataItem>(
        {
            id: 1,
            name: 'Item 1',
            description: 'Description for Item 1'
        },
        {
            id: 2,
            name: 'Item 2',
            description: 'Description for Item 2'
        },
        {
            id: 3,
            name: 'Item 3',
            description: 'Description for Item 3'
        }
    );

    constructor(
        private apiService: ApiService
    ) {
        this.initSensorDataHistory();
    }

    getSensorDataHistory(): Array<SensorDataHistory> {
        if (!this.sensorDataHistory) {
            this.apiService.getSensorHistory('', 0, 31).subscribe(response => {
                console.log('SensorData DataService loading ...');
            }, error => {
                console.log(error);
            });
        }
        return this.sensorDataHistory;
    }

    initSensorDataHistory(): void {
        this.sensorDataHistorySub = this.apiService.currentSensorDataHistoryData.subscribe(
            history => {
                if (history) {
                    this.sensorDataHistory = history;
                    // console.log(`sensorDataHistory: ${JSON.stringify(this.sensorDataHistory, null, 2)}`);

                    // tslint:disable-next-line:forin
                    for (const deviceIndex in history) {
                        const deviceData = history[deviceIndex].device_history;
                        // console.log(`sensorDataHistory: ${JSON.stringify(this.sensorDataHistory[deviceIndex].device_history, null, 2)}`);
                        // tslint:disable-next-line:forin
                        if (!this.sensorDataHistory[deviceIndex].device_history_interval) {
                            this.sensorDataHistory[deviceIndex].device_history_interval = {};
                        }
                        for (const sensorType in deviceData) {
                            if (deviceData.hasOwnProperty(sensorType)) {
                                // console.log(`sensorDataHistory: ${JSON.stringify(sensorType, null, 2)}`);
                                if (!this.sensorDataHistory[deviceIndex].device_history_interval[sensorType]) {
                                    this.sensorDataHistory[deviceIndex].device_history_interval[sensorType] = {
                                        min: '',
                                        max: ''
                                    };
                                }
                                let minDate = new Date(Date.now());
                                const maxDate = new Date(Date.now());
                                let minDateStr = '';
                                const maxDateStr = `${maxDate.getDate()}/${maxDate.getMonth() + 1}/${maxDate.getFullYear()}`;
                                for (const day of deviceData[sensorType]) {
                                    const date = new Date(day.date);
                                    if (date < minDate) {
                                        minDate = date;
                                    }
                                }
                                minDateStr = `${minDate.getDate()}/${minDate.getMonth() + 1}/${minDate.getFullYear()}`;
                                this.sensorDataHistory[deviceIndex].device_history_interval[sensorType].min = minDateStr;
                                this.sensorDataHistory[deviceIndex].device_history_interval[sensorType].max = maxDateStr;
                            }
                        }
                        console.log(`sensorDataHistoryInterval: service Subscription triggered`);
                    }
                } else {
                    console.log('no History');
                }
            }
        );
        this.refreshSensorDataHistory();
    }

    refreshSensorDataHistory(): void {
        if (!this.sensorDataHistory) {
            this.apiService.getSensorHistory('', 0, 31).subscribe(response => {
                console.log('DS SensorData loading ...');
            }, error => {
                console.log(error);
            });
        }
    }

    setSensorDataHistory(input: SensorDataHistory[]) {
        this.sensorDataHistory = input;
    }

    getItems(): Array<DataItem> {
        return this.items;
    }

    getItem(id: number): DataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
