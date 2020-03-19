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
