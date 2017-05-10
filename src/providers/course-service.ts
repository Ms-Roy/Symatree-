import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Course} from '../objects/course';

/*
 Generated class for the CompanyService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class CourseService {
    courseEndpoint = 'http://localhost:8080/api/courses';

    constructor(public http: Http) {
    }
    /* retrieve all courses */
    public listCourses(auth:string): Observable<Course>{
        return this.http.get(this.courseEndpoint+"/")
          .map(res => res.json())
          .catch(this.handleError);
    }

    public createCourse(course: Course, auth: string): Observable<Course> {
        let headers = this.headersForToken(auth);
        return this.http.post(this.courseEndpoint, course, headers).map(res => res.json()).catch(this.handleError);
    }

    public getCourse(id: string): Observable<Course> {
        return this.http.get(this.courseEndpoint + "/" + id).map(res => res.json()).catch(this.handleError);
    }

    public deleteCourse(course: Course, auth: string): any {
        let headers = this.headersForToken(auth);
        return this.http.delete(this.courseEndpoint + "/" + course._id, headers).map(res => res.json()).catch(this.handleError);
    }

    public updateCourse(course: Course, auth: string): any {
        let headers = this.headersForToken(auth);
        return this.http.put(this.courseEndpoint + "/" + course._id, course, headers).map(res => res.json()).catch(this.handleError);
    }

    public listCoursesForUser(id: string, auth: string): Observable<Course[]> {
        return this.http.get(this.userCourseEndpoint(id)).map(res => res.json()).catch(this.handleError);
    }

    public handleError(err) {
        let errBody = err.json();
        errBody.status = err.status;
        return Observable.throw(errBody);
    }

    public userCourseEndpoint(id: string): string {
        return 'http://localhost:8080/api/users/' + id + '/companies';
    }

    public headersForToken(token: string): any {
        return {
            headers: {
                'symatree-auth': token
            }
        }
    }

}
