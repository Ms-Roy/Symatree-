import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Course} from "../../objects/course";
import {Language} from "../../objects/language";
import {AdminService} from '../../providers/admin-service';
import {AuthService} from '../../providers/auth-service';
import {ListCoursePage} from '../list-course/list-course';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
/*
  Generated class for the EditCourse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-course',
  templateUrl: 'edit-course.html',
  providers: [AdminService,AuthService]
})
export class EditCoursePage {
  slideOneForm: FormGroup;
  //lanForm : FormGroup;


code: string ;
name: string;
professor: string;
school: string
semester: string ;
year : string;

//lan:string;
  Languages;
//Languages;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public formBuilder: FormBuilder, public adminService: AdminService,
  public authService: AuthService, public viewCtrl: ViewController,
  public alertCtrl: AlertController) {
    this.slideOneForm = formBuilder.group({
           //firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          //  username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],

            code: ['', Validators.compose([Validators.maxLength(10), Validators.pattern("[a-zA-Z0-9-' ]*"), Validators.required])],
           name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])],
           school: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])],
           professor:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])],
           semester: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])],
           year:['', Validators.compose([Validators.maxLength(30), Validators.pattern("[0-9 ]*"), Validators.required])]
       });
      //  this.lanForm = formBuilder.group ({
      //    lan : ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z-' ]*"), Validators.required])]
      //  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCoursePage');
  }

public ViewCourse(){
  this.navCtrl.push(ListCoursePage).catch(err => {
      console.error(err);
    });

}
  public create ( ){

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
          let course = new Course();
          course.code= this.code;
          course.name = this.name;
          course.school = this.school;
          course.professor = this.professor;
          course.semester = this.semester;
          let alert = this.alertCtrl.create({
              title: 'Success: Course Added!',
              subTitle: 'Code '+course.code+' is added',
              buttons: ['OK']
      });
      alert.present();
          this.adminService.createCourse(course,this.authService.getAccessToken()).subscribe(successHandler, errorHandler);
          this.navCtrl.push(ListCoursePage).catch(err => {
            console.error(err);
          });
           //this.adminService.createCountry(this.Languages,data._id);
        }else if(data.role !="admin"){
           console.log("Not An admin");
           console.log (data.role);
          // this.isAdmin = false;
        }
      }
    });



  console.log( "Added: "+ this.code);








  }

}
