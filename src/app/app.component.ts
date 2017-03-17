import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {MainPage} from '../pages/main/main';
import {HomePage} from '../pages/home/home';
import {SignUpPage} from '../pages/sign-up/sign-up';
import { TabsPage } from '../pages/tabs/tabs';
import {SignINPage} from '../pages/sign-in/sign-in';
import {RouterModule,Routes} from '@angular/router';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = MainPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
