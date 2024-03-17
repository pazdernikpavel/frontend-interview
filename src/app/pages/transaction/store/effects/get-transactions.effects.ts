import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';

import { GetTransactionsGQL, TransactionRecordTypeFragment } from '@app/graphql/generated/schema';
import { fetchQuery } from '@app/graphql/graphql.utils';
import { getCategoriesActions } from '@app/shared/modules/category/store/actions/get-categories.actions';
import { getTransactionsActions } from '../actions/get-transactions.actions';

@Injectable()
export class GetTransactionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly getTransactionsService = inject(GetTransactionsGQL);

  public readonly getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransactionsActions.start),
      exhaustMap(() =>
        fetchQuery(
          this.getTransactionsService,
          {},
          ({ transactionRecords }) =>
            getTransactionsActions.success({
              response: transactionRecords.filter(Boolean) as TransactionRecordTypeFragment[],
            }),
          error => getTransactionsActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransactionsActions.start),
      map(() => getCategoriesActions.start()),
    ),
  );
}
