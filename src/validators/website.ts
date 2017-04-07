import { FormControl } from '@angular/forms';

export class WebsiteValidator {

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
  static checkWebsite(control: FormControl): any {

    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

if(regex.test("http://google.com")){
 if (!regex.test(control.value)) {
  return {"invalidWebsite": true};
}
  //alert("Successful match");
}else{
  return null;
  ///alert("No match");
}
}

//   //  let regExp = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+))?$/;
// let regExp = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
//     if (!regExp.test(control.value)) {
//       return {"invalidEmail": true};
//     }
//
//     return null;
//   }

}
