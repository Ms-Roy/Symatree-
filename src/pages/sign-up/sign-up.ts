import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../providers/validate-service';
import {AuthService} from '../../providers/auth-service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from  '../../validators/email';
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

  userType: String = "student";
  firstName: String;
  lastName: String;
  email: String;
  password: String;


  constructor(

   private validateService: ValidateService,
  // private flashMessage:FlashMessagesService,
   private authService:AuthService,
    public alerCtrl: AlertController,
    public formBuilder: FormBuilder
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
    //const user = {
      const user = {
    userType: this.userType,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password
  }
if(this.userType == undefined || this.firstName == undefined ||
this.lastName == undefined || this.email == undefined ||
 this.password == undefined){
   let alert = this.alerCtrl.create({
     title: 'Error!',
     message: 'Please Enter All Fields!',
     buttons: ['Ok']
   });
   alert.present()
 }
else {

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){

      console.log("Success");
      } else {
        console.log("fail");
        let alert = this.alerCtrl.create({
          title: 'Error!',
          message: 'Please Enter All Fields!',
          buttons: ['Ok']
        });
        alert.present();

      }
    });

}
  }



}
