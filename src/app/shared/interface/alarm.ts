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

export const alarmByTypeMap: {[typeKey: string]: {title: string, text: string, priority: string, column_sensor_data: string, unit: string, type: string}} = {
    'Button 1 Pushed': {title: 'Button', text: 'Button 1 Pushed', priority: 'High', column_sensor_data: '', unit: '', type: 'Button 1 Pushed'},
    'Button 1 Pushed Long': {title: 'Button', text: 'Button 1 Pushed Long', priority: 'High', column_sensor_data: '', unit: '', type: 'Button 1 Pushed Long'},
    'SOS Activated': {title: 'SOS', text: 'SOS Activated', priority: 'High', column_sensor_data: '', unit: '', type: 'SOS Activated'},
    'Internal Battery Voltage': {title: 'Voltage', text: 'Internal Battery Voltage Warning', priority: 'High', column_sensor_data: 'IntBattVolt', unit: ' V', type: 'Internal Battery Voltage'},
    'Shock Detected': {title: 'Shock', text: 'Shock Detected', priority: 'High', column_sensor_data: '', unit: '', type: 'Shock Detected'},
    Temperature: {title: 'Temperature', text: 'Temperature Warning', priority: 'High', column_sensor_data: 'IntTemperature', unit: '°C', type: 'Temperature'},
    'Position Jump': {title: 'Position', text: 'Position Jump', priority: 'High', column_sensor_data: '', unit: '', type: 'Position Jump'},
    'Voltage Drop': {title: 'Voltage', text: 'Voltage Drop Detected', priority: 'High', column_sensor_data: 'ExtBatt1Volt', unit: ' V', type: 'Voltage Drop'},
    'Ext. Batt 1 Voltage': {title: 'Voltage', text: 'Ext. Batt 1 Voltage Warning', priority: 'High', column_sensor_data: 'ExtBatt1Volt', unit: ' V', type: 'Ext. Batt 1 Voltage'},
    'Ext. Batt 2 Voltage': {title: 'Voltage', text: 'Ext. Batt 2 Voltage Warning', priority: 'High', column_sensor_data: 'ExtBatt2Volt', unit: ' V', type: 'Ext. Batt 2 Voltage'},
    'Loop Sensor A Closed': {title: 'Loop', text: 'Loop Sensor A Closed', priority: 'High', column_sensor_data: '', unit: '', type: 'Loop Sensor A Closed'},
    'Loop Sensor A Opened': {title: 'Loop', text: 'Loop Sensor A Opened', priority: 'High', column_sensor_data: '', unit: '', type: 'Loop Sensor A Opened'},
    'Multi Sensor A 1 Closed': {title: 'Multi', text: 'Multi Sensor A 1 Closed', priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 1 Closed'},
    'Multi Sensor A 1 Opened': {title: 'Multi', text: 'Multi Sensor A 1 Opened', priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 1 Opened'},
    'Multi Sensor A 2 Closed': {title: 'Multi', text: 'Multi Sensor A 2 Closed', priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 2 Closed'},
    'Multi Sensor A 2 Opened': {title: 'Multi', text: 'Multi Sensor A 2 Opened', priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 2 Opened'},
};
