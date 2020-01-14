import {USER_ROLE} from '../constants/userRole';

export class User {
    email: string;
    password: string;
    role: string;

    constructor( email: string, password: string ) {
        this.email = email;
        this.password = password;
        this.role = USER_ROLE.user;
    }
}