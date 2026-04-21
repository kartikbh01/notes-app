import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await authService.getCurrentUser();
    if (user) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  } catch (error) {
    return router.createUrlTree(['/login']);
  }
};
