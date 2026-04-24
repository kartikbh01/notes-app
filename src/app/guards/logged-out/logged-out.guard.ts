import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loggedOutGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await authService.getCurrentUser();
    if (user) {
      return router.createUrlTree(['/']);
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
};
