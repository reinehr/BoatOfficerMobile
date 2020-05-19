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
        }
    };
}

export const boatStatusMap: {[fieldName: string]: {icon: string, alarm: string[], datatype: string, unit: string, filter: string}} = {
            time: {icon: 'o', alarm: [], datatype: 'bool', unit: '', filter: 'ago'},
            ExtBatt1Volt: {icon: 'K', alarm: ['Ext. Voltage'], datatype: 'float', unit: 'V', filter: ''},
            ExtBatt2Volt: {icon: 'K', alarm: ['Ext. Voltage'], datatype: 'float', unit: 'V', filter: ''},
            IntBattVolt: {icon: 'K', alarm: ['Internal Battery Voltage'], datatype: 'float', unit: 'V', filter: ''},
            ChargingActive: {icon: 'U', alarm: [], datatype: 'bool', unit: '', filter: 'active'},
            IntTemperature: {icon: 'n', alarm: ['Temperature'], datatype: 'float', unit: '°C', filter: ''},
            PosMessageSubstitute: {icon: '', alarm: [], datatype: 'bool', unit: '', filter: 'hide'},
            SensorALoopVolt: {icon: 'k', alarm: [], datatype: 'float', unit: 'V', filter: ''},
            SensorAMulti1Volt: {icon: 'k', alarm: [], datatype: 'float', unit: 'V', filter: ''},
            SensorAMulti2Volt: {icon: 'k', alarm: [], datatype: 'float', unit: 'V', filter: ''},
            StatusLoopA: {icon: 'W', alarm: ['Loop Sensor A Closed', 'Loop Sensor A Opened'], datatype: 'bool', unit: '', filter: 'closed'},
            StatusMultiA1: {icon: 'W', alarm: ['Multi Sensor A 1 Closed', 'Multi Sensor A 1 Opened'], datatype: 'bool', unit: '', filter: 'closed'},
            StatusMultiA2: {icon: 'W', alarm: ['Multi Sensor A 2 Closed', 'Multi Sensor A 2 Opened'], datatype: 'bool', unit: '', filter: 'closed'}
};
