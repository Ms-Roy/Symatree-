/**
 * Created by ericdufresne on 2017-03-07.
 */
export class PhoneNumber{
    type: string;
    number: string;
}
export class User{
    _id: string;
    email: string;
    pictureURL: string;
    role: string;
    phoneNumbers: PhoneNumber[];
    programOfStudy: string;
    school: string;
    firstName: string;
    lastName: string;


    constructor(){
        this.phoneNumbers = [];
    }
}
