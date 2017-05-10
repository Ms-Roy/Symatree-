import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import {UserService} from '../../providers/user-service';
import {CourseService} from '../../providers/course-service';
import {AuthService} from '../../providers/auth-service';
import {Course} from "../../objects/course";
import {AdminCourseDetailPagePage} from '../admin-course-detail-page/admin-course-detail-page';
import {CourseEditPage} from '../course-edit/course-edit';

/*
  Generated class for the UpdateCourses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-update-courses',
  templateUrl: 'update-courses.html',
    providers: [UserService, CourseService, AuthService]
})
export class UpdateCoursesPage {
  public courses : Course[] = [];
  Courses;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService:UserService, public courseService: CourseService,
              public alertCtrl: AlertController, public authService: AuthService ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateCoursesPage');
  }
  ionViewWillEnter(){
    this.userService.listcourses().subscribe((data) => {
    this.courses = data;
  });
}

public courseSelected(course:Course){
 this.navCtrl.push(AdminCourseDetailPagePage, {selectedCourse: course});
}

public edit(course:Course){
  this.navCtrl.push(CourseEditPage, {selectedCourse: course});
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
}
