import { Component } from '@angular/core';

import {EditLanguagePage} from "../edit-language/edit-language";
import {CourseTeachingPage} from "../course-teaching/course-teaching";
import {AuthService} from "../../providers/auth-service";
 import {UserService} from "../../providers/user-service";
import {AdminService} from "../../providers/admin-service";
import {TutorService} from '../../providers/tutor-service';
import {AdminCourseDetailPagePage} from '../admin-course-detail-page/admin-course-detail-page';
//import {TutorService} from '../../providers/tutor-service';
// import {Teach} from '../../objects/teach';
// import {CourseTeachService} from '../../providers/course-teach-service';

import {NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import {User} from "../../objects/user";
import {Course} from "../../objects/course";
import {Teach} from '../../objects/teach';
import {CourseTeach} from '../../objects/courseTeach';
import {MyCoursePage}from '../my-course/my-course';
import {AddCourseTutorPage} from '../add-course-tutor/add-course-tutor';
@Component({
  selector: 'page-courses-available',
  templateUrl: 'courses-available.html',
  providers: [AuthService, UserService, AdminService, TutorService]
})
export class CoursesAvailablePage {
userId: string;
courseId: string ;
courseCode: string;


  public currentUser: User = new User();
  public courses : Course[] = [];
  id: string;
  Courses;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService, public userService: UserService,
 public adminService: AdminService, public viewCtrl:ViewController,
 public alertCtrl: AlertController, public tutorService: TutorService) {

//     this.authService.getCurrentUser(data =>{
//       this.currentUser = data;
//       this.userService.getUser( this.currentUser._id);
//
// this.userService.listcourses().subscribe(data => {
//   this.courses = data;
// });
//
//     });

  }
  ionViewWillEnter(){
    this.userService.listcourses().subscribe((data) => {
    this.courses = data;
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCoursePage');
  }


public details(course: Course){

   this.navCtrl.push(AdminCourseDetailPagePage, {selectedCourse: course});

}
 public add(course:Course) {
   this.navCtrl.push(AddCourseTutorPage, {selectedCourse: course});
// this.Courses = course;
//
//    let teach = new Teach();
//    teach.courseId = this.Courses._id;
//    teach.code = this.Courses.code;
//
//
//
//    let successHandler = course => {
//
//            this.viewCtrl.dismiss(course).catch(err => {
//                console.error(err);
//            });
//        // }
//    };
//    let errorHandler = err => {
//        console.log(err);
//        let alert = this.alertCtrl.create({
//                      title: 'Error',
//                      message: 'Cannot process your request at this time. Try again later',
//                      buttons: ['OK']
//                  });
//                  alert.present();
//    };
//    let alert = this.alertCtrl.create({
//            title: 'Success',
//            message: 'Course: '+teach.code+' Added! ',
//            buttons: ['OK']
//        });
//        alert.present();
//
//        this.tutorService.createTeachForCourse(teach._id,teach, this.authService.getAccessToken()).subscribe(successHandler, errorHandler);



 }
}
