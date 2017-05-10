import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import {Storage} from "@ionic/storage";

/* Translation Modules */
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

/* importing pages */
import { HomePage } from '../pages/home/home';
import {ContactPage} from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import {AddCourseTutorPage} from '../pages/add-course-tutor/add-course-tutor';


import {UpdateCoursesPage} from '../pages/update-courses/update-courses';
/* importing services/providers */
import {AuthService} from '../providers/auth-service';
import {ListStudentCoursePage} from '../pages/list-student-course/list-student-course';
import {AdminCourseDetailPagePage} from '../pages/admin-course-detail-page/admin-course-detail-page';
import {StudentCourseDetailPagePage} from '../pages/student-course-detail-page/student-course-detail-page';
// import {AdminService} from '../providers/admin-service';
 /////import {UserService} from '../providers/user-service';

///////////////////////////////////////////////////////////////////

import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {CourseEditPage} from '../pages/course-edit/course-edit';
/////////////////////////////////
import {MyHomePage} from '../pages/my-home/my-home';
import {ChatPage} from '../pages/chat/chat';
import {ProfilePage} from '../pages/profile/profile';
import {SearchCoursePage} from '../pages/search-course/search-course';
import {ViewAdminPage} from '../pages/view-admin/view-admin';
import {TutorHomePage} from '../pages/tutor-home/tutor-home';
import {MyCoursePage} from '../pages/my-course/my-course';
import {AdminHomePage} from "../pages/admin-home/admin-home";
import {AdminSearchPage} from '../pages/admin-search/admin-search';
import {EditCoursePage} from "../pages/edit-course/edit-course";
import {ListCoursePage} from '../pages/list-course/list-course';
import {ViewProfilePage} from "../pages/view-profile/view-profile";
import {EditTutorPage} from "../pages/edit-tutor/edit-tutor";
import {CourseTeachingPage} from '../pages/course-teaching/course-teaching';
import {CoursesAvailablePage}from '../pages/courses-available/courses-available';


/* exported function for useFactory .. ng2-translate */
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,

    TabsPage,
    MyHomePage,
    ChatPage,
    ProfilePage,
    SearchCoursePage,
    SignInPage,
    SignUpPage,
    ViewAdminPage,
    AdminHomePage,
    AdminSearchPage,
    EditCoursePage,
    ListCoursePage,
    ViewProfilePage,
    TutorHomePage,
    MyCoursePage,
    EditTutorPage,
    CourseTeachingPage,
    CoursesAvailablePage,
    UpdateCoursesPage,
    AdminCourseDetailPagePage,
    CourseEditPage,
    AddCourseTutorPage,
    ListStudentCoursePage,
    StudentCourseDetailPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader), // or
      // useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    MyHomePage,
    ChatPage,
    ProfilePage,
    SearchCoursePage,
    TabsPage,
    ViewAdminPage,
    SignInPage,
    SignUpPage,
    AdminHomePage,
    AdminSearchPage,
    EditCoursePage,
    ListCoursePage,
    ViewProfilePage,
    TutorHomePage,
    MyCoursePage,
    EditTutorPage,
    CourseTeachingPage,
    CoursesAvailablePage,
    UpdateCoursesPage,
    AdminCourseDetailPagePage,
    CourseEditPage,
    AddCourseTutorPage,
    ListStudentCoursePage,
    StudentCourseDetailPagePage
  ],

  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthService,
      // AdminService,
      ///UserService,
      Storage
  ]
})
export class AppModule {}
