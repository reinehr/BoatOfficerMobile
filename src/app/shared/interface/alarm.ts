export const alarmSettingsMap: { [fieldName: string]: { key: string, name: string, icon: string, iconfont: string, datatype: string, unit: string, filter?: string } [] } = {
    ExtBatt1Volt: [
        // {key: 'HighVoltAlarm1', name: 'High Voltage 1', icon: 'a', iconfont: 'bo', datatype: 'float', unit: ''},
        {key: 'UserCfg_ExtBatt1VoltageAlarmSettingHighInVolt', name: 'High Voltage 1 Level', icon: 'a', iconfont: 'bo', datatype: 'float', unit: ' V'},
        // {key: 'LowVoltAlarm1', name: 'Low Voltage 1', icon: 'f', iconfont: 'bo', datatype: 'float', unit: ''},
        {key: 'UserCfg_ExtBatt1VoltageAlarmSettingLowInVolt', name: 'Low Voltage 1 Level', icon: 'f', iconfont: 'bo', datatype: 'float', unit: ' V'},
        // {key: 'MotorStartAlarm1', name: 'Motor Start', icon: 'h', iconfont: 'bo', datatype: 'bool', unit: '', filter: 'active'},
    ],
    ExtBatt2Volt: [
        {key: 'UserCfg_ExtBatt2VoltageAlarmSettingHighInVolt', name: 'High Voltage 2 Level', icon: 'a', iconfont: 'bo', datatype: 'float', unit: ' V'},
        {key: 'UserCfg_ExtBatt2VoltageAlarmSettingLowInVolt', name: 'Low Voltage 2 Level', icon: 'f', iconfont: 'bo', datatype: 'float', unit: ' V'},
    ],
    IntTemperature: [
        {key: 'UserCfg_IntTemperatureAlarmSettingHighInDegreesC', name: 'Temperature High Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C'},
        // {key: 'HighIntTemperatureAlarmLevel', name: 'Temperature High Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C'},
        {key: 'UserCfg_IntTemperatureAlarmSettingLowInDegreesC', name: 'Temperature Low Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C'},
        // {key: 'LowIntTemperatureAlarmLevel', name: 'Temperature Low Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C'},
    ],
    ShockSensor: [
        {key: 'UserCfg_ShockSensorAlarmSettingSensitivityEnum', name: 'Shock Sensor', icon: 'k', iconfont: 'bo', datatype: 'Light|Medium|Hard', unit: ' Shock', filter: 'shock'},
    ],
    Device: [
        {key: 'UserCfg_UpdateRateGeneralEnum', name: 'Update Rate General', icon: 'o', iconfont: 'bo', datatype: 'float', unit: ' minutes', filter: ''},
        {key: 'UserCfg_UpdateRatePositionEnum', name: 'Update Rate Position', icon: 'o', iconfont: 'bo', datatype: 'float', unit: ' minutes', filter: ''},
    ]
};
export interface AlarmSettings {
    [idDevice: number]: {
        [alarmKey: string]: { time_reported_device: string, time_changed_device, time_changed_user, value_default: string, value_device: string, value_user: string, type: string, device_id: number }
    };
}
