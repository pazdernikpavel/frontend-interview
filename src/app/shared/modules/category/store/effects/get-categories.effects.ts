import { Injectable, inject } from '@angular/core';

import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { exhaustMap } from 'rxjs/operators';

import { Category, GetCategoriesGQL } from '@app/graphql/generated/schema';
import { fetchQuery } from '@app/graphql/graphql.utils';
import { getCategoriesActions } from '../actions/get-categories.actions';

@Injectable()
export class GetCategoriesEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly getCategoriesService = inject(GetCategoriesGQL);

  public readonly getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesActions.start),
      exhaustMap(() =>
        fetchQuery(
          this.getCategoriesService,
          {},
          ({ categories }) =>
            getCategoriesActions.success({
              response: categories.filter(Boolean) as Category[],
            }),
          error => getCategoriesActions.error({ message: error }),
        ),
      ),
    ),
  );

  public ngrxOnInitEffects(): Action {
    return getCategoriesActions.start();
  }
}
