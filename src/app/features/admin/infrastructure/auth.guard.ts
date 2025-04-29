import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthMeResponse } from '../domain/auth.interfaces';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const httpClient = inject(HttpClient);
  const router = inject(Router);

  return httpClient.get<AuthMeResponse>('/.auth/me').pipe(
    map((userInfo: AuthMeResponse) => {
      const roles = userInfo?.clientPrincipal?.userRoles || [];
      return roles.includes('authenticated') ? true : false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
