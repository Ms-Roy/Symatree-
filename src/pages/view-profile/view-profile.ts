import { Component } from '@angular/core';
// import {NavController, NavParams, AlertController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {User} from "../../objects/user";
import {ProfilePage} from "../profile/profile";
import {NavController, NavParams, AlertController,Tab, Tabs} from 'ionic-angular';

/*
  Generated class for the ViewProfile page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
  providers: [AuthService]
})
export class ViewProfilePage {

  public currentUser: User = new User();

  currentPage : string = "my-profile";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService : AuthService,

              public alertCtrl : AlertController) {
    this.authService.getCurrentUser(data =>{
      this.currentUser = data;

    });
  }
  ionViewDidLoad() {

  }
  ionViewWillEnter(){
    this.authService.getCurrentUser(data =>{
      this.currentUser = data;

    });
  }
  public goToEditPage(){
    this.navCtrl.push(ProfilePage).catch(err => {
      console.error(err);
    });
  }
  public logout(){
    this.authService.logout();
    let t : Tabs = this.navCtrl.parent;
    t.select(1);
  }
  // public showCreateCompany(){
  //   this.navCtrl.push(NewCompanyPage);
  // }


}
