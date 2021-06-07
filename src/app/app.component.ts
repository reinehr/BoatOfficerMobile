import {Component, OnInit, ViewChild} from '@angular/core';
import { Theme } from "@nativescript/theme";
import { isAndroid } from '@nativescript/core/platform';
import * as firebase from 'nativescript-plugin-firebase';
import {getString, setString, hasKey, remove} from '@nativescript/core/application-settings';
import { SelectedIndexChangedEventData, TabStripItemEventData, tabStripProperty } from "@nativescript/core/ui/bottom-navigation";
import { RouterExtensions } from "nativescript-angular/router";
import {alert} from "@nativescript/core/ui/dialogs";
import {AnimationCurve} from "@nativescript/core/ui/enums";
import {Page} from "@nativescript/core/ui/page";

@Component({
    selector: 'app-ns',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css', ]
})
export class AppComponent implements OnInit {

    currentIndex = -1;
    themeMode = "unknown"

    constructor(
        private routerExtensions: RouterExtensions,
        private page: Page
    ) {
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
                alert({okButtonText: 'OK', message: message.body, title: message.title});
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

        if (isAndroid)
        {
            try {
                Theme.setMode(Theme.Light);
            } catch (e) {
                console.log("Error setting Theme to light mode", e);
            }
        }
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        this.routerExtensions.navigate([""], { clearHistory: true });
        console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
        this.currentIndex = args.newIndex;
    }


    onBoatMenuTap(args){
        if (0 == this.currentIndex)
        {
            this.routerExtensions.navigate([""], { clearHistory: true, transition: {name: "slideRight", duration: 300, curve: AnimationCurve.easeOut}});
        }
    }

    onAlarmsMenuTap(args){
        if (1 == this.currentIndex)
        {
            this.routerExtensions.navigate([""], { clearHistory: true, transition: {name: "slideRight", duration: 300, curve: AnimationCurve.easeOut}});
        }
    }

    onLocationMenuTap(args){
        if (2 == this.currentIndex)
        {
            this.routerExtensions.navigate([""], { clearHistory: true, transition: {name: "slideRight", duration: 300, curve: AnimationCurve.easeOut}});
        }
    }

    onSettingsMenuTap(args){
        if (3 == this.currentIndex)
        {
            this.routerExtensions.navigate([""], { clearHistory: true, transition: {name: "slideRight", duration: 300, curve: AnimationCurve.easeOut}});
        }
    }
}
