import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import * as imagepicker from 'nativescript-imagepicker';
import {ApiService} from '~/app/shared/api.service';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "~/app/shared/data.service";
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders} from "tns-core-modules/file-system";
import { localize } from "nativescript-localize";


@Component({
    selector: 'app-uploadpicture',
    templateUrl: './uploadpicture.component.html'
})
export class UploadpictureComponent implements OnInit {

    public idDevice = 0;
    private isLoading = false;

    constructor(
        private router: RouterExtensions,
        private apiService: ApiService,
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.idDevice = params.idDevice;
        });
    }


    imageAssets = [];
    imageSrc: any;
    isSingleMode = true;
    thumbSize = 80;
    previewSize = 300;
    status = '';

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

                that.imageAssets = selection;

                const source = new ImageSource();
                source.fromAsset(that.imageAssets[0])
                    .then((imageSource: ImageSource) => {
                        const folderPath: string = knownFolders.temp().path;
                        const fileName = "temp.jpg";
                        const filePath = path.join(folderPath, fileName);
                        const saved: boolean = imageSource.saveToFile(filePath, "jpg");
                        if (saved) {
                            console.log("Image saved successfully!");
                        }
                    })
                    .catch((e) => {
                        console.log("Error: ");
                        console.log(e);
                    });

            }).catch(e => {
            console.log(e);
        });
    }

    goBack() {
        this.router.backToPreviousPage();
    }

    onUploadTap() {
        console.log('Picture upload started for device with id:' + this.idDevice);
        const session = this.apiService.saveBoatImage(this.imageAssets, this.imageSrc, this.idDevice)
            // .subscribe(response => {
            //     console.log('uploading image ... ', response);
            //     if (response === 'UPLOAD COMPLETE') {
            //
            //         this.isLoading = true;
            //         this.apiService.getDeviceData().subscribe(resp => {
            //             console.log('DeviceData loading ...');
            //             this.isLoading = false;
            //         }, error => {
            //             console.log(error);
            //             this.isLoading = false;
            //         });
            //         this.router.navigate(['']);
            //     } else {
            //         const options = {
            //             title: response,
            //             okButtonText: 'OK'
            //         };
            //         alert(options);
            //     }
            // }, error => {
            //     console.log(error);
            // })
        ;
        session.on('complete', e => {
            this.status = 'complete';
            const options = {
                title: localize('Upload complete'),
                okButtonText: 'OK'
            };
            this.dataService.refreshBoatStatus();
            alert(options);
        });
    }
}
