export interface Sensordata {
    device: number;
    ChargingActive: boolean;
    ExtBatt1Volt: number;
    ExtBatt2Volt: number;
    IntBattVolt: number;
    IntTemperature: number;
    PressureHektoPascal: number;
    HumidityPercent: number;
    BrightnessPercent: number;
    MessageReason: number;
    SensorALoopVolt: number;
    SensorAMulti1Volt: number;
    SensorAMulti2Volt: number;
    StatusLoopA: boolean;
    StatusMultiA1: boolean;
    StatusMultiA2: boolean;
    ReedSensorClosed: boolean;
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

export interface WebcamData {
    'name': string,
    'location_name': string,
    'heading': number,
    'latitude': number,
    'longitude': number,
    'url': string,
    'source_name': string,
    'source_url': string,
    'distance': string,
}

export interface WeatherForecastData {
    city: {
        id: number,
        name: 'Nymphenburg',
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: string,
        timezone: number,
        sunrise: number,
        sunset: number,
        icon_sunrise?: string,
        icon_sunset?: string
    };
    cod: string;
    message: number;
    cnt: number;
    list: [
        {
            dt: number,
            is_night?: boolean,
            main: {
                temp: number,
                feels_like: number,
                temp_min: number,
                temp_max: number,
                pressure: number,
                sea_level: number,
                grnd_level: number,
                humidity: number,
                temp_kf: number
            },
            weather: [
                {
                    id: number,
                    main: string,
                    description: string,
                    icon: string
                }
            ],
            clouds: {
                all: number
            },
            wind: {
                speed: number,
                deg: number,
                beaufort?: number,
                beaufort_icon?: string,
                direction_icon?: string
            },
            visibility: number,
            pop: number,
            sys: {
                pod: string
            },
            dt_txt: string
        }
    ];
}

export interface WeatherData {
    coord: {
        lon: number,
        lat: number
    };
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ];
    base: string;
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    };
    visibility: number;
    wind: {
        speed: number,
        deg: number,
        gust: number,
        beaufort_icon?: string,
        direction_icon?: string
    };
    clouds: {
        all: number
    };
    dt: number;
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
export const WEATHER_ICONS = {
  owmneutral: {
      200: 0xf01e,
      201: 0xf01e,
      202: 0xf01e,
      210: 0xf016,
      211: 0xf016,
      212: 0xf016,
      221: 0xf016,
      230: 0xf01e,
      231: 0xf01e,
      232: 0xf01e,
      300: 0xf01c,
      301: 0xf01c,
      302: 0xf019,
      310: 0xf017,
      311: 0xf019,
      312: 0xf019,
      313: 0xf01a,
      314: 0xf019,
      321: 0xf01c,
      500: 0xf01c,
      501: 0xf019,
      502: 0xf019,
      503: 0xf019,
      504: 0xf019,
      511: 0xf017,
      520: 0xf01a,
      521: 0xf01a,
      522: 0xf01a,
      531: 0xf01d,
      600: 0xf01b,
      601: 0xf01b,
      602: 0xf0b5,
      611: 0xf017,
      612: 0xf017,
      615: 0xf017,
      616: 0xf017,
      620: 0xf017,
      621: 0xf01b,
      622: 0xf01b,
      701: 0xf014,
      711: 0xf062,
      721: 0xf0b6,
      731: 0xf063,
      741: 0xf014,
      761: 0xf063,
      762: 0xf063,
      771: 0xf011,
      781: 0xf056,
      800: 0xf00d,
      801: 0xf011,
      802: 0xf011,
      803: 0xf012,
      804: 0xf013,
      900: 0xf056,
      901: 0xf01d,
      902: 0xf073,
      903: 0xf076,
      904: 0xf072,
      905: 0xf021,
      906: 0xf015,
      957: 0xf050
  },
  owmday: {
      200: 0xf010,
      201: 0xf010,
      202: 0xf010,
      210: 0xf005,
      211: 0xf005,
      212: 0xf005,
      221: 0xf005,
      230: 0xf010,
      231: 0xf010,
      232: 0xf010,
      300: 0xf00b,
      301: 0xf00b,
      302: 0xf008,
      310: 0xf008,
      311: 0xf008,
      312: 0xf008,
      313: 0xf008,
      314: 0xf008,
      321: 0xf00b,
      500: 0xf00b,
      501: 0xf008,
      502: 0xf008,
      503: 0xf008,
      504: 0xf008,
      511: 0xf006,
      520: 0xf009,
      521: 0xf009,
      522: 0xf009,
      531: 0xf00e,
      600: 0xf00a,
      601: 0xf0b2,
      602: 0xf00a,
      611: 0xf006,
      612: 0xf006,
      615: 0xf006,
      616: 0xf006,
      620: 0xf006,
      621: 0xf00a,
      622: 0xf00a,
      701: 0xf003,
      711: 0xf062,
      721: 0xf0b6,
      731: 0xf063,
      741: 0xf003,
      761: 0xf063,
      762: 0xf063,
      781: 0xf056,
      800: 0xf00d,
      801: 0xf000,
      802: 0xf000,
      803: 0xf000,
      804: 0xf00c,
      900: 0xf056,
      902: 0xf073,
      903: 0xf076,
      904: 0xf072,
      906: 0xf004,
      957: 0xf050
  },
  owmnight: {
      200: 0xf02d,
      201: 0xf02d,
      202: 0xf02d,
      210: 0xf025,
      211: 0xf025,
      212: 0xf025,
      221: 0xf025,
      230: 0xf02d,
      231: 0xf02d,
      232: 0xf02d,
      300: 0xf02b,
      301: 0xf02b,
      302: 0xf028,
      310: 0xf028,
      311: 0xf028,
      312: 0xf028,
      313: 0xf028,
      314: 0xf028,
      321: 0xf02b,
      500: 0xf02b,
      501: 0xf028,
      502: 0xf028,
      503: 0xf028,
      504: 0xf028,
      511: 0xf026,
      520: 0xf029,
      521: 0xf029,
      522: 0xf029,
      531: 0xf02c,
      600: 0xf02a,
      601: 0xf0b4,
      602: 0xf02a,
      611: 0xf026,
      612: 0xf026,
      615: 0xf026,
      616: 0xf026,
      620: 0xf026,
      621: 0xf02a,
      622: 0xf02a,
      701: 0xf04a,
      711: 0xf062,
      721: 0xf0b6,
      731: 0xf063,
      741: 0xf04a,
      761: 0xf063,
      762: 0xf063,
      781: 0xf056,
      800: 0xf02e,
      801: 0xf022,
      802: 0xf022,
      803: 0xf022,
      804: 0xf086,
      900: 0xf056,
      902: 0xf073,
      903: 0xf076,
      904: 0xf072,
      906: 0xf024,
      957: 0xf050
  },
  beaufort: {
      0: 0xf0b7,
      1: 0xf0b8,
      2: 0xf0b9,
      3: 0xf0ba,
      4: 0xf0bb,
      5: 0xf0bc,
      6: 0xf0bd,
      7: 0xf0be,
      8: 0xf0bf,
      9: 0xf0c0,
      10: 0xf0c1,
      11: 0xf0c2,
      12: 0xf0c3,
  }
};

export function windSpeedToBeaufort(speed) {
  if (speed < 0.3) {
    return 0;
  } else if (speed >= 0.3 && speed < 1.6) {
    return 1;
  } else if (speed >= 1.6 && speed < 3.4) {
    return 2;
  } else if (speed >= 3.4 && speed < 5.5) {
    return 3;
  } else if (speed >= 5.5 && speed < 8) {
    return 4;
  } else if (speed >= 8 && speed < 10.8) {
    return 5;
  } else if (speed >= 10.8 && speed < 13.9) {
    return 6;
  } else if (speed >= 13.9 && speed < 17.2) {
    return 7;
  } else if (speed >= 17.2 && speed < 20.8) {
    return 8;
  } else if (speed >= 20.8 && speed < 24.5) {
    return 9;
  } else if (speed >= 24.5 && speed < 28.5) {
    return 10;
  } else if (speed >= 28.5 && speed < 32.7) {
    return 11;
  } else if (speed >= 32.7 && speed < 42) {
    return 12;
  } else if (speed >= 42 && speed < 52) {
    return 13;
  }
  return 99;
}

export interface UserData {
    id: number
    is_pro: boolean,
    name: string,
    firstname: string,
    phone: string,
    email: string,
    fb_is: string,
    date_pro: string,
    date_pro_end: string,
    period_pro: number
}

export interface SensordataTime {
    device: { value: number, time: Date };
    ChargingActive: { value: boolean, time: Date };
    ExtBatt1Volt: { value: number, time: Date };
    PressureHektoPascal: { value: number, time: Date };
    HumidityPercent: { value: number, time: Date };
    BrightnessPercent: { value: number, time: Date };
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
    ReedSensorClosed: { value: boolean, time: Date };
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
            'PressureHektoPascal': number,
            'HumidityPercent': number,
            'BrightnessPercent': number,
            'PosMessageSubstitute': boolean,
            'SensorALoopVolt': number,
            'SensorAMulti1Volt': number,
            'SensorAMulti2Volt': number,
            'StatusLoopA': boolean,
            'StatusMultiA1': boolean,
            'StatusMultiA2': boolean,
            'ReedSensorClosed': boolean
        },
        'alarm_active'?: {
            'time'?: boolean,
            'ChargingActive'?: boolean,
            'ExtBatt1Volt'?: boolean,
            'ExtBatt2Volt'?: boolean,
            'IntBattVolt'?: boolean,
            'IntTemperature'?: boolean,
            'PressureHektoPascal'?: boolean,
            'HumidityPercent'?: boolean,
            'BrightnessPercent'?: boolean,
            'PosMessageSubstitute'?: boolean,
            'SensorALoopVolt'?: boolean,
            'SensorAMulti1Volt'?: boolean,
            'SensorAMulti2Volt'?: boolean,
            'StatusLoopA'?: boolean,
            'StatusMultiA1'?: boolean,
            'StatusMultiA2'?: boolean,
            'ReedSensorClosed'?: boolean
        },
        'weather'?: WeatherData,
        'weather_forecast'?: WeatherForecastData,
        'webcam'?: WebcamData,
        'nearest_webcam'?: WebcamData,
        'nearest_webcam1'?: WebcamData,
        'nearest_webcam2'?: WebcamData,
        'nearest_webcam3'?: WebcamData,
        'nearest_webcam4'?: WebcamData,
        'nearest_webcam5'?: WebcamData,
        'purchases': {
            'is_pro': boolean,
            'is_recurrent': boolean,
            'date_pro': string,
            'date_pro_end': string,
            'period_pro': number
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
            'PressureHektoPascal': number,
            'HumidityPercent': number,
            'BrightnessPercent': number,
            'PosMessageSubstitute': boolean,
            'SensorALoopVolt': number,
            'SensorAMulti1Volt': number,
            'SensorAMulti2Volt': number,
            'StatusLoopA': boolean,
            'StatusMultiA1': boolean,
            'StatusMultiA2': boolean,
            'ReedSensorClosed': boolean
        }[],
        'sensor_data_length'?: number,
    };
}

export const boatStatusMap: { [fieldName: string]: { icon: string, icon_by_cable: string[], iconfont: string, alarm: string[], datatype: string, unit: string, filter: string, filter_by_cable: string[], name: string, name_by_cable: string[], majorStep: number, show_history: boolean, cable: string[], type: string[] } } = {
    time: {icon: 'o', icon_by_cable: [], iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'ago', filter_by_cable: [], name: 'Time', name_by_cable: [], majorStep: 0, show_history: false, cable: [], type: []},
    ExtBatt1Volt: {icon: 'K', icon_by_cable: [], iconfont: 'bo', alarm: ['Ext. Voltage'], datatype: 'float', unit: 'V', filter: '3V', filter_by_cable: [], name: 'Voltage Extern Battery 1', name_by_cable: ['Voltage Extern Battery', 'Voltage Extern Battery 1'], majorStep: 5, show_history: true, cable: ['SINGLE', 'DOUBLE'], type: ['BoatOfficer']},
    ExtBatt2Volt: {icon: 'K', icon_by_cable: [], iconfont: 'bo', alarm: ['Ext. Voltage'], datatype: 'float', unit: 'V', filter: '', filter_by_cable: [], name: 'Voltage Extern Battery 2', name_by_cable: ['Voltage Extern Battery 2', 'Voltage USB'], majorStep:   0, show_history: true, cable: ['DOUBLE', 'USB'], type: ['BoatOfficer']},
    IntTemperature: {icon: 'n', icon_by_cable: [], iconfont: 'bo', alarm: ['Temperature'], datatype: 'float', unit: '°C', filter: '', filter_by_cable: [], name: 'Intern Temperature', name_by_cable: [], majorStep: 5, show_history: true, cable: [], type: ['BoatOfficer', 'to-mslr']},
    IntBattVolt: {icon: '', icon_by_cable: [], iconfont: 'fas', alarm: ['Internal Battery Voltage'], datatype: 'float', unit: 'V', filter: 'ChargingActive', filter_by_cable: [], name: 'Voltage Intern Battery', name_by_cable: [], majorStep: 1, show_history: true, cable: [], type: ['BoatOfficer', 'to-mslr']},
    PressureHektoPascal: {icon: '', icon_by_cable: [], iconfont: 'wi', alarm: ['Pressure'], datatype: 'float', unit: 'hPa', filter: '', filter_by_cable: [], name: 'Pressure in hectopascal', name_by_cable: [], majorStep: 10, show_history: true, cable: [], type: ['to-mslr']},
    HumidityPercent: {icon: '', icon_by_cable: [], iconfont: 'wi', alarm: ['Humidity'], datatype: 'float', unit: '%', filter: '', filter_by_cable: [], name: 'Humidity', name_by_cable: [], majorStep: 10, show_history: true, cable: [], type: ['to-mslr']},
    BrightnessPercent: {icon: '', icon_by_cable: [], iconfont: 'fas', alarm: ['Brightness'], datatype: 'float', unit: "%", filter: '', filter_by_cable: [], name: 'Brightness', name_by_cable: [], majorStep: 10, show_history: true, cable: [], type: ['to-mslr']},
    ReedSensorClosed: {icon: '', icon_by_cable: [], iconfont: 'fas', alarm: [], datatype: 'bool', unit: "", filter: 'closed', filter_by_cable: [], name: 'Reed Sensor Closed', name_by_cable: [], majorStep: 1, show_history: true, cable: [], type: ['to-mslr']},
    // ChargingActive: {icon: 'U', icon_by_cable: [], iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'active', filter_by_cable: [], name: 'Charging active', name_by_cable: [], majorStep: 1, show_history: false, cable: []},
    // PosMessageSubstitute: {icon: '', icon_by_cable: [], iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'hide', filter_by_cable: [], name: 'Position Message Subst.', name_by_cable: [], majorStep: 1, show_history: false, cable: []},
    // SensorALoopVolt: {icon: 'k', icon_by_cable: [], iconfont: 'bo', alarm: [], datatype: 'float', unit: 'V', filter: '', filter_by_cable: [], name: 'Voltage Loop', name_by_cable: [], majorStep: 1, show_history: true, cable: []},
    // SensorAMulti1Volt: {icon: 'k', icon_by_cable: [], iconfont: 'bo', alarm: [], datatype: 'float', unit: 'V', filter: '', filter_by_cable: [], name: 'Voltage Multi A 1', name_by_cable: [], majorStep: 1, show_history: true, cable: [], type: ['BoatOfficer']},
    // SensorAMulti2Volt: {icon: 'k', icon_by_cable: [], iconfont: 'bo', alarm: [], datatype: 'float', unit: 'V', filter: '', filter_by_cable: [], name: 'Voltage Multi A 2', name_by_cable: [], majorStep: 1, show_history: true, cable: [], type: ['BoatOfficer']},
    StatusLoopA: {icon: '', icon_by_cable: [], iconfont: 'fas', alarm: ['Loop Sensor A Closed', 'Loop Sensor A Opened'], datatype: 'bool', unit: '', filter: 'connected', filter_by_cable: [], name: 'Status Loop A', name_by_cable: ['Multi Sensor', 'Water Sensor'], majorStep: 1, show_history: false, cable: ['MULTI_NONE', 'WATER'], type: ['BoatOfficer']},
    StatusMultiA1: {icon: '', icon_by_cable: [''], iconfont: 'fas', alarm: ['Multi Sensor A 1 Closed', 'Multi Sensor A 1 Opened'], datatype: 'bool', unit: '', filter: 'closed', filter_by_cable: ['wet'], name: 'Status Multi A1', name_by_cable: ['Water Sensor 1'], majorStep: 1, show_history: false, cable: ['WATER'], type: ['BoatOfficer']},
    StatusMultiA2: {icon: '', icon_by_cable: [''], iconfont: 'fas', alarm: ['Multi Sensor A 2 Closed', 'Multi Sensor A 2 Opened'], datatype: 'bool', unit: '', filter: 'closed', filter_by_cable: ['wet'], name: 'Status Multi A2', name_by_cable: ['Water Sensor 2'], majorStep: 1, show_history: false, cable: ['WATER'], type: ['BoatOfficer']},
};

export const boatGpsMap: { [fieldName: string]: { icon: string, iconfont: string, alarm: string[], datatype: string, unit: string, filter: string, name: string, majorStep: number, show_history: boolean } } = {
    time: {icon: 'o', iconfont: 'bo', alarm: [], datatype: 'bool', unit: '', filter: 'ago', name: 'Time', majorStep: 0, show_history: false},
    speed: {icon: '', iconfont: 'fas', alarm: [], datatype: 'float', unit: 'km/h', filter: '', name: 'Speed', majorStep: 10, show_history: true},
    haccuracy: {icon: '', iconfont: 'fas', alarm: [], datatype: 'float', unit: 'm', filter: '', name: 'Position Accuracy', majorStep: 10, show_history: true},
    heading: {icon: '', iconfont: 'fas', alarm: [], datatype: 'float', unit: '°', filter: '', name: 'Direction', majorStep: 45, show_history: false},
};

export const historyInterval: {id: number, days: number, name: string, step: number, stepUnit: string, sensorData: {sliceStart?: number, sliceStop?: number}, positionData: {sliceStart?: number, sliceStop?: number}, dateInterval?: {start: Date, stop: Date}}[] = [
    {id: 0, days: 1.0,  name: '1D', step: 6,  stepUnit: 'Hour', sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)), stop: new Date()}},
    {id: 1, days: 3.0,  name: '3D', step: 12, stepUnit: 'Hour', sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 3)), stop: new Date()}},
    {id: 2, days: 7.0,  name: '1W', step: 1,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)), stop: new Date()}},
    {id: 3, days: 31.0, name: '1M', step: 2,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31)), stop: new Date()}},
    {id: 4, days: 92.0, name: '3M', step: 5,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 92)), stop: new Date()}},
    {id: 5, days: 365.0, name: '1Y', step: 31,  stepUnit: 'Day',  sensorData: {sliceStart: 0, sliceStop: 0}, positionData: {sliceStart: 0, sliceStop: 0}, dateInterval: {start: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 365)), stop: new Date()}},
];
