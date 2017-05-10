import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { CourseTeach } from '../objects/courseTeach';


@Injectable()
export class TutorService {
  courseTeachEndpoint = 'http://localhost:8080/api/courseTeach';

  constructor(public http: Http) {
  }
  public createCourseTeach(courseTeach : CourseTeach, auth : string) : Observable<CourseTeach>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.courseTeachEndpoint, courseTeach, headers).map(res => res.json()).catch(this.handleError);
  }
  public getCourseTeach(id : string) : Observable<CourseTeach>{
      return this.http.get(this.courseTeachEndpoint+"/"+id).map(res => res.json()).catch(this.handleError);
  }
  public deleteCourseTeach(courseTeach: CourseTeach, auth : string): any{
    let headers = this.headersForToken(auth);
    return this.http.delete(this.courseTeachEndpoint+"/"+courseTeach._id, headers).map(res => res.json()).catch(this.handleError);
  }
  public updateCourseTeach(courseTeach: CourseTeach, auth : string) : any{
    let headers = this.headersForToken(auth);
    return this.http.put(this.courseTeachEndpoint+"/"+courseTeach._id, courseTeach, headers).map(res => res.json()).catch(this.handleError);
  }
  public listCompaniesForUser(id: string, auth : string) : Observable<CourseTeach[]>{
    return this.http.get(this.userCourseTeachEndpoint(id)).map(res => res.json()).catch(this.handleError);
  }
  public handleError(err){
    return Observable.throw(err.json().error || 'Server Error');
  }

  public userCourseTeachEndpoint(id: string) : string{
    return 'http://localhost:8080/api/users/'+id+'/courseTeach';
  }
  public headersForToken(token : string) : any{
    return {
      headers: {
        'theaters-auth': token
      }
    }
  }

}
