import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const pathGuard: CanActivateFn = (route, state) => {
  let _AuthService = inject(AuthService);

  let _Router = inject(Router);

  if (_AuthService.isLogin.value == true) {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
