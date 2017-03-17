import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SignUpPage} from '../sign-up/sign-up';
import {AuthService} from '../../providers/auth-service';
import {ProfilePage} from '../profile-page/profile-page';
import {TabsPage} from '../tabs/tabs';
import {HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the SignIN page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignINPage implements OnInit {
//pet: string = "Sign In";
pushPage;

email: string;
password: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService,public alerCtrl: AlertController) {
this.pushPage = SignUpPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignINPage');
  }
  ngOnInit() {
  }

  public login(){
    //const user = {
    const user = {

     email: this.email,
      password: this.password
    }
if(this.email == undefined || this.password==undefined){
  let alert = this.alerCtrl.create({
    title: 'Error!',
    message: 'Please Enter All Fields!',
    buttons: ['Ok']
  });
  alert.present()
}
else{

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
      //  this.push = ProfilePage;
      //if(user.userType == student) {}
      this.navCtrl.push(TabsPage);
        console.log("Success");
      } else {
        console.log("fail");
        let alert = this.alerCtrl.create({
          title: 'Error!',
          message: 'Connection Error.Please Try Again Later!',
          buttons: ['Ok']
        });
        alert.present()

      }
    });
}

  }


}
