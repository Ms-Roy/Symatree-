
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {CourseService} from '../../providers/course-service';
import {Course} from "../../objects/course";
import {AuthService} from "../../providers/auth-service";
import {ListCoursePage} from '../list-course/list-course';
import {UpdateCoursesPage} from '../update-courses/update-courses';
/*
  Generated class for the EditCourse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-course',
  templateUrl: 'edit-course.html',
    providers: [CourseService, AuthService]
})
export class EditCoursePage {
  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public courseService: CourseService,
                public viewCtrl: ViewController,
                public authService: AuthService,
                public alertCtrl: AlertController

    ) {
    }
    code:string;
    name: string;
    school: string;
    professor: string;
    semester: string;
    year:string;
    description: string;


    ionViewDidLoad() {
        console.log('ionViewDidLoad EditCoursePage');
    }
    public ViewCourse(){
      this.navCtrl.push(UpdateCoursesPage).catch(err => {
          console.error(err);
        });

    }
    public submitCourse() {
        let course = new Course();
        course.code = this.code;
        course.name = this.name;
        course.school = this.school;
        course.semester = this.semester;
        course.professor = this.professor ;
        course.year = this.year;
        course.description = this.description;


        let successHandler = course => {
            // if (this.logoURL){
            //     this.fileService.uploadLogo(this.logoURL, company._id, this.authService.getAccessToken(), data => {
            //         company.logoURL = data.logoURL;
            //         this.viewCtrl.dismiss(company).catch(err => {
            //             console.error(err);
            //         });
            //     }, err => {
            //         console.error(err);
            //     });
            // }
            // else{
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
                message: 'Course: '+course.code+' Added! ',
                buttons: ['OK']
            });
            alert.present();
        this.courseService.createCourse(course, this.authService.getAccessToken()).subscribe(successHandler, errorHandler);

        this.navCtrl.push(EditCoursePage).catch(err => {
          console.error(err);
  });
    }

}
