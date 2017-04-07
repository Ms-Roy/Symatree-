import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { AuthAttempt } from '../objects/auth-attempt';
import {Storage} from "@ionic/storage";
import {User} from "../objects/user";

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  endpoint : string = 'http://localhost:8080/api/';
  token : string;
  constructor(public http: Http, public storage : Storage) {
    this.getCurrentUser(null);
  }
  public getAccessToken() : string{
    if (!this.token){
      return null;
    }
    return this.token;
  }
  public getCurrentUser(callback : (data : User) => any){
    this.storage.ready().then(() => {
      this.storage.get('auth-token').then((token) => {
        this.token = token;
        if (!this.token){
          if (callback){
            callback(null);
          }
        }
        else if (callback){
          this.http.get(this.endpoint+'auth/'+token).map(res => res.json()).catch(this.handleError).subscribe(data => {
            callback(data);
          });
        }
      });
    });
  }
  public attemptLogin(email: string, password: string) : Observable<AuthAttempt>{
    let body = {
      email: email,
      password: password
    };
    let observable : any = this.http.post(this.endpoint+"login", body).map(res => res.json()).catch(this.handleError).share();
    let errorHandler = () => {};
    let successHandler = (data)=> {
      this.token = data.token;
      this.storage.set('auth-token', this.token).catch(err => {
        throw err;
      });
    };
    observable.subscribe(successHandler, errorHandler);
    return observable;
  }
  public attemptSignup(email: string, password: string, firstName: string, lastName: string, role:string) : Observable<AuthAttempt>{
    let body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role
    };
    let observable : any = this.http.post(this.endpoint+"signup", body).map(res => res.json()).catch(this.handleError).share();
    let errorHandler = ()=>{};
    let successHandler = (data) => {
      this.token = data.token;
      this.storage.set('auth-token', this.token).catch(err => {
        throw err;
      });
    };
    observable.subscribe(successHandler, errorHandler);

    return observable;
  }

  public logout() : boolean{
    let exists = this.storage.get('auth-token') != null;
    this.storage.remove('auth-token').catch(err => {
      console.log(err);
    });
    return exists;
  }

  public handleError(err){
    let errBody = err.json();
    errBody.status = err.status;
    return Observable.throw(errBody);
  }
}
