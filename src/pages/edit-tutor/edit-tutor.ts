import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
// import {UserService} from "../../providers/user-service";
import {AdminService} from "../../providers/admin-service";
import {User} from "../../objects/user";
// import {Language} from "../../objects/language";

/*
  Generated class for the EditTutor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-tutor',
  templateUrl: 'edit-tutor.html',
    providers: [AuthService, AdminService]
})
export class EditTutorPage {
 public currentUser: User = new User();
public users : User[] = [];
id: string;
Users;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public adminService: AdminService,  public authService: AuthService) {
//     this.adminService.listUsers().subscribe(data => {
//   this.users = data;
// });
// this.authService.getCurrentUser(data =>{
//     this.currentUser = data;
//     this.userService.getUser( this.currentUser._id);
//     this.userService.listUsers().subscribe(data => {
//       this.users = data;
//
//     });
//   });


// this.userService.listUsers().subscribe(data => {
// this.users = data;
// });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTutorPage');
  }

}
