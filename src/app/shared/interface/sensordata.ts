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
            'date'?: Date,
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
            'date'?: Date,
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

export const boatStatusMap: { [fieldName: string]: { icon: string, iconfont: string, alarm: string[], datatype: string, unit: string, filter: string, name: string, majorStep: number, show_history: boolean } } = {
    time: {icon: 'o', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'ago', name: 'Time', majorStep: 0, show_history: false},
    ExtBatt1Volt: {icon: 'K', iconfont: 'bo', alarm: ['Ext. Voltage'], datatype: 'float', unit: ' V', filter: '3V', name: 'Voltage Extern Battery 1', majorStep: 5, show_history: true},
    // ExtBatt2Volt: {icon: 'K', iconfont: 'bo', alarm: ['Ext. Voltage'], datatype: 'float', unit: ' V', filter: '', name: 'Voltage Extern Battery 2', majorStep:   0, show_history: true},
    IntBattVolt: {icon: '', iconfont: 'fas', alarm: ['Internal Battery Voltage'], datatype: 'float', unit: ' V', filter: '', name: 'Voltage Intern Battery', majorStep: 1, show_history: true},
    ChargingActive: {icon: 'U', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'active', name: 'Charging active', majorStep: 1, show_history: false},
    IntTemperature: {icon: 'n', iconfont: 'bo', alarm: ['Temperature'], datatype: 'float', unit: '°C', filter: '', name: 'Intern Temperature', majorStep: 5, show_history: true},
    // PosMessageSubstitute: {icon: '', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'hide', name: 'Position Message Subst.', majorStep: 1, show_history: false},
    // SensorALoopVolt: {icon: 'k', iconfont: 'bo', alarm: [], datatype: 'float', unit: ' V', filter: '', name: 'Voltage Loop', majorStep: 1, show_history: true},
    // SensorAMulti1Volt: {icon: 'k', iconfont: 'bo', alarm: [], datatype: 'float', unit: ' V', filter: '', name: 'Voltage Multi A 1', majorStep: 1, show_history: true},
    // SensorAMulti2Volt: {icon: 'k', iconfont: 'bo', alarm: [], datatype: 'float', unit: ' V', filter: '', name: 'Voltage Multi A 2', majorStep: 1, show_history: true},
    // StatusLoopA: {icon: '', iconfont: 'fas', alarm: ['Loop Sensor A Closed', 'Loop Sensor A Opened'], datatype: 'bool', unit: '', filter: 'closed', name: 'Status Loop A', majorStep: 1, show_history: true},
    // StatusMultiA1: {icon: '', iconfont: 'fas', alarm: ['Multi Sensor A 1 Closed', 'Multi Sensor A 1 Opened'], datatype: 'bool', unit: '', filter: 'closed', name: 'Status Multi A1', majorStep: 1, show_history: true},
    // StatusMultiA2: {icon: '', iconfont: 'fas', alarm: ['Multi Sensor A 2 Closed', 'Multi Sensor A 2 Opened'], datatype: 'bool', unit: '', filter: 'closed', name: 'Status Multi A2', majorStep: 1, show_history: true},
};

export const boatGpsMap: { [fieldName: string]: { icon: string, iconfont: string, alarm: string[], datatype: string, unit: string, filter: string, name: string, majorStep: number, show_history: boolean } } = {
    time: {icon: 'o', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'ago', name: 'Time', majorStep: 0, show_history: false},
    speed: {icon: '', iconfont: 'fas', alarm: [], datatype: 'float', unit: ' km/h', filter: '', name: 'Speed', majorStep: 10, show_history: true},
    haccuracy: {icon: '', iconfont: 'fas', alarm: [], datatype: 'float', unit: ' m', filter: '', name: 'Position Accuracy', majorStep: 10, show_history: true},
    heading: {icon: '', iconfont: 'fas', alarm: [], datatype: 'float', unit: '°', filter: '', name: 'Direction', majorStep: 45, show_history: false},
};

export const historyInterval: {id: number, days: number, name: string, step: number, stepUnit: string, sensorData: {sliceStart?: number, sliceStop?: number}, positionData: {sliceStart?: number, sliceStop?: number}, dateInterval?: {start: Date, stop: Date}}[] = [
    {id: 0, days: 1.0,  name: '1D', step: 6,  stepUnit: 'Hour', sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)), stop: new Date()}},
    {id: 1, days: 3.0,  name: '3D', step: 12, stepUnit: 'Hour', sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 3)), stop: new Date()}},
    {id: 2, days: 7.0,  name: '1W', step: 1,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)), stop: new Date()}},
    {id: 3, days: 31.0, name: '1M', step: 2,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31)), stop: new Date()}},
    {id: 4, days: 92.0, name: '3M', step: 5,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 92)), stop: new Date()}},
];
