import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SignInPage } from '../sign-in/sign-in';
import { ContactPage } from '../contact/contact';
import { AuthService } from "../../providers/auth-service";
import {MyHomePage} from "../my-home/my-home";
import {ChatPage} from '../chat/chat';
import {ProfilePage} from '../profile/profile';
import {SearchCoursePage} from "../search-course/search-course";
import {TutorHomePage} from "../tutor-home/tutor-home";
// import {MyCoursePage} from "../my-course/my-course";
import {ViewAdminPage} from '../view-admin/view-admin';
import {AdminHomePage} from "../admin-home/admin-home";
import {AdminSearchPage} from '../admin-search/admin-search';
import {MyCoursePage} from '../my-course/my-course';
import {ViewProfilePage} from "../view-profile/view-profile";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SignInPage;
  tab3Root: any = ContactPage;

///For all users:
tab5Root: any = ChatPage;
tab6Root: any = ViewProfilePage;

//Student View
  tab4Root: any = MyHomePage;
  tab7Root: any = SearchCoursePage;
///tutor
 tab8Root: any = TutorHomePage;
 tab9Root: any = MyCoursePage;
//Admin
  tab10Root: any = AdminHomePage;
  tab11Root: any = ViewAdminPage;
  tab12Root: any = AdminSearchPage;


  loggedIn: boolean;
    isAdmin: boolean;
    isTutor: boolean;
    isStudent: boolean;
  constructor(public authService : AuthService) {

  }

  public refresh() {

    this.authService.getCurrentUser((data) => {
    if (!data) {
      this.loggedIn = false;
      this.isAdmin = false;
      this.isTutor = false;
      this.isStudent = false;
    } else {
      this.loggedIn = true;
      if (data.role =="admin") {
         console.log("admin");
         this.isAdmin = true;
      } else if (data.role =="tutor"){
        console.log("tutor");
        console.log("Not An admin");
        this.isTutor = true;
      }
      else if(data.role == "student"){
        console.log("student");
        console.log("Not An admin");
        this.isStudent = true;
      }


    }
  });

}
}
