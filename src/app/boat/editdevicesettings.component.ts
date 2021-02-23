import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '~/app/shared/data.service';
import {cableSettingsDatatypeMap} from '~/app/shared/interface/alarm';
import {stringify} from "@angular/compiler/src/util";
import {localize} from "nativescript-localize";


@Component({
    selector: 'app-editdevicesettings',
    templateUrl: './editdevicesettings.component.html'
})
export class EditdevicesettingsComponent implements OnInit {

    constructor(
        private router: RouterExtensions,
        private apiService: ApiService,
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.field = params.field;
            this.idDevice = params.idDevice;
        });
    }

    cableSettingsDatatypeMap = cableSettingsDatatypeMap;
    public idDevice = 0;
    public field = '';
    public name = '';
    description = '';
    value = '';
    public type = '';
    public icon = '';
    public iconfont = 's';
    private isLoading = false;
    // listPicker: {[ttnValue: number]: string} = {0: '0V', 1: '1V', 2: '2V'};
    listPicker: Array<string> = [];
    originalCableSettingIndex = 0;
    selectedListPickerIndex = 0;
    selectedCableValue = '';
    listPickerWidth = 150;


    ngOnInit(): void {
        console.log('Load index:' + this.idDevice + ' field: ' + this.field);
        const text = '';
        if (this.field == 'name') {
            this.name = 'Boat Name';
            this.description = 'Some name to identify this BoatOfficer-device';
            this.value = this.dataService.deviceData[this.idDevice].name;
            this.icon = 'O';
        } else if (this.field == 'berth') {
            this.name = 'Berth';
            this.description = 'Some name for the berth, where the boat is located';
            this.value = this.dataService.deviceData[this.idDevice].berth;
            this.iconfont = 'fas';
            this.icon = '';
        } else if (this.field == 'contact') {
            this.name = 'Contact number';
            this.description = 'The contact number you want to call in case of a critical alarm';
            this.value = this.dataService.deviceData[this.idDevice].harbour_contact;
            this.type = 'phone';
            this.icon = 'T';
        } else if (this.field == 'external_voltage_cable') {
            this.name = localize('External battery');
            this.description = '';
            this.value = this.dataService.deviceData[this.idDevice].external_voltage_cable;
            this.iconfont = 'fas';
            this.icon = '';
        } else if (this.field == 'multisensor_cable') {
            this.name = localize('Multisensor cable');
            this.description = '';
            this.value = this.dataService.deviceData[this.idDevice].multisensor_cable;
            this.iconfont = 'fas';
            this.icon = '';
        }
        if(cableSettingsDatatypeMap[this.field]) {
            let i = 0;
            for (let cable in cableSettingsDatatypeMap[this.field]) {
                console.log('cable: ' + cable);
                if (this.dataService.deviceData[this.idDevice][this.field] === cableSettingsDatatypeMap[this.field][cable].value) {
                    this.originalCableSettingIndex = this.listPicker.length;
                    this.selectedListPickerIndex = this.originalCableSettingIndex;
                    console.log('value_device: ' + i + ' originalSettingIndex: ' + cableSettingsDatatypeMap[this.field][cable].value);
                }
                this.listPicker.push(localize(cableSettingsDatatypeMap[this.field][cable].value));
                i = i+1;
            }
        }

    }

    saveDeviceSetting() {
        console.log('Save index:' + this.field + ' value: ' + this.selectedCableValue);
        if (this.field == 'name') {
            this.dataService.deviceData[this.idDevice].name = this.value;
        } else if (this.field == 'berth') {
            this.dataService.deviceData[this.idDevice].berth = this.value;
        } else if (this.field == 'contact') {
            this.dataService.deviceData[this.idDevice].harbour_contact = this.value;
        } else if (this.field == 'external_voltage_cable') {
            this.dataService.deviceData[this.idDevice].external_voltage_cable = this.selectedCableValue;
        } else if (this.field == 'multisensor_cable') {
            this.dataService.deviceData[this.idDevice].multisensor_cable = this.selectedCableValue;
        }
        this.apiService.saveDeviceSettings(
            this.dataService.deviceData[this.idDevice].id,
            this.dataService.deviceData[this.idDevice].name,
            this.dataService.deviceData[this.idDevice].berth,
            this.dataService.deviceData[this.idDevice].harbour_contact,
            this.dataService.deviceData[this.idDevice].external_voltage_cable,
            this.dataService.deviceData[this.idDevice].multisensor_cable
            );
        this.dataService.refreshBoatStatus();
        this.goBack();
    }


    goBack() {
        this.router.backToPreviousPage();
    }

    selectedIndexChanged(picker) {
        console.log('picker selection: ' + picker.selectedIndex);
        if (-1 != picker.selectedIndex)
        {
            this.selectedListPickerIndex = picker.selectedIndex;
            this.selectedCableValue = cableSettingsDatatypeMap[this.field][picker.selectedIndex].value;
            console.log('selected cable value: ' + this.selectedCableValue);
        }
    }
}
