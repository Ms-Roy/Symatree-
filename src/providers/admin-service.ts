import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Audience} from "../objects/audience";
import {Genre} from "../objects/genre";
import {Country} from "../objects/country";
 import {Language} from "../objects/language";
 import { Http, URLSearchParams } from '@angular/http';
 import {Role} from "../objects/Role";
/*
  Generated class for the AdminService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdminService {
  languageEndpoint : string = 'http://localhost:8080/api/languages';
  genreEndpoint : string = 'http://localhost:8080/api/genres';
  audienceEndpoint : string = 'http://localhost:8080/api/audiences';
  countryEndpoint : string = 'http://localhost:8080/api/countries';
  userSearchEndpoint : string = 'http://localhost:8080/api/users';

  constructor(public http: Http) {
  }

  public createLanguage(language : Language, auth: string) : Observable<Language>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.languageEndpoint, language, headers).map(res => res.json()).catch(this.handleError);
  }
  public createAudience(audience : Audience, auth: string) : Observable<Audience>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.audienceEndpoint, audience, headers).map(res => res.json()).catch(this.handleError);
  }
  public createGenre(genre : Genre, auth : string) : Observable<Genre>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.genreEndpoint, genre, headers).map(res => res.json()).catch(this.handleError);
  }
  public createCountry(country : Country, auth: string): Observable<Country>{
    let headers = this.headersForToken(auth);
    return this.http.post(this.countryEndpoint, country, headers).map(res => res.json()).catch(this.handleError);
  }
  public deleteLanguage(id: string, auth: string) : any{
    let headers = this.headersForToken(auth);
    return this.http.delete(this.languageEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  }
  public deleteGenre(id: string, auth: string) : any{
    let headers = this.headersForToken(auth);
    return this.http.delete(this.genreEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  }
  public deleteAudience(id: string, auth: string) : any{
    let headers = this.headersForToken(auth);
    return this.http.delete(this.audienceEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  }
  public deleteCountry(id: string, auth: string) : any{
    let headers = this.headersForToken(auth);
    return this.http.delete(this.countryEndpoint+'/'+id, headers).map(res => res.json()).catch(this.handleError);
  }
  public searchUsers(searchString : string, auth : string) : any{
    let options = this.headersForToken(auth);
     let params = new URLSearchParams();
     params.set('search_string', searchString);
     options.search = params;
     return this.http.get(this.userSearchEndpoint, options).map(res => res.json()).catch(this.handleError);
   }
   public updateUserRole(id: string, role : Role, auth: string) : Observable<Role>{
        let headers = this.headersForToken(auth);
        let endpoint = this.getUpdateRoleEndpoint(id);
        return this.http.put(endpoint, role, headers).map(res => res.json()).catch(this.handleError);
      }
      public getUpdateRoleEndpoint(id : string){
     return 'http://localhost:8080/api/users/'+id+'/role';
   }

  public headersForToken(token : string) : any{
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
