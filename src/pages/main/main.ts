import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {SignUpPage} from '../sign-up/sign-up';
import {SignINPage} from '../sign-in/sign-in';

/*

  Generated class for the Main page.


  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
pushPage;
  slides = [
      {
        title: "Welcome to Symatree!",
        description: "<b>Symatree</b> is a mobile application built to provide tutoring services exclusively for students enrolled in the <b>University Of Ottawa</b>! ",


        image: "assets/img/brain.png",
      },
      {
        title: "Services:",
        description: "<b> Symatree </b> allows students to quickly and effortlessly link with tutors for scheduled one-on-one sessions. Short on cash? Keen to make new friends? Try <b> Branch Out </b>",
        //description: "<b>Symatree</b> provides many services for which allows flexibility to both students and Tutors! Students can choose from <b> one-to-one- sessions, group sessions</b> and <b> instant help sessions.</b> Symatree allows One-to-one sessions and group sessions to be available to those students within campus at a flexible time. In advance, Symatree allows students to take advantage of its special instant help session where the tutor can arrive at the place of your residence at any time of the day! ",
        image: "assets/img/gg.png",
      },
      {
          title: "Why Use Symatree?",
          description:"<b> Symatree </b> is the only exiting app that allows instant help at any time and at anywhere by students who have excelled the course taken in the same university. Because we understand that course context varies between universities and professor's style of teaching, it can have a great impact on students. Thus, by allowing students to not only be tutored but also get tips by tutors who have excelled the same course, perhaps with the same professor, will help students succeed the course. ",

      //  description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "assets/img/b2.png",
      }
    ];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pushPage = SignINPage;
      }
}
