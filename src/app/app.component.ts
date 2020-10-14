import {Component, OnInit} from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import {getString, setString, hasKey, remove} from 'tns-core-modules/application-settings';

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
                setString('push_token', token);
            },

            onMessageReceivedCallback: (message: firebase.Message) => {
                console.log('[Firebase] onMessageReceivedCallback:', {message});
            },

            onAuthStateChanged: (data) => { // optional but useful to immediately re-logon the user when he re-visits your app
                console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                }
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
