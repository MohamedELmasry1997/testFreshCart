import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  userName : BehaviorSubject<string> = new BehaviorSubject('')

  constructor() {

    afterNextRender(() => {
      if (localStorage.getItem('token') !== null) {
        this.isLogin.next(true);
       
        let token: any = localStorage.getItem('token');

        let decodedToken: any = jwtDecode( token );

        this.userName.next(decodedToken.name);
      }
      else {
        this.isLogin.next(false)
      }
    })
  }
  private readonly _HttpClient = inject(HttpClient);

  setRegisterForm(data: object) {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }

  setLoginForm(data: object) {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  setVerifyEmail(data:object): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , data)
  }

  setVerifyCode(data : object): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , data)
  }

  resetPassowrdVerify(data : object): Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , data)
  }
}
