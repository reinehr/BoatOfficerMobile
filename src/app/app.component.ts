import {Component, OnInit} from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import {getCurrentPushToken} from 'nativescript-plugin-firebase';

@Component({
    selector: 'app-ns',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css', ]
})
export class AppComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: true,

            onPushTokenReceivedCallback: (token) => {
                console.log('[Firebase] onPushTokenReceivedCallback:', {token});
            },

            onMessageReceivedCallback: (message: firebase.Message) => {
                console.log('[Firebase] onMessageReceivedCallback:', {message});
            }
        })
            .then(() => {
                console.log('[Firebase] Initialized');
            })
            .catch(error => {
                console.log('[Firebase] Initialize', {error});
            });
    }
}
