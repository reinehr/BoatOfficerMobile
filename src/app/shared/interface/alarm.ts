export const alarmSettingsMap: { [fieldName: string]: { key: string, name: string, icon: string, iconfont: string, datatype: string, unit: string, filter?: string } [] } = {
    ExtBatt1Volt: [
        {key: 'HighVoltAlarm1', name: 'High Voltage 1', icon: 'a', iconfont: 'bo', datatype: 'float', unit: ''},
        {key: 'HighVoltAlarm1Level', name: 'High Voltage 1 Level', icon: 'a', iconfont: 'bo', datatype: 'float', unit: 'V'},
        {key: 'LowVoltAlarm1', name: 'Low Voltage 1', icon: 'f', iconfont: 'bo', datatype: 'float', unit: ''},
        {key: 'LowVoltAlarm1Level', name: 'Low Voltage 1 Level', icon: 'f', iconfont: 'bo', datatype: 'float', unit: 'V'},
        {key: 'MotorStartAlarm1', name: 'Motor Start', icon: 'h', iconfont: 'bo', datatype: 'bool', unit: '', filter: 'active'},
    ],
    ExtBatt2Volt: [
        {key: 'HighVoltAlarm2', name: 'High Voltage 1', icon: 'a', iconfont: 'bo', datatype: 'float', unit: 'V'},
        {key: 'LowVoltAlarm2', name: 'Low Voltage 1', icon: 'f', iconfont: 'bo', datatype: 'float', unit: 'V'}
    ],
    IntTemperature: [
        {key: 'HighIntTemperatureAlarm', name: 'Temperature High', icon: 'n', iconfont: 'bo', datatype: 'float', unit: ''},
        {key: 'HighIntTemperatureAlarmLevel', name: 'Temperature High Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C'},
        {key: 'LowIntTemperatureAlarm', name: 'Temperature Low', icon: 'n', iconfont: 'bo', datatype: 'float', unit: ''},
        {key: 'LowIntTemperatureAlarmLevel', name: 'Temperature Low Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C'},
    ],
    ShockSensor: [
        {key: 'ShockAlarm', name: 'Shock Sensor', icon: 'k', iconfont: 'bo', datatype: 'Light|Medium|Hard', unit: ' Shock', filter: 'shock'},
    ],
};
export interface AlarmSettings {
    [idDevice: number]: {
        [alarmKey: string]: { time_reported_device: string, time_changed_device, time_changed_user, value_default: string, value_device: string, value_user: string, type: string, device_id: number }
    };
}
