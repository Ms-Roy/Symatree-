import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
 import {Language} from "../objects/language";
import {Course} from "../objects/course";
/*
  Generated class for the AdminService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdminService {
  courseEndpoint : string = 'http://localhost:8080/api/courses';
    languageEndpoint : string = 'http://localhost:8080/api/languages';
  // genreEndpoint : string = 'http://localhost:8080/api/genres';
  // audienceEndpoint : string = 'http://localhost:8080/api/audiences';
  // countryEndpoint : string = 'http://localhost:8080/api/countries';

  constructor(public http: Http) {
  }

  public createCourse(course : Course, auth: string) : Observable<Course>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.courseEndpoint,course, headers).map(res => res.json()).catch(this.handleError);
  }

  public createLanguage(language : Language, auth: string) : Observable<Language>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.languageEndpoint, language, headers).map(res => res.json()).catch(this.handleError);
  }
  public deleteLanguage(id: string, auth: string) : any{
  let headers = this.headersForToken(auth);
  return this.http.delete(this.languageEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
}
  // public createAudience(audience : Audience, auth: string) : Observable<Audience>{
  //   let headers = this.headersForToken(auth);
  //   return this.http.post(this.audienceEndpoint, audience, headers).map(res => res.json()).catch(this.handleError);
  // }
  // public createGenre(genre : Genre, auth : string) : Observable<Genre>{
  //   let headers = this.headersForToken(auth);
  //   return this.http.post(this.genreEndpoint, genre, headers).map(res => res.json()).catch(this.handleError);
  // }
  // public createCountry(country : Country, auth: string): Observable<Country>{
  //   let headers = this.headersForToken(auth);
  //   return this.http.post(this.countryEndpoint, country, headers).map(res => res.json()).catch(this.handleError);
  // }
  public deleteCourse(id: string, auth: string) : any{
    let headers = this.headersForToken(auth);
    return this.http.delete(this.courseEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  }
  // public deleteGenre(id: string, auth: string) : any{
  //   let headers = this.headersForToken(auth);
  //   return this.http.delete(this.genreEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  // }
  // public deleteAudience(id: string, auth: string) : any{
  //   let headers = this.headersForToken(auth);
  //   return this.http.delete(this.audienceEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  // }
  // public deleteCountry(id: string, auth: string) : any{
  //   let headers = this.headersForToken(auth);
  //   return this.http.delete(this.countryEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  // }


  public headersForToken(token : string) : any{
    return {
      headers: {
        'theaters-auth': token
      }
    }
  }
  public handleError(err){
    let errBody = err.json();
    errBody.status = err.status;
    return Observable.throw(errBody);
  }

}
