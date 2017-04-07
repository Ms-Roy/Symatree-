import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import {Storage} from "@ionic/storage";
import { TranslateService, TranslatePipe } from 'ng2-translate';
// import { TranslateService } from 'ng2-translate/ng2-translate';
// import { TranslateService } from 'ng2-translate/src/translate.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, storage : Storage,) {
    // this language will be used as a fallback when a translation isn't found in the current language


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.ready().catch(err =>{
        throw err;
      })
    });
  }
}
