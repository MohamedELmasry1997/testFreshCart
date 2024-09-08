import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  // message: 'Reset code sent to your email'
  setVerifyEmail() {
    this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.statusMsg === "success") {
          this.step = 2
          console.log('yessss');
          
        }else{
          console.log('no');
          
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setVerifyCode() {
    this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.status === 'Success') {
          this.step = 3 
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setResetPassword() {
    this._AuthService.resetPassowrdVerify(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);

        localStorage.setItem('token', res.token);

        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
