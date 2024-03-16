import { Injectable, inject } from '@angular/core';

import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { concatMap, map, tap } from 'rxjs/operators';

import { TokensTypeFragment } from '@app/graphql/generated/schema';
import { ROOT_PATH, navigationActions } from '@app/store/actions/navigation.actions';
import { persistanceActions } from '../actions/persistance.actions';

export const JWT_LOCAL_STORAGE_KEY = 'test-app-jwt';

@Injectable()
export class PersistanceEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);

  /** Try to load tokens from local storage on app init. */
  public ngrxOnInitEffects(): Action {
    return persistanceActions.loadTokens();
  }

  public readonly persistTokens$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(persistanceActions.persistTokens),
        tap(({ tokens }) => localStorage.setItem(JWT_LOCAL_STORAGE_KEY, JSON.stringify(tokens))),
      ),
    { dispatch: false },
  );

  public readonly removeTokens$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(persistanceActions.removeTokens),
        tap(() => localStorage.removeItem(JWT_LOCAL_STORAGE_KEY)),
      ),
    { dispatch: false },
  );

  public readonly loadTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(persistanceActions.loadTokens),
      concatMap(() => {
        try {
          const payload = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
          if (!payload) {
            return [persistanceActions.failedToLoadTokens()];
          }
          const tokens: TokensTypeFragment = JSON.parse(payload);
          return [persistanceActions.tokensLoaded({ tokens })];
        } catch (_) {
          return [persistanceActions.removeTokens(), persistanceActions.failedToLoadTokens()];
        }
      }),
    ),
  );

  public readonly navigateOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(persistanceActions.tokensLoaded),
      map(() => navigationActions.navigateTo(ROOT_PATH)),
    ),
  );
}
