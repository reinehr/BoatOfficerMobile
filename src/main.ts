// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from '@nativescript/angular';

import { AppModule } from './app/app.module';
import * as purchase from 'nativescript-purchase';

purchase.init([
    'com.boatofficer.boatofficermobile.abo.month', 'com.boatofficer.boatofficermobile.abo.year',
    // 'com.boatofficer.boatofficermobile.single.month', 'com.boatofficer.boatofficermobile.single.year'
]);

platformNativeScriptDynamic().bootstrapModule(AppModule);
