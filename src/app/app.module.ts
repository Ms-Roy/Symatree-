import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {ProfilePage} from '../pages/profile-page/profile-page';
import {TeachCoursePage} from '../pages/teach-course/teach-course';
import {TabsPage} from '../pages/tabs/tabs';
//import {Routes} from '@angular/router';
import {RouterModule,Routes} from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AuthService} from '../providers/auth-service';
import {ValidateService} from '../providers/validate-service';




//import { TabsPage } from '../pages/tabs/tabs';
import {MainPage} from '../pages/main/main';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {SignINPage} from '../pages/sign-in/sign-in';






   //@NgModule({
   @NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
TeachCoursePage,
    MainPage,
    SignINPage,
    SignUpPage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  BrowserModule,
  FormsModule,
  HttpModule
   //RouterModule.forRoot(appRoutes),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MainPage,
    SignINPage,
    SignUpPage,
    ProfilePage,
    TabsPage,
    TeachCoursePage
  ],
providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},ValidateService, AuthService]
//[{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
