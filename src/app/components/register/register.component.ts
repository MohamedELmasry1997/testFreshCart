import { AuthService } from './../../core/services/auth.service';
import { Component, inject, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _Router: Router) {}

  private readonly _AuthService = inject(AuthService);

  isLoading: boolean = false;

  msgError: string = '';

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      email: new FormControl(null, [Validators.required, Validators.email]),

      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),

      rePassword: new FormControl(null),

      phone: new FormControl(null, [ Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/),]),
    },
    this.confirmPassword
  );

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  showData() {
    if (this.registerForm.valid == true) {
      this.isLoading = true;

      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({

        next: (response) => {
          
          this.isLoading = false;

          this._Router.navigate( ['/login'] );

          console.log(response);
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

//01[0125][0,9]{8
