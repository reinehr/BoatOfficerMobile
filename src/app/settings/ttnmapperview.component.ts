import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular';
import {AuthService} from '~/app/shared/auth.service';
import {DataService} from "~/app/shared/data.service";
import { alert } from "@nativescript/core/ui/dialogs";
import {localize} from "nativescript-localize";
import {ApiService} from "~/app/shared/api.service";
import {hasKey, remove} from "@nativescript/core/application-settings";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "@nativescript/core/ui/enums"; // used to describe at what accuracy the location should be get


@Component({
    selector: 'ttnmapperview',
    templateUrl: './ttnmapperview.component.html',
    moduleId: module.id
})

export class TtnmapperviewComponent implements OnInit {

    isLoading = false;
    currentPosition = null;
    ttnmapperurl = '';

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: RouterExtensions,
        private dataService: DataService,
    ) {
        this.ttnmapperurl = 'https://ttnmapper.org/';
    }

    ngOnInit() {
        const options = {
            title: localize('About TTN Mapper'),
            message: localize('ttnmapper_info_text'),
            okButtonText: 'OK'
        };
        alert(options).then();
        console.log("Show TTN Mapper: "+this.ttnmapperurl);
        geolocation.enableLocationRequest()
            .then(() => {
                geolocation.isEnabled().then(isLocationEnabled => {
                    if(!isLocationEnabled) {
                        console.log("location not enabled")
                        // potentially do more then just end here...
                        return;
                    }

                    // MUST pass empty object!!
                    geolocation.getCurrentLocation({timeout: 7000})
                        .then(result => {
                            this.currentPosition = result;
                            this.ttnmapperurl = this.ttnmapperurl+"heatmap/?lat="+this.currentPosition.latitude+"&lon="+this.currentPosition.longitude+"&zoom=12";
                            console.log("Combined URL: "+this.ttnmapperurl);
                        })
                        .catch(e => {
                            console.log('loc error', e);
                        });
                });
            });
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
