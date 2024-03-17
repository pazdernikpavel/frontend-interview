import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TRANSACTION_FEATURENAME, TransactionState } from './transaction.reducer';

export const selectTransactionState =
  createFeatureSelector<TransactionState>(TRANSACTION_FEATURENAME);

export const selectIsFetchingTransactionList = createSelector(
  selectTransactionState,
  state => state.isFetchingList,
);

export const selectTransactionList = createSelector(
  selectTransactionState,
  state => state.transactions,
);
