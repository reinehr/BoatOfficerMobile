
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
    device: { value: number, time: Date};
    ChargingActive: { value: boolean, time: Date};
    ExtBatt1Volt: { value: number, time: Date};
    ExtBatt2Volt: { value: number, time: Date};
    IntBattVolt: { value: number, time: Date};
    IntTemperature: { value: number, time: Date};
    MessageReason: { value: number, time: Date};
    SensorALoopVolt: { value: number, time: Date};
    SensorAMulti1Volt: { value: number, time: Date};
    SensorAMulti2Volt: { value: number, time: Date};
    StatusLoopA: { value: boolean, time: Date};
    StatusMultiA1: { value: boolean, time: Date};
    StatusMultiA2: { value: boolean, time: Date};
    altitude: { value: number, time: Date};
    hdop: { value: number, time: Date};
    isMultiGnssUsed: { value: boolean, time: Date};
    latitude: { value: number, time: Date};
    longitude: { value: number, time: Date};
    portNo: { value: number, time: Date};
    raw: { value: string, time: Date};
    time: { value: string, time: Date};
    counter: { value: number, time: Date};
}
