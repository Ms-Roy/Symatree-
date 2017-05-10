import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Course} from "../../objects/course";
import {CourseService} from "../../providers/course-service";
import {AuthService} from "../../providers/auth-service";
import {UpdateCoursesPage} from '../update-courses/update-courses';


//import {CourseEditPage} from '../course-edit/course-edit';
/*
/*
  Generated class for the CourseEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-course-edit',
  templateUrl: 'course-edit.html',
  providers: [CourseService,]
})
export class CourseEditPage {
  course: Course;
    constructor(public navCtrl: NavController, public navParams: NavParams,
              public courseService: CourseService, public authService: AuthService,
            public alertCtrl: AlertController) {
    this.course = this.navParams.get('selectedCourse');

              }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AdminCourseDetailPagePage');
    }


    ionViewWillEnter(){

    // this.productionService.listProductionsForCompany(this.company._id).subscribe(successHandler, errorHandler);
  let successHandler = (data) => {
      this.course = data;
    };
    let errorHandler = (err) => {
      console.error(err);
    };
    this.courseService.getCourse(this.course._id).subscribe(successHandler, errorHandler);
  }
public save(){
  this.courseService.updateCourse(this.course, this.authService.getAccessToken()).subscribe(data => {});
  let alert = this.alertCtrl.create({
          title: 'Success',
          message: 'If you have made changes, it has been saved! ',
          buttons: ['OK']
      });
      alert.present();

      this.navCtrl.push(UpdateCoursesPage).catch(err => {
          console.error(err);
        });
}
  // public pressedEdit(course:Course){
  //    this.navCtrl.push(CourseEditPage, {selectedCourse: course});
  //
  // }
  }
