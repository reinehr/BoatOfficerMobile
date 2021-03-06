import {Component, OnInit, Input} from '@angular/core';
import {isAndroid } from '@nativescript/core/platform';
import {Page} from '@nativescript/core/ui/page';
import {RouterExtensions} from 'nativescript-angular/router';

declare var android: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ns-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.css', ],
    moduleId: module.id
})
export class ActionBarComponent implements OnInit {
    @Input() title: string;
    @Input() showBackButton = true;

    constructor(private page: Page, private router: RouterExtensions) {
    }

    ngOnInit() {
    }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            if (backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor('#171717'),
                    (android.graphics as any).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }
}
