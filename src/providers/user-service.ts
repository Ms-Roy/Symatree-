import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {User} from "../objects/user";
import {Storage} from "@ionic/storage";
// import {Language} from "../objects/language";
import {Course} from "../objects/course";

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  userGetEndpoint : string = 'http://localhost:8080/api/users/';
  userPutEndpoint : string = 'http://localhost:8080/api/user';
  courseEndpoint :   string = 'http://localhost:8080/api/courses';
  // languageEndpoint : string = 'http://localhost:8080/api/languages';

  constructor(public http: Http, public storage : Storage) {
  }
  public listcourses() : Observable<Course[]>{
    return this.http.get(this.courseEndpoint).map(res => res.json()).catch(this.handleError);
  }
//   public listLanguages() : Observable<Language[]>{
//   return this.http.get(this.languageEndpoint).map(res => res.json()).catch(this.handleError);
// }
  // public listGenres() : Observable<Genre[]>{
  //   return this.http.get(this.genreEndpoint).map(res => res.json()).catch(this.handleError);
  // }
  // public listAudiences() : Observable<Audience[]>{
  //   return this.http.get(this.audienceEndpoint).map(res => res.json()).catch(this.handleError);
  // }
  // public listCountries() : Observable<Country[]>{
  //   return this.http.get(this.countryEndpoint).map(res => res.json()).catch(this.handleError);
  // }
  public getUser(id: string) : Observable<User>{
    return this.http.get(this.userGetEndpoint+id).map(res => res.json()).catch(this.handleError);
  }
  public updateUser(user : User, token: string) : Observable<User>{
    let headers = this.headersForToken(token);
    let observable = this.http.put(this.userPutEndpoint, user, headers).map(res => res.json()).catch(this.handleError).share();
    let errorHandler = ()=>{};
    let successHandler = (data)=> {
      let token = data.token;
      this.storage.set('auth-token', token).catch(err => {
        throw err;
      });
    };
    observable.subscribe(successHandler, errorHandler);
    return observable;
  }
  public headersForToken(token: string): any {
      return {
          headers: {
              'symatree-auth': token
          }
      }
  }
  public handleError(err){
    let errBody = err.json();
    errBody.status = err.status;
    return Observable.throw(errBody);
  }

}
