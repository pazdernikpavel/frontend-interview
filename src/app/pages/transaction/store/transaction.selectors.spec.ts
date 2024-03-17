import { TransactionState } from './transaction.reducer';
import { selectIsFetchingTransactionList, selectTransactionList } from './transaction.selectors';

describe('transaction selectors', () => {
  const state: TransactionState = {
    isCreating: true,
    isDeleting: true,
    isFetchingList: true,
    expectedError: 'Some error message',
    unexpectedError: 'Another error message',
    transactions: [],
  };

  it('selectIsFetchingTransactionList should reflect state correctly', () => {
    expect(selectIsFetchingTransactionList.projector(state)).toEqual(state.isFetchingList);
  });

  it('selectTransactionList should reflect state correctly', () => {
    expect(selectTransactionList.projector(state)).toEqual(state.transactions);
  });
});
