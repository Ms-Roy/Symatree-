import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditCoursePage} from '../edit-course/edit-course';
/*
  Generated class for the ViewAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-admin',
  templateUrl: 'view-admin.html'
})
export class ViewAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAdminPage');
  }
public editCourse (){
  this.navCtrl.push(EditCoursePage).catch(err => {
      console.error(err);
    });

}
}
