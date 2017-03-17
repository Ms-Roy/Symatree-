import { FormControl } from '@angular/forms';

export class EmailValidator {

  // static checkUsername(control: FormControl): any {
  //
  //   return new Promise(resolve => {
  //
  //     //Fake a slow response from server
  //
  //     setTimeout(() => {
  //       if(control.value.toLowerCase() === "greg"){
  //
  //         resolve({
  //           "username taken": true
  //         });
  //
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //
  //   });
  // }
  static checkEmail(control: FormControl): any {

    let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!regExp.test(control.value)) {
      return {"invalidEmail": true};
    }

    return null;
  }

}
