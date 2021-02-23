import {localize} from "nativescript-localize";

export const alarmSettingsMap: { [fieldName: string]: { key: string, name: string, icon: string, iconfont: string, datatype: string, unit: string, filter?: string, min: number, max: number, max_pro: number } [] } = {
    ExtBatt1Volt: [
        {key: 'UserCfg_ExtBatt1VoltageAlarmSettingHighInVolt', name: 'High Voltage 1 Level', icon: 'a', iconfont: 'bo', datatype: 'float', unit: ' V', min: 1, max: 60, max_pro: 60},
        {key: 'UserCfg_ExtBatt1VoltageAlarmSettingLowInVolt', name: 'Low Voltage 1 Level', icon: 'f', iconfont: 'bo', datatype: 'float', unit: ' V', min: 0, max: 59, max_pro: 59},
    ],
    ExtBatt2Volt: [
        {key: 'UserCfg_ExtBatt2VoltageAlarmSettingHighInVolt', name: 'High Voltage 2 Level', icon: 'a', iconfont: 'bo', datatype: 'float', unit: ' V', min: 1, max: 60, max_pro: 60},
        {key: 'UserCfg_ExtBatt2VoltageAlarmSettingLowInVolt', name: 'Low Voltage 2 Level', icon: 'f', iconfont: 'bo', datatype: 'float', unit: ' V', min: 0, max: 59, max_pro: 59},
    ],
    IntTemperature: [
        {key: 'UserCfg_IntTemperatureAlarmSettingHighInDegreesC', name: 'Temperature High Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C', min: 20, max: 90, max_pro: 90},
        {key: 'UserCfg_IntTemperatureAlarmSettingLowInDegreesC', name: 'Temperature Low Level', icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C', min: -30, max: 19, max_pro: 19},
    ],
    ShockSensor: [
        {key: 'UserCfg_ShockSensorAlarmSettingSensitivityEnum', name: 'Shock Sensor', icon: 'k', iconfont: 'bo', datatype: 'shock', unit: '', filter: '', min: 0, max: 3, max_pro: 3},
    ],
    Device: [
        {key: 'UserCfg_UpdateRateGeneralEnum', name: 'Update Rate General', icon: 'o', iconfont: 'bo', datatype: 'updaterate', unit: '', filter: '', min: 0, max: 16, max_pro: 24},
        {key: 'UserCfg_UpdateRatePositionEnum', name: 'Update Rate Position', icon: 'o', iconfont: 'bo', datatype: 'updaterate', unit: '', filter: '', min: 0, max: 16, max_pro: 24},
    ]
};

export const cableSettingsDatatypeMap: { [dataTypeKey: string]: { [index: number]: {value: string, name: string} } } = {
    external_voltage_cable: {
        0: {value: 'NONE', name: localize('none')},
        1: {value: 'SINGLE', name: localize('one battery')},
        2: {value: 'DOUBLE', name: localize('two batteries')},
        3: {value: 'USB', name: localize('usb charger')},
    },
    multisensor_cable: {
        0: {value: 'NONE', name: localize('none')},
        1: {value: 'WATER', name: localize('water detection')},
    },
}

export const alarmSettingsDatatypeMap: { [dataTypeKey: string]: { [ttnValue: string]: {value: number, unit: string, name: string} } } = {
    shock: {
        0: {value: 0, unit: '', name: localize('off')},
        1: {value: 1, unit: localize('intensity'), name: localize('low')},
        2: {value: 2, unit: localize('intensity'), name: localize('medium')},
        3: {value: 3, unit: localize('intensity'), name: localize('hard')},
    },
    updaterate: {
        0: {value: 0, unit: localize('hours'), name: '4'},
        1: {value: 1, unit: localize('days'), name: '7'},
        2: {value: 2, unit: localize('days'), name: '5'},
        3: {value: 3, unit: localize('days'), name: '3'},
        4: {value: 4, unit: localize('days'), name: '2'},
        5: {value: 5, unit: localize('day'), name: '1'},
        6: {value: 6, unit: localize('hours'), name: '12'},
        7: {value: 7, unit: localize('hours'), name: '10'},
        8: {value: 8, unit: localize('hours'), name: '8'},
        9: {value: 9, unit: localize('hours'), name: '6'},
        10: {value: 10, unit: localize('hours'), name: '5'},
        11: {value: 11, unit: localize('hours'), name: '3'},
        12: {value: 12, unit: localize('hours'), name: '2'},
        13: {value: 13, unit: localize('hours'), name: '1,5'},
        14: {value: 14, unit: localize('hour'), name: '1'},
        15: {value: 15, unit: localize('minutes'), name: '45'},
        16: {value: 16, unit: localize('minutes'), name: '30'},
        17: {value: 17, unit: localize('minutes'), name: '20'},
        18: {value: 18, unit: localize('minutes'), name: '15'},
        19: {value: 19, unit: localize('minutes'), name: '10'},
        20: {value: 20, unit: localize('minutes'), name: '9'},
        21: {value: 21, unit: localize('minutes'), name: '8'},
        22: {value: 22, unit: localize('minutes'), name: '7'},
        23: {value: 23, unit: localize('minutes'), name: '6'},
        24: {value: 24, unit: localize('minutes'), name: '5'},
        25: {value: 25, unit: localize('minutes'), name: '4'},
        26: {value: 26, unit: localize('minutes'), name: '3'},
        27: {value: 27, unit: localize('minutes'), name: '2'},
        28: {value: 28, unit: localize('minute'), name: '1'},
        29: {value: 29, unit: localize('seconds'), name: '30'},
        30: {value: 30, unit: localize('seconds'), name: '20'},
        31: {value: 31, unit: localize('seconds'), name: '10'},
    },
};

export const alarmSettingsDatatypeMapOrderedByIndex: { [dataTypeKey: string]: { [ttnValue: string]: {value: number, unit: string, name: string} } } = {
    shock: {
        0: {value: 0, unit: '', name: localize('off')},
        1: {value: 1, unit: localize('intensity'), name: localize('low')},
        2: {value: 2, unit: localize('intensity'), name: localize('medium')},
        3: {value: 3, unit: localize('intensity'), name: localize('hard')},
    },
    updaterate: {
        0: {value: 1, unit: localize('days'), name: '7'},
        1: {value: 2, unit: localize('days'), name: '5'},
        2: {value: 3, unit: localize('days'), name: '3'},
        3: {value: 4, unit: localize('days'), name: '2'},
        4: {value: 5, unit: localize('day'), name: '1'},
        5: {value: 6, unit: localize('hours'), name: '12'},
        6: {value: 7, unit: localize('hours'), name: '10'},
        7: {value: 8, unit: localize('hours'), name: '8'},
        8: {value: 9, unit: localize('hours'), name: '6'},
        9: {value: 10, unit: localize('hours'), name: '5'},
        10: {value: 0, unit: localize('hours'), name: '4'},
        11: {value: 11, unit: localize('hours'), name: '3'},
        12: {value: 12, unit: localize('hours'), name: '2'},
        13: {value: 13, unit: localize('hours'), name: '1,5'},
        14: {value: 14, unit: localize('hour'), name: '1'},
        15: {value: 15, unit: localize('minutes'), name: '45'},
        16: {value: 16, unit: localize('minutes'), name: '30'},
        17: {value: 17, unit: localize('minutes'), name: '20'},
        18: {value: 18, unit: localize('minutes'), name: '15'},
        19: {value: 19, unit: localize('minutes'), name: '10'},
        20: {value: 20, unit: localize('minutes'), name: '9'},
        21: {value: 21, unit: localize('minutes'), name: '8'},
        22: {value: 22, unit: localize('minutes'), name: '7'},
        23: {value: 23, unit: localize('minutes'), name: '6'},
        24: {value: 24, unit: localize('minutes'), name: '5'},
        25: {value: 25, unit: localize('minutes'), name: '4'},
        26: {value: 26, unit: localize('minutes'), name: '3'},
        27: {value: 27, unit: localize('minutes'), name: '2'},
        28: {value: 28, unit: localize('minute'), name: '1'},
        29: {value: 29, unit: localize('seconds'), name: '30'},
        30: {value: 30, unit: localize('seconds'), name: '20'},
        31: {value: 31, unit: localize('seconds'), name: '10'},
    },
};

export interface AlarmSettings {
    [idDevice: number]: {
        [alarmKey: string]: { time_reported_device: string, time_changed_device, time_changed_user, value_default: string, value_device: string, value_user: string, type: string, device_id: number }
    };
}

export const alarmByTypeMap: {[typeKey: string]: {title: string, text: string, priority: string, column_sensor_data: string, unit: string, type: string}} = {
    'Button 1 Pushed': {title: 'Button', text: 'Button Pushed', priority: 'High', column_sensor_data: '', unit: '', type: 'Button Pushed'},
    'Button 1 Pushed Long': {title: 'Button', text: 'Button Pushed Long', priority: 'High', column_sensor_data: '', unit: '', type: 'Button Pushed Long'},
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
