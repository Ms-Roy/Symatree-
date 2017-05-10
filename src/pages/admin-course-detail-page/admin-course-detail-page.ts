import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Course} from "../../objects/course";
import {CourseService} from "../../providers/course-service";
import {CourseEditPage} from '../course-edit/course-edit';
/*
  Generated class for the AdminCourseDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-course-detail-page',
  templateUrl: 'admin-course-detail-page.html',
    providers: [CourseService]
})
export class AdminCourseDetailPagePage {
course: Course;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            public courseService: CourseService) {
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

// public pressedEdit(course:Course){
//   this.navCtrl.push(CoursePage).catch(err => {
//       console.error(err);
//     });
// }
}
