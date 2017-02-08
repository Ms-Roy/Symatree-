import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
//import { TabsPage } from '../pages/tabs/tabs';
import {MainPage} from '../pages/main/main';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {SignINPage} from '../pages/sign-in/sign-in';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
  //  TabsPage,
    MainPage,
    SignINPage,
    SignUpPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MainPage,
SignINPage,
    //TabsPage,
    SignUpPage
  ],
//[{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
