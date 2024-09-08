import { AuthService } from './../../core/services/auth.service';
import { Component, inject, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',

  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _Router: Router) {}

  private readonly _AuthService = inject(AuthService);

  isLoading: boolean = false;

  msgError: string = '';

  msgSucc: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  showData() {
    if (this.loginForm.valid == true) {
      this.isLoading = true;

      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (response: any) => {
          
          this._AuthService.isLogin.next(true)

          this.isLoading = false;

          let userToken = response.token

          localStorage.setItem('token' , userToken)

          let decodedToken : any = jwtDecode(userToken)

          this._AuthService.userName.next(decodedToken.name)
          
          this._Router.navigate(['/home']);


          
          
        },

        error: (err) => {
          this.isLoading = false;
          this.msgError = err.error.message;
          console.log(err);
        },
      });
    }
  }
}
