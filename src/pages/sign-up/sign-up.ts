import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public actionSheetCtrl : ActionSheetController,
      public modalCtrl : ModalController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }



}
