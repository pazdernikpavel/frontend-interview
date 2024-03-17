import { FeatureSlice, createReducer, on } from '@ngrx/store';

import { Maybe, TransactionRecordTypeFragment } from '@app/graphql/generated/schema';
import { createTransactionActions } from './actions/create-transaction.actions';
import { deleteTransactionActions } from './actions/delete-transaction.actions';
import { getTransactionsActions } from './actions/get-transactions.actions';

export type TransactionState = {
  isCreating: boolean;
  isDeleting: boolean;
  isFetchingList: boolean;
  transactions: TransactionRecordTypeFragment[];
  expectedError: Maybe<string>;
  unexpectedError: Maybe<string>;
};

export const initialState: TransactionState = {
  isCreating: false,
  isDeleting: false,
  isFetchingList: false,
  transactions: [],
  unexpectedError: null,
  expectedError: null,
};

export const TRANSACTION_FEATURENAME = 'transaction';

export const transactionReducer = createReducer(
  initialState,

  on(
    getTransactionsActions.start,
    (state): TransactionState => ({
      ...state,
      isFetchingList: true,
    }),
  ),

  on(
    getTransactionsActions.error,
    (state, { message }): TransactionState => ({
      ...state,
      isFetchingList: false,
      unexpectedError: message,
    }),
  ),

  on(
    getTransactionsActions.success,
    (state, { response }): TransactionState => ({
      ...state,
      isFetchingList: false,
      transactions: response,
    }),
  ),

  on(
    deleteTransactionActions.start,
    (state): TransactionState => ({
      ...state,
      isDeleting: true,
    }),
  ),

  on(
    deleteTransactionActions.error,
    (state, { message }): TransactionState => ({
      ...state,
      isDeleting: false,
      expectedError: message,
    }),
  ),

  on(deleteTransactionActions.success, (state, { response }): TransactionState => {
    let newTransactions = [...state.transactions];

    if (response) {
      newTransactions = newTransactions.filter(transaction => transaction.id !== response.id);
    }

    return {
      ...state,
      isDeleting: false,
      transactions: newTransactions,
    };
  }),

  on(
    createTransactionActions.start,
    (state): TransactionState => ({
      ...state,
      isCreating: true,
    }),
  ),

  on(
    createTransactionActions.error,
    (state, { message }): TransactionState => ({
      ...state,
      isCreating: false,
      expectedError: message,
    }),
  ),

  on(
    createTransactionActions.success,
    (state, { response }): TransactionState => ({
      ...state,
      isCreating: false,
      transactions: [...state.transactions, response],
    }),
  ),
);

export const transactionReducerSlice: FeatureSlice<TransactionState> = {
  name: TRANSACTION_FEATURENAME,
  reducer: transactionReducer,
};
