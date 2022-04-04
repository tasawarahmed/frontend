import { Injectable } from '@angular/core';
import { UserForRegister } from '../model/user';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private baseurl: BaseurlService) {}

  addUser(user: UserForRegister) {

    // let users = [];
    // if (localStorage.getItem('Users')) {
    //   users = JSON.parse(localStorage.getItem('Users'));
    //   users = [user, ...users];
    //   //new user will be added at front of array.
    //   //if we want to be added at end of array use [...users, user]
    // } else {
    //   users = [user];
    // }
    // localStorage.setItem('Users', JSON.stringify(users));
  }
}
