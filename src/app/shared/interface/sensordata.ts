export interface Sensordata {
    device: number;
    ChargingActive: boolean;
    ExtBatt1Volt: number;
    ExtBatt2Volt: number;
    IntBattVolt: number;
    IntTemperature: number;
    MessageReason: number;
    SensorALoopVolt: number;
    SensorAMulti1Volt: number;
    SensorAMulti2Volt: number;
    StatusLoopA: boolean;
    StatusMultiA1: boolean;
    StatusMultiA2: boolean;
    altitude: number;
    hdop: number;
    isMultiGnssUsed: boolean;
    latitude: number;
    longitude: number;
    portNo: number;
    raw: string;
    time: string;
    counter: number;
}

export interface SensordataTime {
    device: { value: number, time: Date };
    ChargingActive: { value: boolean, time: Date };
    ExtBatt1Volt: { value: number, time: Date };
    ExtBatt2Volt: { value: number, time: Date };
    IntBattVolt: { value: number, time: Date };
    IntTemperature: { value: number, time: Date };
    MessageReason: { value: number, time: Date };
    SensorALoopVolt: { value: number, time: Date };
    SensorAMulti1Volt: { value: number, time: Date };
    SensorAMulti2Volt: { value: number, time: Date };
    StatusLoopA: { value: boolean, time: Date };
    StatusMultiA1: { value: boolean, time: Date };
    StatusMultiA2: { value: boolean, time: Date };
    altitude: { value: number, time: Date };
    hdop: { value: number, time: Date };
    isMultiGnssUsed: { value: boolean, time: Date };
    latitude: { value: number, time: Date };
    longitude: { value: number, time: Date };
    portNo: { value: number, time: Date };
    raw: { value: string, time: Date };
    time: { value: string, time: Date };
    counter: { value: number, time: Date };
}

export interface BoatStatus {
    [idDevice: string]: {
        'position_data': {
            'time': string,
            'altitude': number,
            'haccuracy': number,
            'heading': number,
            'latitude': number,
            'longitude': number,
            'speed': number
        },
        'sensor_data': {
            'time': string,
            'ChargingActive': boolean,
            'ExtBatt1Volt': number,
            'ExtBatt2Volt': number,
            'IntBattVolt': number,
            'IntTemperature': number,
            'PosMessageSubstitute': boolean,
            'SensorALoopVolt': number,
            'SensorAMulti1Volt': number,
            'SensorAMulti2Volt': number,
            'StatusLoopA': boolean,
            'StatusMultiA1': boolean,
            'StatusMultiA2': boolean
        },
        'alarm_active'?: {
            'time'?: boolean,
            'ChargingActive'?: boolean,
            'ExtBatt1Volt'?: boolean,
            'ExtBatt2Volt'?: boolean,
            'IntBattVolt'?: boolean,
            'IntTemperature'?: boolean,
            'PosMessageSubstitute'?: boolean,
            'SensorALoopVolt'?: boolean,
            'SensorAMulti1Volt'?: boolean,
            'SensorAMulti2Volt'?: boolean,
            'StatusLoopA'?: boolean,
            'StatusMultiA1'?: boolean,
            'StatusMultiA2'?: boolean
        },
    };
}

export interface BoatHistory {
    [idDevice: string]: {
        'position_data': {
            'time': string,
            'milliseconds': number,
            'timestring'?: string,
            'altitude': number,
            'haccuracy': number,
            'heading': number,
            'latitude': number,
            'longitude': number,
            'speed': number
        }[],
        'position_data_length'?: number,
        'sensor_data': {
            'time': string,
            'milliseconds': number,
            'timestring'?: string,
            'ChargingActive': boolean,
            'ExtBatt1Volt': number,
            'ExtBatt2Volt': number,
            'IntBattVolt': number,
            'IntTemperature': number,
            'PosMessageSubstitute': boolean,
            'SensorALoopVolt': number,
            'SensorAMulti1Volt': number,
            'SensorAMulti2Volt': number,
            'StatusLoopA': boolean,
            'StatusMultiA1': boolean,
            'StatusMultiA2': boolean
        }[],
        'sensor_data_length'?: number,
    };
}

export const boatStatusMap: { [fieldName: string]: { icon: string, iconfont: string, alarm: string[], datatype: string, unit: string, filter: string } } = {
    time: {icon: 'o', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'ago'},
    ExtBatt1Volt: {icon: 'K', iconfont: 'bo', alarm: ['Ext. Voltage'], datatype: 'float', unit: ' V', filter: '3V'},
    ExtBatt2Volt: {icon: 'K', iconfont: 'bo', alarm: ['Ext. Voltage'], datatype: 'float', unit: ' V', filter: ''},
    IntBattVolt: {icon: '', iconfont: 'fas', alarm: ['Internal Battery Voltage'], datatype: 'float', unit: ' V', filter: ''},
    ChargingActive: {icon: 'U', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'active'},
    IntTemperature: {icon: 'n', iconfont: 'bo', alarm: ['Temperature'], datatype: 'float', unit: '°C', filter: ''},
    PosMessageSubstitute: {icon: '', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'hide'},
    SensorALoopVolt: {icon: 'k', iconfont: 'bo', alarm: [], datatype: 'float', unit: ' V', filter: ''},
    SensorAMulti1Volt: {icon: 'k', iconfont: 'bo', alarm: [], datatype: 'float', unit: ' V', filter: ''},
    SensorAMulti2Volt: {icon: 'k', iconfont: 'bo', alarm: [], datatype: 'float', unit: ' V', filter: ''},
    StatusLoopA: {icon: '', iconfont: 'fas', alarm: ['Loop Sensor A Closed', 'Loop Sensor A Opened'], datatype: 'bool', unit: '', filter: 'closed'},
    StatusMultiA1: {icon: '', iconfont: 'fas', alarm: ['Multi Sensor A 1 Closed', 'Multi Sensor A 1 Opened'], datatype: 'bool', unit: '', filter: 'closed'},
    StatusMultiA2: {icon: '', iconfont: 'fas', alarm: ['Multi Sensor A 2 Closed', 'Multi Sensor A 2 Opened'], datatype: 'bool', unit: '', filter: 'closed'},
};

export const historyInterval: {id: number, days: number, name: string, step: number, stepUnit: string, sensorData: {sliceStart?: number, sliceStop?: number}, positionData: {sliceStart?: number, sliceStop?: number}}[] = [
    {id: 0, days: 1.0,  name: '1d', step: 6,  stepUnit: 'Hour', sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}},
    {id: 1, days: 3.0,  name: '3d', step: 6, stepUnit: 'Hour', sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}},
    {id: 2, days: 7.0,  name: '1W', step: 12,  stepUnit: 'Hour',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}},
    {id: 3, days: 31.0, name: '1M', step: 2,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}},
    {id: 4, days: 92.0, name: '3M', step: 5,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}},
];
