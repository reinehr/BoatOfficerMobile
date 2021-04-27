import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService, DeviceAlarmDataFormat, SensorDataHistory} from '~/app/shared/data.service';
import {registerElement} from 'nativescript-angular/element-registry';
import {ApiService} from '~/app/shared/api.service';
import { openUrl } from "@nativescript/core/utils/utils";
import {ScrollView, ScrollEventData} from '@nativescript/core/ui/scroll-view';
import {Subscription} from 'rxjs';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {BoatHistory, BoatStatus, boatStatusMap, historyInterval} from '~/app/shared/interface/sensordata';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {TimeagoIntl} from 'ngx-timeago';
import {localize} from 'nativescript-localize';
import {ImageSource} from '@nativescript/core/image-source';
import {Image} from '@nativescript/core/ui/image';
import { WebView } from '@nativescript/core/ui/web-view';
import {Page} from '@nativescript/core/ui/page';
import {StackLayout} from "@nativescript/core/ui/layouts/stack-layout";
import { isAndroid } from '@nativescript/core/platform';

@Component({
    selector: 'app-manual',
    templateUrl: './manual.component.html',
    moduleId: module.id,
})
export class ManualComponent implements OnInit, AfterViewInit {
    isLoading = false;

    private sensordataSub: Subscription;
    scrollLayout: ScrollView = null;
    scrollBase = null;
    allchaptersvisible = false;
    is_android = isAndroid

    chapters = [{'no': '1', 'title': localize('manual_bob_chapter_title_introduction'), 'content':localize('manual_bob_chapter_content_introduction'), 'weblink': 'https://www.boatofficer.com/support', 'weblinktitle':'www.boatofficer.com/support'},
        {'no': '2', 'title': localize('manual_bob_chapter_title_scope'), 'content':localize('manual_bob_chapter_content_scope')},
        {'no': '3', 'title': localize('manual_bob_chapter_title_warnings'), 'content':localize('manual_bob_chapter_content_warnings')},
        {'no': '4', 'title': localize('manual_bob_chapter_title_illustration'), 'content':'', 'image': 'boatofficer_blue_description.png'},
        {'no': '5', 'title': localize('manual_bob_chapter_title_installation_mounting'), 'content':localize('manual_bob_chapter_content_installation_mounting')},
        {'no': '6', 'title': localize('manual_bob_chapter_title_installation_position'), 'content':localize('manual_bob_chapter_content_installation_position')},
        {'no': '7', 'title': localize('manual_bob_chapter_title_installation_batterycables'), 'content':localize('manual_bob_chapter_content_installation_batterycables'), 'image': 'montage_kabel.png'},
        {'no': '8', 'title': localize('manual_bob_chapter_title_installation_app'), 'content':localize('manual_bob_chapter_content_installation_app')},
        {'no': '9', 'title': localize('manual_bob_chapter_title_leds'), 'content':localize('manual_bob_chapter_content_leds')},
        {'no': '10', 'title': localize('manual_bob_chapter_title_lorawan'), 'content':localize('manual_bob_chapter_content_lorawan'), 'weblink': 'https://ttnmapper.org', 'weblinktitle':'ttnmapper.org'},
        {'no': '11', 'title': localize('manual_bob_chapter_title_maintenance'), 'content':localize('manual_bob_chapter_content_maintenance')}
    ]



    constructor(
        private page: Page,
    ) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.scrollLayout = this.page.getViewById("level_4") as ScrollView;
        this.scrollBase = this.page.getViewById("level_5") as StackLayout;
    }

    onScroll(args: ScrollEventData) {
        const scrollView = args.object as ScrollView;

        console.log('scrollX: ' + args.scrollX);
        console.log('scrollY: ' + args.scrollY);
    }


    toggleChapterDetails(chapterNo) {
        console.log("Chapter Tapped No: "+chapterNo);
        const chapterContentView = <StackLayout> this.page.getViewById("chapter-content-"+chapterNo);

        if (chapterContentView.isCollapsed)
        {
            const scrollTarget = this.page.getViewById("chapter-container-"+chapterNo) as StackLayout;

            chapterContentView.opacity = 0;
            chapterContentView.visibility = "visible";
            chapterContentView.animate({
                opacity: 1,
                duration: 100
            }).then( () => {
                    this.scrollLayout.scrollToVerticalOffset(scrollTarget.getLocationRelativeTo(this.scrollBase).y, true);
                });
            // not exactly true, but collapse of all is desired at tap on Title Bar
            this.allchaptersvisible = true;
        }
        else
        {
            chapterContentView.animate({
                opacity: 0,
                duration: 100
            }).then(() => {
                chapterContentView.visibility='collapse';
            }, (err) => {});
        }
        //boatDetailsView.visibility = boatDetailsView.isCollapsed ? "visible" : "collapse";
    }

    toggleAllChapterDetails(args) {
        console.log("Chapter Status tapped");
        for (let chapter of this.chapters)
        {
            const chapterContentView = <StackLayout> this.page.getViewById("chapter-content-"+chapter.no);
            chapterContentView.visibility = this.allchaptersvisible ? "collapse" : "visible";
            chapterContentView.opacity = 1;
        }
        this.allchaptersvisible = !this.allchaptersvisible;
        this.scrollLayout.scrollToVerticalOffset(0, true);
    }

    openChapterUrl(chapterNo) {
        for (let chapter of this.chapters)
        {
            if (chapter.no == chapterNo)
            {
                console.log("url tapped: " + chapter.weblink);
                openUrl(chapter.weblink);
            }
        }
    }

    onLoadFinishedChapterWebview(chapterNo) {
        for (let chapter of this.chapters)
        {
            if (chapter.no == chapterNo)
            {
                console.log("load finished webview of chapter: " + chapter.no);
                console.log("size of chapter: " + chapter.no);
            }
        }
    }

}
