import {
  CreateTransactionRecordInput,
  TransactionRecordTypeFragment,
  TransactionType,
} from '@app/graphql/generated/schema';
import { createTransactionActions } from './actions/create-transaction.actions';
import { deleteTransactionActions } from './actions/delete-transaction.actions';
import { getTransactionsActions } from './actions/get-transactions.actions';
import { TransactionState, initialState, transactionReducer } from './transaction.reducer';

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

describe('transactionReducer', () => {
  it('getTransactionsActions.start should set loading state', () => {
    const action = getTransactionsActions.start();

    const originalState: TransactionState = {
      ...initialState,
    };

    const expected: TransactionState = {
      ...initialState,
      isFetchingList: true,
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('getTransactionsActions.success should set result', () => {
    const action = getTransactionsActions.success({
      response: [MOCKED_CREATE_TRANSACTION_RESPONSE],
    });

    const originalState: TransactionState = {
      ...initialState,
      isFetchingList: true,
    };

    const expected: TransactionState = {
      ...initialState,
      isFetchingList: false,
      transactions: [MOCKED_CREATE_TRANSACTION_RESPONSE],
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('getTransactionsActions.error should set error', () => {
    const action = getTransactionsActions.error({
      message: 'Some error message',
    });

    const originalState: TransactionState = {
      ...initialState,
      isFetchingList: true,
    };

    const expected: TransactionState = {
      ...initialState,
      isFetchingList: false,
      unexpectedError: 'Some error message',
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('deleteTransactionActions.start should set loading state', () => {
    const action = deleteTransactionActions.start({ request: { id: 'id' } });

    const originalState: TransactionState = {
      ...initialState,
    };

    const expected: TransactionState = {
      ...initialState,
      isDeleting: true,
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('deleteTransactionActions.success should remove transaction', () => {
    const action = deleteTransactionActions.success({
      response: MOCKED_CREATE_TRANSACTION_RESPONSE,
    });

    const originalState: TransactionState = {
      ...initialState,
      isDeleting: true,
      transactions: [MOCKED_CREATE_TRANSACTION_RESPONSE],
    };

    const expected: TransactionState = {
      ...initialState,
      isDeleting: false,
      transactions: [],
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('deleteTransactionActions.error should set expected error', () => {
    const action = deleteTransactionActions.error({
      message: 'Some error message',
    });

    const originalState: TransactionState = {
      ...initialState,
      isDeleting: true,
    };

    const expected: TransactionState = {
      ...initialState,
      isDeleting: false,
      expectedError: 'Some error message',
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('createTransactionActions.start should set loading state', () => {
    const action = createTransactionActions.start({
      request: MOCKED_CREATE_TRANSACTION_INPUT,
    });

    const originalState: TransactionState = {
      ...initialState,
    };

    const expected: TransactionState = {
      ...initialState,
      isCreating: true,
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('createTransactionActions.success should store created transaction', () => {
    const action = createTransactionActions.success({
      response: MOCKED_CREATE_TRANSACTION_RESPONSE,
    });

    const originalState: TransactionState = {
      ...initialState,
      isCreating: true,
      transactions: [],
    };

    const expected: TransactionState = {
      ...initialState,
      isCreating: false,
      transactions: [MOCKED_CREATE_TRANSACTION_RESPONSE],
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });

  it('createTransactionActions.error should set expected error', () => {
    const action = createTransactionActions.error({
      message: 'Some error message',
    });

    const originalState: TransactionState = {
      ...initialState,
      isCreating: true,
    };

    const expected: TransactionState = {
      ...initialState,
      isCreating: false,
      expectedError: 'Some error message',
    };

    expect(transactionReducer(originalState, action)).toEqual(expected);
  });
});
