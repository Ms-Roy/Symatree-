import { Component } from '@angular/core';

import {EditLanguagePage} from "../edit-language/edit-language";
import {AuthService} from "../../providers/auth-service";
import {UserService} from "../../providers/user-service";
import {AdminService} from "../../providers/admin-service";
import {NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import {User} from "../../objects/user";
import {CourseTeach} from "../../objects/courseTeach";
import {Course} from "../../objects/course";
import {TutorService} from '../../providers/tutor-service';
/*
  Generated class for the SearchCourse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-course',
  templateUrl: 'search-course.html',
  providers: [AuthService, UserService, AdminService, TutorService]
})
export class SearchCoursePage {

  public currentUser: User = new User();
  public courses : Course[] = [];
  id: string;
  Courses;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService, public userService: UserService,
 public adminService: AdminService, public viewCtrl:ViewController,
 public alertCtrl: AlertController, public tutorService: TutorService) {

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

  public add(course) {

    this.authService.getCurrentUser((data) => {
      if (!data){

      }
      else{
        this.id= data._id;
        if(data.role =="tutor") {

          let successHandler = data => {
              this.viewCtrl.dismiss(data).catch(err => {
                console.error(err);
              })
            };
            let errorHandler = err => {
              console.log(err);

            };
            this.userService.listcourses().subscribe(data => {
            this.courses=data;

            for (var i = 0; i < this.courses.length; i++) {
              if (this.courses[i].code === course) {
                let courseTeach = new CourseTeach();
                courseTeach._id = this.id;
                courseTeach.code = this.courses[i].code;
                courseTeach.school = this.courses[i].school;
                let alert = this.alertCtrl.create({
                    title: 'Success: Course Added!',
                    subTitle: 'Code '+courseTeach.code+' is added',
                    buttons: ['OK']
            });
            alert.present();
                this.tutorService.createCourseTeach(courseTeach,this.authService.getAccessToken()).subscribe(successHandler, errorHandler);
                this.navCtrl.push(SearchCoursePage).catch(err => {
                  console.error(err);
                });
              }
              }

            });
          }
        }
      });
    }



}
