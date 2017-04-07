import { Component } from '@angular/core';

import {EditLanguagePage} from "../edit-language/edit-language";
import {AuthService} from "../../providers/auth-service";
import {UserService} from "../../providers/user-service";
import {AdminService} from "../../providers/admin-service";
import {NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import {User} from "../../objects/user";
import {Course} from "../../objects/course";

/*
  Generated class for the ListCourse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-course',
  templateUrl: 'list-course.html',
    providers: [AuthService, UserService, AdminService]
})
export class ListCoursePage {
  public currentUser: User = new User();
  public courses : Course[] = [];
  id: string;
  Courses;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService, public userService: UserService,
 public adminService: AdminService, public viewCtrl:ViewController,
 public alertCtrl: AlertController) {

    this.authService.getCurrentUser(data =>{
      this.currentUser = data;
      this.userService.getUser( this.currentUser._id);
  //    this.userService.getUser (this.currentUser._id);
////   this.userService.listCountries();
this.userService.listcourses().subscribe(data => {
  this.courses = data;
});

/////this.countries = Countries;

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCountryPage');
  }
  ionViewWillEnter(){
    this.authService.getCurrentUser(data =>{
        this.currentUser = data;
        this.userService.getUser( this.currentUser._id);
        this.userService.listcourses().subscribe(data => {
          this.courses = data;

        });
      });
  }

  public delete(course) {

    this.Courses = course;
    console.log(this.Courses.code);

    this.authService.getCurrentUser((data) => {
      if (!data){

      }
      else{

        if(data.role =="admin") {

          let successHandler = data => {
            this.viewCtrl.dismiss(data).catch(err => {
              console.error(err);
            })
          };
          let errorHandler = err => {
            console.log(err);

          };

           //////console.log(data._id);
          //  this.adminService.createCountry(this.Countries,this.authService.getAccessToken());
          let alert = this.alertCtrl.create({
              title: 'Success: Course Deleted!',
              subTitle: 'Code '+this.Courses.code+' is deleted',
              buttons: ['OK']
      });
      alert.present();
          this.adminService.deleteCourse(this.Courses._id,this.authService.getAccessToken()).subscribe(successHandler, errorHandler);
          this.navCtrl.push(ListCoursePage).catch(err => {
            console.error(err);
          });

           //this.adminService.createCountry(this.Countries,data._id);
        }
      }
    });



    console.log( "Added: "+this.Courses.langugae);
}





}
