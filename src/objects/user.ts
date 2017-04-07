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
    password:string;
    role: string;
    firstName:string;
    lastName:string;
    phoneNumbers: PhoneNumber[];
    programOfStudy: string;
    school: string;

    constructor(){
        this.phoneNumbers = [];
    }
}
