import { TestBed } from '@angular/core/testing';

import { ApolloError } from '@apollo/client/core';
import { NbDialogService } from '@nebular/theme';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { GraphQLError } from 'graphql';
import { cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { notificationActions } from '@app/store/actions/notification.actions';
import { CreateTransactionEffects } from './create-transaction.effects';
import {
  CreateTransactionGQL,
  CreateTransactionRecordInput,
  TransactionRecordTypeFragment,
  TransactionType,
} from '../../../../graphql/generated/schema';
import { createTransactionActions } from '../actions/create-transaction.actions';

const MOCKED_CREATE_TRANSACTION_INPUT: CreateTransactionRecordInput = {
  title: 'test',
  description: 'test',
  amount: 1,
  date: '2021-01-01',
  categoryId: 'test',
  type: TransactionType.Expense,
};

const MOCKED_CREATE_TRANSACTION_RESPONSE: TransactionRecordTypeFragment = {
  id: '1',
  title: 'test',
  authorId: 'test',
  description: 'test',
  amount: 1,
  date: '2021-01-01',
  categoryId: 'test',
  type: TransactionType.Expense,
};

describe('CreateTransactionEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: CreateTransactionEffects;
  let createTransactionGQL: jasmine.SpyObj<CreateTransactionGQL>;
  let dialogService: jasmine.SpyObj<NbDialogService>;

  beforeEach(() => {
    createTransactionGQL = jasmine.createSpyObj(CreateTransactionGQL, ['mutate']);
    dialogService = jasmine.createSpyObj(NbDialogService, ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CreateTransactionGQL, useValue: createTransactionGQL },
        { provide: NbDialogService, useValue: dialogService },
        provideMockActions(() => actions$),
        CreateTransactionEffects,
      ],
    });

    effects = TestBed.inject<CreateTransactionEffects>(CreateTransactionEffects);
  });

  describe('openModal$ effect', () => {
    it('should call the dialog service and open modal', () => {
      const action = {
        a: createTransactionActions.openModal(),
      };

      actions$ = cold('a', action);
      const expected$ = cold('a', action);

      createTransactionGQL.mutate.and.returnValues(
        of({
          data: { createTransactionRecord: MOCKED_CREATE_TRANSACTION_RESPONSE },
          loading: false,
          networkStatus: 7,
        }),
      );

      expect(effects.openModal$).toBeObservable(expected$);
      expect(dialogService.open).toHaveBeenCalled();
    });
  });

  describe('createTransaction$ effect', () => {
    it('should return success action when OK response is returned', () => {
      const action = {
        a: createTransactionActions.start({
          request: MOCKED_CREATE_TRANSACTION_INPUT,
        }),
      };

      const expected = {
        a: createTransactionActions.success({
          response: MOCKED_CREATE_TRANSACTION_RESPONSE,
        }),
      };

      actions$ = cold('a', action);
      const expected$ = cold('a', expected);

      createTransactionGQL.mutate.and.returnValues(
        of({
          data: { createTransactionRecord: MOCKED_CREATE_TRANSACTION_RESPONSE },
          loading: false,
          networkStatus: 7,
        }),
      );

      expect(effects.createTransaction$).toBeObservable(expected$);
    });

    it('should return error action when error response is returned', () => {
      const action = {
        a: createTransactionActions.start({
          request: MOCKED_CREATE_TRANSACTION_INPUT,
        }),
      };

      const expected = {
        a: createTransactionActions.error({ message: 'Failed to create transaction' }),
      };

      actions$ = cold('a', action);
      const expected$ = cold('a', expected);

      createTransactionGQL.mutate.and.returnValues(
        throwError(
          () =>
            new ApolloError({
              graphQLErrors: [{ message: 'Failed to create transaction' } as GraphQLError],
            }),
        ),
      );

      expect(effects.createTransaction$).toBeObservable(expected$);
    });
  });

  describe('handleCreateTransactionError$ effect', () => {
    it('notify user on error', () => {
      const action = {
        a: createTransactionActions.error({
          message: 'Some error message',
        }),
      };

      const expected = {
        a: notificationActions.notify({
          notificationType: 'error',
          title: 'Failed to create transaction…',
          message: 'Some error message',
        }),
      };

      actions$ = cold('a', action);
      const expected$ = cold('a', expected);

      expect(effects.handleCreateTransactionError$).toBeObservable(expected$);
    });
  });

  describe('handleCreateTransactionSuccess$ effect', () => {
    it('notify user on success', () => {
      const action = {
        a: createTransactionActions.success({
          response: MOCKED_CREATE_TRANSACTION_RESPONSE,
        }),
      };

      const expected = {
        a: notificationActions.notify({
          notificationType: 'success',
          title: 'Success',
          message: 'Transaction created successfully',
        }),
      };

      actions$ = cold('a', action);
      const expected$ = cold('a', expected);

      expect(effects.handleCreateTransactionSuccess$).toBeObservable(expected$);
    });
  });
});
