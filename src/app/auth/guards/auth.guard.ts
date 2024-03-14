import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { NbToastrService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { AppRoute } from '@app/main/app.route.enum';
import { AuthRoute } from '../routing/auth.route.enum';
import { selectAuthState } from '../store/auth.selectors';

export const authGuard = (): CanActivateFn => {
  return (): Observable<boolean | UrlTree> => {
    const store = inject(Store);
    const router = inject(Router);
    const notificationService = inject(NbToastrService);
    return store.pipe(
      select(selectAuthState),
      filter(state => state.attemptedToAuthenticate),
      map(state => !!state.user),
      take(1),
      map(isAuthorized => {
        if (!isAuthorized) {
          notificationService.warning('You need to login to access this page', 'Unauthorized');
          return router.createUrlTree(['/', AppRoute.Auth, AuthRoute.Login]);
        } else {
          return isAuthorized;
        }
      }),
    );
  };
};
