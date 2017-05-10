import { Component } from '@angular/core';

import {EditLanguagePage} from "../edit-language/edit-language";
import {AuthService} from "../../providers/auth-service";
// import {UserService} from "../../providers/user-service";
import {CourseService} from "../../providers/course-service";
import {NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import {User} from "../../objects/user";
import {Course} from "../../objects/course";
import {UserService} from '../../providers/user-service';
import {UpdateCoursesPage} from '../update-courses/update-courses';
import {StudentCourseDetailPagePage} from '../student-course-detail-page/student-course-detail-page';

/*
  Generated class for the ListCourse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-student-course',
  templateUrl: 'list-student-course.html',
    providers: [AuthService,  CourseService, UserService]
})
export class ListStudentCoursePage {

  public currentUser: User = new User();
  public courses : Course[] = [];
  id: string;
  Courses;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: AuthService,
 public courseService: CourseService, public viewCtrl:ViewController,
 public alertCtrl: AlertController, public userService: UserService) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCountryPage');
  }
  ionViewWillEnter(){
    this.userService.listcourses().subscribe((data) => {
    this.courses = data;
  });

  }

  public delete(course) {
  this.Courses = course;
    let modal = this.alertCtrl.create({
      title: 'Delete "'+this.Courses.code+'"?',


      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //Do nothing
            console.log('Doing Nothing');
          }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: data=>{
            this.courseService.deleteCourse(course, this.authService.getAccessToken()).subscribe(data => {
              this.courses = this.courses.filter(item => {return item !== course});
            }, err => {console.error(err)});

          }
        }
      ]
    });
    modal.present();


}

// update(course){
//   this.navCtrl.push(UpdateCoursesPage).catch(err => {
//       console.error(err);
//     });
// }

public show(course:Course){
 this.navCtrl.push(StudentCourseDetailPagePage, {selectedCourse: course});
}

}
