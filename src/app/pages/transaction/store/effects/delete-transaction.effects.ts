import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';

import { DeleteTransactionGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { notificationActions } from '@app/store/actions/notification.actions';
import { deleteTransactionActions } from '../actions/delete-transaction.actions';

@Injectable()
export class DeleteTransactionEffects {
  private readonly actions$ = inject(Actions);
  private readonly deleteTransactionService = inject(DeleteTransactionGQL);

  public readonly deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTransactionActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.deleteTransactionService,
          { id: request.id },
          ({ removeTransactionRecord }) =>
            deleteTransactionActions.success({ response: removeTransactionRecord }),
          error => deleteTransactionActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly handleDeleteTransactionError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTransactionActions.error),
      map(({ message }) =>
        notificationActions.notify({
          notificationType: 'error',
          title: 'Failed to remove transaction…',
          message,
        }),
      ),
    ),
  );
}
