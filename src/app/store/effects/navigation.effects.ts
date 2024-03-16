import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { navigationActions } from '../actions/navigation.actions';

@Injectable()
export class NavigationEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  public readonly navigateTo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigationActions.navigateTo),
        tap(({ path }) => this.router.navigate(path)),
      ),
    { dispatch: false },
  );
}
