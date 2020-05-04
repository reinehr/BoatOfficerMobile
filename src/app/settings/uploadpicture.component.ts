import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import * as imagepicker from 'nativescript-imagepicker';
import {ApiService} from '~/app/shared/api.service';


@Component({
    selector: 'app-uploadpicture',
    templateUrl: './uploadpicture.component.html'
})
export class UploadpictureComponent implements OnInit {

    constructor(private router: RouterExtensions, private apiService: ApiService) {
        // Use the constructor to inject services.
    }


    imageAssets = [];
    imageSrc: any;
    isSingleMode = true;
    thumbSize = 80;
    previewSize = 300;

    ngOnInit(): void {

    }

    public onSelectMultipleTap() {
        this.isSingleMode = false;

        const context = imagepicker.create({
            mode: 'multiple'
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        const context = imagepicker.create({
            mode: 'single'
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        const that = this;

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.imageSrc = null;
                return context.present();
            })
            .then((selection) => {
                console.log('Selection done: ' + JSON.stringify(selection));
                that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

                // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                selection.forEach(element => {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                this.apiService.saveBoatImage(that.imageAssets, that.imageSrc)

                that.imageAssets = selection;
            }).catch(e => {
            console.log(e);
        });
    }
}
