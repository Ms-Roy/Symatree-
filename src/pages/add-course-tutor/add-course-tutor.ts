import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {Course} from "../../objects/course";
import {Teach} from '../../objects/teach'
import {CourseService} from "../../providers/course-service";
import {AuthService} from "../../providers/auth-service";
import {TutorService} from '../../providers/tutor-service';

/*
  Generated class for the AddCourseTutor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-course-tutor',
  templateUrl: 'add-course-tutor.html',
  providers: [CourseService,TutorService]
})
export class AddCourseTutorPage {
  course: Course;
  form: string;
  price: string;
  courseId: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
              public courseService: CourseService, public authService: AuthService,
            public alertCtrl: AlertController, public viewCtrl: ViewController,
            public tutorService:TutorService) {
    //  this.course = this.navParams.get('selectedCourse');
this.course =this.navParams.get('selectedCourse');
this.courseId = this.course._id;
  //   if (this.course ) {
  //   this.courseId  = this.course._id;
  // }
/////this.id = this.course._id;
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCourseTutorPage');
  }
//   ionViewWillEnter(){
//
//   // this.productionService.listProductionsForCompany(this.company._id).subscribe(successHandler, errorHandler);
// let successHandler = (data) => {
//     this.course = data;
//   };
//   let errorHandler = (err) => {
//     console.error(err);
//   };
//   this.courseService.getCourse(this.course._id).subscribe(successHandler, errorHandler);
//
//   // this.course = this.courseService.getCourse(this.course._id).subscribe(successHandler, errorHandler);
// }
public save(course:Course){
  // this.Courses = course;
  //

  ////////this.courseService.getCourse(this.course._id).subscribe(successHandler, errorHandler);
     let teach = new Teach();
     teach.courseId = course._id;
     teach.code = this.course.code;
     teach.price = this.price;
     teach.form = this.form ;



     let successHandler = course => {

             this.viewCtrl.dismiss(course).catch(err => {
                 console.error(err);
             });
         // }
     };
     let errorHandler = err => {
         console.log(err);
         let alert = this.alertCtrl.create({
                       title: 'Error',
                       message: 'Cannot process your request at this time. Try again later',
                       buttons: ['OK']
                   });
                   alert.present();
     };
     let alert = this.alertCtrl.create({
             title: 'Success',
             message: 'Course: '+teach.code+' Added! ',
             buttons: ['OK']
         });
         alert.present();

         this.tutorService.createTeach(teach, this.authService.getAccessToken()).subscribe(successHandler, errorHandler);


}
}
