import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SignUpPage} from '../sign-up/sign-up';
import {AuthService} from '../../providers/auth-service';
import {ProfilePage} from '../profile-page/profile-page';
import {TabsPage} from '../tabs/tabs';
import {HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
import {NavController, NavParams, Tabs} from 'ionic-angular';
import {User} from "../../objects/user";
/*
  Generated class for the SignIN page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
    providers: [AuthService]

})
export class SignInPage implements OnInit {
//pet: string = "Sign In";
pushPage;

loginEmail: string;
loginPassword: string;
  loginForm: FormGroup;

constructor(public navCtrl: NavController,
public navParams: NavParams,
private authService: AuthService,
public alertCtrl: AlertController,
public formBuilder: FormBuilder,
public builder: FormBuilder) {
this.pushPage = SignUpPage;
this.loginForm = builder.group({
        'loginEmail': [
          '', Validators.compose([Validators.required])],// default value

          'loginPassword': [
            '',Validators.compose([Validators.required])],

          });
          this.authService.getCurrentUser((data : User) =>{
            this.currentUser = data;
          });
  }
    currentUser : User = new User();
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignINPage');
  }
  ngOnInit() {
  }

  public login(){
    if(this.loginForm.valid){

                // if(this.slideOneForm.valid){
                //   console.log("success!");
                // }

                const user = {
                  email: this.loginEmail,
                  password: this.loginPassword,
                };

                if(user.email == undefined ||user.password == undefined  ){
                  let alert = this.alertCtrl.create({
                    title: 'ERROR!',
                    subTitle: 'Please fill in all Fields!',
                    buttons: ['OK']
                  });
                  alert.present();
                }

                else {
                  let errorCallback = err => {

                    //TODO: Some error handling
                    let alert = this.alertCtrl.create({
                      title: 'Error',
                      message: 'Please Enter Existing E-mail or Password',
                      buttons: ['OK']
                    });
                    alert.present();


                  };
                  let successCallback = data => {
                    if (data.success){
                      console.log('success');
                      let t : Tabs = this.navCtrl.parent;
                      t.select(0);

                    }


                    else{

                      console.log('failed');
                    }
                  };
                  this.authService.attemptLogin(user.email, user.password).subscribe(successCallback, errorCallback);
                }
              } else if (this.loginForm.invalid) {
                let alert = this.alertCtrl.create({
                  title: 'ERROR!',
                  subTitle: 'Please fill in all Fields!',
                  buttons: ['OK']
                });
                alert.present();
              } else {
                let alert = this.alertCtrl.create({
                  title: 'ERROR!',
                  subTitle: 'Server Error! Please Try Again Later',
                  buttons: ['OK']
                });
                alert.present();

              }
}
}
