import {localize} from "nativescript-localize";

export const alarmSettingsMap: { [fieldName: string]: { key: string, name: string, name_by_cable: string[], icon: string, iconfont: string, datatype: string, unit: string, filter?: string, min: number, max: number, max_pro: number, cable: string[] } [] } = {
    ExtBatt1Volt: [
        {key: 'UserCfg_ExtBatt1VoltageAlarmSettingHighInVolt', name: 'High Voltage 1 Level', name_by_cable: ['High Voltage Level', 'High Voltage 1 Level'], icon: 'a', iconfont: 'bo', datatype: 'float', unit: 'V', min: 1, max: 60, max_pro: 60, cable: ['SINGLE', 'DOUBLE']},
        {key: 'UserCfg_ExtBatt1VoltageAlarmSettingLowInVolt', name: 'Low Voltage 1 Level', name_by_cable: ['Low Voltage Level', 'Low Voltage 1 Level'], icon: 'f', iconfont: 'bo', datatype: 'float', unit: 'V', min: 0, max: 59, max_pro: 59, cable: ['SINGLE', 'DOUBLE']},
        {key: 'Voltage Drop', name: 'Voltage Drop', name_by_cable: ['Voltage Drop', 'Voltage 1 Drop'], icon: 'K', iconfont: 'bo', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: ['SINGLE', 'DOUBLE']},
        {key: 'Ext. Batt 1 Voltage', name: 'Ext. Batt 1 Voltage', name_by_cable: ['Ext. Batt Voltage', 'Ext. Batt 1 Voltage'], icon: 'K', iconfont: 'bo', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: ['SINGLE', 'DOUBLE']},
    ],
    ExtBatt2Volt: [
        {key: 'UserCfg_ExtBatt2VoltageAlarmSettingHighInVolt', name: 'High Voltage 2 Level', name_by_cable: [], icon: 'a', iconfont: 'bo', datatype: 'float', unit: 'V', min: 1, max: 60, max_pro: 60, cable: ['DOUBLE']},
        {key: 'UserCfg_ExtBatt2VoltageAlarmSettingLowInVolt', name: 'Low Voltage 2 Level', name_by_cable: [], icon: 'f', iconfont: 'bo', datatype: 'float', unit: 'V', min: 0, max: 59, max_pro: 59, cable: ['DOUBLE']},
        {key: 'Ext. Batt 2 Voltage', name: 'Ext. Batt 2 Voltage', name_by_cable: [], icon: 'K', iconfont: 'bo', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: ['DOUBLE']},
    ],
    IntTemperature: [
        {key: 'UserCfg_IntTemperatureAlarmSettingHighInDegreesC', name: 'Temperature High Level', name_by_cable: [], icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C', min: 20, max: 90, max_pro: 90, cable: []},
        {key: 'UserCfg_IntTemperatureAlarmSettingLowInDegreesC', name: 'Temperature Low Level', name_by_cable: [], icon: 'n', iconfont: 'bo', datatype: 'float', unit: '°C', min: -30, max: 19, max_pro: 19, cable: []},
        {key: 'Temperature', name: 'Temperature', name_by_cable: [], icon: 'n', iconfont: 'bo', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
    ],
    ShockSensor: [
        {key: 'UserCfg_ShockSensorAlarmSettingSensitivityEnum', name: 'Shock Sensor', name_by_cable: [], icon: 'k', iconfont: 'bo', datatype: 'shock', unit: '', filter: '', min: 0, max: 3, max_pro: 3, cable: []},
        {key: 'Shock Detected', name: 'Shock Detected', name_by_cable: [], icon: 'k', iconfont: 'bo', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
    ],
    Device: [
        {key: 'Unknown Alarm', name: 'Unknown Alarm', name_by_cable: [], icon: '', iconfont: 'far', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
        {key: 'Button 1 Pushed', name: 'Button 1 Pushed', name_by_cable: [], icon: '', iconfont: 'far', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
        {key: 'Button 1 Pushed Long', name: 'Button 1 Pushed Long', name_by_cable: [], icon: '', iconfont: 'fas', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
        {key: 'SOS Activated', name: 'SOS Activated', name_by_cable: [], icon: '', iconfont: 'fas', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
        {key: 'Internal Battery Voltage', name: 'Internal Battery Voltage', name_by_cable: [], icon: '', iconfont: 'fas', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
        {key: 'Position Jump', name: 'Position Jump', name_by_cable: [], icon: '', iconfont: 'fas', datatype: 'datetime', unit: '', filter: '', min: 0, max: 0, max_pro: 0, cable: []},
        {key: 'UserCfg_UpdateRateGeneralEnum', name: 'Update Rate General', name_by_cable: [], icon: 'o', iconfont: 'bo', datatype: 'updaterate', unit: '', filter: '', min: 0, max: 16, max_pro: 24, cable: []},
        {key: 'UserCfg_UpdateRatePositionEnum', name: 'Update Rate Position', name_by_cable: [], icon: 'o', iconfont: 'bo', datatype: 'updaterate', unit: '', filter: '', min: 0, max: 16, max_pro: 24, cable: []},
        {key: 'AdminCfg_AllowMapping', name: 'Allow TTN Mapping', name_by_cable: [], icon: '', iconfont: 'fas', datatype: 'yes-no', unit: '', filter: '', min: 0, max: 1, max_pro: 1, cable: []},
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
        2: {value: 'WEATHER', name: localize('weather')},
    },
}

export const alarmSettingsDatatypeMap: { [dataTypeKey: string]: { [ttnValue: string]: {value: number, unit: string, name: string} } } = {
    'yes-no': {
        0: {value: 0, unit: '', name: localize('no')},
        1: {value: 1, unit: '', name: localize('yes')},
    },
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
    'yes-no': {
        0: {value: 0, unit: '', name: localize('no')},
        1: {value: 1, unit: '', name: localize('yes')},
    },
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

export interface AlarmInhibitSettings {
    [idDevice: number]: {
        [alarmKey: string]: { alarmType: string, active, activeChanged, lastSent: string, inhibitDatetime: string, countSentTotal: string, countSentSinceLastActive: string, device_id: number, isInhibitNow?: boolean }
    };
}

export const alarmByTypeMap: {[typeKey: string]: {title: string, name: string, name_by_cable: string[], priority: string, column_sensor_data: string, unit: string, type: string, cable: string[]}} = {
    'Unknown Alarm': {title: 'Unknown', name: 'Unknown Alarm', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Button Pushed', cable: []},
    'Button 1 Pushed': {title: 'Button', name: 'Button 1 Pushed', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Button Pushed', cable: []},
    'Button 1 Pushed Long': {title: 'Button', name: 'Button 1 Pushed Long', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Button Pushed Long', cable: []},
    'SOS Activated': {title: 'SOS', name: 'SOS Activated', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'SOS Activated', cable: []},
    'Internal Battery Voltage': {title: 'Voltage', name: 'Internal Battery Voltage', name_by_cable:[], priority: 'High', column_sensor_data: 'IntBattVolt', unit: 'V', type: 'Internal Battery Voltage', cable: []},
    'Shock Detected': {title: 'Shock', name: 'Shock Detected', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Shock Detected', cable: []},
    'Temperature': {title: 'Temperature', name: 'Temperature', name_by_cable:[], priority: 'High', column_sensor_data: 'IntTemperature', unit: '°C', type: 'Temperature', cable: []},
    'Position Jump': {title: 'Position', name: 'Position Jump', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Position Jump', cable: []},
    'Voltage Drop': {title: 'Voltage', name: 'Voltage Drop', name_by_cable:['Voltage Drop', 'Voltage 1 Drop'], priority: 'High', column_sensor_data: 'ExtBatt1Volt', unit: 'V', type: 'Voltage Drop', cable: ['SINGLE', 'DOUBLE']},
    'Ext. Batt 1 Voltage': {title: 'Voltage', name: 'Ext. Batt 1 Voltage', name_by_cable:['Ext. Batt Voltage', 'Ext. Batt 1 Voltage'], priority: 'High', column_sensor_data: 'ExtBatt1Volt', unit: 'V', type: 'Ext. Batt 1 Voltage', cable: ['SINGLE', 'DOUBLE']},
    'Ext. Batt 2 Voltage': {title: 'Voltage', name: 'Ext. Batt 2 Voltage', name_by_cable:[], priority: 'High', column_sensor_data: 'ExtBatt2Volt', unit: 'V', type: 'Ext. Batt 2 Voltage', cable: ['DOUBLE']},
    'Loop Sensor A Closed': {title: 'Loop', name: 'Loop Sensor A Closed', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Loop Sensor A Closed', cable: []},
    'Loop Sensor A Opened': {title: 'Loop', name: 'Loop Sensor A Opened', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Loop Sensor A Opened', cable: []},
    'Multi Sensor A 1 Closed': {title: 'Multi', name: 'Multi Sensor A 1 Closed', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 1 Closed', cable: []},
    'Multi Sensor A 1 Opened': {title: 'Multi', name: 'Multi Sensor A 1 Opened', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 1 Opened', cable: []},
    'Multi Sensor A 2 Closed': {title: 'Multi', name: 'Multi Sensor A 2 Closed', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 2 Closed', cable: []},
    'Multi Sensor A 2 Opened': {title: 'Multi', name: 'Multi Sensor A 2 Opened', name_by_cable:[], priority: 'High', column_sensor_data: '', unit: '', type: 'Multi Sensor A 2 Opened', cable: []},
};
