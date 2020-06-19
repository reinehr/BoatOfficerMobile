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
        {key: 'UserCfg_ShockSensorAlarmSettingSensitivityEnum', name: 'Shock Sensor', icon: 'k', iconfont: 'bo', datatype: 'shock', unit: '', filter: ''},
    ],
    Device: [
        {key: 'UserCfg_UpdateRateGeneralEnum', name: 'Update Rate General', icon: 'o', iconfont: 'bo', datatype: 'updaterate', unit: '', filter: ''},
        {key: 'UserCfg_UpdateRatePositionEnum', name: 'Update Rate Position', icon: 'o', iconfont: 'bo', datatype: 'updaterate', unit: '', filter: ''},
    ]
};

export const alarmSettingsDatatypeMap: { [dataTypeKey: string]: { [ttnValue: string]: {value: number, unit: string, name: string} } } = {
    shock: {
        0: {value: 0, unit: '', name: 'off'},
        1: {value: 1, unit: 'intensity', name: 'low'},
        2: {value: 2, unit: 'intensity', name: 'medium'},
        3: {value: 3, unit: 'intensity', name: 'hard'},
    },
    updaterate: {
        0: {value: 0, unit: 'hours', name: '4'},
        1: {value: 7, unit: 'days', name: '7'},
        2: {value: 5, unit: 'days', name: '5'},
        3: {value: 3, unit: 'days', name: '3'},
        4: {value: 2, unit: 'days', name: '2'},
        5: {value: 1, unit: 'day', name: '1'},
        6: {value: 1, unit: 'hours', name: '12'},
        7: {value: 1, unit: 'hours', name: '10'},
        8: {value: 1, unit: 'hours', name: '8'},
        9: {value: 1, unit: 'hours', name: '6'},
        10: {value: 1, unit: 'hours', name: '5'},
        11: {value: 1, unit: 'hours', name: '3'},
        12: {value: 1, unit: 'hours', name: '2'},
        13: {value: 1, unit: 'hours', name: '1,5'},
        14: {value: 1, unit: 'hour', name: '1'},
        15: {value: 1, unit: 'minutes', name: '45'},
        16: {value: 1, unit: 'minutes', name: '30'},
        17: {value: 1, unit: 'minutes', name: '20'},
        18: {value: 1, unit: 'minutes', name: '15'},
        19: {value: 1, unit: 'minutes', name: '10'},
        20: {value: 1, unit: 'minutes', name: '9'},
        21: {value: 1, unit: 'minutes', name: '8'},
        22: {value: 1, unit: 'minutes', name: '7'},
        23: {value: 1, unit: 'minutes', name: '6'},
        24: {value: 1, unit: 'minutes', name: '5'},
        25: {value: 1, unit: 'minutes', name: '4'},
        26: {value: 1, unit: 'minutes', name: '3'},
        27: {value: 1, unit: 'minutes', name: '2'},
        28: {value: 1, unit: 'minute', name: '1'},
        29: {value: 1, unit: 'seconds', name: '30'},
        30: {value: 1, unit: 'seconds', name: '20'},
        31: {value: 1, unit: 'seconds', name: '10'},
    }
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
