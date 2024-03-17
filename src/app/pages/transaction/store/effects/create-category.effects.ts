import { Injectable, inject } from '@angular/core';

import { NbDialogService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs/operators';

import { CreateTransactionGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { notificationActions } from '@app/store/actions/notification.actions';
import { CreateTransactionComponent } from '../../components/create-transaction/create-transaction.component';
import { createTransactionActions } from '../actions/create-transaction.actions';

@Injectable()
export class CreateTransactionEffects {
  private readonly actions$ = inject(Actions);
  private readonly createTransactionService = inject(CreateTransactionGQL);
  private readonly dialogService = inject(NbDialogService);

  public readonly openModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createTransactionActions.openModal),
        switchMap(
          () =>
            this.dialogService.open(CreateTransactionComponent, { closeOnBackdropClick: false })
              .onClose,
        ),
      ),
    { dispatch: false },
  );

  public readonly createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTransactionActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.createTransactionService,
          { input: request },
          ({ createTransactionRecord }) =>
            createTransactionActions.success({ response: createTransactionRecord }),
          error => createTransactionActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly handleCreateTransactionError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTransactionActions.error),
      map(({ message }) =>
        notificationActions.notify({
          notificationType: 'error',
          title: 'Failed to create transaction…',
          message,
        }),
      ),
    ),
  );
}
