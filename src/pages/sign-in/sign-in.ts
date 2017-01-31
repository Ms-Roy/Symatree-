import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SignUpPage} from '../sign-up/sign-up';
/*
  Generated class for the SignIN page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignINPage {
//pet: string = "Sign In";
pushPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.pushPage = SignUpPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignINPage');
  }

}
