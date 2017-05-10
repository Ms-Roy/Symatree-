import { Component } from '@angular/core';

import {EditLanguagePage} from "../edit-language/edit-language";
import {CourseTeachingPage} from "../course-teaching/course-teaching";
import {AuthService} from "../../providers/auth-service";
// import {UserService} from "../../providers/user-service";
import {AdminService} from "../../providers/admin-service";
// import {CourseTeachService} from '../../providers/course-teach-service';

import {NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import {User} from "../../objects/user";
import {Course} from "../../objects/course";
import {CourseTeach} from '../../objects/courseTeach';
import {CoursesAvailablePage} from "../courses-available/courses-available";



@Component({
  selector: 'page-my-course',
  templateUrl: 'my-course.html',
      providers: [AuthService,  AdminService]
})
export class MyCoursePage {
  public currentUser: User = new User();
  public courses : Course[] = [];
  id: string;
  Courses;
// myCourse = new CourseTeach();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService,
 public adminService: AdminService, public viewCtrl:ViewController,
 public alertCtrl: AlertController) {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCoursePage');
  }

public showCoursesAvailable(){
  this.navCtrl.push(CoursesAvailablePage).catch(err => {
    console.error(err);
  });
}

 public add(course) {


    this.authService.getCurrentUser((data) => {
      this.currentUser = data;
      if (!data){

      }
      else{

        if(data.role =="tutor") {

          let successHandler = data => {
              this.viewCtrl.dismiss(data).catch(err => {
                console.error(err);
              })
            };
            let errorHandler = err => {
              console.log(err);

            };


        }
      }
    });




 }
}
