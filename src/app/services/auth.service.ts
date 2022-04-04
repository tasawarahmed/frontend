import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from '../model/user';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //baseUrl = 'http://localhost:1061/api';
  constructor(private http: HttpClient, private baseUrl: BaseurlService) {}

  authUser(user: UserForLogin) {
    return this.http.post(this.baseUrl.getBaseUrl() + '/account/login', user);
  }

  registerUser(user: UserForRegister) {
    return this.http.post(
      this.baseUrl.getBaseUrl() + '/account/register',
      user
    );
  }
}
