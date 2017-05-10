import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../providers/auth-service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from  '../../validators/email';
import {NavController, NavParams, Tabs} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage implements OnInit {

    slideOneForm: FormGroup;

  role: string ;
  firstName: string;
  lastName: string;
  email: string;
  password: string;


  constructor(


  // private flashMessage:FlashMessagesService,
   private authService:AuthService,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController
  // private router: Router
  ) {
    this.slideOneForm = formBuilder.group({
           //firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          //  username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
           email:['',EmailValidator.checkEmail],
           firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])],
        lastName:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])],
           password: ['', Validators.compose([Validators.minLength(6),  Validators.required])]
       });

  }

  ngOnInit() {
  }

  public create(){

            const user = {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role
          };

          if(user.email == undefined || user.firstName == undefined || user.lastName ==undefined|| user.password == undefined||
            user.role==undefined){
            let alert = this.alertCtrl.create({
              title: 'ERROR!',
              subTitle: 'Please fill in all Fields!',
              buttons: ['OK']
            });
            alert.present();
          }
          else {
            let successCallback = data => {
              if(data.success){
                console.log("success!");
                let t : Tabs = this.navCtrl.parent;
                t.select(0);
                this.navCtrl.push(TabsPage);

              } else {
                console.log("fail!");
              }
            };
            let errorCallback = err => {
              console.error(err);
              if (err.status == 409){
                let alert = this.alertCtrl.create({
                  title: 'Error',
                  message: 'User already exists',
                  buttons: ['OK']
                });
                alert.present();
              }
              else{
                let alert = this.alertCtrl.create({
                  title: 'Error',
                  message: 'Cannot process your request at this time. Try again later',
                  buttons: ['OK']
                });
                alert.present();
              }
            };

this.authService.attemptSignup(user.email,user.password,user.firstName, user.lastName, user.role).subscribe(successCallback, errorCallback);

            }


  }



}
