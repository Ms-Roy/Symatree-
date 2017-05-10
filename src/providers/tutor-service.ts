import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Teach } from '../objects/teach';


@Injectable()
export class TutorService {
  teachEndpoint = 'http://localhost:8080/api/teaches';

  constructor(public http: Http) {

  }
  public listTeaches(auth:string): Observable<Teach>{
      return this.http.get(this.teachEndpoint+"/")
        .map(res => res.json())
        .catch(this.handleError);
  }

  public createTeach(teach: Teach, auth: string): Observable<Teach> {
      let headers = this.headersForToken(auth);
      return this.http.post(this.teachEndpoint, teach, headers).map(res => res.json()).catch(this.handleError);
  }

  public getCourse(id: string): Observable<Teach> {
      return this.http.get(this.teachEndpoint + "/" + id).map(res => res.json()).catch(this.handleError);
  }

  public deleteTeach(teach:Teach, auth: string): any {
      let headers = this.headersForToken(auth);
      return this.http.delete(this.teachEndpoint + "/" + teach._id, headers).map(res => res.json()).catch(this.handleError);
  }

  public updateTeach(teach: Teach, auth: string): any {
      let headers = this.headersForToken(auth);
      return this.http.put(this.teachEndpoint + "/" + teach._id,teach, headers).map(res => res.json()).catch(this.handleError);
  }

  public listTeachesForUser(id: string, auth: string): Observable<Teach[]> {
      return this.http.get(this.userTeachEndpoint(id)).map(res => res.json()).catch(this.handleError);
  }

  /* pointing to course end-point */
  public userTeachEndpoint(id:string): string{
      return 'http://localhost:8080/api/users/' + id + '/teaches';
  }


  /* handling errors */
  public handleError(err){
    let errBody = err.json();
    errBody.status = err.status;
    return Observable.throw(errBody);
  }


  /*  */
  public headersForToken(token : string) : any{
    return {
      headers: {
        'symatree-auth': token
      }
    }
  }


}
