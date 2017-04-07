import { Component } from '@angular/core';
import {AuthService} from "../../providers/auth-service";
import {NavController, NavParams, Tab, Tabs} from 'ionic-angular';
import {User} from "../../objects/user";
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AuthService]
})
export class ProfilePage {

  public currentUser: User = new User();
firstName: string;
lastName: string ;
email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthService) {

    this.authService.getCurrentUser(data =>{
    this.currentUser = data;

  });
  }
  ionViewWillEnter(){
    this.authService.getCurrentUser(data =>{
      this.currentUser = data;
    
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePagePage');
  }
  public logout(){
    this.authService.logout();
    let t : Tabs = this.navCtrl.parent;
    t.select(1);
  }
public getUser() {
  this.authService.getCurrentUser((data) => {
  this.email = data.email;
  this.firstName = data.firstName;
  this.lastName = data.lastName;

  });
}

}
